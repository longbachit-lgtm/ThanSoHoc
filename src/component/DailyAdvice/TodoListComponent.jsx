import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../service/api";
import { FaChevronDown, FaChevronRight, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const TodoListComponent = forwardRef(function TodoListComponent({ period = 'custom', targetDate = null }, ref) {
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingSection, setEditingSection] = useState(null); // sectionIndex đang được edit
  const [editingSectionTitleValue, setEditingSectionTitleValue] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddItem, setShowAddItem] = useState({});

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Load todo list function
  const loadTodoList = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      let response;
      if (period !== 'custom') {
        response = await api.todo.getByPeriod(period, targetDate);
      } else {
        response = await api.todo.getActive();
      }

      if (response.data) {
        setTodoList(response.data);
      } else {
        // Create empty structure
        setTodoList({
          _id: null,
          title: "Danh sách việc cần làm",
          sections: [],
          period,
          targetDate
        });
      }
    } catch (err) {
      console.error("Load todo list error:", err);
      setError(err.message || "Không thể tải danh sách");
      // Set empty structure on error
      setTodoList({
        _id: null,
        title: "Danh sách việc cần làm",
        sections: [],
        period,
        targetDate
      });
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh function via ref
  useImperativeHandle(ref, () => ({
    refresh: loadTodoList
  }));

  // Load todo list on mount and when dependencies change
  useEffect(() => {
    loadTodoList();
  }, [isAuthenticated, period, targetDate]);

  // Save todo list
  const saveTodoList = async (updatedList) => {
    if (!isAuthenticated) return;

    try {
      setSaving(true);
      setError("");

      if (!updatedList._id) {
        // Create new
        const response = await api.todo.create(updatedList);
        setTodoList(response.data);
      } else {
        // Update existing
        const response = await api.todo.update(updatedList._id, updatedList);
        setTodoList(response.data);
      }
    } catch (err) {
      console.error("Save todo list error:", err);
      setError(err.message || "Không thể lưu danh sách");
    } finally {
      setSaving(false);
    }
  };

  // Toggle section expand/collapse
  const toggleSection = (sectionIndex) => {
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].isExpanded = !updatedSections[sectionIndex].isExpanded;

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  // Add new section
  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) {
      alert("Vui lòng nhập tên section!");
      return;
    }

    if (!todoList) return;

    const newSection = {
      title: newSectionTitle.trim(),
      items: [],
      isExpanded: true,
      order: todoList.sections.length
    };

    const updatedSections = [...todoList.sections, newSection];
    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    setNewSectionTitle("");
    setShowAddSection(false);
    saveTodoList(updatedList);
  };

  // Delete section
  const handleDeleteSection = async (sectionIndex) => {
    if (!confirm("Bạn có chắc muốn xóa section này?")) return;
    if (!todoList) return;

    const updatedSections = todoList.sections.filter((_, index) => index !== sectionIndex);
    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  // Add item to section
  const handleAddItem = async (sectionIndex) => {
    if (!newItemText.trim()) {
      alert("Vui lòng nhập nội dung công việc!");
      return;
    }

    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    const newItem = {
      text: newItemText.trim(),
      completed: false,
      order: updatedSections[sectionIndex].items.length
    };

    updatedSections[sectionIndex].items.push(newItem);

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    setNewItemText("");
    setShowAddItem({ ...showAddItem, [sectionIndex]: false });
    saveTodoList(updatedList);
  };

  // Toggle item complete
  const handleToggleItem = async (sectionIndex, itemIndex) => {
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items[itemIndex].completed = 
      !updatedSections[sectionIndex].items[itemIndex].completed;

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  // Delete item
  const handleDeleteItem = async (sectionIndex, itemIndex) => {
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items = updatedSections[sectionIndex].items.filter(
      (_, index) => index !== itemIndex
    );

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  // Update item text
  const handleUpdateItem = async (sectionIndex, itemIndex, newText) => {
    if (!newText.trim()) return;
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items[itemIndex].text = newText.trim();

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    setEditingItem(null);
    saveTodoList(updatedList);
  };

  // Update section title
  const handleUpdateSectionTitle = async (sectionIndex, newTitle) => {
    if (!newTitle.trim()) {
      setEditingSection(null);
      setEditingSectionTitleValue("");
      return;
    }
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].title = newTitle.trim();

    const updatedList = {
      ...todoList,
      sections: updatedSections
    };

    setTodoList(updatedList);
    setEditingSection(null);
    setEditingSectionTitleValue("");
    saveTodoList(updatedList);
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="card border-0 shadow-sm mt-4"
        style={{
          backgroundColor: '#FCF8F0',
          borderRadius: '15px',
          border: '1px solid #E8C78C'
        }}
      >
        <div className="card-body p-4 text-center">
          <p style={{ color: '#332211', margin: 0 }}>
            Vui lòng đăng nhập để sử dụng tính năng TODO List
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div 
        className="card border-0 shadow-sm mt-4"
        style={{
          backgroundColor: '#FCF8F0',
          borderRadius: '15px',
          border: '1px solid #E8C78C'
        }}
      >
        <div className="card-body p-4 text-center">
          <p style={{ color: '#332211' }}>Đang tải danh sách...</p>
        </div>
      </div>
    );
  }

  if (!todoList) {
    return null;
  }

  return (
    <div className="mt-4">
      {/* Header */}
      <div 
        className="card border-0 shadow-sm mb-3"
        style={{
          backgroundColor: '#FCF8F0',
          borderRadius: '15px',
          border: '1px solid #E8C78C'
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 
              className="fw-bold mb-0"
              style={{
                color: '#332211',
                fontSize: '1.5rem'
              }}
            >
              📝 Danh sách việc cần làm
            </h3>
            <button
              className="btn btn-sm border-0"
              onClick={() => setShowAddSection(true)}
              style={{
                backgroundColor: '#B8860B',
                color: '#fff',
                borderRadius: '20px',
                padding: '8px 16px'
              }}
            >
              <FaPlus /> Thêm Section
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="alert alert-danger mb-3" role="alert" style={{ borderRadius: '12px' }}>
          {error}
        </div>
      )}

      {/* Add Section Form */}
      {showAddSection && (
        <div 
          className="card border-0 shadow-sm mb-3"
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '2px solid #E8C78C'
          }}
        >
          <div className="card-body p-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nhập tên section (ví dụ: Tính chất chung, Mục đích sống, Note 1...)"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddSection();
                } else if (e.key === 'Escape') {
                  setShowAddSection(false);
                  setNewSectionTitle("");
                }
              }}
              style={{
                borderRadius: '8px',
                border: '1px solid #E8C78C',
                padding: '10px'
              }}
              autoFocus
            />
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm"
                onClick={handleAddSection}
                style={{
                  backgroundColor: '#B8860B',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none'
                }}
              >
                Thêm
              </button>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setShowAddSection(false);
                  setNewSectionTitle("");
                }}
                style={{
                  backgroundColor: '#ddd',
                  color: '#333',
                  borderRadius: '8px',
                  border: 'none'
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Todo List Sections */}
      <div 
        className="card border-0 shadow-sm"
        style={{
          backgroundColor: '#FCF8F0',
          borderRadius: '15px',
          border: '1px solid #E8C78C',
          minHeight: '200px'
        }}
      >
        <div className="card-body p-4">
          {todoList.sections.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ color: '#332211', opacity: 0.7 }}>
                Chưa có section nào. Hãy tạo section đầu tiên!
              </p>
            </div>
          ) : (
            todoList.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="mb-4"
                style={{
                  borderBottom: sectionIndex < todoList.sections.length - 1 ? '1px solid #E8C78C' : 'none',
                  paddingBottom: sectionIndex < todoList.sections.length - 1 ? '20px' : '0'
                }}
              >
                {/* Section Header */}
                <div
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center gap-2 flex-grow-1">
                    <div
                      onClick={() => toggleSection(sectionIndex)}
                      style={{ cursor: 'pointer', padding: '4px' }}
                      title="Click để mở/đóng section"
                    >
                      {section.isExpanded ? (
                        <FaChevronDown style={{ color: '#332211', fontSize: '14px' }} />
                      ) : (
                        <FaChevronRight style={{ color: '#332211', fontSize: '14px' }} />
                      )}
                    </div>
                    {editingSection === sectionIndex ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editingSectionTitleValue}
                        onChange={(e) => setEditingSectionTitleValue(e.target.value)}
                        onBlur={() => handleUpdateSectionTitle(sectionIndex, editingSectionTitleValue)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleUpdateSectionTitle(sectionIndex, editingSectionTitleValue);
                          } else if (e.key === 'Escape') {
                            setEditingSection(null);
                            setEditingSectionTitleValue("");
                          }
                        }}
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: '#332211',
                          border: '2px solid #B8860B',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          backgroundColor: '#fff',
                          maxWidth: '500px'
                        }}
                        autoFocus
                      />
                    ) : (
                      <h4
                        className="mb-0 fw-bold"
                        style={{
                          color: '#332211',
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          userSelect: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          transition: 'background-color 0.2s'
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditingSection(sectionIndex);
                          setEditingSectionTitleValue(section.title);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(184, 134, 11, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Double click để chỉnh sửa tiêu đề"
                      >
                        {section.title}
                      </h4>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddItem({ ...showAddItem, [sectionIndex]: true });
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#B8860B'
                      }}
                      title="Thêm item"
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="btn btn-sm p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSection(sectionIndex);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#dc3545'
                      }}
                      title="Xóa section"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Section Items */}
                {section.isExpanded && (
                  <div className="ms-4 mt-2">
                    {/* Add Item Form */}
                    {showAddItem[sectionIndex] && (
                      <div className="mb-3 p-3" style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Nhập công việc cần làm..."
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddItem(sectionIndex);
                            } else if (e.key === 'Escape') {
                              setShowAddItem({ ...showAddItem, [sectionIndex]: false });
                              setNewItemText("");
                            }
                          }}
                          style={{
                            borderRadius: '8px',
                            border: '1px solid #E8C78C',
                            padding: '8px 12px'
                          }}
                          autoFocus
                        />
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm"
                            onClick={() => handleAddItem(sectionIndex)}
                            style={{
                              backgroundColor: '#B8860B',
                              color: '#fff',
                              borderRadius: '8px',
                              border: 'none',
                              padding: '4px 12px'
                            }}
                          >
                            Thêm
                          </button>
                          <button
                            className="btn btn-sm"
                            onClick={() => {
                              setShowAddItem({ ...showAddItem, [sectionIndex]: false });
                              setNewItemText("");
                            }}
                            style={{
                              backgroundColor: '#ddd',
                              color: '#333',
                              borderRadius: '8px',
                              border: 'none',
                              padding: '4px 12px'
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Items List */}
                    {section.items.length === 0 ? (
                      <p style={{ color: '#332211', opacity: 0.6, fontSize: '0.9rem', fontStyle: 'italic' }}>
                        Chưa có công việc nào. Hãy thêm công việc đầu tiên!
                      </p>
                    ) : (
                      section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="d-flex align-items-start gap-2 mb-2 p-2"
                          style={{
                            backgroundColor: item.completed ? '#f0f0f0' : '#fff',
                            borderRadius: '8px',
                            border: '1px solid #E8C78C',
                            opacity: item.completed ? 0.7 : 1,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggleItem(sectionIndex, itemIndex)}
                            style={{
                              marginTop: '4px',
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#B8860B'
                            }}
                          />
                          {editingItem?.sectionIndex === sectionIndex && editingItem?.itemIndex === itemIndex ? (
                            <input
                              type="text"
                              className="form-control flex-grow-1"
                              value={editingItem.text}
                              onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                              onBlur={() => {
                                if (editingItem.text.trim()) {
                                  handleUpdateItem(sectionIndex, itemIndex, editingItem.text);
                                } else {
                                  setEditingItem(null);
                                }
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  if (editingItem.text.trim()) {
                                    handleUpdateItem(sectionIndex, itemIndex, editingItem.text);
                                  }
                                } else if (e.key === 'Escape') {
                                  setEditingItem(null);
                                }
                              }}
                              style={{
                                borderRadius: '6px',
                                border: '1px solid #B8860B',
                                padding: '4px 8px',
                                fontSize: '0.95rem'
                              }}
                              autoFocus
                            />
                          ) : (
                            <>
                              <span
                                className="flex-grow-1"
                                style={{
                                  color: '#332211',
                                  textDecoration: item.completed ? 'line-through' : 'none',
                                  cursor: 'pointer',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.2s'
                                }}
                                onClick={() => {
                                  setEditingItem({
                                    sectionIndex,
                                    itemIndex,
                                    text: item.text
                                  });
                                }}
                                onMouseEnter={(e) => {
                                  if (!item.completed) {
                                    e.currentTarget.style.backgroundColor = '#FCF8F0';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                {item.text}
                              </span>
                              <button
                                className="btn btn-sm p-1"
                                onClick={() => handleDeleteItem(sectionIndex, itemIndex)}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: '#dc3545',
                                  fontSize: '0.8rem'
                                }}
                                title="Xóa"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Saving indicator */}
      {saving && (
        <div className="text-center mt-2">
          <small style={{ color: '#B8860B' }}>Đang lưu...</small>
        </div>
      )}
    </div>
  );
});

export default TodoListComponent;


import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../service/api";
import { FaChevronDown, FaChevronRight, FaPlus, FaTrash } from "react-icons/fa";

const TodoListComponent = forwardRef(function TodoListComponent({ period = 'custom', targetDate = null }, ref) {
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingSection, setEditingSection] = useState(null);
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

  useImperativeHandle(ref, () => ({
    refresh: loadTodoList
  }));

  useEffect(() => {
    loadTodoList();
  }, [isAuthenticated, period, targetDate]);

  const saveTodoList = async (updatedList) => {
    if (!isAuthenticated) return;

    try {
      setSaving(true);
      setError("");

      if (!updatedList._id) {
        const response = await api.todo.create(updatedList);
        setTodoList(response.data);
      } else {
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

  const toggleSection = (sectionIndex) => {
    if (!todoList) return;
    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].isExpanded = !updatedSections[sectionIndex].isExpanded;
    const updatedList = { ...todoList, sections: updatedSections };
    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

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
    const updatedList = { ...todoList, sections: updatedSections };

    setTodoList(updatedList);
    setNewSectionTitle("");
    setShowAddSection(false);
    saveTodoList(updatedList);
  };

  const handleDeleteSection = async (sectionIndex) => {
    if (!confirm("Bạn có chắc muốn xóa section này?")) return;
    if (!todoList) return;

    const updatedSections = todoList.sections.filter((_, index) => index !== sectionIndex);
    const updatedList = { ...todoList, sections: updatedSections };

    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

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
    const updatedList = { ...todoList, sections: updatedSections };

    setTodoList(updatedList);
    setNewItemText("");
    setShowAddItem({ ...showAddItem, [sectionIndex]: false });
    saveTodoList(updatedList);
  };

  const handleToggleItem = async (sectionIndex, itemIndex) => {
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items[itemIndex].completed =
      !updatedSections[sectionIndex].items[itemIndex].completed;

    const updatedList = { ...todoList, sections: updatedSections };
    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  const handleDeleteItem = async (sectionIndex, itemIndex) => {
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items = updatedSections[sectionIndex].items.filter(
      (_, index) => index !== itemIndex
    );

    const updatedList = { ...todoList, sections: updatedSections };
    setTodoList(updatedList);
    saveTodoList(updatedList);
  };

  const handleUpdateItem = async (sectionIndex, itemIndex, newText) => {
    if (!newText.trim()) return;
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].items[itemIndex].text = newText.trim();

    const updatedList = { ...todoList, sections: updatedSections };
    setTodoList(updatedList);
    setEditingItem(null);
    saveTodoList(updatedList);
  };

  const handleUpdateSectionTitle = async (sectionIndex, newTitle) => {
    if (!newTitle.trim()) {
      setEditingSection(null);
      setEditingSectionTitleValue("");
      return;
    }
    if (!todoList) return;

    const updatedSections = [...todoList.sections];
    updatedSections[sectionIndex].title = newTitle.trim();

    const updatedList = { ...todoList, sections: updatedSections };
    setTodoList(updatedList);
    setEditingSection(null);
    setEditingSectionTitleValue("");
    saveTodoList(updatedList);
  };

  if (!isAuthenticated) {
    return (
      <div className="da-todo-loading">
        <p>Vui lòng đăng nhập để sử dụng tính năng TODO List</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="da-todo-loading">
        <p>Đang tải danh sách...</p>
      </div>
    );
  }

  if (!todoList) {
    return null;
  }

  return (
    <div>
      {/* Main Card */}
      <div className="da-todo-card">
        {/* Header */}
        <div className="da-todo-header">
          <h3 className="da-todo-title">
            <span>📝</span>
            Danh sách việc cần làm
          </h3>
          <button
            className="da-add-section-btn"
            onClick={() => setShowAddSection(true)}
          >
            <FaPlus />
            Thêm Section
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="da-todo-error" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Add Section Form */}
        {showAddSection && (
          <div className="da-add-section-form">
            <input
              type="text"
              className="da-add-section-input"
              placeholder="Nhập tên section (ví dụ: Hướng dẫn tránh sai lầm, Hành động gợi ý...)"
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
              autoFocus
            />
            <div className="da-add-section-actions">
              <button className="da-btn-confirm" onClick={handleAddSection}>
                Thêm
              </button>
              <button
                className="da-btn-cancel"
                onClick={() => {
                  setShowAddSection(false);
                  setNewSectionTitle("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Sections */}
        {todoList.sections.length === 0 ? (
          <div className="da-todo-empty">
            Chưa có section nào. Hãy tạo section đầu tiên!
          </div>
        ) : (
          todoList.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="da-todo-section">
              {/* Section Header */}
              <div className="da-section-header">
                <div
                  className="da-section-chevron"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  {section.isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {editingSection === sectionIndex ? (
                  <input
                    type="text"
                    className="da-section-title-input"
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
                    autoFocus
                  />
                ) : (
                  <h4
                    className="da-section-title"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingSection(sectionIndex);
                      setEditingSectionTitleValue(section.title);
                    }}
                  >
                    {section.title}
                  </h4>
                )}

                <div className="da-section-actions">
                  <button
                    className="da-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddItem({ ...showAddItem, [sectionIndex]: true });
                    }}
                    title="Thêm item"
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="da-icon-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(sectionIndex);
                    }}
                    title="Xóa section"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Section Items */}
              {section.isExpanded && (
                <div className="da-todo-items">
                  {/* Add Item Form */}
                  {showAddItem[sectionIndex] && (
                    <div className="da-add-item-form">
                      <input
                        type="text"
                        className="da-add-item-input"
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
                        autoFocus
                      />
                      <div className="da-add-section-actions">
                        <button className="da-btn-confirm" onClick={() => handleAddItem(sectionIndex)}>
                          Thêm
                        </button>
                        <button
                          className="da-btn-cancel"
                          onClick={() => {
                            setShowAddItem({ ...showAddItem, [sectionIndex]: false });
                            setNewItemText("");
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  {section.items.length === 0 ? (
                    <p className="da-todo-empty" style={{ padding: '20px 0', margin: 0 }}>
                      Chưa có công việc nào
                    </p>
                  ) : (
                    section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`da-todo-item ${item.completed ? 'completed' : ''}`}
                      >
                        <input
                          type="checkbox"
                          className="da-todo-checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleItem(sectionIndex, itemIndex)}
                        />

                        {editingItem?.sectionIndex === sectionIndex && editingItem?.itemIndex === itemIndex ? (
                          <input
                            type="text"
                            className="da-todo-item-input"
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
                            autoFocus
                          />
                        ) : (
                          <>
                            <span
                              className={`da-todo-item-text ${item.completed ? 'completed' : ''}`}
                              onClick={() => {
                                setEditingItem({
                                  sectionIndex,
                                  itemIndex,
                                  text: item.text
                                });
                              }}
                            >
                              {item.text}
                            </span>
                            <button
                              className="da-icon-btn delete da-item-delete"
                              onClick={() => handleDeleteItem(sectionIndex, itemIndex)}
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

      {/* Saving indicator */}
      {saving && (
        <div className="da-todo-saving">
          Đang lưu...
        </div>
      )}
    </div>
  );
});

export default TodoListComponent;

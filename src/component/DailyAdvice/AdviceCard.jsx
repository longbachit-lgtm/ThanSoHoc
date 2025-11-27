import { useState } from "react";
import { FaSun, FaBalanceScale, FaExclamationTriangle, FaCommentDots, FaLightbulb, FaList, FaCheckCircle, FaCircle } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../service/api";

export default function AdviceCard({ type, title, content, quickTip, challenge, opportunity, reminders, actions, period, targetDate, onSaveSuccess }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const handleTaskToggle = (index) => {
    setCompletedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    // Trigger onClick if provided
    if (actions[index]?.onClick) {
      actions[index].onClick();
    }
  };
  const getIcon = () => {
    switch (type) {
      case 'preparation':
        return <FaSun style={{ color: '#E8C78C', fontSize: '20px' }} />;
      case 'challenge':
        return <FaBalanceScale style={{ color: '#E8C78C', fontSize: '20px' }} />;
      case 'mistakes':
        return <FaExclamationTriangle style={{ color: '#E8C78C', fontSize: '20px' }} />;
      case 'motivation':
        return <FaCommentDots style={{ color: '#3498da', fontSize: '20px' }} />;
      default:
        return null;
    }
  };

  const handleSaveMistakesToTodo = async () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }

    if (!actions || actions.length === 0) {
      alert("Không có hành động nào để lưu!");
      return;
    }

    try {
      setSaving(true);

      // Get current todo list
      let todoList;
      try {
        if (period && period !== 'custom') {
          const response = await api.todo.getByPeriod(period, targetDate);
          todoList = response.data;
        } else {
          const response = await api.todo.getActive();
          todoList = response.data;
        }
      } catch (err) {
        console.error("Error getting todo list:", err);
        todoList = null;
      }

      // If no todo list exists, create one
      if (!todoList || !todoList._id) {
        const newTodoList = {
          title: "Danh sách việc cần làm",
          sections: [],
          period: period || 'custom',
          targetDate: targetDate ? (targetDate instanceof Date ? targetDate.toISOString() : targetDate) : null
        };
        const createResponse = await api.todo.create(newTodoList);
        todoList = createResponse.data;
      }

      // Create section for mistakes actions
      const sectionTitle = title || "Hướng dẫn tránh sai lầm";
      const items = actions.map((action, index) => ({
        text: action.label || action.text || `Hành động ${index + 1}`,
        completed: false,
        order: index
      }));

      // Check if section with same title already exists
      const existingSectionIndex = todoList.sections.findIndex(
        section => section.title === sectionTitle
      );

      if (existingSectionIndex !== -1) {
        // Update existing section - merge items (avoid duplicates)
        const existingSection = todoList.sections[existingSectionIndex];
        const existingTexts = new Set(existingSection.items.map(item => item.text));
        
        items.forEach(newItem => {
          if (!existingTexts.has(newItem.text)) {
            existingSection.items.push({
              ...newItem,
              order: existingSection.items.length
            });
          }
        });
        
        todoList.sections[existingSectionIndex] = existingSection;
      } else {
        // Add new section
        todoList.sections.push({
          title: sectionTitle,
          items: items,
          isExpanded: true,
          order: todoList.sections.length
        });
      }

      // Prepare data for update
      const updateData = {
        title: todoList.title,
        sections: todoList.sections,
        period: todoList.period,
        targetDate: todoList.targetDate ? (todoList.targetDate instanceof Date ? todoList.targetDate.toISOString() : todoList.targetDate) : null,
        isActive: todoList.isActive !== undefined ? todoList.isActive : true
      };

      // Save updated todo list
      await api.todo.update(todoList._id, updateData);
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      if (onSaveSuccess) {
        onSaveSuccess();
      }

      alert("Đã lưu vào danh sách việc cần làm thành công! 📝");
    } catch (error) {
      console.error("Save mistakes actions to todo error:", error);
      
      let errorMessage = "Có lỗi xảy ra khi lưu. Vui lòng thử lại!";
      
      if (error.message) {
        if (error.message.includes("Endpoint không tồn tại") || error.message.includes("404")) {
          errorMessage = "Backend chưa sẵn sàng. Vui lòng đảm bảo backend server đang chạy tại http://localhost:5000";
        } else if (error.message.includes("401") || error.message.includes("Unauthorized")) {
          errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!";
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleViewSaved = () => {
    const todoListElement = document.getElementById('todo-list-component');
    if (todoListElement) {
      todoListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      alert("Vui lòng cuộn xuống để xem danh sách việc cần làm!");
    }
  };

  return (
    <div 
      className="card border-0 shadow-sm mb-4"
      style={{
        backgroundColor: '#FCF8F0',
        borderRadius: '15px',
        border: '1px solid #E8C78C'
      }}
    >
      <div className="card-body p-4">
        {/* Title with Icon */}
        <div className="d-flex align-items-center gap-2 mb-3">
          {getIcon()}
          <h3 
            className="fw-bold mb-0"
            style={{
              color: '#332211',
              fontSize: '18px'
            }}
          >
            {title}
          </h3>
        </div>

        {/* Content */}
        {content && (
          <div className="mb-3">
            {Array.isArray(content) ? (
              <ul className="mb-0 ps-3" style={{ color: '#332211', fontSize: '15px', lineHeight: '1.6' }}>
                {content.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#332211', fontSize: '15px', lineHeight: '1.6', marginBottom: '0' }}>
                {content}
              </p>
            )}
          </div>
        )}

        {/* Quick Tip */}
        {quickTip && (
          <div 
            className="mb-3 p-3 rounded"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #E8C78C',
              borderLeft: '4px solid #E8C78C'
            }}
          >
            <div className="d-flex align-items-start gap-2">
              <FaLightbulb style={{ color: '#E8C78C', fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#A07A4A', fontSize: '14px' }}>Mẹo nhanh:</strong>
                <p className="mb-0 mt-1" style={{ color: '#332211', fontSize: '14px' }}>
                  "{quickTip}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Challenge & Opportunity */}
        {(challenge || opportunity) && (
          <div className="mb-3">
            {challenge && (
              <div className="mb-2">
                <strong style={{ color: '#A07A4A', fontSize: '14px' }}>Thách thức:</strong>
                <p className="mb-0 mt-1" style={{ color: '#332211', fontSize: '14px' }}>
                  {challenge}
                </p>
              </div>
            )}
            {opportunity && (
              <div>
                <strong style={{ color: '#A07A4A', fontSize: '14px' }}>Cơ hội:</strong>
                <p className="mb-0 mt-1" style={{ color: '#332211', fontSize: '14px' }}>
                  {opportunity}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Tasks */}
        {actions && actions.length > 0 && (
          <div className="mt-4">
            <div className="d-flex flex-column gap-2 mb-4">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-3 p-3 rounded"
                  style={{
                    backgroundColor: '#fff',
                    border: '1.5px solid #E8C78C',
                    borderRadius: '12px',
                    cursor: 'default',
                    position: 'relative',
                    minHeight: '56px',
                    boxShadow: '0 2px 8px rgba(232, 199, 140, 0.15)'
                  }}
                >
                  {/* No Checkbox */}
                  {/* Task Text */}
                  <div className="flex-grow-1">
                    <span
                      style={{
                        color: '#332211',
                        fontSize: '15px',
                        fontWeight: 500,
                        textDecoration: 'none',
                        lineHeight: '1.5'
                      }}
                    >
                      {action.label}
                    </span>
                  </div>

                  {/* Decorative indicator */}
                  {action.primary && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#A07A4A',
                        boxShadow: '0 0 8px rgba(160, 122, 74, 0.5)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Save to TODO List button (only for mistakes type) */}
            {type === 'mistakes' && (
              <div className="d-flex gap-2 flex-wrap">
                <button
                  onClick={handleSaveMistakesToTodo}
                  disabled={saving || saved}
                  className="btn border-0 rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: saved ? '#28a745' : saving ? '#d6c0a1' : '#332211',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Đang lưu...
                    </>
                  ) : saved ? (
                    <>
                      <FaCheckCircle />
                      Đã lưu!
                    </>
                  ) : (
                    <>
                      <FaList />
                      Lưu vào TODO List
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}


 
      </div>
    </div>
  );
}


import { useState } from "react";
import { FaCheckCircle, FaList } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../service/api";

export default function SuggestedActionsCard({ 
  title, 
  actions, 
  period, 
  targetDate,
  onSaveSuccess 
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleSaveToTodo = async () => {
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
        // If error, create new one
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

      // Create section for suggested actions
      const sectionTitle = title || "Hành động gợi ý";
      const items = actions.map((action, index) => ({
        text: `${action.time}: ${action.text}`,
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

      // Prepare data for update (only send what we need)
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
      console.error("Save suggested actions to todo error:", error);
      console.error("Error details:", error);
      
      // More detailed error message
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
    // Scroll to TODO LIST component
    const todoListElement = document.getElementById('todo-list-component');
    if (todoListElement) {
      todoListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      alert("Vui lòng cuộn xuống để xem danh sách việc cần làm!");
    }
  };

  if (!actions || actions.length === 0) {
    return null;
  }

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
        {/* Title */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <FaList style={{ color: '#E8C78C', fontSize: '20px' }} />
          <h3 
            className="fw-bold mb-0"
            style={{
              color: '#332211',
              fontSize: '18px'
            }}
          >
            {title || "Hành động gợi ý"}
          </h3>
        </div>

        {/* Actions List */}
        <div className="mb-3">
          {actions.map((action, index) => (
            <div 
              key={index}
              className="d-flex align-items-start gap-3 mb-2"
              style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #E8C78C'
              }}
            >
              {/* Number Badge */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#A07A4A',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  marginTop: '2px',
                  boxShadow: '0 2px 6px rgba(160, 122, 74, 0.3)'
                }}
              >
                {index + 1}
              </div>
              <div className="flex-grow-1">
                <strong style={{ color: '#A07A4A', fontSize: '14px' }}>
                  {action.time}:
                </strong>
                <span style={{ color: '#332211', fontSize: '14px', marginLeft: '8px' }}>
                  {action.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 flex-wrap">
          <button
            onClick={handleSaveToTodo}
            disabled={saving || saved}
            className="btn border-0 rounded-pill px-4 py-2 d-flex align-items-center gap-2"
            style={{
              backgroundColor: saved ? '#28a745' : saving ? '#d6c0a1' : '#332211',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!saving && !saved) {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!saving && !saved) {
                e.currentTarget.style.backgroundColor = '#332211';
                e.currentTarget.style.transform = 'translateY(0)';
              }
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
                Lưu 3 việc cần khép lại
              </>
            )}
          </button>
    
        </div>
      </div>
    </div>
  );
}


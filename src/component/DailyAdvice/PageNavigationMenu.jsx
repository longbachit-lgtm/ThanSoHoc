import { useNavigate, useLocation } from "react-router-dom";

export default function PageNavigationMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDailyAdvice = location.pathname === '/daily-advice';
  const isTodoList = location.pathname === '/todo-list';

  return (
    <div className="mb-4">
      {/* Decorative dots */}
      <div className="text-center mb-2">
        <div className="d-flex justify-content-center gap-1">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="rounded-circle"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#E8C78C',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        <button
          onClick={() => navigate('/daily-advice')}
          className="btn border-0 rounded-pill px-4 py-2"
          style={{
            backgroundColor: isDailyAdvice ? '#A07A4A' : '#FCF8F0',
            color: isDailyAdvice ? '#fff' : '#332211',
            fontSize: '14px',
            fontWeight: isDailyAdvice ? 'bold' : 'normal',
            border: isDailyAdvice ? 'none' : '1px solid #E8C78C',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
        >
          Lời khuyên hôm nay
        </button>
        <button
          onClick={() => navigate('/todo-list')}
          className="btn border-0 rounded-pill px-4 py-2"
          style={{
            backgroundColor: isTodoList ? '#A07A4A' : '#FCF8F0',
            color: isTodoList ? '#fff' : '#332211',
            fontSize: '14px',
            fontWeight: isTodoList ? 'bold' : 'normal',
            border: isTodoList ? 'none' : '1px solid #E8C78C',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
        >
          📝 TODOLIST
        </button>
      </div>

      {/* Decorative dots */}
      <div className="text-center mt-2">
        <div className="d-flex justify-content-center gap-1">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="rounded-circle"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: '#E8C78C',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


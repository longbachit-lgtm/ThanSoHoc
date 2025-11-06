import { FaSun, FaBalanceScale, FaExclamationTriangle, FaCommentDots, FaLightbulb } from "react-icons/fa";

export default function AdviceCard({ type, title, content, quickTip, challenge, opportunity, reminders, actions }) {
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

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="d-flex gap-2 flex-wrap mt-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="btn border-0 rounded-pill px-3 py-2"
                style={{
                  backgroundColor: action.primary ? '#A07A4A' : '#f8f9fa',
                  color: action.primary ? '#fff' : '#332211',
                  fontSize: '14px',
                  fontWeight: action.primary ? 'bold' : 'normal',
                  border: action.primary ? 'none' : '1px solid #dee2e6'
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Reminder Buttons */}
        {reminders && reminders.length > 0 && (
          <div className="d-flex gap-2 flex-wrap mt-3">
            {reminders.map((reminder, index) => (
              <button
                key={index}
                onClick={reminder.onClick}
                className="btn border-0 rounded-pill px-3 py-2"
                style={{
                  backgroundColor: '#f8f9fa',
                  color: '#332211',
                  fontSize: '14px',
                  border: '1px solid #dee2e6'
                }}
              >
                {reminder.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


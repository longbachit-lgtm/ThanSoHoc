import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function UserNumerologyHeader() {
  const navigate = useNavigate();
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const fullName = useSelector((state) => state.numberName.full_name_list);
  const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);
  const soulNumber = useSelector((state) => state.numberName.soul);
  const expressNumber = useSelector((state) => state.numberName.express);
  const destinyNumber = useSelector((state) => state.numberName.destiny);

  // Prioritize Redux store, use localStorage only as fallback
  const userFullName = fullName || localStorage.getItem('userFullName') || 'Người dùng';
  const userBirthDate = localStorage.getItem('userBirthDate');
  
  let displayBirthDate = birthDayList;
  // Only use localStorage as fallback if Redux store is empty
  if (!displayBirthDate && userBirthDate) {
    try {
      const birthData = JSON.parse(userBirthDate);
      displayBirthDate = `${birthData.day}-${birthData.month}-${birthData.year}`;
    } catch (e) {
      displayBirthDate = '';
    }
  }

  return (
    <div className="text-center mb-4 position-relative">
      {/* Star icon top right */}
      <FaStar 
        className="position-absolute"
        style={{
          top: '0',
          right: '0',
          fontSize: '24px',
          color: '#E8C78C'
        }}
      />

      {/* Avatar/Tarot card circle */}
      <div 
        className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#FCF8F0',
          border: '3px solid #E8C78C',
          boxShadow: '0 4px 12px rgba(232, 199, 140, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => navigate('/numerology-detail')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(232, 199, 140, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 199, 140, 0.2)';
        }}
      >
        <div 
          className="text-center"
          style={{
            fontSize: '48px',
            color: '#A07A4A'
          }}
        >
          {mainNumber || '?'}
        </div>
      </div>

      {/* Life Path Badge */}
      <div 
        className="mx-auto mb-3 rounded-pill px-4 py-2 d-inline-block"
        style={{
          backgroundColor: '#fff',
          border: '2px solid #E8C78C',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#A07A4A'
        }}
      >
        Đường đời  {mainNumber || '?'}
      </div>

      {/* Name */}
      <h2 
        className="fw-bold mb-2"
        style={{
          color: '#332211',
          fontSize: '1.8rem'
        }}
      >
        {userFullName}
      </h2>

      {/* Birth Date */}
      <p 
        className="mb-4"
        style={{
          color: '#332211',
          fontSize: '1rem',
          opacity: 0.8
        }}
      >
        {displayBirthDate || 'Chưa có thông tin'}
      </p>

      {/* Numerology Numbers */}
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <div 
          className="rounded-pill px-3 py-2"
          style={{
            backgroundColor: '#fff',
            border: '2px solid #E8C78C',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#A07A4A',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/numerology-detail')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FCF8F0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Linh hồn: {soulNumber || '?'}
        </div>
        <div 
          className="rounded-pill px-3 py-2"
          style={{
            backgroundColor: '#fff',
            border: '2px solid #E8C78C',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#A07A4A',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/numerology-detail')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FCF8F0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Nhân cách: {expressNumber || '?'}
        </div>
        <div 
          className="rounded-pill px-3 py-2"
          style={{
            backgroundColor: '#fff',
            border: '2px solid #E8C78C',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#A07A4A',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/numerology-detail')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FCF8F0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Sứ mệnh: {destinyNumber || '?'}
        </div>
      </div>
    </div>
  );
}



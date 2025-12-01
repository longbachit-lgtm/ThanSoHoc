import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { numberKarmaActions } from "../../store/numberKarma";
import { numberNameActions } from "../../store/numberName";

export default function UserNumerologyHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useAuthStore((state) => state.logout);
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

  // Check if we have data (either from Redux or localStorage)
  const hasData = fullName || birthDayList || localStorage.getItem('userFullName') || localStorage.getItem('userBirthDate');
  
  // Display numbers only if we have data, otherwise show '?'
  const displayMainNumber = hasData && mainNumber ? mainNumber : '?';
  const displaySoulNumber = hasData && soulNumber ? soulNumber : '?';
  const displayExpressNumber = hasData && expressNumber ? expressNumber : '?';
  const displayDestinyNumber = hasData && destinyNumber ? destinyNumber : '?';

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất? Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng.')) {
      // Step 1: Clear all localStorage data FIRST
      localStorage.removeItem('auth');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('userBirthDate');
      
      // Step 2: Logout from auth store (clears Zustand state)
      logout();
      
      // Step 3: Clear Redux store - reset to initial state
      dispatch(numberKarmaActions.resetNumberKarma());
      dispatch(numberNameActions.resetNumberName());
      
      // Step 4: Force reload to login page to ensure everything is cleared
      // Use window.location.replace to prevent back button navigation
      window.location.replace('/login');
    }
  };

  return (
    <div className="text-center mb-4 position-relative">
      {/* Star icon top left */}
      <FaStar 
        className="position-absolute"
        style={{
          top: '0',
          left: '0',
          fontSize: '24px',
          color: '#E8C78C'
        }}
      />

      {/* Logout button top right */}
      <div
        className="position-absolute"
        style={{
          top: '0',
          right: '0',
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(135deg, #fff 0%, #FCF8F0 100%)',
            border: '2px solid #E8C78C',
            borderRadius: '50px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#A07A4A',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(232, 199, 140, 0.2)',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #E8C78C 0%, #B8860B 100%)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 199, 140, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #fff 0%, #FCF8F0 100%)';
            e.currentTarget.style.color = '#A07A4A';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 199, 140, 0.2)';
          }}
          title="Đăng xuất"
        >
          <FaSignOutAlt style={{ fontSize: '16px' }} />
          <span className="d-none d-sm-inline">Đăng xuất</span>
        </button>
      </div>

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
          {displayMainNumber}
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
        Đường đời  {displayMainNumber}
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
          Linh hồn: {displaySoulNumber}
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
          Nhân cách: {displayExpressNumber}
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
          Sứ mệnh: {displayDestinyNumber}
        </div>
      </div>
    </div>
  );
}



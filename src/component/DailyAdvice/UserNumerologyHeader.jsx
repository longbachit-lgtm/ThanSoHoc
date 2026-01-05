import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import { numberKarmaActions } from "../../store/numberKarma";
import { numberNameActions } from "../../store/numberName";
import "../../Pages/DailyAdvicePage.css"; // Ensure CSS is applied

export default function UserNumerologyHeader({ onLogout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = useAuthStore((state) => state.logout);
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const fullName = useSelector((state) => state.numberName.full_name_list);
  const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);

  // Numbers
  const soulNumber = useSelector((state) => state.numberName.soul);
  const expressNumber = useSelector((state) => state.numberName.express);
  const destinyNumber = useSelector((state) => state.numberName.destiny);

  // Fallbacks
  const userFullName = fullName || localStorage.getItem('userFullName') || 'Người dùng';
  const displayMainNumber = mainNumber || '?';

  // Birthdate formatting
  let displayBirthDate = birthDayList;
  if (!displayBirthDate) {
    const userBirthDate = localStorage.getItem('userBirthDate');
    if (userBirthDate) {
      try {
        const bd = JSON.parse(userBirthDate);
        displayBirthDate = `${bd.day}/${bd.month}/${bd.year}`;
      } catch (e) {
        displayBirthDate = '';
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('auth');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('userBirthDate');
      logout();
      dispatch(numberKarmaActions.resetNumberKarma());
      dispatch(numberNameActions.resetNumberName());
      window.location.replace('/login');
    }
  };

  return (
    <div className="da-header">
      {/* Logout Absolute Button */}
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: 'transparent',
          border: '1px solid #E8C78C',
          borderRadius: '20px',
          padding: '4px 12px',
          fontSize: '11px',
          color: '#A07A4A',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <FaSignOutAlt /> Đăng xuất
      </button>

      {/* 1. Life Path Pill */}
      {/* <div className="da-life-path-pill">
        Đường đời {displayMainNumber}
      </div> */}

      {/* 2. Main Circle */}
      <div
        className="da-avatar-circle"
        onClick={() => navigate('/numerology-detail')}
        style={{ cursor: 'pointer' }}
      >
        {displayMainNumber}
      </div>

      {/* 3. Name & DOB */}
      <div className="da-user-info">
        <h2 className="da-user-name">{userFullName}</h2>
        <div className="da-user-dob">{displayBirthDate || 'dd/mm/yyyy'}</div>
      </div>

      {/* 4. Badges (Soul, Express, Destiny) */}
      {/* <div className="da-badges">
        <div className="da-badge" onClick={() => navigate('/numerology-detail')}>
          Linh hồn: <strong>{soulNumber || '?'}</strong>
        </div>
        <div className="da-badge" onClick={() => navigate('/numerology-detail')}>
          Nhân cách: <strong>{expressNumber || '?'}</strong>
        </div>
        <div className="da-badge" onClick={() => navigate('/numerology-detail')}>
          Sứ mệnh: <strong>{destinyNumber || '?'}</strong>
        </div>
      </div> */}
    </div>
  );
}



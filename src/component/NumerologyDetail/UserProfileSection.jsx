import { useSelector } from "react-redux";
import { calculateAge, getZodiacSign, getChineseZodiac, getLunarDate } from "../../service/astrology";

export default function UserProfileSection() {
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const fullName = useSelector((state) => state.numberName.full_name_list);
  const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);

  // Get from localStorage as fallback
  const userFullName = localStorage.getItem('userFullName') || fullName || 'Người dùng';
  const userBirthDate = localStorage.getItem('userBirthDate');
  
  let day, month, year;
  let displayBirthDate = birthDayList;
  
  // Parse birth date
  if (birthDay) {
    const birthStr = birthDay.toString();
    if (birthStr.length === 8) {
      day = parseInt(birthStr.substring(0, 2));
      month = parseInt(birthStr.substring(2, 4));
      year = parseInt(birthStr.substring(4, 8));
    }
  }
  
  if (!day || !month || !year) {
    if (userBirthDate) {
      try {
        const birthData = JSON.parse(userBirthDate);
        day = birthData.day;
        month = birthData.month;
        year = birthData.year;
        displayBirthDate = `${day}-${month}-${year}`;
      } catch (e) {
        console.error('Error parsing birth date:', e);
      }
    }
  } else {
    displayBirthDate = `${day}-${month}-${year}`;
  }

  // Calculate additional info
  let ageInfo = null;
  let zodiacSign = null;
  let chineseZodiac = null;
  let lunarDate = null;

  if (day && month && year) {
    ageInfo = calculateAge(day, month, year);
    zodiacSign = getZodiacSign(day, month);
    chineseZodiac = getChineseZodiac(year);
    lunarDate = getLunarDate(day, month, year);
  }

  // Get first name for display
  const firstName = userFullName.split(' ').pop() || userFullName;

  return (
    <div className="mb-4">
      <div className="row align-items-center">
        {/* Left: Avatar */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <div 
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center position-relative"
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#FCF8F0',
              border: '3px solid #E8C78C',
              boxShadow: '0 4px 12px rgba(232, 199, 140, 0.2)'
            }}
          >
            <div 
              className="text-center"
              style={{
                fontSize: '64px',
                color: '#A07A4A',
                fontWeight: 'bold'
              }}
            >
              {mainNumber || '?'}
            </div>
            
            {/* Life Path Badge */}
            <div 
              className="position-absolute rounded-pill px-3 py-2"
              style={{
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff',
                border: '2px solid #E8C78C',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#A07A4A',
                whiteSpace: 'nowrap'
              }}
            >
              Đường đời {mainNumber || '?'}
            </div>
          </div>
        </div>

        {/* Right: Personal Info */}
        <div className="col-12 col-md-8">
          <div className="ps-md-4">
            {ageInfo && (
              <p className="mb-2" style={{ color: '#332211', fontSize: '15px' }}>
                <strong>{firstName}</strong> được {ageInfo.years} tuổi {ageInfo.months} tháng {ageInfo.days} ngày
              </p>
            )}
            
            {zodiacSign && (
              <p className="mb-2" style={{ color: '#332211', fontSize: '15px' }}>
                Cung Hoàng Đạo của Bạn là: <strong>{zodiacSign}</strong>
              </p>
            )}
            
            {lunarDate && (
              <p className="mb-2" style={{ color: '#332211', fontSize: '15px' }}>
                Ngày sinh Âm lịch của Bạn là: <strong>{lunarDate}</strong>
              </p>
            )}
            
            {chineseZodiac && (
              <p className="mb-0" style={{ color: '#332211', fontSize: '15px' }}>
                Năm con giáp của Bạn là: <strong>{chineseZodiac}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


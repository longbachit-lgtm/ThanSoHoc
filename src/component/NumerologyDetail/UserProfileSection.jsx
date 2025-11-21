import { useSelector } from "react-redux";
import { calculateAge, getZodiacSign, getChineseZodiac, getLunarDate } from "../../service/astrology";

/**
 * Lấy emoji tương ứng với con giáp
 */
const getZodiacEmoji = (chineseZodiac) => {
  if (!chineseZodiac) return "🐉";
  
  // Lấy phần con giáp (sau dấu cách)
  const zodiacName = chineseZodiac.split(' ')[1] || chineseZodiac;
  
  const zodiacEmojiMap = {
    "Tý": "🐭",      // Chuột (nghiêm túc hơn)
    "Sửu": "🐃",     // Trâu nước (nghiêm túc hơn)
    "Dần": "🐯",     // Mặt hổ (uy nghi hơn)
    "Mão": "🐱",     // Mèo (nghiêm túc hơn thỏ)
    "Thìn": "🐉",    // Rồng (giữ nguyên)
    "Tỵ": "🐍",      // Rắn (giữ nguyên)
    "Ngọ": "🐴",     // Ngựa (giữ nguyên)
    "Mùi": "🐐",     // Dê (nghiêm túc hơn cừu)
    "Thân": "🐒",    // Khỉ (nghiêm túc hơn)
    "Dậu": "🐓",     // Gà (giữ nguyên)
    "Tuất": "🐕",    // Chó (giữ nguyên)
    "Hợi": "🐷"      // Lợn rừng (nghiêm túc hơn)
  };
  
  return zodiacEmojiMap[zodiacName] || "🐉";
};

/**
 * Lấy biểu tượng cung hoàng đạo tương ứng
 */
const getZodiacSignSymbol = (zodiacSign) => {
  if (!zodiacSign) return "♈";
  
  const zodiacSignMap = {
    "Bạch Dương": "♈",    // Aries
    "Kim Ngưu": "♉",      // Taurus
    "Song Tử": "♊",       // Gemini
    "Cự Giải": "♋",       // Cancer
    "Sư Tử": "♌",         // Leo
    "Xử Nữ": "♍",          // Virgo
    "Thiên Bình": "♎",     // Libra
    "Thần Nông": "♏",      // Scorpio
    "Nhân Mã": "♐",        // Sagittarius
    "Ma Kết": "♑",         // Capricorn
    "Bảo Bình": "♒",       // Aquarius
    "Song Ngư": "♓"        // Pisces
  };
  
  return zodiacSignMap[zodiacSign] || "♈";
};

export default function UserProfileSection() {
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const fullName = useSelector((state) => state.numberName.full_name_list);
  const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);

  // Prioritize Redux store, use localStorage only as fallback
  const userFullName = fullName || localStorage.getItem('userFullName') || 'Người dùng';
  const userBirthDate = localStorage.getItem('userBirthDate');
  
  let day, month, year;
  let displayBirthDate = birthDayList;
  
  // Parse birth date - prioritize Redux store
  if (birthDay) {
    const birthStr = birthDay.toString();
    if (birthStr.length === 8) {
      day = parseInt(birthStr.substring(0, 2));
      month = parseInt(birthStr.substring(2, 4));
      year = parseInt(birthStr.substring(4, 8));
      displayBirthDate = birthDayList || `${day}-${month}-${year}`;
    }
  }
  
  // Only use localStorage as fallback if Redux store is empty
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
    <div>
      <div className="row align-items-center">
        {/* Left: Enhanced Avatar with gradient */}
        <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
          <div 
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center position-relative"
            style={{
              width: '160px',
              height: '160px',
              background: 'linear-gradient(135deg, #FCF8F0 0%, #FFF5E8 100%)',
              border: '4px solid transparent',
              backgroundClip: 'padding-box',
              boxShadow: '0 8px 24px rgba(232, 199, 140, 0.3), inset 0 2px 8px rgba(232, 199, 140, 0.1)',
              position: 'relative'
            }}
          >
            {/* Outer ring gradient */}
            <div 
              className="position-absolute rounded-circle"
              style={{
                inset: '-4px',
                background: 'linear-gradient(135deg, #E8C78C 0%, #B8860B 50%, #E8C78C 100%)',
                borderRadius: '50%',
                zIndex: -1
              }}
            />
            
            {/* Inner glow effect */}
            <div 
              className="position-absolute rounded-circle"
              style={{
                inset: '10px',
                background: 'radial-gradient(circle, rgba(232, 199, 140, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
            
            <div 
              className="text-center position-relative"
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #B8860B 0%, #E8C78C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                zIndex: 1,
                textShadow: '0 2px 10px rgba(184, 134, 11, 0.2)'
              }}
            >
              {mainNumber || '?'}
            </div>
            
            {/* Enhanced Life Path Badge */}
            <div 
              className="position-absolute rounded-pill px-4 py-2"
              style={{
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #B8860B 0%, #A07A4A 100%)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                fontSize: '13px',
                fontWeight: '700',
                color: '#fff',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)',
                letterSpacing: '0.5px'
              }}
            >
              ✨ Đường đời {mainNumber || '?'}
            </div>
          </div>
          
          {/* Add pulse animation */}
          <style>
            {`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
            `}
          </style>
        </div>

        {/* Right: Enhanced Personal Info */}
        <div className="col-12 col-md-8">
          <div className="ps-md-4">
            {/* Name display */}
            <div className="mb-4">
              <h4 
                className="mb-1"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #B8860B 0%, #332211 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {userFullName}
              </h4>
              {ageInfo && (
                <p 
                  className="mb-0"
                  style={{ 
                    color: '#6e645b', 
                    fontSize: '0.95rem',
                    fontStyle: 'italic'
                  }}
                >
                  🎂 {ageInfo.years} tuổi {ageInfo.months} tháng {ageInfo.days} ngày
                </p>
              )}
            </div>
            
            {/* Info cards grid */}
            <div className="row g-3">
              {zodiacSign && (
                <div className="col-12 col-sm-6">
                  <div 
                    className="p-3 rounded-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(232, 199, 140, 0.15) 0%, rgba(255, 255, 255, 0.8) 100%)',
                      border: '1px solid rgba(232, 199, 140, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '24px' }}>{getZodiacSignSymbol(zodiacSign)}</span>
                      <div>
                        <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6e645b' }}>
                          Cung Hoàng Đạo
                        </p>
                        <p 
                          className="mb-0 fw-bold"
                          style={{ 
                            fontSize: '1rem', 
                            color: '#332211' 
                          }}
                        >
                          {zodiacSign}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {chineseZodiac && (
                <div className="col-12 col-sm-6">
                  <div 
                    className="p-3 rounded-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.15) 0%, rgba(255, 255, 255, 0.8) 100%)',
                      border: '1px solid rgba(184, 134, 11, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '24px' }}>{getZodiacEmoji(chineseZodiac)}</span>
                      <div>
                        <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6e645b' }}>
                          Năm Con Giáp
                        </p>
                        <p 
                          className="mb-0 fw-bold"
                          style={{ 
                            fontSize: '1rem', 
                            color: '#332211' 
                          }}
                        >
                          {chineseZodiac}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {lunarDate && (
                <div className="col-12">
                  <div 
                    className="p-3 rounded-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(232, 199, 140, 0.1) 0%, rgba(184, 134, 11, 0.05) 50%, rgba(255, 255, 255, 0.8) 100%)',
                      border: '1px solid rgba(232, 199, 140, 0.25)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '24px' }}>🌙</span>
                      <div>
                        <p className="mb-0" style={{ fontSize: '0.75rem', color: '#6e645b' }}>
                          Ngày Sinh 
                        </p>
                        <p 
                          className="mb-0 fw-bold"
                          style={{ 
                            fontSize: '1rem', 
                            color: '#332211' 
                          }}
                        >
                          {lunarDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useMemo } from "react";
import { useSelector } from "react-redux";
import tomtat from "../../assets/img/tomtat.png";
import {
  STRONG_NUMB,
  WEAK_NUMB,
  ARROW,
  NUMEROLOGY_LIFE_PATH,
  NUMEROLOGY_SOUL_NUMBER,
  NUMERLOGY_COMMON,
  NUMERLOGY_JOB,
  SOLUTION_NUMB,
} from "../../Data/numerology";
import parse from "html-react-parser";
import "./SummaryAll.css";

function SummaryAll() {
  const strongNumb = useSelector((state) => state.numberKarmaMain.strong_list);
  const weakNumb = useSelector((state) => state.numberKarmaMain.weak_list);
  const arrow = useSelector((state) => state.numberKarmaMain.arrow);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);

  const newStrongNumb = useMemo(() => {
    return strongNumb
      .map((numb) => (STRONG_NUMB[numb] ? STRONG_NUMB[numb] : null))
      .reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});
  }, [strongNumb]);

  const groups = useMemo(() => {
    const keys = Object.keys(newStrongNumb);
    const totalItems = keys.length;
    const groupCount = 3;
    const baseSize = Math.floor(totalItems / groupCount);
    const remainder = totalItems % groupCount;

    const result = [];
    let start = 0;

    for (let i = 0; i < groupCount; i++) {
      const size = baseSize + (i < remainder ? 1 : 0);
      result.push(keys.slice(start, start + size));
      start += size;
    }
    return result;
  }, [newStrongNumb]);

  if (!strongNumb || strongNumb.length === 0) {
    return (
      <div 
        id="summary_all" 
        className="summary-all"
        style={{
          background: "#FDFBF6",
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(232, 199, 140, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(232, 199, 140, 0.05) 0%, transparent 50%)
          `
        }}
      >
        <div className="summary-all__container position-relative">
          <div className="summary-all__empty">
            <div className="summary-all__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu tóm tắt</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống tạo bản tóm tắt về bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="summary_all" 
      className="summary-all"
      style={{
        background: "#FDFBF6",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(232, 199, 140, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(232, 199, 140, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none', top: 0, left: 0, zIndex: 0 }}>
        {/* Stars and constellations */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: '#E8C78C',
              borderRadius: '50%',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
      <div className="summary-all__container position-relative" style={{ zIndex: 1 }}>
        <div className="summary-all__header">
          <h1 className="summary-all__title">
            <span className="summary-all__title-career">
              Xu hướng nghề nghiệp
            </span>{" "}
            và <span className="summary-all__title-summary">Tóm tắt</span> về
            bạn
          </h1>
          <div className="summary-all__image-wrapper">
            <img
              className="summary-all__image"
              src={tomtat}
              alt="Tóm tắt về bạn"
            />
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title" style={{ marginBottom: '12px' }}>
            💪 ĐIỂM MẠNH CỦA BẠN
          </h4>
          <p style={{ 
            color: '#6e645b', 
            fontSize: '14px', 
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn
          </p>
          <div className="summary-all__content">
            {groups.map((group, index) => (
              <div key={index}>
                {group.map((key, subIndex) => (
                  <div 
                    key={subIndex}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #e5e5e5',
                      marginBottom: '16px',
                      color: '#332211',
                      fontSize: '14px',
                      lineHeight: '1.7'
                    }}
                  >
                    {parse(newStrongNumb[key])}
                  </div>
                ))}
                {index < groups.length - 1 && (
                  <div 
                    style={{
                      margin: '24px 0',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(232, 199, 140, 0.3), transparent)'
                    }}
                  />
                )}
              </div>
            ))}
            {arrow.length > 0 &&
              arrow.map((arr, iAr) => (
                <div 
                  key={`arrow${iAr}`}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e5e5e5',
                    marginTop: '16px',
                    color: '#332211',
                    fontSize: '14px',
                    lineHeight: '1.7'
                  }}
                >
                  {ARROW[arr]?.[1]?.KET_LUAN &&
                    parse(ARROW[arr][1].KET_LUAN)}
                </div>
              ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title" style={{ marginBottom: '12px' }}>
            ⚠️ ĐIỂM YẾU CỦA BẠN
          </h4>
          <p style={{ 
            color: '#6e645b', 
            fontSize: '14px', 
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  marginBottom: '16px',
                  color: '#332211',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#A07A4A';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(160, 122, 74, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {WEAK_NUMB[numb]?.noidung && parse(WEAK_NUMB[numb].noidung)}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title" style={{ marginBottom: '12px' }}>
            🎯 ĐỘNG LỰC THỎA MÃN
          </h4>
          <p style={{ 
            color: '#6e645b', 
            fontSize: '14px', 
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            Là khao khát nội tâm, mong muốn, sứ mệnh
          </p>
          <div className="summary-all__content">
            {NUMEROLOGY_LIFE_PATH[numberDestiny]?.tomtat && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  marginBottom: '16px',
                  color: '#332211',
                  fontSize: '14px',
                  lineHeight: '1.7'
                }}
              >
                {parse(NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat)}
              </div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberSoul]?.tomtat && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  marginBottom: '16px',
                  color: '#332211',
                  fontSize: '14px',
                  lineHeight: '1.7'
                }}
              >
                {parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat)}
              </div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberKarma]?.tomtat && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  marginBottom: '16px',
                  color: '#332211',
                  fontSize: '14px',
                  lineHeight: '1.7'
                }}
              >
                {parse(NUMEROLOGY_SOUL_NUMBER[numberKarma].tomtat)}
              </div>
            )}
          </div>
        </div>

        <div className="summary-all__section">
          <div style={{ marginBottom: '24px' }}>
            <h4 className="summary-all__section-title" style={{ marginBottom: '12px' }}>
              💼 XU HƯỚNG NGHỀ NGHIỆP
            </h4>
            <p style={{ 
              color: '#6e645b', 
              fontSize: '14px', 
              lineHeight: '1.7', 
              marginBottom: 0,
              padding: '12px 16px',
              backgroundColor: '#faf9f7',
              borderRadius: '8px'
            }}>
              Đây là gợi ý xu hướng nghề nghiệp dựa trên năng lượng thuần trong
              bộ số của Bạn, trong thực tế để chọn được nghề nghiệp phù hợp Bạn
              cần xét thêm những yếu tố khác như: Nguồn lực (tài năng thực tế) và
              lợi thế cạnh tranh (mối quan hệ, truyền thống, gia đình, tài chính,
              nơi ở ..vv) của Bạn để Bạn lựa chọn được nghề nghiệp phù hợp nhất.
            </p>
          </div>
          <div className="summary-all__career-grid">
            {strongNumb.map((numb, index) =>
              NUMERLOGY_JOB[numb]?.noidung ? (
                <div 
                  key={index} 
                  className="summary-all__career-item-modern"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#A07A4A';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(160, 122, 74, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '12px'
                  }}>
                    <div style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: '#A07A4A',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1, color: '#332211', fontSize: '14px', lineHeight: '1.7' }}>
                      {parse(NUMERLOGY_JOB[numb].noidung)}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="summary-all__section">
          <h4 className="summary-all__section-title" style={{ marginBottom: '12px' }}>
            🛠️ LỜI KHUYÊN VÀ CÁCH PHÁT TRIỂN
          </h4>
          <p style={{ 
            color: '#6e645b', 
            fontSize: '14px', 
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            Là những đề xuất phát triển giúp bạn trở nên hoàn thiện hơn
          </p>
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e5e5',
                  marginBottom: '16px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#A07A4A';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(160, 122, 74, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px'
                }}>
                  <div style={{
                    flexShrink: 0,
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: '#f0f0f0',
                    color: '#A07A4A',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e5e5e5'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1, color: '#332211', fontSize: '14px', lineHeight: '1.7' }}>
                    {SOLUTION_NUMB[numb]?.noidung &&
                      parse(SOLUTION_NUMB[numb].noidung)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            style={{
              marginTop: '32px',
              padding: '18px 20px',
              backgroundColor: '#fff5e6',
              borderRadius: '12px',
              border: '1px solid #ffe0b3',
              borderLeft: '4px solid #ff9800'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '10px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <strong style={{ color: '#e65100', fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  LƯU Ý
                </strong>
                <p style={{ marginBottom: 0, color: '#5c5145', fontSize: '14px', lineHeight: '1.6' }}>
                  Những nghề nêu trên không phải bạn không làm được mà bạn cần phải nỗ lực nhiều hơn để bù đắp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;

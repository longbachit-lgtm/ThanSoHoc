import { useMemo } from "react";
import { useSelector } from "react-redux";
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
import "./MainNumber.css";

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
          background: "transparent",
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
        background: "transparent",
        marginTop: "3rem",
        minHeight: "auto",
        padding: "2rem 0",
      }}
    >
      {/* Background astrological elements */}

      <div
        className="summary-all__container position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="summary-all__header">
          <h1 className="summary-all__title">
            <span className="summary-all__title-career">
              Xu hướng nghề nghiệp
            </span>{" "}
            và <span className="summary-all__title-summary">Tóm tắt</span> về
            bạn
          </h1>
          <section
            className="main-number__hero"
            style={{
              minHeight: "unset",
              height: "auto",
              padding: "2rem 2rem 1.5rem",
              boxShadow: "0 8px 28px rgba(184,134,11,0.13)",
              margin: "40px 0 0 0",
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="main-number__hero-overlay"
              style={{
                borderRadius: 24,
                opacity: 1,
              }}
            />
            <div
              className="main-number__hero-content"
              style={{
                maxWidth: 540,
                color: "#fff6e2",
                gap: "1rem",
                textAlign: "center",
                margin: "0 auto",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                position: "relative",
              }}
            >
              <div
                className="main-number__value-wrapper"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-16px",
                  marginBottom: "6px",
                }}
              >
                <span
                  className="main-number__value"
                  style={{
                    fontSize: "3.4rem",
                    fontWeight: 800,
                    color: "#fffff7",
                    textShadow: "0 5px 18px #885d168a, 0 2px 4px #fff9eb71",
                    letterSpacing: "1.8px",
                  }}
                >
                  📋
                </span>
              </div>
              <p
                className="main-number__subtitle"
                style={{
                  fontSize: "1.11rem",
                  lineHeight: 1.55,
                  margin: 0,
                  color: "#fffbe8",
                  textShadow: "0 2px 10px rgba(0,24,53,0.10)",
                }}
              >
                Nếu <strong>số ngày sinh</strong> giúp bạn hiểu rõ năng lực tự
                nhiên,
                <br />
                thì <strong>bản tóm tắt</strong> lại tổng hợp toàn bộ thông tin
                quan trọng về điểm mạnh, điểm yếu và xu hướng phát triển của
                bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Bản tóm tắt trả lời cho câu hỏi "Tôi là ai và tôi nên phát
                  triển như thế nào?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Đây là cái nhìn tổng quan về con người bạn, giúp bạn hiểu rõ
                  bản thân và định hướng tương lai.
                </span>
              </p>
            </div>
          </section>
        </div>

        <div className="summary-all__section">
          <h4
            className="summary-all__section-title"
            style={{ marginBottom: "12px" }}
          >
            💪 ĐIỂM MẠNH CỦA BẠN
          </h4>
          <p
            style={{
              color: "#6e645b",
              fontSize: "14px",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Là tài năng, năng lực, khả năng, đặc điểm chủ đạo của bạn
          </p>
          <div className="summary-all__content">
            {groups.map((group, index) => (
              <div key={index}>
                {group.map((key, subIndex) => (
                  <div
                    key={subIndex}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid #e5e5e5",
                      marginBottom: "16px",
                      color: "#332211",
                      fontSize: "14px",
                      lineHeight: "1.7",
                    }}
                  >
                    {parse(newStrongNumb[key])}
                  </div>
                ))}
                {index < groups.length - 1 && (
                  <div
                    style={{
                      margin: "24px 0",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(232, 199, 140, 0.3), transparent)",
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
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid #e5e5e5",
                    marginTop: "16px",
                    color: "#332211",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  {ARROW[arr]?.[1]?.KET_LUAN && parse(ARROW[arr][1].KET_LUAN)}
                </div>
              ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4
            className="summary-all__section-title"
            style={{ marginBottom: "12px" }}
          >
            ⚠️ ĐIỂM YẾU CỦA BẠN
          </h4>
          <p
            style={{
              color: "#6e645b",
              fontSize: "14px",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Là nhược điểm, bài học, khuyết điểm của bạn
          </p>
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e5e5e5",
                  marginBottom: "16px",
                  color: "#332211",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#A07A4A";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(160, 122, 74, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e5e5";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {WEAK_NUMB[numb]?.noidung && parse(WEAK_NUMB[numb].noidung)}
              </div>
            ))}
          </div>
        </div>

        <div className="summary-all__section">
          <h4
            className="summary-all__section-title"
            style={{ marginBottom: "12px" }}
          >
            🎯 ĐỘNG LỰC THỎA MÃN
          </h4>
          <p
            style={{
              color: "#6e645b",
              fontSize: "14px",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Là khao khát nội tâm, mong muốn, sứ mệnh
          </p>
          <div className="summary-all__content">
            {NUMEROLOGY_LIFE_PATH[numberDestiny]?.tomtat && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e5e5e5",
                  marginBottom: "16px",
                  color: "#332211",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                {parse(NUMEROLOGY_LIFE_PATH[numberDestiny].tomtat)}
              </div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberSoul]?.tomtat && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e5e5e5",
                  marginBottom: "16px",
                  color: "#332211",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                {parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].tomtat)}
              </div>
            )}
            {NUMEROLOGY_SOUL_NUMBER[numberKarma]?.tomtat && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e5e5e5",
                  marginBottom: "16px",
                  color: "#332211",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                {parse(NUMEROLOGY_SOUL_NUMBER[numberKarma].tomtat)}
              </div>
            )}
          </div>
        </div>

        <div className="summary-all__section">
          {/* HEADER */}
          <div style={{ marginBottom: "28px" }}>
            <h4
              className="summary-all__section-title"
              style={{
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#3b2a1a",
              }}
            >
              💼 XU HƯỚNG NGHỀ NGHIỆP
            </h4>

            <p
              style={{
                color: "#6e645b",
                fontSize: "14px",
                lineHeight: "1.7",
                marginBottom: 0,
                padding: "14px 18px",
                backgroundColor: "#faf9f7",
                borderRadius: "10px",
              }}
            >
              Đây là các xu hướng nghề nghiệp{" "}
              <strong>phù hợp với năng lượng nổi trội </strong>
              của bạn. Khi lựa chọn nghề nghiệp thực tế, bạn nên kết hợp thêm
              nguồn lực cá nhân, môi trường sống và lợi thế cạnh tranh để đạt
              hiệu quả bền vững nhất.
            </p>
          </div>

          {/* GRID */}
          <div className="summary-all__career-grid">
            {strongNumb.map((numb, index) =>
              NUMERLOGY_JOB[numb]?.noidung ? (
                <div
                  key={index}
                  className="summary-all__career-item-modern "
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    padding: "22px",
                    border: "1px solid #eee",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C9A46A";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(201, 164, 106, 0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#eee";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", gap: "16px" }}>
                    {/* INDEX */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "#faf6f0",
                        color: "#8a6a3f",
                        fontSize: "14px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #eadfcf",
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* CONTENT */}
                    <div style={{ flex: 1 }}>
                      {/* PRIORITY BADGE */}
                      <div
                        style={{
                          display: "inline-block",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#9a7a4d",
                          backgroundColor: "#faf4ea",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          marginBottom: "15px",
                        }}
                      >
                        Phù hợp cao với bạn
                      </div>

                      {/* MAIN CONTENT */}
                      <div
                        style={{
                          color: "#332211",
                          fontSize: "14px",
                          lineHeight: "1.75",
                        }}
                      >
                        {parse(NUMERLOGY_JOB[numb].noidung)}
                      </div>

                      {/* ORIENTATION LINE */}
                      <div
                        style={{
                          marginTop: "14px",
                          fontSize: "13px",
                          color: "#7a6a55",
                          fontStyle: "italic",
                        }}
                      >
                        → Phù hợp nếu bạn muốn phát triển theo thế mạnh tự nhiên
                        này
                      </div>

                      {/* CTA */}
                      <div
                        style={{
                          marginTop: "12px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#A07A4A",
                          cursor: "pointer",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="summary-all__section">
          {/* SECTION HEADER */}
          <h4 className="summary-all__section-title">
            🧭 PHÁT TRIỂN & HOÀN THIỆN BẢN THÂN
          </h4>

          <p className="summary-all__section-desc">
            Những gợi ý giúp bạn nhận diện rõ điểm cần rèn luyện để phát triển
            bền vững và đi đúng hướng với bản thân.
          </p>

          {/* CONTENT */}
          <div className="summary-all__content">
            {weakNumb.map((numb, index) => (
              <div key={index} className="development-wrapper">
                <div className="development-index">{index + 1}</div>

                <div className="development-body">
                  <div className="development-badge">ĐIỂM CẦN RÈN LUYỆN</div>

                  <div className="development-highlight">
                    Bạn sẽ tiến xa hơn nếu rèn luyện tốt điểm này
                  </div>

                  <div className="development-content">
                    {SOLUTION_NUMB[numb]?.noidung &&
                      parse(SOLUTION_NUMB[numb].noidung)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NOTICE */}
          <div className="development-notice">
            <span className="notice-icon">⚠️</span>
            <div>
              <div className="notice-title">LƯU Ý QUAN TRỌNG</div>
              <p className="notice-text">
                Những lĩnh vực trên không phải là bạn không làm được, mà là cần
                nhiều nỗ lực và rèn luyện hơn để đạt kết quả tốt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryAll;

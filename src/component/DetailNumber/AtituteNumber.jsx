import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NUMEROLOGY_ATTITUDE } from "../../Data/numerology";
import parse from "html-react-parser";
import "./AtituteNumber.css";
import "./MainNumber.css";

function AtituteNumber() {
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);

  const attitudeData = useMemo(() => {
    if (!numbeAtitute) {
      return null;
    }
    return NUMEROLOGY_ATTITUDE[numbeAtitute];
  }, [numbeAtitute]);

  if (!numbeAtitute || !attitudeData) {
    return (
      <div id="atitute_number" className="atitute-number">
        <div className="atitute-number__container">
          <div className="atitute-number__empty">
            <div className="atitute-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số thái độ</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số thái
              độ của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="atitute_number" className="atitute-number">
      <div className="atitute-number__container">
        <div className="atitute-number__header">
          <h1 className="atitute-number__title">
            5{") "} Con số thái độ của bạn là:{" "}
            <span className="atitute-number__title-number">
              {/* {numbeAtitute} */}
            </span>
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
                  {numbeAtitute}
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
                thì <strong>số thái độ</strong> lại tiết lộ cách bạn thể hiện bản
                thân và tương tác với thế giới xung quanh.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Số thái độ trả lời cho câu hỏi "Người khác nhìn thấy tôi như thế nào?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh ấn tượng đầu tiên, cách bạn thể hiện và cách người khác cảm nhận về bạn.
                </span>
              </p>
            </div>
          </section>
        </div>

        {attitudeData.noidung && (
          <div className="atitute-number__content">
            {parse(attitudeData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default AtituteNumber;

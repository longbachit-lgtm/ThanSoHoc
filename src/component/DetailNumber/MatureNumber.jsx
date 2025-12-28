import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NUMEROLOGY_MATURITY } from "../../Data/numerology";
import parse from "html-react-parser";
import "./MatureNumber.css";
import "./MainNumber.css";

function MatureNumber() {
  const numberMature = useSelector((state) => state.numberName.mature);

  const matureData = useMemo(() => {
    if (!numberMature) {
      return null;
    }
    return NUMEROLOGY_MATURITY[numberMature];
  }, [numberMature]);

  if (!numberMature || !matureData) {
    return (
      <div id="mature_number" className="mature-number">
        <div className="mature-number__container">
          <div className="mature-number__empty">
            <div className="mature-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số trưởng thành</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số
              trưởng thành của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="mature_number" className="mature-number">
      <div className="mature-number__container">
        <div className="mature-number__header">
          <h1 className="mature-number__title">
            6{") "} Con số trưởng thành của bạn là:{" "}
            <span className="mature-number__title-number">
              {/* {numberMature} */}
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
                  {numberMature}
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
                thì <strong>số trưởng thành</strong> lại tiết lộ mục đích cuối cùng và
                sứ mệnh của bạn trong cuộc đời.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Số trưởng thành trả lời cho câu hỏi "Tôi sẽ trở thành ai khi trưởng thành?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó chỉ ra con đường phát triển, mục tiêu cuối cùng và những gì bạn sẽ đạt được khi hoàn thiện bản thân.
                </span>
              </p>
            </div>
          </section>
        </div>

        {matureData.noidung && (
          <div className="mature-number__content">
            {parse(matureData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatureNumber;

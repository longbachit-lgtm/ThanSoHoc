import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NUMEROLOGY_BIRTHDAY_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import "./BirthNumber.css";
import "./MainNumber.css";

function BirthNumber() {
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );

  const birthData = useMemo(() => {
    if (!numberDayBirth) {
      return null;
    }
    return NUMEROLOGY_BIRTHDAY_NUMBER[numberDayBirth];
  }, [numberDayBirth]);

  if (!numberDayBirth || !birthData) {
    return (
      <div id="birth_number" className="birth-number">
        <div className="birth-number__container">
          <div className="birth-number__empty">
            <div className="birth-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số ngày sinh</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số ngày
              sinh của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="birth_number" className="birth-number">
      <div className="birth-number__container">
        <div className="birth-number__header">
          <h1 className="birth-number__title">
            7{") "} Chỉ số ngày sinh của bạn là:{" "}
            <span className="birth-number__title-number">
              {/* {numberDayBirth} */}
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
                  {numberDayBirth}
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
                thì <strong>chỉ số ngày sinh</strong> lại tiết lộ những tài năng
                và khả năng đặc biệt mà bạn sở hữu từ khi chào đời.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Chỉ số ngày sinh trả lời cho câu hỏi "Tôi có những khả năng gì từ khi sinh ra?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh những điểm mạnh tự nhiên, tài năng bẩm sinh và cách bạn thể hiện trong cuộc sống hàng ngày.
                </span>
              </p>
            </div>
          </section>
        </div>

        {birthData.noidung && (
          <div className="birth-number__content">
            {parse(birthData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default BirthNumber;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NUMEROLOGY_SOUL_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import "./SoulNumber.css";
import "./MainNumber.css";

function SoulNumber() {
  const numberSoul = useSelector((state) => state.numberName.soul);

  const soulData = useMemo(() => {
    if (!numberSoul) {
      return null;
    }
    return NUMEROLOGY_SOUL_NUMBER[numberSoul];
  }, [numberSoul]);

  if (!numberSoul || !soulData) {
    return (
      <div id="soul_number" className="soul-number">
        <div className="soul-number__container">
          <div className="soul-number__empty">
            <div className="soul-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số linh hồn</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số linh
              hồn của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="soul_number" className="soul-number">
      <div className="soul-number__container">
        <div className="soul-number__header">
          <h1 className="soul-number__title">
            8{") "} Chỉ số linh hồn của bạn là:{" "}
            <span className="soul-number__title-number">
              {/* {numberSoul} */}
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
                  {numberSoul}
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
                thì <strong>chỉ số linh hồn</strong> lại tiết lộ những mong muốn
                sâu thẳm và động lực nội tâm của bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Chỉ số linh hồn trả lời cho câu hỏi "Điều gì thực sự làm tôi hạnh phúc?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh những khát vọng chân thật, những gì bạn thực sự muốn trong cuộc sống và điều gì mang lại cho bạn niềm vui sâu sắc.
                </span>
              </p>
            </div>
          </section>
        </div>

        {soulData.noidung && (
          <div className="soul-number__content">
            {parse(soulData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default SoulNumber;

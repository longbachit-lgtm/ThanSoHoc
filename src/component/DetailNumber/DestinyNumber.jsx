import { useMemo } from "react";
import sodinhmenh from "../../assets/img/5.png";
import { NUMEROLOGY_LIFE_PATH } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./DestinyNumber.css";

function DestinyNumber() {
  const numberDestiny = useSelector((state) => state.numberName.destiny);

  const destinyData = useMemo(() => {
    if (!numberDestiny) {
      return null;
    }
    return NUMEROLOGY_LIFE_PATH[numberDestiny];
  }, [numberDestiny]);

  if (!numberDestiny || !destinyData) {
    return (
      <div id="destiny_number" className="destiny-number">
        <div className="destiny-number__container">
          <div className="destiny-number__empty">
            <div className="destiny-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số định mệnh</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số định
              mệnh của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="destiny_number" className="destiny-number">
      <div className="destiny-number__container">
        <div className="destiny-number__header">
          <h1 className="destiny-number__title">
            4{") "} Con số định mệnh của bạn là:{" "}
            <span className="destiny-number__title-number">
              {/* {numberDestiny} */}
            </span>
          </h1>
          {/* <div className="destiny-number__image-wrapper">
            <img
              className="destiny-number__image"
              src={sodinhmenh}
              alt="Con số định mệnh"
            />
          </div> */}
          <section
            className="main-number__hero"
            style={{
              minHeight: "unset",
              height: "auto",
              padding: "2rem 2rem 1.5rem",
              boxShadow: "0 8px 28px rgba(184,134,11,0.13)",
              margin: "40px 0 0 0",
              borderRadius: 24,
              // Darken the gradient for more text contrast, especially near content center

              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="main-number__hero-overlay"
              style={{
                borderRadius: 24,
                opacity: 1,
                // More dense and darker overlay gradient for higher contrast
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
                  {numberDestiny}
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
                thì <strong>số định mệnh</strong> lại tiết lộ nhiệm vụ và vai
                trò của bạn khi đến với thế giới này.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Số định mệnh trả lời cho câu hỏi “Tôi sinh ra để làm gì?”.
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó soi sáng con đường sống, mục tiêu lớn và lý do sâu xa mà
                  bạn có mặt trên thế giới này.
                </span>
              </p>
            </div>
          </section>
        </div>

        {destinyData.noidung && (
          <div className="destiny-number__content">
            {parse(destinyData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinyNumber;

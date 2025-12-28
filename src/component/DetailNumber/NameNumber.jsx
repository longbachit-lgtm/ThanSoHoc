import { useMemo } from "react";
import sotenrieng from "../../assets/img/3.png";
import { NUMEROLOGY_NAME } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./NameNumber.css";

function NameNumber() {
  const numberName = useSelector((state) => state.numberName.name);

  const nameData = useMemo(() => {
    if (!numberName) {
      return null;
    }
    return NUMEROLOGY_NAME[numberName];
  }, [numberName]);

  if (!numberName || !nameData) {
    return (
      <div id="name_number" className="name-number">
        <div className="name-number__container">
          <div className="name-number__empty">
            <div className="name-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số tên</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin tên để hệ thống phân tích con số
              tên của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="name_number" className="name-number">
      <div className="name-number__container">
        <div className="name-number__header">
          <h1 className="name-number__title">
            3{") "} Con số tên của bạn là:{" "}
            {/* <span className="name-number__title-number">{numberName}</span> */}
          </h1>
          {/* <div className="name-number__image-wrapper">
            <img
              className="name-number__image"
              src={sotenrieng}
              alt="Con số tên"
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
                  {numberName}
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
                thì <strong>số tên riêng</strong> lại tiết lộ vận mệnh và định
                hướng cuộc đời bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Cái tên là thông điệp mà vũ trụ gửi đến riêng bạn.
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh con người, mục tiêu, mong muốn và sứ mệnh cá nhân
                  của bạn.
                </span>
              </p>
            </div>
          </section>
        </div>

        {nameData.noidung && (
          <div className="name-number__content">{parse(nameData.noidung)}</div>
        )}
      </div>
    </div>
  );
}

export default NameNumber;

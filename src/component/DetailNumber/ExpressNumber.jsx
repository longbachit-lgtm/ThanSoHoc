import { useMemo } from "react";
import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./ExpressNumber.css";
import "./MainNumber.css";

function ExpressNumber() {
  const numberExpress = useSelector((state) => state.numberName.express);

  const expressData = useMemo(() => {
    if (!numberExpress) {
      return null;
    }
    return EXPRESSION_NUMBER[numberExpress];
  }, [numberExpress]);

  if (!numberExpress || !expressData) {
    return (
      <div id="express_number" className="express-number">
        <div className="express-number__container">
          <div className="express-number__empty">
            <div className="express-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số biểu đạt</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số biểu
              đạt của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="express_number" className="express-number">
      <div className="express-number__container">
        <div className="express-number__header">
          <h1 className="express-number__title">
            9{") "} Chỉ số biểu đạt của bạn là:{" "}
            <span className="express-number__title-number">
              {/* {numberExpress} */}
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
                  {numberExpress}
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
                thì <strong>chỉ số biểu đạt</strong> lại tiết lộ cách bạn thể hiện
                tài năng và năng lực ra bên ngoài.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Chỉ số biểu đạt trả lời cho câu hỏi "Tôi thể hiện bản thân như thế nào?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh cách bạn sử dụng tài năng, cách bạn thể hiện trong công việc và cách bạn đóng góp cho thế giới.
                </span>
              </p>
            </div>
          </section>
        </div>

        {expressData.noidung && (
          <div className="express-number__content">
            {parse(expressData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpressNumber;

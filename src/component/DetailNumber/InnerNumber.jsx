import { useMemo } from "react";
import { useSelector } from "react-redux";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import "./InnerNumber.css";
import "./MainNumber.css";

function InnerNumber() {
  const numberInner = useSelector((state) => state.numberName.inner);

  const innerDataList = useMemo(() => {
    if (!numberInner) {
      return [];
    }
    const spaceRegex = /\s+/g;
    const splitNumberInner = numberInner.split(spaceRegex);
    return splitNumberInner
      .map((numb) => INNER_NUMBER[numb])
      .filter(Boolean);
  }, [numberInner]);



  return (
    <div id="inner_number" className="inner-number">
      <div className="inner-number__container">
        <div className="inner-number__header">
          <h1 className="inner-number__title">
            10{") "} Chỉ số nội cảm của bạn là:{" "}
            <span className="inner-number__title-number">
              {/* {numberInner} */}
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
                  {numberInner || 0}
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
                thì <strong>chỉ số nội cảm</strong> lại tiết lộ những cảm xúc và
                phản ứng bên trong của bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Chỉ số nội cảm trả lời cho câu hỏi "Tôi cảm nhận và phản ứng như thế nào?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó phản ánh những cảm xúc sâu kín, cách bạn xử lý tình huống và những gì thực sự quan trọng với bạn ở mức độ cảm xúc.
                </span>
              </p>
            </div>
          </section>
        </div>

        <div className="inner-number__content">
          {innerDataList.length > 0 ? (
            innerDataList.map((data, index) =>
              data.noidung ? (
                <div key={index}>{parse(data.noidung)}</div>
              ) : null
            )
          ) : (
            <div className="text-center mt-4">
              <h4 className="fw-bold">Họ tên bạn ko có chỉ số Nội cảm</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InnerNumber;

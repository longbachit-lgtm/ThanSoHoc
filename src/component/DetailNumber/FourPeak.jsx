import { useSelector } from "react-redux";
import { TOP_PEAK } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";
import "./FourPeak.css";
import "./MainNumber.css";

function FourPeak({ topFour }) {
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );

  const peakTitles = [
    "Đỉnh đầu tiên",
    "Đỉnh thứ hai",
    "Đỉnh thứ ba",
    "Đỉnh thứ tư",
  ];

  if (!topFour || !birth_day_list) {
    return (
      <div id="four_peak" className="four-peak">
        <div className="four-peak__container">
          <div className="four-peak__empty">
            <div className="four-peak__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu các đỉnh cuộc đời</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích các đỉnh cuộc
              đời của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderPeak = (peak, index) => {
    if (!peak) return null;

    const title = peakTitles[index];
    const content =
      TOP_PEAK[peak.num] && TOP_PEAK[peak.num].noidung
        ? parse(TOP_PEAK[peak.num].noidung)
        : "";

    return (
      <div key={index} className="four-peak__peak-card">
        <h5 className="four-peak__peak-title">
          <span className="four-peak__peak-title-icon">🏔️</span>
          {title} của bạn
        </h5>
        <div className="four-peak__peak-info">
          Năm{" "}
          <span className="four-peak__peak-age">{peak.age} tuổi</span> - năm{" "}
          <span className="four-peak__peak-year">{peak.year}</span>: Con số{" "}
          <span className="four-peak__peak-number">{peak.num}</span>
        </div>
        {content && (
          <div className="four-peak__peak-content">{content}</div>
        )}
      </div>
    );
  };

  return (
    <div id="four_peak" className="four-peak">
      <div className="four-peak__container">
        <div className="four-peak__header">
          <h1 className="four-peak__title">
            11{") "} Các đỉnh cuộc đời của ngày sinh:{" "}
            <span className="four-peak__title-date">{birth_day_list}</span>
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
                  🏔️
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
                thì <strong>4 đỉnh cuộc đời</strong> lại tiết lộ những giai đoạn
                quan trọng và cơ hội phát triển trong cuộc đời bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  4 đỉnh cuộc đời trả lời cho câu hỏi "Tôi sẽ đạt được gì ở từng giai đoạn cuộc đời?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Mỗi đỉnh đại diện cho một giai đoạn với những thách thức và cơ hội riêng, giúp bạn định hướng và phát triển bản thân.
                </span>
              </p>
            </div>
          </section>
        </div>

        <div className="four-peak__chart-wrapper">
          <LifePeak
            topFour={topFour}
            btn={{
              class_name: "btn btn-danger",
              noi_dung: "4 ĐỈNH CỦA CUỘC ĐỜI",
            }}
            show={false}
          />
        </div>

        <div className="four-peak__peaks-list">
          {["top01", "top02", "top03", "top04"].map((key, index) =>
            renderPeak(topFour[key], index)
          )}
        </div>
      </div>
    </div>
  );
}

export default FourPeak;

import { useSelector } from "react-redux";
import { TOP_CHALLENGE } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";
import "./FourChallenge.css";
import "./MainNumber.css";

function FourChallenge({ topFour }) {
  const birth_day_list = useSelector(
    (state) => state.numberKarmaMain.birth_day_list
  );

  const challengeTitles = [
    "Thử thách đầu tiên",
    "Thử thách thứ hai",
    "Thử thách thứ ba",
    "Thử thách thứ tư",
  ];

  if (!topFour || !birth_day_list) {
    return (
      <div id="four_challenge" className="four-challenge">
        <div className="four-challenge__container">
          <div className="four-challenge__empty">
            <div className="four-challenge__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu các thử thách cuộc đời</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích các thử thách
              cuộc đời của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderChallenge = (challenge, index) => {
    if (!challenge) return null;

    const title = challengeTitles[index];
    const content =
      TOP_CHALLENGE[challenge.num] && TOP_CHALLENGE[challenge.num].noidung
        ? parse(TOP_CHALLENGE[challenge.num].noidung)
        : "";

    return (
      <div key={index} className="four-challenge__challenge-card">
        <h5 className="four-challenge__challenge-title">
          <span className="four-challenge__challenge-title-icon">🌱</span>
          {title} của bạn
        </h5>
        <div className="four-challenge__challenge-info">
          Năm{" "}
          <span className="four-challenge__challenge-age">
            {challenge.age} tuổi
          </span>{" "}
          - năm{" "}
          <span className="four-challenge__challenge-year">
            {challenge.year}
          </span>
          : Con số{" "}
          <span className="four-challenge__challenge-number">
            {challenge.num}
          </span>
        </div>
        {content && (
          <div className="four-challenge__challenge-content">{content}</div>
        )}
      </div>
    );
  };

  return (
    <div id="four_challenge" className="four-challenge">
      <div className="four-challenge__container">
        <div className="four-challenge__header">
          <h1 className="four-challenge__title">
            12{") "} Các thử thách cuộc đời của bạn:{" "}
            <span className="four-challenge__title-date">{birth_day_list}</span>
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
                  🌱
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
                thì <strong>4 thử thách cuộc đời</strong> lại tiết lộ những bài học
                và khó khăn bạn cần vượt qua.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  4 thử thách cuộc đời trả lời cho câu hỏi "Tôi cần học hỏi và phát triển điều gì?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Mỗi thử thách là cơ hội để bạn trưởng thành, học hỏi và phát triển những kỹ năng cần thiết cho cuộc sống.
                </span>
              </p>
            </div>
          </section>
        </div>

        <div className="four-challenge__chart-wrapper">
          <LifePeak
            btn={{
              class_name: "btn btn-danger",
              noi_dung: "",
            }}
            show={false}
            topFour={topFour}
          />
        </div>

        <div className="four-challenge__challenges-list">
          {["top01", "top02", "top03", "top04"].map((key, index) =>
            renderChallenge(topFour[key], index)
          )}
        </div>
      </div>
    </div>
  );
}

export default FourChallenge;

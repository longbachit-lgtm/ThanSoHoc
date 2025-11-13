import { useSelector } from "react-redux";
import fourchallenge from "../../assets/img/12.png";
import { TOP_CHALLENGE } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";
import "./FourChallenge.css";

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
          <div className="four-challenge__image-wrapper">
            <img
              className="four-challenge__image"
              src={fourchallenge}
              alt="4 thử thách cuộc đời"
            />
          </div>
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

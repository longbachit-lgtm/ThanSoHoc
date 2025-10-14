import { useSelector } from "react-redux";
import fourchallenge from "../../assets/img/12.png";
import { TOP_CHALLENGE } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";

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

  const renderPeak = (peak, index) => {
    const title = challengeTitles[index];
    const content =
      TOP_CHALLENGE[peak.num] && TOP_CHALLENGE[peak.num].noidung
        ? parse(TOP_CHALLENGE[peak.num].noidung)
        : "";

    return (
      <div key={index} className="p-4 border rounded shadow-sm bg-light mb-3">
        <h5 className="fw-bold">
          ⚠️ {title} của bạn là năm{" "}
          <span className="text-danger">{peak.age} tuổi</span> - năm{" "}
          <span className="text-primary">{peak.year}</span>: Con số{" "}
          <span className="text-danger">{peak.num}</span>
        </h5>
        <div className="mt-3">{content}</div>
      </div>
    );
  };

  return (
    <div id="four_challenge">
      <div className="container">
        <h1 className="h1 my-5 px-2">
          12{") "} Các thử thách cuộc đời của bạn:
          <b className="text-info"> {birth_day_list}</b>
        </h1>
        <div className="img-box">
          <img className="my-1 w-100" src={fourchallenge} alt="4 thử thách" />
        </div>

        <div className="d-flex justify-content-center">
          <LifePeak
            btn={{
              class_name: "btn btn-danger",
              noi_dung: "",
            }}
            show={false}
            topFour={topFour}
          />
        </div>

        <div className="container">
          {["top01", "top02", "top03", "top04"].map((key, index) =>
            renderPeak(topFour[key], index)
          )}
        </div>
      </div>
    </div>
  );
}

export default FourChallenge;

import { useSelector } from "react-redux";
import fourpeak from "../../assets/img/11.png";
import { TOP_PEAK } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";
import "./FourPeak.css";

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
          <div className="four-peak__image-wrapper">
            <img
              className="four-peak__image"
              src={fourpeak}
              alt="4 đỉnh cuộc đời"
            />
          </div>
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

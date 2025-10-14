import { useSelector } from "react-redux";
import fourpeak from "../../assets/img/11.png";
import { TOP_PEAK } from "../../Data/numerology";
import LifePeak from "./LifePeak";
import parse from "html-react-parser";

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

  const renderPeak = (peak, index) => {
    const title = peakTitles[index];
    const content =
      TOP_PEAK[peak.num] && TOP_PEAK[peak.num].noidung
        ? parse(TOP_PEAK[peak.num].noidung)
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
    <div id="four_peak">
      <div className="container">
        <h1 className="h1 my-5 px-2">
          11{") "} Các đỉnh cuộc đời của ngày sinh:
          <b className="text-info"> {birth_day_list}</b>
        </h1>
        <div className="img-box">
          <img className="my-1 w-100" src={fourpeak} alt="4 đỉnh" />
        </div>

        <div className="d-flex justify-content-center">
          <LifePeak
            topFour={topFour}
            btn={{
              class_name: "btn btn-danger",
              noi_dung: "4 ĐỈNH CỦA CUỘC ĐỜI",
            }}
            show={false}
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

export default FourPeak;

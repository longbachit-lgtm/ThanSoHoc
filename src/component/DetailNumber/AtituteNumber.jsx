import { useMemo } from "react";
import { useSelector } from "react-redux";
import attituteNumber from "../../assets/img/6.png";
import { NUMEROLOGY_ATTITUDE } from "../../Data/numerology";
import parse from "html-react-parser";
import "./AtituteNumber.css";

function AtituteNumber() {
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);

  const attitudeData = useMemo(() => {
    if (!numbeAtitute) {
      return null;
    }
    return NUMEROLOGY_ATTITUDE[numbeAtitute];
  }, [numbeAtitute]);

  if (!numbeAtitute || !attitudeData) {
    return (
      <div id="atitute_number" className="atitute-number">
        <div className="atitute-number__container">
          <div className="atitute-number__empty">
            <div className="atitute-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số thái độ</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số thái
              độ của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="atitute_number" className="atitute-number">
      <div className="atitute-number__container">
        <div className="atitute-number__header">
          <h1 className="atitute-number__title">
            5{") "} Con số thái độ của bạn là:{" "}
            <span className="atitute-number__title-number">
              Số {numbeAtitute}
            </span>
          </h1>
          <div className="atitute-number__image-wrapper">
            <img
              className="atitute-number__image"
              src={attituteNumber}
              alt="Con số thái độ"
            />
          </div>
        </div>

        {attitudeData.noidung && (
          <div className="atitute-number__content">
            {parse(attitudeData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default AtituteNumber;

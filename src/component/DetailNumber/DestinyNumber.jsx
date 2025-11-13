import { useMemo } from "react";
import sodinhmenh from "../../assets/img/5.png";
import { NUMEROLOGY_LIFE_PATH } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./DestinyNumber.css";

function DestinyNumber() {
  const numberDestiny = useSelector((state) => state.numberName.destiny);

  const destinyData = useMemo(() => {
    if (!numberDestiny) {
      return null;
    }
    return NUMEROLOGY_LIFE_PATH[numberDestiny];
  }, [numberDestiny]);

  if (!numberDestiny || !destinyData) {
    return (
      <div id="destiny_number" className="destiny-number">
        <div className="destiny-number__container">
          <div className="destiny-number__empty">
            <div className="destiny-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số định mệnh</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số định
              mệnh của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="destiny_number" className="destiny-number">
      <div className="destiny-number__container">
        <div className="destiny-number__header">
          <h1 className="destiny-number__title">
            4{") "} Con số định mệnh của bạn là:{" "}
            <span className="destiny-number__title-number">{numberDestiny}</span>
          </h1>
          <div className="destiny-number__image-wrapper">
            <img
              className="destiny-number__image"
              src={sodinhmenh}
              alt="Con số định mệnh"
            />
          </div>
        </div>

        {destinyData.noidung && (
          <div className="destiny-number__content">
            {parse(destinyData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinyNumber;

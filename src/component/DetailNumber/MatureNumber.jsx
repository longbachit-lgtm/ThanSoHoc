import { useMemo } from "react";
import { useSelector } from "react-redux";
import sotruongthanh from "../../assets/img/2.png";
import { NUMEROLOGY_MATURITY } from "../../Data/numerology";
import parse from "html-react-parser";
import "./MatureNumber.css";

function MatureNumber() {
  const numberMature = useSelector((state) => state.numberName.mature);

  const matureData = useMemo(() => {
    if (!numberMature) {
      return null;
    }
    return NUMEROLOGY_MATURITY[numberMature];
  }, [numberMature]);

  if (!numberMature || !matureData) {
    return (
      <div id="mature_number" className="mature-number">
        <div className="mature-number__container">
          <div className="mature-number__empty">
            <div className="mature-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số trưởng thành</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích con số
              trưởng thành của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="mature_number" className="mature-number">
      <div className="mature-number__container">
        <div className="mature-number__header">
          <h1 className="mature-number__title">
            6{") "} Con số trưởng thành của bạn là:{" "}
            <span className="mature-number__title-number">
              Số {numberMature}
            </span>
          </h1>
          <div className="mature-number__image-wrapper">
            <img
              className="mature-number__image"
              src={sotruongthanh}
              alt="Con số trưởng thành"
            />
          </div>
        </div>

        {matureData.noidung && (
          <div className="mature-number__content">
            {parse(matureData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatureNumber;

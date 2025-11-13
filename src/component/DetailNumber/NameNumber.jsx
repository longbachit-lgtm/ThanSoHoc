import { useMemo } from "react";
import sotenrieng from "../../assets/img/3.png";
import { NUMEROLOGY_NAME } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./NameNumber.css";

function NameNumber() {
  const numberName = useSelector((state) => state.numberName.name);

  const nameData = useMemo(() => {
    if (!numberName) {
      return null;
    }
    return NUMEROLOGY_NAME[numberName];
  }, [numberName]);

  if (!numberName || !nameData) {
    return (
      <div id="name_number" className="name-number">
        <div className="name-number__container">
          <div className="name-number__empty">
            <div className="name-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu con số tên</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin tên để hệ thống phân tích con số
              tên của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="name_number" className="name-number">
      <div className="name-number__container">
        <div className="name-number__header">
          <h1 className="name-number__title">
            3{") "} Con số tên của bạn là:{" "}
            <span className="name-number__title-number">{numberName}</span>
          </h1>
          <div className="name-number__image-wrapper">
            <img
              className="name-number__image"
              src={sotenrieng}
              alt="Con số tên"
            />
          </div>
        </div>

        {nameData.noidung && (
          <div className="name-number__content">
            {parse(nameData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default NameNumber;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import sonoicam from "../../assets/img/10.png";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import "./InnerNumber.css";

function InnerNumber() {
  const numberInner = useSelector((state) => state.numberName.inner);

  const innerDataList = useMemo(() => {
    if (!numberInner) {
      return [];
    }
    const spaceRegex = /\s+/g;
    const splitNumberInner = numberInner.split(spaceRegex);
    return splitNumberInner
      .map((numb) => INNER_NUMBER[numb])
      .filter(Boolean);
  }, [numberInner]);

  if (!numberInner || innerDataList.length === 0) {
    return (
      <div id="inner_number" className="inner-number">
        <div className="inner-number__container">
          <div className="inner-number__empty">
            <div className="inner-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số nội cảm</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số nội
              cảm của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="inner_number" className="inner-number">
      <div className="inner-number__container">
        <div className="inner-number__header">
          <h1 className="inner-number__title">
            10{") "} Chỉ số nội cảm của bạn là:{" "}
            <span className="inner-number__title-number">
              Số {numberInner}
            </span>
          </h1>
          <div className="inner-number__image-wrapper">
            <img
              className="inner-number__image"
              src={sonoicam}
              alt="Chỉ số nội cảm"
            />
          </div>
        </div>

        <div className="inner-number__content">
          {innerDataList.map((data, index) =>
            data.noidung ? (
              <div key={index}>{parse(data.noidung)}</div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default InnerNumber;

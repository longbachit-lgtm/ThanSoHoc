import { useMemo } from "react";
import sobieudat from "../../assets/img/9.png";
import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./ExpressNumber.css";

function ExpressNumber() {
  const numberExpress = useSelector((state) => state.numberName.express);

  const expressData = useMemo(() => {
    if (!numberExpress) {
      return null;
    }
    return EXPRESSION_NUMBER[numberExpress];
  }, [numberExpress]);

  if (!numberExpress || !expressData) {
    return (
      <div id="express_number" className="express-number">
        <div className="express-number__container">
          <div className="express-number__empty">
            <div className="express-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số biểu đạt</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số biểu
              đạt của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="express_number" className="express-number">
      <div className="express-number__container">
        <div className="express-number__header">
          <h1 className="express-number__title">
            9{") "} Chỉ số biểu đạt của bạn là:{" "}
            <span className="express-number__title-number">
              Số {numberExpress}
            </span>
          </h1>
          <div className="express-number__image-wrapper">
            <img
              className="express-number__image"
              src={sobieudat}
              alt="Chỉ số biểu đạt"
            />
          </div>
        </div>

        {expressData.noidung && (
          <div className="express-number__content">
            {parse(expressData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpressNumber;

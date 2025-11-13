import { useMemo } from "react";
import { useSelector } from "react-redux";
import solinhhon from "../../assets/img/8.png";
import { NUMEROLOGY_SOUL_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import "./SoulNumber.css";

function SoulNumber() {
  const numberSoul = useSelector((state) => state.numberName.soul);

  const soulData = useMemo(() => {
    if (!numberSoul) {
      return null;
    }
    return NUMEROLOGY_SOUL_NUMBER[numberSoul];
  }, [numberSoul]);

  if (!numberSoul || !soulData) {
    return (
      <div id="soul_number" className="soul-number">
        <div className="soul-number__container">
          <div className="soul-number__empty">
            <div className="soul-number__empty-icon">🔍</div>
            <h3>Chưa có dữ liệu chỉ số linh hồn</h3>
            <p>
              Vui lòng nhập đầy đủ thông tin để hệ thống phân tích chỉ số linh
              hồn của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="soul_number" className="soul-number">
      <div className="soul-number__container">
        <div className="soul-number__header">
          <h1 className="soul-number__title">
            8{") "} Chỉ số linh hồn của bạn là:{" "}
            <span className="soul-number__title-number">Số {numberSoul}</span>
          </h1>
          <div className="soul-number__image-wrapper">
            <img
              className="soul-number__image"
              src={solinhhon}
              alt="Chỉ số linh hồn"
            />
          </div>
        </div>

        {soulData.noidung && (
          <div className="soul-number__content">
            {parse(soulData.noidung)}
          </div>
        )}
      </div>
    </div>
  );
}

export default SoulNumber;

import { useSelector } from "react-redux";
import solinhhon from "../../assets/img/8.png";
import { NUMEROLOGY_SOUL_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
function SoulNumber() {
  const numberSoul = useSelector((state) => state.numberName.soul);
  return (
    <div id="soul_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          8{") "} Chỉ Số Linh Hồn:{" "}
          <b className="text-danger">Số {numberSoul}</b>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={solinhhon} />
        </div>
        {NUMEROLOGY_SOUL_NUMBER[numberSoul] &&
        NUMEROLOGY_SOUL_NUMBER[numberSoul].noidung
          ? parse(NUMEROLOGY_SOUL_NUMBER[numberSoul].noidung)
          : ""}
      </div>
    </div>
  );
}

export default SoulNumber;

import sodinhmenh from "../../assets/img/5.png";
import { NUMEROLOGY_LIFE_PATH } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function DestinyNumber() {
  const numberDestiny = useSelector((state) => state.numberName.destiny);

  return (
    <div id="destiny_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          4{") "} Con Số Định Mệnh:{" "}
          <b className="text-danger">{numberDestiny} </b>
        </h1>
        <div className="img-box " >
          <img className=" my-1 w-100" src={sodinhmenh} />
        </div>

        {NUMEROLOGY_LIFE_PATH[numberDestiny] &&
        NUMEROLOGY_LIFE_PATH[numberDestiny].noidung
          ? parse(NUMEROLOGY_LIFE_PATH[numberDestiny].noidung)
          : ""}
      </div>
    </div>
  );
}

export default DestinyNumber;

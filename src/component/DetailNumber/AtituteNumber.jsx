import { useSelector } from "react-redux";
import attituteNumber from "../../assets/img/6.png";
import { NUMEROLOGY_ATTITUDE } from "../../Data/numerology";
import parse from "html-react-parser";
function AtituteNumber() {
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);

  return (
    <div id="atitute_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          5{") "} Con Số Thái Độ:{" "}
          <b className="text-danger">Số {numbeAtitute} </b>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={attituteNumber} />
        </div>
        {NUMEROLOGY_ATTITUDE[numbeAtitute]
          ? parse(NUMEROLOGY_ATTITUDE[numbeAtitute].noidung)
          : ""}
      </div>
    </div>
  );
}

export default AtituteNumber;

import { useSelector } from "react-redux";
import sotruongthanh from "../../assets/img/2.png";
import { NUMEROLOGY_MATURITY } from "../../Data/numerology";
import parse from "html-react-parser";
function MatureNumber() {
  const numberMature = useSelector((state) => state.numberName.mature);
  return (
    <div id="mature_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          6{") "} Con Số Trưởng Thành:{" "}
          <b className="text-danger">Số {numberMature} </b>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={sotruongthanh} />
        </div>
        {NUMEROLOGY_MATURITY[numberMature]
          ? parse(NUMEROLOGY_MATURITY[numberMature].noidung)
          : ""}
      </div>
    </div>
  );
}

export default MatureNumber;

import sobieudat from "../../assets/img/9.png";
import { EXPRESSION_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function ExpressNumber() {
  const numberExpress = useSelector((state) => state.numberName.express);
  return (
    <div id="express_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          9{") "} Chỉ Số Biểu Đạt:{" "}
          <b className="text-danger">Số {numberExpress} </b>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={sobieudat} />
        </div>{" "}
        {EXPRESSION_NUMBER[numberExpress] &&
        EXPRESSION_NUMBER[numberExpress].noidung
          ? parse(EXPRESSION_NUMBER[numberExpress].noidung)
          : ""}
      </div>
    </div>
  );
}

export default ExpressNumber;

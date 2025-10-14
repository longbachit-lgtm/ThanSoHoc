import { useSelector } from "react-redux";
import sonoicam from "../../assets/img/10.png";
import { INNER_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";
import { Fragment } from "react";

function InnerNumber() {
  const spaceRegex = /\s+/g;
  const numberInner = useSelector((state) => state.numberName.inner);

  const splitNumberInner = numberInner.split(spaceRegex);

  return (
    <div id="inner_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          10{") "} Chỉ Số Nội Cảm:{" "}
          <b className="text-danger">Số {numberInner} </b>
        </h1>
        <div className="img-box ">
          <img className=" my-1 w-100" src={sonoicam} />
        </div>
        {splitNumberInner.map((numb, index) =>
          INNER_NUMBER[numb] && INNER_NUMBER[numb].noidung ? (
            <Fragment key={index}>{parse(INNER_NUMBER[numb].noidung)}</Fragment>
          ) : null
        )}
      </div>
    </div>
  );
}

export default InnerNumber;

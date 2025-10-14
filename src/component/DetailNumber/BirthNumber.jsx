import { useSelector } from "react-redux";
import songaysinh from "../../assets/img/7.png";
import { NUMEROLOGY_BIRTHDAY_NUMBER } from "../../Data/numerology";
import parse from "html-react-parser";

function BirthNumber() {
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );
  return (
    <div id="birth_number">
      <div className="container">
        <h1 className=" h1 my-5 px-2">
          7{") "} Chỉ Số Ngày Sinh:{" "}
          <b className="text-danger">Số {numberDayBirth} </b>
        </h1>
        <div className="img-box">
          <img className=" my-1  w-100" src={songaysinh} />
        </div>
        {NUMEROLOGY_BIRTHDAY_NUMBER[numberDayBirth]
          ? parse(NUMEROLOGY_BIRTHDAY_NUMBER[numberDayBirth].noidung)
          : ""}
      </div>
    </div>
  );
}

export default BirthNumber;

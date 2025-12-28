import { Fragment } from "react";
import MainNumber from "./DetailNumber/MainNumber";
import NameNumber from "./DetailNumber/NameNumber";
import AtituteNumber from "./DetailNumber/AtituteNumber";
import MatureNumber from "./DetailNumber/MatureNumber";
import DestinyNumber from "./DetailNumber/DestinyNumber";
import BirthNumber from "./DetailNumber/BirthNumber";
import SoulNumber from "./DetailNumber/SoulNumber";
import ExpressNumber from "./DetailNumber/ExpressNumber";
import InnerNumber from "./DetailNumber/InnerNumber";
import LifePeak from "./DetailNumber/LifePeak";
import ChartDateName from "./DetailNumber/ChartDateName";
import { useSelector } from "react-redux";
import ChartCombineEnergy from "./DetailNumber/ChartCombineEnergy";
import SummaryAll from "./DetailNumber/SummaryAll";
import DateToKnown from "./DetailNumber/DateToKnown";
import FourPeak from "./DetailNumber/FourPeak";
import FourChallenge from "./DetailNumber/FourChallenge";
// 🟢 Dữ liệu mẫu để truyền vào component
const sampleNumbers = {
  top: 8,
  left: 2,
  right: 8,
  center: 10,
};

const sampleAges = {
  bottomLeft: "27 tuổi - (2023)",
  bottomRight: "36 tuổi - (2032)",
  topLeft: "45 tuổi - (2041)",
  topRight: "54 tuổi - (2050)",
};

function DetailNumber() {
  const top4 = useSelector((state) => state.numberKarmaMain.top4);

  const birth_day = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_numb = useSelector(
    (state) => state.numberName.full_name_number
  );
  const combine_numb_birth_name = birth_day + "" + full_name_numb;

  return (
    <Fragment>
      <div id="detail_number">
        {birth_day && (
          <Fragment>
            {top4 && (
              <Fragment>
                <div
                  id="lifepeak"
                  className="border rounded-4 shadow-sm bg-white p-1 p-md-4 m-1 m-md-3 flex-column flex-md-row justify-content-center align-items-stretch gap-1 gap-md-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #fff8e7 0%, #f9f3ec 100%)",
                    border: "2px solid #e8c78c44",
                    boxShadow: "0 6px 32px 0 rgba(232, 199, 140, 0.12)",
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="flex-fill mb-2 mb-md-4 d-flex justify-content-center align-items-center"
                    style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
                  >
                    <LifePeak
                      topFour={top4.top4_peak}
                      btn={{
                        class_name: "btn px-4 py-2 fw-bold rounded-3",
                        noi_dung: (
                          <>
                            <span style={{ fontSize: 18, marginRight: 6 }}>
                              🏔️
                            </span>
                            4 ĐỈNH CỦA CUỘC ĐỜI
                          </>
                        ),
                      }}
                      id_link="four_peak"
                    />
                  </div>
                  <div
                    className="flex-fill d-flex justify-content-center align-items-center"
                    style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
                  >
                    <LifePeak
                      topFour={top4.top4_challenge}
                      btn={{
                        class_name: "btn px-4 py-2 fw-bold rounded-3",
                        noi_dung: (
                          <>
                            <span style={{ fontSize: 18, marginRight: 6 }}>
                              🌱
                            </span>
                            BIỂU ĐỒ THỬ THÁCH
                          </>
                        ),
                      }}
                      id_link="four_challenge"
                    />
                  </div>
                </div>
              </Fragment>
            )}

            <MainNumber />
            <DateToKnown
              numbersData={birth_day}
              color="red"
              buttonText="BIỂU ĐỒ NGÀY SINH"
              buttonColor="green"
            />
            <NameNumber />
            <DestinyNumber />
            <AtituteNumber />
            <MatureNumber />
            <BirthNumber />
            <SoulNumber />
            <ExpressNumber />
            <InnerNumber />
            <FourPeak topFour={top4.top4_peak} />
            <FourChallenge topFour={top4.top4_challenge} />
            <SummaryAll />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default DetailNumber;

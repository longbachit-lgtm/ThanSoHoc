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
            <div class="border rounded p-3 m-3 row ">
              <ChartDateName
                numbersData={birth_day}
                color="red"
                buttonText="BIỂU ĐỒ NGÀY SINH"
                buttonColor="green"
                id_link="date_to_known"
              />

              <ChartDateName
                numbersData={full_name_numb}
                color="#3498da"
                buttonText="BIỂU ĐỒ HỌ TÊN"
                disabled={true}
                buttonColor="purple"
                id_link=""
              />
            </div>

            <div class="border rounded p-3 m-3 d-flex justify-content-center">
              <ChartDateName
                numbersData={combine_numb_birth_name}
                color="blue"
                buttonText="BIỂU ĐỒ  TỔNG HỢP"
                buttonColor="#3cbc9b"
                disabled={true}
              />
            </div>

            <div className="mb-4 mx-3">
              {combine_numb_birth_name && (
                <div 
                  className="p-4 rounded-4 position-relative card-hover"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232, 199, 140, 0.1) 0%, rgba(255, 248, 240, 0.8) 100%)',
                    border: '2px solid rgba(232, 199, 140, 0.3)',
                    boxShadow: '0 8px 24px rgba(184, 134, 11, 0.15)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Header with Icon */}
                  <div className="text-center mb-4">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #E8C78C 0%, #B8860B 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 16px rgba(232, 199, 140, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    >
                      <span style={{ fontSize: '32px' }}>🌟</span>
                    </div>
                    
                    <h4 
                      className="fw-bold mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #B8860B 0%, #E8C78C 50%, #B8860B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.4rem',
                        letterSpacing: '1.5px'
                      }}
                    >
                      NĂNG LƯỢNG TỔNG HỢP
                    </h4>
                    <p 
                      className="mb-0"
                      style={{
                        color: '#6e645b',
                        fontSize: '0.9rem',
                        fontStyle: 'italic'
                      }}
                    >
                      ⚡ Phân tích độ mạnh yếu của các con số trong cuộc đời bạn
                    </p>
                  </div>
                  
                  {/* Decorative divider */}
                  <div 
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #E8C78C, transparent)',
                      margin: '0 auto 1.5rem',
                      width: '60%'
                    }}
                  />
                  
                  <div className="d-flex justify-content-center">
                    <ChartCombineEnergy
                      color="#B8860B"
                      buttonText="TÓM TẮT VỀ BẠN"
                      buttonColor="#B8860B"
                      id_link="summary_all"
                    />
                  </div>
                </div>
              )}
            </div>

            {top4 && (
              <Fragment>
                <div
                  id="lifepeak"
                  className="  border rounded  row d-flex  p-3 m-3 justify-content-center"
                >
                  <LifePeak
                    topFour={top4.top4_peak}
                    btn={{
                      class_name: "btn btn-danger",
                      noi_dung: "4 ĐỈNH CỦA CUỘC ĐỜI",
                    }}
                    id_link="four_peak"
                  />
                  <LifePeak
                    topFour={top4.top4_challenge}
                    btn={{
                      class_name: "btn jade-green",
                      noi_dung: "BIỂU ĐỒ THỬ THÁCH",
                    }}
                    id_link="four_challenge"
                  />
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

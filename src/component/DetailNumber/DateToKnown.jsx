import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ARROW } from "../../Data/numerology";
import parse from "html-react-parser";
import DrawCellDateName from "./SubComponent/DrawCellDateName";
import ArrowNumb from "./SubComponent/ArrowNumb";
import "./DateToKnown.css";
import "./MainNumber.css";

const DateToKnown = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
}) => {
  const [wRightPanel, setWLeftPanel] = useState();
  const arrows = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);

  // Calculate amountNumber using useMemo to recalculate when numbersData changes
  const amountNumber = useMemo(() => {
    if (!numbersData) return {};
    const result = {};
    const cleanedData = numbersData.toString().replaceAll("0", "");
    for (let chr of cleanedData) {
      if (result[chr]) {
        result[chr] += 1;
      } else {
        result[chr] = 1;
      }
    }
    return result;
  }, [numbersData]);

  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, [numbersData]); // Add numbersData as dependency to recalculate when data changes

  return (
    <div id="date_to_known" className="date-to-known">
      <div className="date-to-known__container">
        <div className="date-to-known__header">
          <h1 className="date-to-known__title">2{") "} Mật mã ngày sinh</h1>
          <section
            className="main-number__hero"
            style={{
              minHeight: "unset",
              height: "auto",
              padding: "2rem 2rem 1.5rem",
              boxShadow: "0 8px 28px rgba(184,134,11,0.13)",
              margin: "40px 0 0 0",
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="main-number__hero-overlay"
              style={{
                borderRadius: 24,
                opacity: 1,
              }}
            />
            <div
              className="main-number__hero-content"
              style={{
                maxWidth: 540,
                color: "#fff6e2",
                gap: "1rem",
                textAlign: "center",
                margin: "0 auto",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                position: "relative",
              }}
            >
              <div
                className="main-number__value-wrapper"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-16px",
                  marginBottom: "6px",
                }}
              >
                <span
                  className="main-number__value"
                  style={{
                    fontSize: "3.4rem",
                    fontWeight: 800,
                    color: "#fffff7",
                    textShadow: "0 5px 18px #885d168a, 0 2px 4px #fff9eb71",
                    letterSpacing: "1.8px",
                  }}
                >
                  📅
                </span>
              </div>
              <p
                className="main-number__subtitle"
                style={{
                  fontSize: "1.11rem",
                  lineHeight: 1.55,
                  margin: 0,
                  color: "#fffbe8",
                  textShadow: "0 2px 10px rgba(0,24,53,0.10)",
                }}
              >
                Nếu <strong>số ngày sinh</strong> giúp bạn hiểu rõ năng lực tự
                nhiên,
                <br />
                thì <strong>mật mã ngày sinh</strong> lại tiết lộ biểu đồ năng
                lượng và phân bố các con số trong ngày sinh của bạn.
                <br />
                <span style={{ color: "#f7d36e" }}>
                  Mật mã ngày sinh trả lời cho câu hỏi "Năng lượng của tôi được
                  phân bố như thế nào?".
                </span>
                <br />
                <span style={{ opacity: 0.85 }}>
                  Nó cho thấy những con số nào xuất hiện nhiều, những con số nào
                  thiếu, và cách chúng tạo thành các mũi tên năng lượng.
                </span>
              </p>
            </div>
          </section>
        </div>

        <div className="date-to-known__chart-section">
          <div
            ref={canvasEl}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {wRightPanel && (
              <DrawCellDateName
                wRightPanel={wRightPanel}
                amountNumber={amountNumber}
                color={color}
              />
            )}
          </div>
        </div>

        <div className="date-to-known__arrows-section">
          {/* MŨI TÊN TRỐNG */}
          {lack_arrow.length > 0 && (
            <>
              <h5 className="date-to-known__arrows-title">
                🔴 CÁC MŨI TÊN TRỐNG
              </h5>
              {wRightPanel &&
                lack_arrow.map((arr, iAr) => {
                  return (
                    <div
                      key={`emp${iAr}`}
                      className="date-to-known__arrow-item"
                    >
                      <div className="date-to-known__arrow-visual">
                        <ArrowNumb
                          wRightPanel={wRightPanel}
                          arr={arr}
                          typeArrow="0"
                          stroke="red"
                        />
                      </div>
                      <div className="date-to-known__arrow-content">
                        {parse(ARROW[arr][0].Y_NGHIA)}
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {/* MŨI TÊN ĐỦ */}
          {arrows.length > 0 && (
            <>
              <h5 className="date-to-known__arrows-title">🟢 CÁC MŨI TÊN ĐỦ</h5>
              {wRightPanel &&
                arrows.map((arr, iAr) => {
                  return (
                    <div key={iAr} className="date-to-known__arrow-item">
                      <div className="date-to-known__arrow-visual">
                        <ArrowNumb
                          wRightPanel={wRightPanel}
                          arr={arr}
                          typeArrow="1"
                          stroke="green"
                        />
                      </div>
                      <div className="date-to-known__arrow-content">
                        {parse(ARROW[arr][1].Y_NGHIA)}
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {lack_arrow.length === 0 && arrows.length === 0 && (
            <div className="date-to-known__empty">
              Chưa có dữ liệu mũi tên để hiển thị.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateToKnown;

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import bieudongaysinh from "../../assets/img/4.png";
import { ARROW } from "../../Data/numerology";
import parse from "html-react-parser";
import DrawCellDateName from "./SubComponent/DrawCellDateName";
import ArrowNumb from "./SubComponent/ArrowNumb";
import "./DateToKnown.css";

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
          <h1 className="date-to-known__title">
            2{") "} Mật mã ngày sinh
          </h1>
          <div className="date-to-known__image-wrapper">
            <img
              className="date-to-known__image"
              src={bieudongaysinh}
              alt="Biểu đồ ngày sinh"
            />
          </div>
        </div>

        <div className="date-to-known__chart-section">
          <div ref={canvasEl} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
                    <div key={`emp${iAr}`} className="date-to-known__arrow-item">
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
              <h5 className="date-to-known__arrows-title">
                🟢 CÁC MŨI TÊN ĐỦ
              </h5>
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

import { Tag } from "antd";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label, Arrow } from "react-konva";
import { useSelector } from "react-redux";
import bieudongaysinh from "../../assets/img/4.png";
import { ARROW } from "../../Data/numerology";
import parse from "html-react-parser";
import DrawCellDateName from "./SubComponent/DrawCellDateName";
import ArrowNumb from "./SubComponent/ArrowNumb";
const DateToKnown = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
}) => {
  const [wRightPanel, setWLeftPanel] = useState();
  const arrows = useSelector((state) => state.numberKarmaMain.arrow);
  const lack_arrow = useSelector((state) => state.numberKarmaMain.lack_arrow);

  const amountNumber = {};
  for (let chr of numbersData.replaceAll("0", "")) {
    if (amountNumber[chr]) {
      amountNumber[chr] += 1;
    } else {
      amountNumber[chr] = 1;
    }
  }

  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, []);

  return (
    <Fragment>
      <div id="date_to_known">
        <h1 className=" h1 my-5 px-2">2{") "} Mật mã ngày sinh </h1>
        <div className="img-box">
          <img className=" my-1 w-100 px-2" src={bieudongaysinh} />
        </div>
      </div>
      <div class=" my-3 ">
        <div className="row d-flex justify-content-center">
          <div
            className=" com-sm-12 col-md-6 d-flex justify-content-center "
            ref={canvasEl}
          >
            {/* Vẽ biểu đồ bằng React Konva */}
            {wRightPanel && (
              <DrawCellDateName
                wRightPanel={wRightPanel}
                amountNumber={amountNumber}
                color={color}
              />
            )}
          </div>
        </div>

        {/* MUI TEN TRONG */}

        {lack_arrow.length > 0 && (
          <h5 className=" fw-bold pt-3 pb-2 mx-3 ">CÁC MŨI TÊN TRỐNG</h5>
        )}

        {wRightPanel &&
          lack_arrow.length > 0 &&
          lack_arrow.map((arr, iAr) => {
            return (
              <React.Fragment key={`emp${iAr}`}>
                <div className="row my-2  py-1">
                  <div className="col-12">
                    <ArrowNumb
                      wRightPanel={wRightPanel}
                      arr={arr}
                      typeArrow="0"
                      stroke="red"
                    />
                  </div>
                  <div className="col-12 text-left pb-auto px-4">
                    {parse(ARROW[arr][0].Y_NGHIA)}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        {/* MUI TEN DU */}
        {arrows.length > 0 && (
          <h5 className=" fw-bold pt-3 pb-2 mx-3 ">CÁC MŨI TÊN ĐỦ</h5>
        )}
        {wRightPanel &&
          arrows.length > 0 &&
          arrows.map((arr, iAr) => {
            return (
              <React.Fragment key={iAr}>
                <div className="row my-2 py-1">
                  <div className="col-12">
                    <ArrowNumb
                      wRightPanel={wRightPanel}
                      arr={arr}
                      typeArrow="1"
                      stroke="green"
                    />
                  </div>
                  <div className="col-12 pb-auto px-4">
                    {parse(ARROW[arr][1].Y_NGHIA)}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </Fragment>
  );
};

export default DateToKnown;

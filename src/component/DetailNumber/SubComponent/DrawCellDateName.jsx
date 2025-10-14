import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";

const DrawCellDateName = ({ wRightPanel, amountNumber, color, buttonText }) => {
  const widthWindow = window.innerWidth;

  let wMatrix =
    widthWindow < 576
      ? wRightPanel * 0.5
      : widthWindow >= 576 && widthWindow < 992
      ? wRightPanel * 0.6
      : widthWindow >= 992 && widthWindow < 1200
      ? wRightPanel * 0.55
      : widthWindow >= 1200 && widthWindow < 1400
      ? wRightPanel * 0.5
      : wRightPanel * 0.4;

  buttonText == "BIỂU ĐỒ  TỔNG HỢP" && widthWindow < 576 ? (wMatrix += 75) : "";
  const hMatrix = wMatrix;
  const rects = [];

  for (let x = 0; x < 3; x++) {
    const xx = (wMatrix / 3) * x + 3;
    for (let y = 0; y < 3; y++) {
      const yy = hMatrix - (hMatrix / 3) * (y + 1) + 5;

      const stt = y + 1 + 3 * x;
      let text =
        stt === 11
          ? 20
          : stt === 12
          ? 30
          : stt === 13
          ? 22
          : stt === 14
          ? 11
          : stt === 15
          ? 33
          : stt;
      rects.push(
        <React.Fragment key={`${x}-${y}`}>
          {/* Vẽ viền ô */}
          <Rect
            x={xx}
            y={yy}
            width={wMatrix / 3 - 10}
            height={hMatrix / 3 - 10}
            fill="white"
            stroke="black" // Thêm viền đen
            strokeWidth={2} // Độ dày viền
          />
          {/* Hiển thị số bên trong */}
          <Text
            x={xx}
            y={yy}
            width={wMatrix / 3 - 10}
            height={hMatrix / 3 - 10}
            fontStyle="bold"
            fill={color}
            align="center"
            text={
              amountNumber.hasOwnProperty(text)
                ? text + "^" + amountNumber[text]
                : ""
            }
            verticalAlign="middle"
            fontSize={wMatrix * 0.06}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      <Stage width={wMatrix} height={hMatrix + 30}>
        <Layer>{rects}</Layer>
      </Stage>
    </div>
  );
};

export default DrawCellDateName;

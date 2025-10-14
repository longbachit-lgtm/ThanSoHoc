import { Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Label } from "react-konva";

const DrawCell = ({ wMatrix, hMatrix, amountNumber, color }) => {
  const rects = [];

  const widthWindow = window.innerWidth;

  for (let x = 0; x < 5; x++) {
    const xx = ((wMatrix + 190) / 5) * x + 10;
    const xPositon = widthWindow < 1200 ? xx + 5 : xx;
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
            width={wMatrix / 5 + 30}
            height={hMatrix / 3 - 10}
            fill="white"
            stroke="black" // Thêm viền đen
            strokeWidth={2} // Độ dày viền
          />
          {/* Hiển thị số bên trong */}
          <Text
            x={xPositon}
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
            fontSize={widthWindow < 1200 ? wMatrix * 0.075 : wMatrix * 0.06}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      <Stage width={wMatrix + 200} height={hMatrix + 30}>
        <Layer>{rects}</Layer>
      </Stage>
    </div>
  );
};

export default DrawCell;

import React, { useMemo } from "react";
import { Stage, Layer, Text, Label, Arrow } from "react-konva";
import { ARROW } from "../../../Data/numerology";

const ArrowNumb = ({ wRightPanel, arr, typeArrow, stroke }) => {
  const widthWindow = typeof window !== "undefined" ? window.innerWidth : 1200;

  // Improved responsive calculation consistent with DrawCellDateName
  const stageWidth = useMemo(() => {
    if (widthWindow < 576) {
      return Math.min(wRightPanel * 0.85, 280);
    } else if (widthWindow < 768) {
      return Math.min(wRightPanel * 0.8, 320);
    } else if (widthWindow < 992) {
      return Math.min(wRightPanel * 0.75, 380);
    } else if (widthWindow < 1200) {
      return Math.min(wRightPanel * 0.7, 420);
    } else {
      return Math.min(wRightPanel * 0.65, 450);
    }
  }, [wRightPanel, widthWindow]);

  const stageHeight = 80; // Fixed height for arrow visualization
  const padding = 12;
  const arrowY = stageHeight / 2;
  const textY = 20;
  const numberY = 10;

  // Calculate positions
  const arrowStartX = padding;
  const arrowEndX = stageWidth - padding;
  const arrowLength = arrowEndX - arrowStartX;
  
  // Better spacing for 3 numbers
  const numberCount = 3;
  const numberSpacing = arrowLength / (numberCount + 1);
  const numberStartX = arrowStartX + numberSpacing;

  // Font sizes based on stage width
  const titleFontSize = Math.max(stageWidth * 0.04, 14);
  const numberFontSize = Math.max(stageWidth * 0.045, 16);

  // Arrow data - arr is a string like "123", "456", etc.
  const arrowName = ARROW[arr]?.[typeArrow]?.TEN || "";
  const arrowNumbers = arr ? arr.toString().split("") : [];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0.5rem 0",
      }}
    >
      <Stage
        width={stageWidth}
        height={stageHeight}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      >
        <Layer>
          {/* Arrow Name/Title */}
          <Text
            x={padding}
            y={textY}
            width={arrowLength * 0.4}
            align="left"
            text={arrowName}
            fontStyle="bold"
            fontSize={titleFontSize}
            fill={stroke}
            fontFamily="Arial, sans-serif"
          />

          {/* Numbers above arrow */}
          {arrowNumbers.map((num, iNum) => {
            const numX = numberStartX + numberSpacing * iNum;
            return (
              <Label
                key={`arrowNum${iNum}`}
                x={numX}
                y={numberY}
              >
                <Text
                  width={numberSpacing * 0.9}
                  align="center"
                  text={num}
                  fontStyle="bold"
                  fontSize={numberFontSize}
                  fill={stroke}
                  fontFamily="Arial, sans-serif"
                />
              </Label>
            );
          })}

          {/* Arrow line */}
          <Arrow
            points={[arrowStartX, arrowY, arrowEndX, arrowY]}
            stroke={stroke}
            strokeWidth={5}
            fill={stroke}
            pointerLength={12}
            pointerWidth={10}
            shadowBlur={4}
            shadowColor={stroke}
            shadowOpacity={0.3}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default ArrowNumb;

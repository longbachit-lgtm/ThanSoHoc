import React, { useMemo } from "react";
import { Stage, Layer, Text, Label, Arrow } from "react-konva";
import { ARROW } from "../../../Data/numerology";

const ArrowNumb = ({ wRightPanel, arr, typeArrow, stroke }) => {
  const widthWindow = typeof window !== "undefined" ? window.innerWidth : 1200;

  // Improved responsive calculation consistent with DrawCellDateName
  const stageWidth = useMemo(() => {
    if (widthWindow < 576) {
      return Math.min(wRightPanel * 0.95, 340); // Increased width usage on mobile
    } else if (widthWindow < 768) {
      return Math.min(wRightPanel * 0.9, 380);
    } else if (widthWindow < 992) {
      return Math.min(wRightPanel * 0.85, 420);
    } else if (widthWindow < 1200) {
      return Math.min(wRightPanel * 0.8, 450);
    } else {
      return Math.min(wRightPanel * 0.75, 480);
    }
  }, [wRightPanel, widthWindow]);

  // Responsive height - taller on mobile to prevent overlap
  const stageHeight = useMemo(() => {
    if (widthWindow < 576) {
      return 130; // Increased height for mobile
    } else if (widthWindow < 768) {
      return 110;
    } else {
      return 90;
    }
  }, [widthWindow]);
  
  const padding = 12;
  
  // Calculate arrowY and positions together
  const { arrowY, textY, numberY } = useMemo(() => {
    const calculatedArrowY = stageHeight / 2;
    let calculatedTextY, calculatedNumberY;
    
    if (widthWindow < 576) {
      // On mobile: text closer to arrow, just above it
      calculatedTextY = calculatedArrowY - 25; // Just above arrow
      calculatedNumberY = calculatedArrowY + 30; // Below arrow on mobile
    } else {
      // On desktop: text just above arrow
      calculatedTextY = calculatedArrowY - 35; // Just above arrow
      calculatedNumberY = 15; // Above arrow on desktop
    }
    
    return {
      arrowY: calculatedArrowY,
      textY: calculatedTextY,
      numberY: calculatedNumberY
    };
  }, [widthWindow, stageHeight]);

  // Calculate positions
  const arrowStartX = padding;
  const arrowEndX = stageWidth - padding;
  const arrowLength = arrowEndX - arrowStartX;
  
  // Calculate number positions - evenly distribute 3 numbers along arrow
  // Divide arrow into 4 equal segments, place numbers at 1/4, 2/4, 3/4 positions
  const numberCount = 3;
  const numberPositions = useMemo(() => {
    return Array.from({ length: numberCount }, (_, i) => {
      // Position at (i+1) / (numberCount + 1) of arrow length
      const ratio = (i + 1) / (numberCount + 1);
      return arrowStartX + (arrowLength * ratio);
    });
  }, [arrowStartX, arrowLength, numberCount]);

  // Font sizes based on stage width - slightly larger for readability
  const titleFontSize = useMemo(() => {
    if (widthWindow < 576) {
      return Math.max(stageWidth * 0.045, 13);
    } else {
      return Math.max(stageWidth * 0.045, 15);
    }
  }, [stageWidth, widthWindow]);
  
  const numberFontSize = useMemo(() => {
    if (widthWindow < 576) {
      return Math.max(stageWidth * 0.05, 15);
    } else {
      return Math.max(stageWidth * 0.05, 17);
    }
  }, [stageWidth, widthWindow]);

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
          {/* Arrow Name/Title - positioned at left, close to arrow start */}
          <Text
            x={arrowStartX}
            y={textY}
            width={widthWindow < 576 ? arrowLength * 0.6 : arrowLength * 0.35}
            align="left"
            text={arrowName}
            fontStyle="bold"
            fontSize={titleFontSize}
            fill={stroke}
            fontFamily="Arial, sans-serif"
            wrap="word"
          />

          {/* Numbers - evenly distributed along arrow */}
          {arrowNumbers.map((num, iNum) => {
            // Use pre-calculated position for even distribution
            const numX = numberPositions[iNum];
            // Text width for centering
            const textWidth = (arrowLength / (numberCount + 1)) * 0.8;
            
            return (
              <Label
                key={`arrowNum${iNum}`}
                x={numX}
                y={numberY}
              >
                <Text
                  width={textWidth}
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

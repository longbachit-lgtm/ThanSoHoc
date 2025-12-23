import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const DrawCellDateName = ({ wRightPanel, amountNumber, color, buttonText }) => {
  // Calculate optimal matrix size with better responsive logic
  const widthWindow = window.innerWidth;

  // Consistent max size for all charts
  const maxSize = 220;

  // Calculate width based on container and screen size (same for all charts)
  let calculatedWidth =
    widthWindow < 576
      ? Math.min(wRightPanel * 0.75, 190)
      : widthWindow < 768
      ? Math.min(wRightPanel * 0.7, 210)
      : widthWindow < 992
      ? Math.min(wRightPanel * 0.65, maxSize)
      : widthWindow < 1200
      ? Math.min(wRightPanel * 0.6, maxSize)
      : Math.min(wRightPanel * 0.55, maxSize);

  // No special handling - all charts have same size for consistency

  // Use consistent width and height for perfect squares
  const matrixSize = calculatedWidth;
  const cellSize = matrixSize / 3;
  const padding = 2; // Padding between cells
  const gap = 6; // Gap between cells (increased from 4 to 6 for better spacing)

  const rects = [];

  // Generate 3x3 grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cellSize + padding;
      const y = row * cellSize + padding;
      const cellWidth = cellSize - (gap + padding);
      const cellHeight = cellSize - (gap + padding);

      // Calculate number position (1-9)
      // Grid layout: 123 ở cột trái, 456 ở giữa, 789 ở cột phải
      // Cột trái (col 0): 1, 2, 3 (từ trên xuống)
      // Cột giữa (col 1): 4, 5, 6 (từ trên xuống)
      // Cột phải (col 2): 7, 8, 9 (từ trên xuống)
      // Formula: displayNumber = row * 3 + col + 1
      // row 0, col 0 → 1; row 0, col 1 → 4; row 0, col 2 → 7
      // row 1, col 0 → 2; row 1, col 1 → 5; row 1, col 2 → 8
      // row 2, col 0 → 3; row 2, col 1 → 6; row 2, col 2 → 9
      const displayNumber = row * 3 + col + 1;

      // Check if this number exists in data
      const hasNumber = amountNumber.hasOwnProperty(displayNumber.toString());
      const count = amountNumber[displayNumber.toString()] || 0;

      rects.push(
        <React.Fragment key={`${row}-${col}`}>
          {/* Cell background */}
          <Rect
            x={x}
            y={y}
            width={cellWidth}
            height={cellHeight}
            fill={
              hasNumber
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(255, 255, 255, 0.7)"
            }
            stroke={hasNumber ? color : "#d0d0d0"}
            strokeWidth={hasNumber ? 3 : 1.5}
            cornerRadius={6}
            shadowBlur={hasNumber ? 8 : 0}
            shadowColor={color}
            shadowOpacity={0.3}
          />

          {/* Number text */}
          {hasNumber && (
            <>
              <Text
                x={x}
                y={y + cellHeight * 0.32}
                width={cellWidth}
                height={cellHeight * 0.4}
                text={displayNumber.toString()}
                fontSize={Math.max(cellSize * 0.32, 16)}
                fontStyle="bold"
                fill={color}
                align="center"
                verticalAlign="middle"
              />

              {/* Count indicator (small text) */}
              <Text
                x={x}
                y={y + cellHeight * 0.68}
                width={cellWidth}
                height={cellHeight * 0.22}
                text={`× ${count}`}
                fontSize={Math.max(cellSize * 0.16, 11)}
                fontStyle="normal"
                fill="#666"
                align="center"
                verticalAlign="middle"
              />
            </>
          )}

          {/* Corner number label (always show) */}
          <Text
            x={x + 3}
            y={y + 3}
            text={displayNumber.toString()}
            fontSize={Math.max(cellSize * 0.13, 9)}
            fill={hasNumber ? color : "#ccc"}
            opacity={hasNumber ? 0.4 : 0.35}
            fontStyle="normal"
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stage
        width={matrixSize}
        height={matrixSize}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      >
        <Layer>{rects}</Layer>
      </Stage>
    </div>
  );
};

export default DrawCellDateName;

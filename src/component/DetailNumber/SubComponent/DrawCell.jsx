import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const DrawCell = ({ wRightPanel, amountNumber, color }) => {
  const widthWindow = window.innerWidth;

  // Calculate optimal matrix size with better responsive logic
  // For 5x3 grid, we want same cell size as 3x3 grid
  const maxSize = 220;

  // Calculate base width for 3 columns (same as DrawCellDateName logic)
  let baseWidth =
    widthWindow < 576
      ? Math.min(wRightPanel * 0.75, 190)
      : widthWindow < 768
      ? Math.min(wRightPanel * 0.7, 210)
      : widthWindow < 992
      ? Math.min(wRightPanel * 0.65, maxSize)
      : widthWindow < 1200
      ? Math.min(wRightPanel * 0.6, maxSize)
      : Math.min(wRightPanel * 0.55, maxSize);

  // Calculate cell size (same as 3x3 grid - this ensures cells are the same size)
  const cellSize = baseWidth / 3;

  // Calculate stage width for 5 columns (maintaining same cell size)
  // On mobile/tablet, allow grid to use more width to maintain cell size
  const calculatedStageWidth = cellSize * 5;
  const maxAllowedWidth =
    widthWindow < 576
      ? wRightPanel * 0.95
      : widthWindow < 768
      ? wRightPanel * 0.9
      : wRightPanel * 0.85;

  // If calculated width fits, use it (maintains cell size). Otherwise, scale down proportionally
  let finalCellSize, stageWidth;
  if (calculatedStageWidth <= maxAllowedWidth) {
    // Perfect! We can maintain same cell size
    finalCellSize = cellSize;
    stageWidth = calculatedStageWidth;
  } else {
    // Need to scale down, but try to keep cells as close as possible
    stageWidth = maxAllowedWidth;
    finalCellSize = stageWidth / 5;
  }

  const stageHeight = finalCellSize * 3;

  const cellWidth = finalCellSize;
  const cellHeight = finalCellSize;
  const padding = 2;
  const gap = 6; // Same gap as DrawCellDateName

  const rects = [];

  // Generate 5x3 grid (1-9 + master numbers)
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 3; row++) {
      const x = col * cellWidth + padding;
      const y = row * cellHeight + padding;
      const width = cellWidth - (gap + padding);
      const height = cellHeight - (gap + padding);

      // Map positions to numbers
      // Cột 0 (trái ngoài cùng): 3, 2, 1 (1 ở dưới cùng)
      // Cột 1 (giữa): 6, 5, 4 (4 ở dưới cùng)
      // Cột 2 (phải): 9, 8, 7 (7 ở dưới cùng)
      // Cột 3: 30, 20, 10 (10 ở dưới cùng)
      // Cột 4: 33, 22, 11 (11 ở dưới cùng)
      let displayNumber;
      if (col < 3) {
        // Các số 1-9: (2 - row) + col * 3 + 1
        // row 0, col 0 → 3; row 0, col 1 → 6; row 0, col 2 → 9
        // row 1, col 0 → 2; row 1, col 1 → 5; row 1, col 2 → 8
        // row 2, col 0 → 1; row 2, col 1 → 4; row 2, col 2 → 7
        displayNumber = (2 - row) + col * 3 + 1;
      } else if (col === 3) {
        // Cột 3: 30, 20, 10 (10 ở dưới cùng)
        switch (row) {
          case 0:
            displayNumber = 30;
            break;
          case 1:
            displayNumber = 20;
            break;
          case 2:
            displayNumber = 10;
            break;
          default:
            displayNumber = 0;
        }
      } else if (col === 4) {
        // Cột 4: 33, 22, 11 (11 ở dưới cùng)
        switch (row) {
          case 0:
            displayNumber = 33;
            break;
          case 1:
            displayNumber = 22;
            break;
          case 2:
            displayNumber = 11;
            break;
          default:
            displayNumber = 0;
        }
      } else {
        displayNumber = 0;
      }

      const hasNumber = amountNumber.hasOwnProperty(displayNumber.toString());
      const count = amountNumber[displayNumber.toString()] || 0;

      rects.push(
        <React.Fragment key={`${row}-${col}`}>
          {/* Cell background */}
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
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
                y={y + height * 0.32}
                width={width}
                height={height * 0.4}
                text={displayNumber.toString()}
                fontSize={Math.max(finalCellSize * 0.32, 16)}
                fontStyle="bold"
                fill={color}
                align="center"
                verticalAlign="middle"
              />

              {/* Count indicator */}
              <Text
                x={x}
                y={y + height * 0.68}
                width={width}
                height={height * 0.22}
                text={`× ${count}`}
                fontSize={Math.max(finalCellSize * 0.16, 11)}
                fontStyle="normal"
                fill="#666"
                align="center"
                verticalAlign="middle"
              />
            </>
          )}

          {/* Corner label */}
          <Text
            x={x + 3}
            y={y + 3}
            text={displayNumber.toString()}
            fontSize={Math.max(finalCellSize * 0.13, 9)}
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
        width={stageWidth}
        height={stageHeight}
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

export default DrawCell;

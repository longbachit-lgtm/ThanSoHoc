import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const DrawCell = ({ wMatrix, hMatrix, amountNumber, color }) => {
  const widthWindow = window.innerWidth;
  
  // Calculate optimal size for 5x3 grid
  const maxWidth = widthWindow < 576 ? 280 : widthWindow < 992 ? 350 : 400;
  const stageWidth = Math.min(wMatrix * 1.8, maxWidth);
  const stageHeight = stageWidth * 0.6; // 5:3 ratio
  
  const cellWidth = stageWidth / 5;
  const cellHeight = stageHeight / 3;
  const padding = 2;
  const gap = 4;
  
  const rects = [];

  // Generate 5x3 grid (1-9 + master numbers)
  for (let col = 0; col < 5; col++) {
    for (let row = 0; row < 3; row++) {
      const x = col * cellWidth + padding;
      const y = row * cellHeight + padding;
      const width = cellWidth - (gap + padding);
      const height = cellHeight - (gap + padding);

      const position = col * 3 + row + 1;
      
      // Map positions to numbers (including master numbers)
      let displayNumber;
      switch(position) {
        case 1: displayNumber = 1; break;
        case 2: displayNumber = 4; break;
        case 3: displayNumber = 7; break;
        case 4: displayNumber = 2; break;
        case 5: displayNumber = 5; break;
        case 6: displayNumber = 8; break;
        case 7: displayNumber = 3; break;
        case 8: displayNumber = 6; break;
        case 9: displayNumber = 9; break;
        case 10: displayNumber = 11; break;
        case 11: displayNumber = 20; break;
        case 12: displayNumber = 30; break;
        case 13: displayNumber = 22; break;
        case 14: displayNumber = 33; break;
        case 15: displayNumber = 10; break;
        default: displayNumber = position;
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
            fill={hasNumber ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)"}
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
                fontSize={Math.max(cellHeight * 0.28, 14)}
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
                fontSize={Math.max(cellHeight * 0.15, 10)}
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
            fontSize={Math.max(cellHeight * 0.12, 8)}
            fill={hasNumber ? color : "#ccc"}
            opacity={hasNumber ? 0.4 : 0.35}
            fontStyle="normal"
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}>
      <Stage 
        width={stageWidth} 
        height={stageHeight}
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      >
        <Layer>{rects}</Layer>
      </Stage>
    </div>
  );
};

export default DrawCell;

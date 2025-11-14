import {
  Stage,
  Layer,
  Label,
  Text,
  Circle,
  Line,
} from "react-konva";
import React, { useEffect, useRef, useState } from "react";

function LifePeakCanvas({ peakData, numberBase }) {
  const containerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 615, height: 357 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        // Đợi một chút để đảm bảo container đã render xong
        setTimeout(() => {
          if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth || containerRef.current.clientWidth;
            
            if (containerWidth > 0) {
              // Tính toán padding dựa trên kích thước màn hình
              const padding = window.innerWidth < 576 ? 40 : window.innerWidth < 768 ? 60 : 80;
              const availableWidth = containerWidth - padding;
              
              // Base dimensions cho desktop
              const baseWidth = 615;
              const baseHeight = 357;
              
              let newWidth;
              if (window.innerWidth < 576) {
                // Mobile: sử dụng 95% của available width, tối đa 350px
                newWidth = Math.min(availableWidth * 0.95, 350);
              } else if (window.innerWidth < 768) {
                // Tablet: sử dụng 90% của available width, tối đa 500px
                newWidth = Math.min(availableWidth * 0.9, 500);
              } else {
                // Desktop: giữ nguyên base width hoặc scale theo container
                newWidth = Math.min(baseWidth, availableWidth);
              }
              
              const newHeight = (newWidth / baseWidth) * baseHeight;
              
              setCanvasSize({
                width: Math.max(newWidth, 200), // Minimum width
                height: Math.max(newHeight, 120) // Minimum height
              });
            }
          }
        }, 50);
      }
    };

    // Initial calculation với delay nhỏ
    const timeoutId = setTimeout(updateCanvasSize, 100);
    
    // Update on resize
    window.addEventListener('resize', updateCanvasSize);
    
    // Use ResizeObserver for more accurate container size tracking
    let resizeObserver;
    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize();
      });
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateCanvasSize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const baseWidth = 615;
  const baseHeight = 357;
  const scaleFactor = canvasSize.width / baseWidth;
  
  // Tính toán các tọa độ với scale factor
  const w4Top = canvasSize.width;
  const h4Top = canvasSize.height;
  
  // Tính subWidth để căn giữa - dựa trên base width của tam giác (300px)
  const triangleBaseWidth = 300 * scaleFactor;
  let subWidth;
  if (window.innerWidth < 576) {
    subWidth = Math.max(5, (w4Top - triangleBaseWidth) / 2);
  } else if (window.innerWidth < 768) {
    subWidth = Math.max(15, (w4Top - triangleBaseWidth) / 2);
  } else {
    subWidth = (w4Top - triangleBaseWidth) / 2;
  }

  const radius = 15 * scaleFactor;
  const gray_color = "#b2aea5";
  const spaceShowNumPeak = { x: 80 * scaleFactor, y: 20 * scaleFactor };

  // Tam giác ngoài
  const TAMGIACNGOAI = {
    x: subWidth,
    y: h4Top / 2 + 50 * scaleFactor + 50 * scaleFactor,
    x1: subWidth + 300 * scaleFactor,
    y1: h4Top / 2 + 50 * scaleFactor + 50 * scaleFactor,
    x2: subWidth + 150 * scaleFactor,
    y2: h4Top / 10 + 50 * scaleFactor,
  };

  // Đỉnh 1
  const TAMGIACDINH1 = {
    x: subWidth + 50 * scaleFactor,
    y: TAMGIACNGOAI.y,
    x1: subWidth + 150 * scaleFactor,
    y1: TAMGIACNGOAI.y1,
    x2: subWidth + 100 * scaleFactor,
    y2: TAMGIACNGOAI.y1 - 60 * scaleFactor,
  };

  const TUOIDINH1 = {
    muiten: {
      x: TAMGIACDINH1.x2 - 20 * scaleFactor,
      y: TAMGIACDINH1.y2 - 10 * scaleFactor,
      x1: TAMGIACDINH1.x2 - 76 * scaleFactor,
      y1: TAMGIACDINH1.y2 - 40 * scaleFactor,
    },
  };

  TUOIDINH1.chisotuoi = {
    x: window.innerWidth < 768
      ? TUOIDINH1.muiten.x1 - spaceShowNumPeak.x + 45 * scaleFactor
      : TUOIDINH1.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH1.muiten.y1 - spaceShowNumPeak.y,
  };

  // Đỉnh 2
  const TAMGIACDINH2 = {
    x: subWidth + 150 * scaleFactor,
    y: TAMGIACNGOAI.y,
    x1: subWidth + 250 * scaleFactor,
    y1: TAMGIACNGOAI.y1,
    x2: subWidth + 200 * scaleFactor,
    y2: TAMGIACNGOAI.y1 - 60 * scaleFactor,
  };

  const TUOIDINH2 = {
    muiten: {
      x: TAMGIACDINH2.x2 + 20 * scaleFactor,
      y: TAMGIACDINH2.y2 - 10 * scaleFactor,
      x1: window.innerWidth < 768 
        ? TAMGIACDINH2.x2 + 65 * scaleFactor 
        : TAMGIACDINH2.x2 + 80 * scaleFactor,
      y1: TAMGIACDINH2.y2 - 40 * scaleFactor,
    },
  };

  TUOIDINH2.chisotuoi = {
    x: window.innerWidth < 768
      ? TUOIDINH2.muiten.x1 - 33 * scaleFactor
      : TUOIDINH2.muiten.x1 + 5 * scaleFactor,
    y: TUOIDINH2.muiten.y1 - spaceShowNumPeak.y,
  };

  // Đỉnh 3
  const TAMGIACDINH3 = {
    x: subWidth + 100 * scaleFactor,
    y: TAMGIACDINH1.y2,
    x1: subWidth + 200 * scaleFactor,
    y1: TAMGIACDINH2.y2,
    x2: subWidth + 150 * scaleFactor,
    y2: TAMGIACDINH2.y2 - 60 * scaleFactor,
  };

  const TUOIDINH3 = {
    muiten: {
      x: TAMGIACDINH3.x2 - 20 * scaleFactor,
      y: TAMGIACDINH3.y2 - 10 * scaleFactor,
      x1: TAMGIACDINH3.x2 - 80 * scaleFactor,
      y1: TAMGIACDINH3.y2 - 40 * scaleFactor,
    },
  };

  TUOIDINH3.chisotuoi = {
    x: TUOIDINH3.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH3.muiten.y1 - spaceShowNumPeak.y,
  };

  // Đỉnh 4
  const DINH4 = { x: TAMGIACNGOAI.x2, y: TAMGIACNGOAI.y2 };

  const TUOIDINH4 = {
    muiten: {
      x: DINH4.x + 20 * scaleFactor,
      y: DINH4.y - 10 * scaleFactor,
      x1: DINH4.x + 80 * scaleFactor,
      y1: DINH4.y - 40 * scaleFactor,
    },
  };

  TUOIDINH4.chisotuoi = {
    x: window.innerWidth < 768
      ? TUOIDINH4.muiten.x1 - 5 * scaleFactor
      : TUOIDINH4.muiten.x1 + 5 * scaleFactor,
    y: TUOIDINH4.muiten.y1 - spaceShowNumPeak.y,
  };

  return (
    <div className="lifepeak-card__canvas" ref={containerRef}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Stage
          width={w4Top}
          height={h4Top}
          style={{ 
            maxWidth: "100%", 
            width: `${w4Top}px`,
            height: `${h4Top}px`
          }}
        >
        <Layer>
          {/* Tam giác ngoài */}
          <Line
            points={[
              TAMGIACNGOAI.x,
              TAMGIACNGOAI.y,
              TAMGIACNGOAI.x1,
              TAMGIACNGOAI.y1,
              TAMGIACNGOAI.x2,
              TAMGIACNGOAI.y2,
            ]}
            closed
            lineCap="round"
            lineJoin="round"
            stroke="black"
            strokeWidth={3 * scaleFactor}
          />

          {/* Đỉnh 4 */}
          <Circle
            x={TAMGIACNGOAI.x2}
            y={TAMGIACNGOAI.y2}
            radius={radius}
            fill="white"
            stroke="black"
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACNGOAI.x2 - 5 * scaleFactor} y={TAMGIACNGOAI.y2 - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top04.num}
              fill="red"
              fontSize={15 * scaleFactor}
              fontStyle="bold"
            />
          </Label>

          {/* Đỉnh 4 + Tuổi */}
          <Line
            points={[
              TUOIDINH4.muiten.x,
              TUOIDINH4.muiten.y,
              TUOIDINH4.muiten.x1,
              TUOIDINH4.muiten.y1,
            ]}
            lineJoin="round"
            stroke="blue"
            strokeWidth={2 * scaleFactor}
            dash={[10 * scaleFactor, 10 * scaleFactor]}
          />
          <Label x={TUOIDINH4.chisotuoi.x} y={TUOIDINH4.chisotuoi.y}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top04.age}
              fill="red"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={20 * scaleFactor}
              text="tuổi"
              fill="#908c89"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={48 * scaleFactor}
              text={peakData.top04.year}
              fill="blue"
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Đỉnh 3 */}
          <Line
            points={[
              TAMGIACDINH3.x,
              TAMGIACDINH3.y,
              TAMGIACDINH3.x1,
              TAMGIACDINH3.y1,
              TAMGIACDINH3.x2,
              TAMGIACDINH3.y2,
            ]}
            closed
            lineCap="round"
            lineJoin="round"
            stroke="black"
            strokeWidth={3 * scaleFactor}
          />
          <Circle
            x={TAMGIACDINH3.x2}
            y={TAMGIACDINH3.y2}
            radius={radius + 5 * scaleFactor}
            fill="white"
            stroke="black"
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACDINH3.x2 - 5 * scaleFactor} y={TAMGIACDINH3.y2 - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top03.num}
              fill="red"
              fontSize={15 * scaleFactor}
              fontStyle="bold"
            />
          </Label>
          
          {/* Đỉnh 3 + Tuổi */}
          <Line
            points={[
              TUOIDINH3.muiten.x,
              TUOIDINH3.muiten.y,
              TUOIDINH3.muiten.x1,
              TUOIDINH3.muiten.y1,
            ]}
            lineJoin="round"
            stroke="blue"
            strokeWidth={2 * scaleFactor}
            dash={[10 * scaleFactor, 10 * scaleFactor]}
          />
          <Label x={TUOIDINH3.chisotuoi.x} y={TUOIDINH3.chisotuoi.y}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top03.age}
              fill="red"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={20 * scaleFactor}
              text="tuổi"
              fill="#908c89"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={48 * scaleFactor}
              text={peakData.top03.year}
              fill="blue"
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Đỉnh 2 */}
          <Line
            points={[
              TAMGIACDINH2.x,
              TAMGIACDINH2.y,
              TAMGIACDINH2.x1,
              TAMGIACDINH2.y1,
              TAMGIACDINH2.x2,
              TAMGIACDINH2.y2,
            ]}
            closed
            lineCap="round"
            lineJoin="round"
            stroke="black"
            strokeWidth={3 * scaleFactor}
          />
          <Circle
            x={TAMGIACDINH2.x2}
            y={TAMGIACDINH2.y2}
            radius={radius}
            fill="white"
            stroke="black"
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACDINH2.x2 - 5 * scaleFactor} y={TAMGIACDINH2.y2 - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top02.num}
              fill="red"
              fontSize={15 * scaleFactor}
              fontStyle="bold"
            />
          </Label>

          {/* Đỉnh 2 + Tuổi */}
          <Line
            points={[
              TUOIDINH2.muiten.x,
              TUOIDINH2.muiten.y,
              TUOIDINH2.muiten.x1,
              TUOIDINH2.muiten.y1,
            ]}
            lineJoin="round"
            stroke="blue"
            strokeWidth={2 * scaleFactor}
            dash={[10 * scaleFactor, 10 * scaleFactor]}
          />
          <Label x={TUOIDINH2.chisotuoi.x} y={TUOIDINH2.chisotuoi.y}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top02.age}
              fill="red"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={20 * scaleFactor}
              text="tuổi"
              fill="#908c89"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={48 * scaleFactor}
              text={peakData.top02.year}
              fill="blue"
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Đỉnh 1 */}
          <Line
            points={[
              TAMGIACDINH1.x,
              TAMGIACDINH1.y,
              TAMGIACDINH1.x1,
              TAMGIACDINH1.y1,
              TAMGIACDINH1.x2,
              TAMGIACDINH1.y2,
            ]}
            closed
            lineCap="round"
            lineJoin="round"
            stroke="black"
            strokeWidth={3 * scaleFactor}
          />
          <Circle
            x={TAMGIACDINH1.x2}
            y={TAMGIACDINH1.y2}
            radius={radius}
            fill="white"
            stroke="black"
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACDINH1.x2 - 5 * scaleFactor} y={TAMGIACDINH1.y2 - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top01.num}
              fill="red"
              fontSize={15 * scaleFactor}
              fontStyle="bold"
            />
          </Label>

          {/* Đỉnh 1 + Tuổi */}
          <Line
            points={[
              TUOIDINH1.muiten.x,
              TUOIDINH1.muiten.y,
              TUOIDINH1.muiten.x1,
              TUOIDINH1.muiten.y1,
            ]}
            lineJoin="round"
            stroke="blue"
            strokeWidth={2 * scaleFactor}
            dash={[10 * scaleFactor, 10 * scaleFactor]}
          />
          <Label x={TUOIDINH1.chisotuoi.x} y={TUOIDINH1.chisotuoi.y}>
            <Text
              align="center"
              verticalAlign="middle"
              text={peakData.top01.age}
              fill="red"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={20 * scaleFactor}
              text="tuổi"
              fill="#908c89"
              fontSize={15 * scaleFactor}
            />
            <Text
              align="center"
              verticalAlign="middle"
              x={48 * scaleFactor}
              text={peakData.top01.year}
              fill="blue"
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Các điểm dưới đáy */}
          {/* Điểm 1 */}
          <Circle
            x={TAMGIACNGOAI.x + 50 * scaleFactor}
            y={TAMGIACNGOAI.y}
            radius={radius}
            fill="white"
            stroke={gray_color}
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACNGOAI.x + 45 * scaleFactor} y={TAMGIACNGOAI.y - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={numberBase.num1 ?? "-"}
              fill={gray_color}
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Điểm 2 */}
          <Circle
            x={TAMGIACNGOAI.x + 149 * scaleFactor}
            y={TAMGIACNGOAI.y}
            radius={radius}
            fill="white"
            stroke={gray_color}
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACNGOAI.x + 144 * scaleFactor} y={TAMGIACNGOAI.y - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={numberBase.num2 ?? "-"}
              fill={gray_color}
              fontSize={15 * scaleFactor}
            />
          </Label>

          {/* Điểm 3 */}
          <Circle
            x={TAMGIACNGOAI.x + 250 * scaleFactor}
            y={TAMGIACNGOAI.y}
            radius={radius}
            fill="white"
            stroke={gray_color}
            strokeWidth={2 * scaleFactor}
          />
          <Label x={TAMGIACNGOAI.x + 245 * scaleFactor} y={TAMGIACNGOAI.y - 8 * scaleFactor}>
            <Text
              align="center"
              verticalAlign="middle"
              text={numberBase.num3 ?? "-"}
              fill={gray_color}
              fontSize={15 * scaleFactor}
            />
          </Label>
        </Layer>
      </Stage>
      </div>
    </div>
  );
}

export default LifePeakCanvas;


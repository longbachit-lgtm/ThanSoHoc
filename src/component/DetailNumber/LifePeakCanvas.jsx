import { Stage, Layer, Label, Text, Circle, Line } from "react-konva";
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
            const containerWidth =
              containerRef.current.offsetWidth ||
              containerRef.current.clientWidth;

            if (containerWidth > 0) {
              const windowWidth = window.innerWidth;

              // Tính toán padding dựa trên kích thước màn hình - giảm padding để tận dụng không gian
              const padding =
                windowWidth < 576
                  ? 20 // Mobile: giảm padding
                  : windowWidth < 768
                  ? 30 // Tablet nhỏ: giảm padding
                  : windowWidth < 1000
                  ? 40 // Tablet lớn/Desktop nhỏ: padding vừa phải
                  : 60; // Desktop lớn: padding bình thường

              const availableWidth = containerWidth - padding;

              // Base dimensions cho desktop
              const baseWidth = 615;
              const baseHeight = 357;

              let newWidth;
              if (windowWidth < 576) {
                // Mobile: tăng kích thước để nhìn rõ hơn - tối thiểu 420px, tối đa 95% available
                newWidth = Math.max(420, Math.min(availableWidth * 0.98, 480));
              } else if (windowWidth < 768) {
                // Tablet nhỏ: tăng kích thước - tối thiểu 500px, tối đa 95% available
                newWidth = Math.max(500, Math.min(availableWidth * 0.95, 580));
              } else if (windowWidth < 1000) {
                // Tablet lớn/Desktop nhỏ: sử dụng 90% available, tối đa 615px
                newWidth = Math.min(availableWidth * 0.92, 615);
              } else {
                // Desktop lớn: giữ nguyên base width hoặc scale theo container
                newWidth = Math.min(baseWidth, availableWidth);
              }

              const newHeight = (newWidth / baseWidth) * baseHeight;

              setCanvasSize({
                width: Math.max(newWidth, 400), // Tăng minimum width
                height: Math.max(newHeight, 230), // Tăng minimum height
              });
            }
          }
        }, 50);
      }
    };

    // Initial calculation với delay nhỏ
    const timeoutId = setTimeout(updateCanvasSize, 100);

    // Update on resize
    window.addEventListener("resize", updateCanvasSize);

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
      window.removeEventListener("resize", updateCanvasSize);
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

  // Khai báo windowWidth trước khi sử dụng
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000;

  // Tính subWidth để căn giữa - dựa trên base width của tam giác (300px)
  const triangleBaseWidth = 300 * scaleFactor;
  let subWidth;
  if (windowWidth < 576) {
    subWidth = Math.max(10, (w4Top - triangleBaseWidth) / 2) - 50;
  } else if (windowWidth < 768) {
    subWidth = Math.max(15, (w4Top - triangleBaseWidth) / 2) - 60;
  } else if (windowWidth < 1000) {
    subWidth = Math.max(20, (w4Top - triangleBaseWidth) / 2);
  } else {
    subWidth = (w4Top - triangleBaseWidth) / 2;
  }

  // Radius đồng bộ với scaleFactor - chỉ tăng nhẹ cho màn hình nhỏ để dễ nhìn
  const baseRadius = windowWidth < 1000 ? 16 : 15; // Tăng nhẹ radius cho màn hình < 1000px
  const radius = baseRadius * scaleFactor;
  const gray_color = "#b2aea5";
  // Tăng spacing cho labels ở màn hình 768-1000px để không bị dính
  const spaceShowNumPeak = {
    x:
      windowWidth < 768
        ? 90 * scaleFactor
        : windowWidth < 1000
        ? 110 * scaleFactor // Tăng spacing cho màn hình 768-1000px
        : 80 * scaleFactor,
    y:
      windowWidth < 768
        ? 25 * scaleFactor
        : windowWidth < 1000
        ? 35 * scaleFactor // Tăng spacing cho màn hình 768-1000px
        : 20 * scaleFactor,
  };

  // Font size đồng bộ với scaleFactor của tam giác
  // Chỉ đảm bảo font size tối thiểu để dễ đọc, không tăng thêm %
  const getFontSize = (baseSize) => {
    const scaledSize = baseSize * scaleFactor;
    // Chỉ đảm bảo font size tối thiểu, không tăng thêm
    if (windowWidth < 576) {
      return Math.max(14, scaledSize); // Minimum 14px cho mobile
    } else if (windowWidth < 1000) {
      return Math.max(13, scaledSize); // Minimum 13px cho tablet
    }
    return scaledSize; // Desktop: scale bình thường
  };

  const fontSizePeak = getFontSize(15);
  const fontSizeAge = getFontSize(14);
  const fontSizeBase = getFontSize(14);

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
    x:
      windowWidth < 768
        ? TUOIDINH1.muiten.x1 - spaceShowNumPeak.x + 20 * scaleFactor
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
      x1:
        windowWidth < 768
          ? TAMGIACDINH2.x2 + 65 * scaleFactor
          : TAMGIACDINH2.x2 + 80 * scaleFactor,
      y1: TAMGIACDINH2.y2 - 40 * scaleFactor,
    },
  };

  TUOIDINH2.chisotuoi = {
    x:
      windowWidth < 768
        ? TUOIDINH2.muiten.x1 - 20 * scaleFactor
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
    x:
      windowWidth < 768
        ? TUOIDINH3.muiten.x1 - 80 * scaleFactor
        : TUOIDINH3.muiten.x1 - spaceShowNumPeak.x,
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
    x:
      windowWidth < 768
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
            height: `${h4Top}px`,
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
            <Label x={TAMGIACNGOAI.x2 - radius} y={TAMGIACNGOAI.y2 - radius}>
              <Text
                text={String(peakData.top04.num)}
                fill="red"
                fontSize={fontSizePeak}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
                text={String(peakData.top04.age)}
                fill="red"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 28 * scaleFactor
                    : windowWidth < 1000
                    ? 35 * scaleFactor - 3 // Tăng spacing cho màn hình 768-1000px
                    : 22 * scaleFactor
                }
                text="tuổi"
                fill="#908c89"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 68 * scaleFactor
                    : windowWidth < 1000
                    ? 70 * scaleFactor // Tăng spacing cho màn hình 768-1000px
                    : 50 * scaleFactor
                }
                text={String(peakData.top04.year)}
                fill="blue"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
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
              radius={radius}
              fill="white"
              stroke="black"
              strokeWidth={2 * scaleFactor}
            />
            <Label x={TAMGIACDINH3.x2 - radius} y={TAMGIACDINH3.y2 - radius}>
              <Text
                text={String(peakData.top03.num)}
                fill="red"
                fontSize={fontSizePeak}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
                text={String(peakData.top03.age)}
                fill="red"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 28 * scaleFactor
                    : windowWidth < 1000
                    ? 35 * scaleFactor - 3 // Tăng spacing cho màn hình 768-1000px
                    : 22 * scaleFactor
                }
                text="tuổi"
                fill="#908c89"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 68 * scaleFactor
                    : windowWidth < 1000
                    ? 70 * scaleFactor // Tăng spacing cho màn hình 768-1000px
                    : 50 * scaleFactor
                }
                text={String(peakData.top03.year)}
                fill="blue"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
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
            <Label x={TAMGIACDINH2.x2 - radius} y={TAMGIACDINH2.y2 - radius}>
              <Text
                text={String(peakData.top02.num)}
                fill="red"
                fontSize={fontSizePeak}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
                text={String(peakData.top02.age)}
                fill="red"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 28 * scaleFactor
                    : windowWidth < 1000
                    ? 35 * scaleFactor - 3 // Tăng spacing cho màn hình 768-1000px
                    : 22 * scaleFactor
                }
                text="tuổi"
                fill="#908c89"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 68 * scaleFactor
                    : windowWidth < 1000
                    ? 70 * scaleFactor // Tăng spacing cho màn hình 768-1000px
                    : 50 * scaleFactor
                }
                text={String(peakData.top02.year)}
                fill="blue"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
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
            <Label x={TAMGIACDINH1.x2 - radius} y={TAMGIACDINH1.y2 - radius}>
              <Text
                text={String(peakData.top01.num)}
                fill="red"
                fontSize={fontSizePeak}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
                text={String(peakData.top01.age)}
                fill="red"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 28 * scaleFactor
                    : windowWidth < 1000
                    ? 35 * scaleFactor - 3 // Tăng spacing cho màn hình 768-1000px
                    : 22 * scaleFactor
                }
                text="tuổi"
                fill="#908c89"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
              />
              <Text
                x={
                  windowWidth < 768
                    ? 68 * scaleFactor
                    : windowWidth < 1000
                    ? 70 * scaleFactor // Tăng spacing cho màn hình 768-1000px
                    : 50 * scaleFactor
                }
                text={String(peakData.top01.year)}
                fill="blue"
                fontSize={fontSizeAge}
                align="left"
                verticalAlign="middle"
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
            <Label
              x={TAMGIACNGOAI.x + 50 * scaleFactor - radius}
              y={TAMGIACNGOAI.y - radius}
            >
              <Text
                text={String(numberBase.num1 ?? "-")}
                fill={gray_color}
                fontSize={fontSizeBase}
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
            <Label
              x={TAMGIACNGOAI.x + 149 * scaleFactor - radius}
              y={TAMGIACNGOAI.y - radius}
            >
              <Text
                text={String(numberBase.num2 ?? "-")}
                fill={gray_color}
                fontSize={fontSizeBase}
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
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
            <Label
              x={TAMGIACNGOAI.x + 250 * scaleFactor - radius}
              y={TAMGIACNGOAI.y - radius}
            >
              <Text
                text={String(numberBase.num3 ?? "-")}
                fill={gray_color}
                fontSize={fontSizeBase}
                align="center"
                verticalAlign="middle"
                width={radius * 2}
                height={radius * 2}
              />
            </Label>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default LifePeakCanvas;

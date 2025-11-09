import {
  Stage,
  Layer,
  Label,
  Text,
  Tag,
  Arrow,
  Circle,
  Line,
} from "react-konva";
import React, { Fragment, useMemo } from "react";
import "./LifePeak.css";

function LifePeak({ topFour, btn, show = true, id_link }) {
  if (!topFour) {
    return null;
  }

  const fallbackPeak = useMemo(
    () => ({ num: "-", age: "-", year: "-" }),
    []
  );

  const peakData = {
    top01: topFour.top01 ?? fallbackPeak,
    top02: topFour.top02 ?? fallbackPeak,
    top03: topFour.top03 ?? fallbackPeak,
    top04: topFour.top04 ?? fallbackPeak,
  };

  const numberBase = topFour.numberbase ?? {};

  const windowWidth =
    typeof window !== "undefined" ? window.innerWidth : 1024;

  const radius = 15;

  var gray_color = "#b2aea5";

  let w4Top;
  let h4Top;
  let subWidth;

  w4Top = 615;
  h4Top = w4Top / 2 + 50;
  subWidth = windowWidth < 768 ? 28 : w4Top / 3.9;

  // VE TAM GIAC 4 DINH CUOC DOI

  const spaceShowNumPeak = { x: 80, y: 20 };

  const TAMGIACNGOAI = {
    x: subWidth,
    y: h4Top / 2 + 50 + 50,
    x1: subWidth + 300,
    y1: h4Top / 2 + 50 + 50,
    x2: subWidth + 150,
    y2: h4Top / 10 + 50,
  };

  // Dinh 1
  const TAMGIACDINH1 = {
    x: subWidth + 50,
    y: TAMGIACNGOAI.y,
    x1: subWidth + 150,
    y1: TAMGIACNGOAI.y1,
    x2: subWidth + 100,
    y2: TAMGIACNGOAI.y1 - 60,
  };

  const TUOIDINH1 = {
    muiten: {
      x: TAMGIACDINH1.x2 - 20,
      y: TAMGIACDINH1.y2 - 10,
      x1: TAMGIACDINH1.x2 - 76,
      y1: TAMGIACDINH1.y2 - 40,
    },
  };

  TUOIDINH1.chisotuoi = {
    x:
      windowWidth < 768
        ? TUOIDINH1.muiten.x1 - spaceShowNumPeak.x + 45
        : TUOIDINH1.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH1.muiten.y1 - spaceShowNumPeak.y,
  };
  // Dinh 2
  const TAMGIACDINH2 = {
    x: subWidth + 150,
    y: TAMGIACNGOAI.y,
    x1: subWidth + 250,
    y1: TAMGIACNGOAI.y1,
    x2: subWidth + 200,
    y2: TAMGIACNGOAI.y1 - 60,
  };

  const TUOIDINH2 = {
    muiten: {
      x: TAMGIACDINH2.x2 + 20,
      y: TAMGIACDINH2.y2 - 10,
      x1:
        windowWidth < 768 ? TAMGIACDINH2.x2 + 65 : TAMGIACDINH2.x2 + 80,
      y1: TAMGIACDINH2.y2 - 40,
    },
  };

  TUOIDINH2.chisotuoi = {
    x:
      windowWidth < 768
        ? TUOIDINH2.muiten.x1 - 33
        : TUOIDINH2.muiten.x1 + 5,
    y: TUOIDINH2.muiten.y1 - spaceShowNumPeak.y,
  };

  // Dinh 3

  const TAMGIACDINH3 = {
    x: subWidth + 100,
    y: TAMGIACDINH1.y2,
    x1: subWidth + 200,
    y1: TAMGIACDINH2.y2,
    x2: subWidth + 150,
    y2: TAMGIACDINH2.y2 - 60,
  };

  const TUOIDINH3 = {
    muiten: {
      x: TAMGIACDINH3.x2 - 20,
      y: TAMGIACDINH3.y2 - 10,
      x1: TAMGIACDINH3.x2 - 80,
      y1: TAMGIACDINH3.y2 - 40,
    },
  };

  TUOIDINH3.chisotuoi = {
    x: TUOIDINH3.muiten.x1 - spaceShowNumPeak.x,
    y: TUOIDINH3.muiten.y1 - spaceShowNumPeak.y,
  };

  // Dinh 4

  const DINH4 = { x: TAMGIACNGOAI.x2, y: TAMGIACNGOAI.y2 };

  const TUOIDINH4 = {
    muiten: {
      x: DINH4.x + 20,
      y: DINH4.y - 10,
      x1: DINH4.x + 80,
      y1: DINH4.y - 40,
    },
  };

  TUOIDINH4.chisotuoi = {
    x:
      windowWidth < 768
        ? TUOIDINH4.muiten.x1 - 5
        : TUOIDINH4.muiten.x1 + 5,
    y: TUOIDINH4.muiten.y1 - spaceShowNumPeak.y,
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Fragment>
      <div className="lifepeak-card">
        <div className="lifepeak-card__header">
          <div className="lifepeak-card__badge">
            {btn?.badgeLabel ||
              (typeof btn?.noi_dung === "string"
                ? btn.noi_dung
                : "Chu kỳ cuộc đời")}
          </div>
          <div className="lifepeak-card__heading">
            <h4>
              {btn?.heading ||
                (typeof btn?.noi_dung === "string" &&
                btn.noi_dung.toLowerCase().includes("thử thách")
                  ? "Theo dõi các thử thách chính"
                  : "Lộ trình những đỉnh cao quan trọng")}
            </h4>
            <p>
              Biểu đồ tam giác trực quan hiển thị các mốc tuổi, năm và con số
              chủ đạo của từng giai đoạn.
            </p>
          </div>
        </div>

        <div className="lifepeak-card__canvas">
          <Stage
            style={{ top: "10px" }}
            width={windowWidth < 768 ? w4Top * 0.5 + 70 : w4Top}
            height={h4Top}
          >
            <Layer>
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
                strokeWidth={3}
              />
              {/* CAC DIEM VE CAC DINH */}

              {/* CAC DINH */}
              {/* DINH 4 */}
              <Circle
                x={TAMGIACNGOAI.x2}
                y={TAMGIACNGOAI.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x2 - 5} y={TAMGIACNGOAI.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top04.num}
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*   DINH 4 + TUOI */}
              <Line
                points={[
                  TUOIDINH4.muiten.x,
                  TUOIDINH4.muiten.y,
                  TUOIDINH4.muiten.x1,
                  TUOIDINH4.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH4.chisotuoi.x} y={TUOIDINH4.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top04.age}
                  fill="red"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+20}
                  text="tuổi"
                  fill="#908c89"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+48}
                  text={peakData.top04.year}
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/* DINH 3
               **
               ***/}

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
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH3.x2}
                y={TAMGIACDINH3.y2}
                radius={radius + 5}
                fill="white"
              />
              <Label x={TAMGIACDINH3.x2 - 5} y={TAMGIACDINH3.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top03.num}
                  fill="red"
                  fontSize="15"
                />
              </Label>
              {/*   DINH 3 + TUOI */}
              <Line
                points={[
                  TUOIDINH3.muiten.x,
                  TUOIDINH3.muiten.y,
                  TUOIDINH3.muiten.x1,
                  TUOIDINH3.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH3.chisotuoi.x} y={TUOIDINH3.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top03.age}
                  fill="red"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+20}
                  text="tuổi"
                  fill="#908c89"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+48}
                  text={peakData.top03.year}
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/* DINH 2
               **
               ***/}

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
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH2.x2}
                y={TAMGIACDINH2.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACDINH2.x2 - 5} y={TAMGIACDINH2.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top02.num}
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*   DINH 2 + TUOI */}
              <Line
                points={[
                  TUOIDINH2.muiten.x,
                  TUOIDINH2.muiten.y,
                  TUOIDINH2.muiten.x1,
                  TUOIDINH2.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH2.chisotuoi.x} y={TUOIDINH2.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top02.age}
                  fill="red"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+20}
                  text="tuổi"
                  fill="#908c89"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+48}
                  text={peakData.top02.year}
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/* DINH 1
               ***
               ****/}

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
                strokeWidth={3}
              />
              <Circle
                x={TAMGIACDINH1.x2}
                y={TAMGIACDINH1.y2}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACDINH1.x2 - 5} y={TAMGIACDINH1.y2 - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top01.num}
                  fill="red"
                  fontSize="15"
                />
              </Label>

              {/*    DINH 1 + TUOI  */}

              <Line
                points={[
                  TUOIDINH1.muiten.x,
                  TUOIDINH1.muiten.y,
                  TUOIDINH1.muiten.x1,
                  TUOIDINH1.muiten.y1,
                ]}
                lineJoin="round"
                stroke="blue"
                strokeWidth={2}
                dash={[10, 10]}
              />
              <Label x={TUOIDINH1.chisotuoi.x} y={TUOIDINH1.chisotuoi.y}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={peakData.top01.age}
                  fill="red"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+20}
                  text="tuổi"
                  fill="#908c89"
                  fontSize={15}
                />

                <Text
                  align="center"
                  verticalAlign="middle"
                  x={+48}
                  text={peakData.top01.year}
                  fill="blue"
                  fontSize={15}
                />
              </Label>

              {/**
             CÁC ĐIỂM DƯỚI ĐÁY ĐỂ TÍNH CÁC ĐỈNH
              ***
             */}

              {/* DIEM 1 */}
              <Circle
                x={TAMGIACNGOAI.x + 50}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 45} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={numberBase.num1 ?? "-"}
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>

              {/* DIEM 2 */}
              <Circle
                x={TAMGIACNGOAI.x + 149}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 144} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={numberBase.num2 ?? "-"}
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>

              {/* DIEM 3 */}
              <Circle
                x={TAMGIACNGOAI.x + 250}
                y={TAMGIACNGOAI.y}
                radius={radius}
                fill="white"
              />
              <Label x={TAMGIACNGOAI.x + 245} y={TAMGIACNGOAI.y - 8}>
                <Text
                  align="center"
                  verticalAlign="middle"
                  text={numberBase.num3 ?? "-"}
                  fill={gray_color}
                  fontSize="15"
                />
              </Label>
            </Layer>
          </Stage>
        </div>

        <div className="lifepeak-card__base">
          <div className="lifepeak-card__base-item">
            <span className="lifepeak-card__base-label">Cơ sở 1</span>
            <span className="lifepeak-card__base-value">
              {numberBase.num1 ?? "-"}
            </span>
          </div>
          <div className="lifepeak-card__base-item">
            <span className="lifepeak-card__base-label">Cơ sở 2</span>
            <span className="lifepeak-card__base-value">
              {numberBase.num2 ?? "-"}
            </span>
          </div>
          <div className="lifepeak-card__base-item">
            <span className="lifepeak-card__base-label">Cơ sở 3</span>
            <span className="lifepeak-card__base-value">
              {numberBase.num3 ?? "-"}
            </span>
          </div>
        </div>

        <div className="lifepeak-card__timeline">
          {[
            { key: "top01", label: "Đỉnh 1" },
            { key: "top02", label: "Đỉnh 2" },
            { key: "top03", label: "Đỉnh 3" },
            { key: "top04", label: "Đỉnh 4" },
          ].map((item, index) => (
            <div className="lifepeak-card__timeline-item" key={item.key}>
              <div className="lifepeak-card__timeline-badge">
                {item.label}
              </div>
              <div className="lifepeak-card__timeline-value">
                {peakData[item.key].num}
              </div>
              <div className="lifepeak-card__timeline-meta">
                <span>{peakData[item.key].age} tuổi</span>
                <span>{peakData[item.key].year}</span>
              </div>
            </div>
          ))}
        </div>

        {show && (
          <div className="lifepeak-card__action">
            <button
              className={`lifepeak-button ${
                btn?.class_name ? btn.class_name : ""
              }`}
              onClick={() => scrollToSection(id_link)}
            >
              <span className="lifepeak-button__icon">🔎</span>
              <span className="lifepeak-button__label">
                {typeof btn?.noi_dung === "string"
                  ? btn.noi_dung
                  : "Xem chi tiết"}
              </span>
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default LifePeak;

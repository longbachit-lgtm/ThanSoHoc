import React, { Fragment, useMemo } from "react";
import "./LifePeak.css";
import LifePeakCanvas from "./LifePeakCanvas";

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
          {/* <div className="lifepeak-card__badge">
            {btn?.badgeLabel ||
              (typeof btn?.noi_dung === "string"
                ? btn.noi_dung
                : "Chu kỳ cuộc đời")}
          </div> */}
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

        <LifePeakCanvas peakData={peakData} numberBase={numberBase} />

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

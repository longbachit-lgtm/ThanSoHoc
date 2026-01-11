import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function OverviewNumber() {
  const numberKarma = useSelector((state) => state.numberKarmaMain.number);
  const numbeAtitute = useSelector((state) => state.numberKarmaMain.atitute);
  const numberDestiny = useSelector((state) => state.numberName.destiny);
  const numberName = useSelector((state) => state.numberName.name);
  const numberExpress = useSelector((state) => state.numberName.express);
  const numberInner = useSelector((state) => state.numberName.inner);
  const numberSoul = useSelector((state) => state.numberName.soul);
  const numberMature = useSelector((state) => state.numberName.mature);
  const numberDayBirth = useSelector(
    (state) => state.numberKarmaMain.day_birth
  );

  useEffect(() => {}, [
    numberKarma,
    numbeAtitute,
    numberDestiny,
    numberName,
    numberExpress,
    numberSoul,
    numberInner,
    numberMature,
    numberDayBirth,
  ]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Enhanced number icons mapping
  const getNumberIcon = (label) => {
    const iconMap = {
      "Số Chủ Đạo": "🌟",
      "Số Tên Riêng": "✨",
      "Số Đường Đời": "🛤️",
      "Số Định Mệnh": "🎯",
      "Số Thái Độ": "😊",
      "Trưởng Thành": "🌱",
      "Số Ngày Sinh": "🎂",
      "Số Linh Hồn": "💫",
      "Số Biểu Đạt": "💬",
      "Số Nội Cảm": "🔮"
    };
    return iconMap[label] || "⭐";
  };

  // Enhanced numbers array with gradient colors
  const numbers = [
    {
      label: "Số Chủ Đạo",
      value: numberKarma,
      gradient: "linear-gradient(135deg, #E8C78C 0%, #B8860B 100%)",
      id: "main_number",
      description: "Hành trình cuộc đời"
    },
    {
      label: "Số Tên Riêng",
      value: numberName,
      gradient: "linear-gradient(135deg, #A8D5BA 0%, #5FA778 100%)",
      id: "name_number",
      description: "Bản sắc cá nhân"
    },
    {
      label: "Số Đường Đời",
      value: numberKarma,
      gradient: "linear-gradient(135deg, #89CFF0 0%, #4A90E2 100%)",
      id: "main_number",
      description: "Định hướng vận mệnh"
    },
    {
      label: "Số Định Mệnh",
      value: numberDestiny,
      gradient: "linear-gradient(135deg, #C4A1D8 0%, #9B59B6 100%)",
      id: "destiny_number",
      description: "Sứ mệnh cuộc đời"
    },
    {
      label: "Số Thái Độ",
      value: numbeAtitute,
      gradient: "linear-gradient(135deg, #F8A5A5 0%, #E74C3C 100%)",
      id: "atitute_number",
      description: "Cách ứng xử"
    },
    {
      label: "Trưởng Thành",
      value: numberMature,
      gradient: "linear-gradient(135deg, #85D5E3 0%, #3498DB 100%)",
      id: "mature_number",
      description: "Phát triển bản thân"
    },
    {
      label: "Số Ngày Sinh",
      value: numberDayBirth,
      gradient: "linear-gradient(135deg, #A1D99B 0%, #52B788 100%)",
      id: "birth_number",
      description: "Năng lượng bẩm sinh"
    },
    {
      label: "Số Linh Hồn",
      value: numberSoul,
      gradient: "linear-gradient(135deg, #7FB3D5 0%, #34495E 100%)",
      id: "soul_number",
      description: "Khao khát nội tâm"
    },
    {
      label: "Số Biểu Đạt",
      value: numberExpress,
      gradient: "linear-gradient(135deg, #76C7C0 0%, #16A085 100%)",
      id: "express_number",
      description: "Cách thể hiện"
    },
    {
      label: "Số Nội Cảm",
      value: numberInner || 0,
      gradient: "linear-gradient(135deg, #C9A9D9 0%, #9370DB 100%)",
      id: "inner_number",
      description: "Cảm nhận đặc biệt"
    }
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div>
      {/* Enhanced grid layout with centered last row */}
      <div className="row g-4 justify-content-center">
        {numbers.map((item, index) => (
          <div key={index} className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2-4" style={{ maxWidth: '240px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="h-100"
            >
              <div
                className="h-100 p-3 rounded-4 position-relative overflow-hidden"
                style={{
                  background: hoverIndex === index 
                    ? 'rgba(255, 255, 255, 0.95)' 
                    : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(232, 199, 140, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: hoverIndex === index
                    ? '0 12px 32px rgba(184, 134, 11, 0.2)'
                    : '0 4px 12px rgba(184, 134, 11, 0.1)',
                  transform: hoverIndex === index ? 'translateY(-8px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => scrollToSection(item.id)}
              >
                {/* Gradient background overlay */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: item.gradient,
                    opacity: hoverIndex === index ? 0.15 : 0.08,
                    transition: 'opacity 0.3s ease',
                    zIndex: 0
                  }}
                />

                {/* Top decorative line */}
                <div 
                  className="position-absolute top-0 start-0 end-0"
                  style={{
                    height: '3px',
                    background: item.gradient,
                    opacity: 0.6
                  }}
                />

                {/* Content */}
                <div className="position-relative" style={{ zIndex: 1 }}>
                  {/* Icon */}
                  <div 
                    className="mb-2"
                    style={{
                      fontSize: '24px',
                      transition: 'transform 0.3s ease',
                      transform: hoverIndex === index ? 'scale(1.2) rotate(10deg)' : 'scale(1)'
                    }}
                  >
                    {getNumberIcon(item.label)}
                  </div>

                  {/* Label */}
                  <h6 
                    className="mb-2 fw-bold"
                    style={{
                      fontSize: '0.8rem',
                      color: '#332211',
                      letterSpacing: '0.5px',
                      lineHeight: '1.3'
                    }}
                  >
                    {item.label}
                  </h6>

                  {/* Number Value */}
                  <div 
                    className="mb-2 d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      background: item.gradient,
                      width: '56px',
                      height: '56px',
                      margin: '0 auto',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease',
                      transform: hoverIndex === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    <span 
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {item.value}
                    </span>
                  </div>

                  {/* Description */}
                  <p 
                    className="mb-0"
                    style={{
                      fontSize: '0.7rem',
                      color: '#6e645b',
                      fontStyle: 'italic',
                      opacity: hoverIndex === index ? 1 : 0.7,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom shine effect on hover */}
                {hoverIndex === index && (
                  <div 
                    className="position-absolute bottom-0 start-0 end-0"
                    style={{
                      height: '30%',
                      background: 'linear-gradient(to top, rgba(232, 199, 140, 0.2), transparent)',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Info hint */}
      <div className="text-center mt-4">
        <p 
          style={{
            fontSize: '0.85rem',
            color: '#6e645b',
            fontStyle: 'italic'
          }}
        >
          💡 Click vào mỗi con số để xem chi tiết
        </p>
      </div>
    </div>
  );
}

export default OverviewNumber;

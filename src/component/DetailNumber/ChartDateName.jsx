import React, { useEffect, useRef, useState, useMemo } from "react";
import DrawCellDateName from "./SubComponent/DrawCellDateName";

const ChartDateName = ({
  numbersData,
  color = "red",
  buttonText,
  buttonColor,
  id_link,
  disabled = false,
}) => {
  const [wRightPanel, setWLeftPanel] = useState();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate amountNumber using useMemo to recalculate when numbersData changes
  const amountNumber = useMemo(() => {
    if (!numbersData) return {};
    const result = {};
    const cleanedData = numbersData.toString().replaceAll("0", "");
    for (let chr of cleanedData) {
      if (result[chr]) {
        result[chr] += 1;
      } else {
        result[chr] = 1;
      }
    }
    return result;
  }, [numbersData]);

  const canvasEl = useRef(null);

  useEffect(() => {
    const width = canvasEl?.current?.offsetWidth;
    setWLeftPanel(width);
  }, [numbersData]); // Add numbersData as dependency to recalculate when data changes

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get gradient based on button color
  const getGradient = () => {
    const gradientMap = {
      '#28a745': 'linear-gradient(135deg, #52B788 0%, #28a745 100%)',
      '#9b59b6': 'linear-gradient(135deg, #C4A1D8 0%, #9b59b6 100%)',
      '#3cbc9b': 'linear-gradient(135deg, #76C7C0 0%, #3cbc9b 100%)',
      'green': 'linear-gradient(135deg, #52B788 0%, #28a745 100%)',
      'purple': 'linear-gradient(135deg, #C4A1D8 0%, #9b59b6 100%)'
    };
    return gradientMap[buttonColor] || `linear-gradient(135deg, ${buttonColor} 0%, ${buttonColor} 100%)`;
  };

  return (
    <div className="w-100" ref={canvasEl}>
      {/* Chart container with enhanced styling */}
      <div 
        className="d-flex justify-content-center mb-3 p-3 rounded-3 position-relative"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(252, 248, 240, 0.6) 100%)',
          border: '1px solid rgba(232, 199, 140, 0.25)',
          minHeight: '240px',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          boxShadow: isHovered 
            ? '0 6px 20px rgba(184, 134, 11, 0.12)' 
            : '0 3px 12px rgba(184, 134, 11, 0.08)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Chart Canvas */}
        {wRightPanel && (
          <DrawCellDateName
            wRightPanel={wRightPanel}
            amountNumber={amountNumber}
            color={color}
            buttonText={buttonText}
          />
        )}
      </div>

      {/* Enhanced Action Button (Visible & Clear) */}
      {id_link && !disabled && buttonText && (
        <div className="d-flex justify-content-center mt-2">
          <button
            className="btn border-0 rounded-pill px-4 py-2 d-flex align-items-center gap-2 position-relative overflow-hidden"
            style={{
              background: getGradient(),
              color: "white",
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid rgba(255, 255, 255, 0.25)'
            }}
            onClick={() => scrollToSection(id_link)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
          >
            <span style={{ fontSize: '16px' }}>👁️</span>
            <span>{buttonText}</span>
          </button>
        </div>
      )}

      {/* Disabled state badge */}
      {disabled && buttonText && (
        <div className="d-flex justify-content-center mt-2">
          <span 
            className="badge rounded-pill px-4 py-2"
            style={{
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.12) 0%, rgba(232, 199, 140, 0.12) 100%)',
              color: '#999',
              fontSize: '0.8rem',
              fontWeight: '600',
              border: '1px solid rgba(232, 199, 140, 0.2)'
            }}
          >
            {buttonText}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChartDateName;

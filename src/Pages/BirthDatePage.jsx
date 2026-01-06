import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

export default function BirthDatePage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const navigate = useNavigate();

  // Check if user already has numerology data
  useEffect(() => {
    const checkExistingData = async () => {
      try {
        const response = await api.numerology.getMyData();
        if (response.data && response.data.fullName) {
          navigate("/numerology-detail", { replace: true });
          return;
        }
      } catch (error) {
        console.log("No existing data, showing input form");
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingData();
  }, [navigate]);

  const handleDayChange = (increment) => {
    const currentDay = parseInt(day) || 1;
    const newDay = currentDay + increment;
    if (newDay >= 1 && newDay <= 31) {
      setDay(newDay.toString());
    }
  };

  const handleMonthChange = (increment) => {
    const currentMonth = parseInt(month) || 1;
    const newMonth = currentMonth + increment;
    if (newMonth >= 1 && newMonth <= 12) {
      setMonth(newMonth.toString());
    }
  };

  const handleYearChange = (increment) => {
    const currentYear = parseInt(year) || 1990;
    const newYear = currentYear + increment;
    if (newYear >= 1900 && newYear <= 2024) {
      setYear(newYear.toString());
    }
  };

  const handleManualInput = (type, value) => {
    // Cho phép nhập bất kỳ giá trị nào (bao gồm rỗng)
    switch (type) {
      case 'day':
        setDay(value);
        if (value.length === 2) { monthRef.current.focus(); }
        break;
      case 'month':
        setMonth(value);
        if (value.length === 2) { yearRef.current.focus(); }
        break;
      case 'year':
        setYear(value);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleNext = () => {
    // Kiểm tra các trường có giá trị hợp lệ
    if (!day || !month || !year) {
      alert("Vui lòng nhập đầy đủ ngày, tháng, năm!");
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Kiểm tra giá trị số hợp lệ
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      alert("Vui lòng nhập số hợp lệ!");
      return;
    }

    // Kiểm tra phạm vi
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2024) {
      alert("Ngày tháng năm không hợp lệ!");
      return;
    }

    // Validate date
    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1 || date.getFullYear() !== yearNum) {
      alert("Ngày tháng năm không hợp lệ!");
      return;
    }

    // Save to localStorage
    localStorage.setItem('userBirthDate', JSON.stringify({ day: dayNum, month: monthNum, year: yearNum }));

    // Navigate to next page
    navigate("/gender-selection");
  };

  const handleBack = () => {
    navigate("/name-input");
  };

  // Show loading while checking for existing data
  if (isChecking) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div className="text-center">
          <div
            className="spinner-border mb-3"
            role="status"
            style={{
              width: '3rem',
              height: '3rem',
              color: '#A07A4A',
              borderWidth: '4px'
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#332211', fontSize: '16px', fontWeight: '500' }}>
            Đang kiểm tra dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"

    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none' }}>
        {/* Constellation patterns */}
        <div
          className="position-absolute"
          style={{
            top: '10%',
            left: '15%',
            width: '60px',
            height: '40px',
            background: 'linear-gradient(45deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.3
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: '20%',
            right: '20%',
            width: '80px',
            height: '50px',
            background: 'radial-gradient(circle, #E8C78C 2px, transparent 2px)',
            backgroundSize: '20px 20px',
            opacity: 0.2
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '25%',
            left: '10%',
            width: '100px',
            height: '60px',
            background: 'linear-gradient(135deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.25
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '15%',
            right: '15%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.3
          }}
        />
        {/* Individual stars */}
        <div
          className="position-absolute"
          style={{
            top: '30%',
            left: '25%',
            width: '4px',
            height: '4px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.4
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: '40%',
            right: '30%',
            width: '3px',
            height: '3px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.5
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '40%',
            left: '30%',
            width: '5px',
            height: '5px',
            backgroundColor: '#E8C78C',
            borderRadius: '50%',
            opacity: 0.3
          }}
        />
      </div>

      {/* Main container */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            {/* Progress Dots */}
            <div className="text-center mb-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#B8860B'
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#d6c0a1',
                    opacity: 0.6
                  }}
                />
                <span
                  className="rounded-circle border"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderColor: '#B8860B',
                    borderWidth: '2px',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Birth Date Card */}
            <div
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: '#FCF8F0',
                borderRadius: '20px',
                border: '1px solid #E8C78C'
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2
                  className="text-center fw-bold mb-4"
                  style={{
                    color: '#A07A4A',
                    fontSize: '1.8rem',
                    letterSpacing: '1px'
                  }}
                >
                  Ngày tháng năm sinh
                </h2>

                {/* Quote */}
                <div className="text-center mb-4">
                  <p
                    className="fst-italic mb-0"
                    style={{
                      color: '#332211',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}
                  >
                    Khoảnh khắc bạn được sinh ra, vũ trụ khẽ đặt một bản đồ nhỏ trong tim bạn.
                  </p>
                </div>

                {/* Date Pickers */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                  {/* Day Picker */}
                  <div className="text-center">
                    <div
                      className="rounded-3 border d-flex flex-column align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '100px',
                        backgroundColor: '#fff',
                        border: '2px solid #E8C78C'
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleDayChange(1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▲
                      </button>
                      <input

                        type="text"
                        value={day}
                        ref={dayRef}
                        onChange={(e) => handleManualInput('day', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border-0 text-center fw-bold"
                        style={{
                          width: '40px',
                          fontSize: '18px',
                          color: '#332211',
                          backgroundColor: 'transparent',
                          outline: 'none'
                        }}

                        placeholder="01"
                        maxLength="2"
                      />
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleDayChange(-1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* Month Picker */}
                  <div className="text-center">
                    <div
                      className="rounded-3 border d-flex flex-column align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '100px',
                        backgroundColor: '#fff',
                        border: '2px solid #E8C78C'
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleMonthChange(1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▲
                      </button>
                      <input
                        type="text"
                        value={month}
                        ref={monthRef}
                        onChange={(e) => handleManualInput('month', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border-0 text-center fw-bold"
                        style={{
                          width: '40px',
                          fontSize: '18px',
                          color: '#332211',
                          backgroundColor: 'transparent',
                          outline: 'none'
                        }}
                        placeholder="01"
                        maxLength="2"
                      />
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleMonthChange(-1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* Year Picker */}
                  <div className="text-center">
                    <div
                      className="rounded-3 border d-flex flex-column align-items-center justify-content-center"
                      style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#fff',
                        border: '2px solid #E8C78C'
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleYearChange(1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▲
                      </button>
                      <input
                        type="text"
                        value={year}
                        ref={yearRef}
                        onChange={(e) => handleManualInput('year', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border-0 text-center fw-bold"
                        style={{
                          width: '60px',
                          fontSize: '18px',
                          color: '#332211',
                          backgroundColor: 'transparent',
                          outline: 'none'
                        }}
                        placeholder="1990"
                        maxLength="4"
                      />
                      <button
                        type="button"
                        className="btn btn-link p-0 border-0"
                        onClick={() => handleYearChange(-1)}
                        style={{
                          color: '#A07A4A',
                          fontSize: '16px',
                          lineHeight: '1'
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn border-0 rounded-pill"
                    style={{
                      backgroundColor: '#d6c0a1',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderLeft: '3px solid white',
                        borderBottom: '3px solid white',
                        transform: 'rotate(45deg)',
                        marginLeft: "5px",
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn border-0 rounded-pill"
                    style={{
                      backgroundColor: '#A07A4A',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRight: '3px solid white',
                        borderBottom: '3px solid white',
                        transform: 'rotate(-45deg)'
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="text-center mt-4">
              <h1
                className="display-4 fw-bold mb-0"
                style={{
                  fontFamily: "'Charm', cursive",
                  color: '#332211',
                  fontSize: '2.5rem',
                  position: 'relative'
                }}
              >
                Cham.
                <span
                  className="position-absolute"
                  style={{
                    top: '-5px',
                    right: '-15px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#E8C78C',
                    borderRadius: '50%'
                  }}
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

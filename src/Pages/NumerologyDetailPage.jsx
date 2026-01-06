import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import UserProfileSection from "../component/NumerologyDetail/UserProfileSection";
import NumerologyNumbersGrid from "../component/NumerologyDetail/NumerologyNumbersGrid";
import ChartsSection from "../component/NumerologyDetail/ChartsSection";
import OverviewNumber from "../component/OverviewNumber";
import DetailNumber from "../component/DetailNumber";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export default function NumerologyDetailPage() {
  const dispatch = useDispatch();
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Load dữ liệu trực tiếp từ Database
  useEffect(() => {
    const loadData = async () => {
      // Nếu đã có data trong Redux, không cần load lại
      if (mainNumber && birthDay) {
        setHasData(true);
        setIsLoading(false);
        return;
      }

      // Kiểm tra user đã đăng nhập chưa
      if (!isAuthenticated()) {
        setHasData(false);
        setIsLoading(false);
        return;
      }

      // Load dữ liệu từ Database với retry logic
      let retries = 3;
      let lastError = null;

      while (retries > 0) {
        try {
          console.log(`Đang load dữ liệu từ DB (attempt ${4 - retries}/3)...`);
          const response = await api.numerology.getMyData();

          if (response.data) {
            const data = response.data;
            console.log("✅ Load dữ liệu thành công:", data);

            // Dispatch dữ liệu vào Redux store
            // Number Karma
            dispatch(numberKarmaActions.setKamarNumeroMain(data.number || 0));
            dispatch(
              numberKarmaActions.setKamarNumeroAtitute(data.atitute || 0)
            );
            dispatch(
              numberKarmaActions.setKamarNumeroDayBirth(data.day_birth || 0)
            );
            dispatch(
              numberKarmaActions.setBirthDayNumber(data.birthDayString || "")
            );
            dispatch(
              numberKarmaActions.setBirthDayList(data.birthDayList || "")
            );
            dispatch(numberKarmaActions.setArrow(data.arrow || []));
            dispatch(numberKarmaActions.setLackArrow(data.lack_arrow || []));
            dispatch(numberKarmaActions.setTop4Peak(data.top4 || {}));
            dispatch(
              numberKarmaActions.setStrongListNumb(data.strong_list || [])
            );
            dispatch(numberKarmaActions.setWeakListNumb(data.weak_list || []));

            // Number Name
            dispatch(numberNameActions.setNumberDestiny(data.destiny || 0));
            dispatch(numberNameActions.setNumberName(data.name || 0));
            dispatch(numberNameActions.setNumberSoul(data.soul || 0));
            dispatch(numberNameActions.setNumberInner(data.inner || "0"));
            dispatch(numberNameActions.setNumberExpress(data.express || 0));
            dispatch(numberNameActions.setNumberMature(data.mature || 0));
            dispatch(
              numberNameActions.setFullNameNumber(data.full_name_number || "")
            );
            dispatch(
              numberNameActions.setFullNameList(data.full_name_list || "")
            );

            setHasData(true);
            setIsLoading(false);
            return; // Success - exit the retry loop
          } else {
            // Không có data trong DB
            console.warn("Không tìm thấy dữ liệu trong DB");
            setHasData(false);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          lastError = err;
          console.error(`❌ Lỗi khi load dữ liệu (attempt ${4 - retries}/3):`, err);

          // Nếu là lỗi 404 (không có data), không retry
          if (err.response && err.response.status === 404) {
            console.warn("User chưa có dữ liệu trong DB");
            setHasData(false);
            setIsLoading(false);
            return;
          }

          retries--;

          // Nếu còn retries, đợi một chút rồi thử lại
          if (retries > 0) {
            console.log(`Đợi 1 giây trước khi thử lại...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      // Nếu hết retries mà vẫn lỗi
      console.error("❌ Không thể load dữ liệu sau 3 lần thử:", lastError);
      setHasData(false);
      setIsLoading(false);
    };

    loadData();
  }, [dispatch, mainNumber, birthDay, isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div className="text-center">
          <div
            className="spinner-border"
            style={{ color: "#A07A4A", width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3" style={{ color: "#332211" }}>
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    );
  }

  // Check if we have required data
  if (!hasData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div className="text-center">
          <h2 className="mb-4" style={{ color: "#332211" }}>
            Chưa có dữ liệu
          </h2>
          <p className="mb-4" style={{ color: "#332211" }}>
            {!isAuthenticated() ? (
              <>
                Vui lòng <strong>đăng nhập</strong> để xem dữ liệu thần số học của bạn.
              </>
            ) : (
              <>
                Vui lòng nhập <strong>Họ Tên</strong> &{" "}
                <strong>Ngày Tháng Năm Sinh</strong> để lưu dữ liệu vào hệ thống.
              </>
            )}
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {!isAuthenticated() && (
              <Link
                to="/login"
                className="btn rounded-pill px-4 py-2"
                style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #A07A4A 100%)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Đăng nhập
              </Link>
            )}
            <Link
              to="/name-input"
              className="btn rounded-pill px-4 py-2"
              style={{
                backgroundColor: "#A07A4A",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Nhập thông tin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Background Elements */}
      <div
        className="position-absolute w-100 h-100"
        style={{ pointerEvents: "none", top: 0, left: 0, zIndex: 0 }}
      >
        {/* Animated gradient orbs */}
        <div
          className="position-absolute rounded-circle"
          style={{
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(232, 199, 140, 0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            top: "60%",
            right: "5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(184, 134, 11, 0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        {/* Decorative stars with twinkle effect */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: "#E8C78C",
              borderRadius: "50%",
              opacity: 0.3 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3
                }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: "0 0 4px rgba(232, 199, 140, 0.5)",
            }}
          />
        ))}

        {/* Mystical pattern overlay */}
        <svg
          className="position-absolute"
          style={{
            top: "5%",
            right: "8%",
            width: "120px",
            height: "120px",
            opacity: 0.1,
          }}
        >
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#E8C78C"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="35"
            stroke="#B8860B"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="20"
            stroke="#E8C78C"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <svg
          className="position-absolute"
          style={{
            bottom: "10%",
            left: "5%",
            width: "100px",
            height: "100px",
            opacity: 0.1,
          }}
        >
          <polygon
            points="50,10 90,90 10,90"
            stroke="#E8C78C"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#B8860B"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Add keyframe animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(184, 134, 11, 0.15) !important;
          }
          
          .number-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .number-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(232, 199, 140, 0.3);
          }
        `}
      </style>

      {/* Main container */}
      <div
        className="container-fluid position-relative"
        style={{ zIndex: 1, padding: "2rem 1rem" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* Enhanced Header with gradient */}
            <div className="text-center mb-5" style={{ position: "relative" }}>
              {/* Decorative line */}
              <div
                style={{
                  height: "2px",
                  width: "80px",
                  background:
                    "linear-gradient(90deg, transparent, #E8C78C, transparent)",
                  margin: "0 auto 1.5rem",
                }}
              />

              <h1
                className="display-3 fw-bold mb-2"
                style={{
                  fontFamily: "'Charm', cursive",
                  background:
                    "linear-gradient(135deg, #B8860B 0%, #E8C78C 50%, #B8860B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  position: "relative",
                  letterSpacing: "2px",
                  textShadow: "0 2px 10px rgba(184, 134, 11, 0.1)",
                }}
              >
                Chạm.
                <span
                  className="position-absolute"
                  style={{
                    top: "0",
                    right: "-20px",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#E8C78C",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px rgba(232, 199, 140, 0.6)",
                    animation: "twinkle 2s ease-in-out infinite",
                  }}
                />
              </h1>

              <p
                className="mb-4"
                style={{
                  color: "#6e645b",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  letterSpacing: "0.5px",
                }}
              >
                Hành trình khám phá vận mệnh của bạn
              </p>

              {/* Enhanced action buttons with gradient */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {/* <Link 
                  to="/name-input"
                  className="btn rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, #FFF5E8 100%)',
                    color: '#332211',
                    border: '2px solid #E8C78C',
                    fontWeight: '500',
                    boxShadow: '0 4px 12px rgba(232, 199, 140, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(232, 199, 140, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(232, 199, 140, 0.2)';
                  }}
                >
                  <span>🔄</span> Xem Lại
                </Link> */}
                <Link
                  to="/daily-advice"
                  className="btn rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #B8860B 0%, #A07A4A 100%)",
                    color: "#fff",
                    border: "none",
                    fontWeight: "600",
                    boxShadow: "0 4px 12px rgba(184, 134, 11, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 16px rgba(184, 134, 11, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(184, 134, 11, 0.3)";
                  }}
                >
                  <span>✨</span> Lời Khuyên Hôm Nay
                </Link>
              </div>

              {/* Decorative line */}
              <div
                style={{
                  height: "2px",
                  width: "80px",
                  background:
                    "linear-gradient(90deg, transparent, #E8C78C, transparent)",
                  margin: "1.5rem auto 0",
                }}
              />
            </div>

            {/* User Profile Section - Glass Morphism */}
            <div
              className="card border-0 mb-5 card-hover"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                border: "1px solid rgba(232, 199, 140, 0.3)",
                boxShadow: "0 8px 32px rgba(184, 134, 11, 0.1)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Decorative top border */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #B8860B, #E8C78C, #B8860B)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <div className="card-body p-4 p-md-5">
                <UserProfileSection />
              </div>
            </div>

            {/* Overview Numbers - Grid các số chính */}
            <div
              className="card border-0 mb-5 card-hover"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                border: "1px solid rgba(232, 199, 140, 0.3)",
                boxShadow: "0 8px 32px rgba(184, 134, 11, 0.1)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Decorative top border */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #E8C78C, #B8860B, #E8C78C)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <div className="card-body p-4 p-md-5">
                {/* Section Title with icon */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #E8C78C 0%, #B8860B 100%)",
                      boxShadow: "0 4px 12px rgba(232, 199, 140, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "28px" }}>🔢</span>
                  </div>
                  <h3
                    className="fw-bold mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #B8860B 0%, #332211 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontSize: "1.8rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Tổng Quan Các Con Số
                  </h3>
                  <p
                    style={{
                      color: "#6e645b",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    Những con số định hình vận mệnh của bạn
                  </p>
                </div>
                <OverviewNumber />
              </div>
            </div>

            {/* Charts Section */}
            <div className="mb-5">
              <ChartsSection />
            </div>

            {/* Detail Numbers - Chi tiết từng số */}
            <div
              className="card border-0 mb-5 card-hover"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                border: "1px solid rgba(232, 199, 140, 0.3)",
                boxShadow: "0 8px 32px rgba(184, 134, 11, 0.1)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Decorative top border */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #B8860B, #E8C78C, #B8860B)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />

              <div className="card-body p-4 p-md-5">
                {/* Section Title with icon */}
                <div className="text-center mb-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #B8860B 0%, #A07A4A 100%)",
                      boxShadow: "0 4px 12px rgba(184, 134, 11, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "28px" }}>📖</span>
                  </div>
                  <h3
                    className="fw-bold mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #B8860B 0%, #332211 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontSize: "1.8rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Chi Tiết Các Con Số
                  </h3>
                  <p
                    style={{
                      color: "#6e645b",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    Khám phá ý nghĩa sâu sắc của từng con số
                  </p>
                </div>
                <DetailNumber />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="btn rounded-circle position-fixed d-flex align-items-center justify-content-center"
        style={{
          display: showButton ? "flex" : "none",
          bottom: "30px",
          right: "30px",
          width: "56px",
          height: "56px",
          background: "linear-gradient(135deg, #B8860B 0%, #A07A4A 100%)",
          color: "#fff",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          boxShadow:
            "0 8px 24px rgba(184, 134, 11, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
          zIndex: 1000,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px) scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 12px 32px rgba(184, 134, 11, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(184, 134, 11, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)";
        }}
        aria-label="Scroll to top"
      >
        <FaChevronUp style={{ fontSize: "20px" }} />
      </button>
    </div>
  );
}

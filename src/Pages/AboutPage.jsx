import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaCaretDown, FaQuoteLeft, FaStar } from "react-icons/fa";

export default function AboutPage() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleContinue = () => {
    navigate("/daily-advice");
  };

  const handleViewResults = () => {
    navigate("/numerology-detail");
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(232, 199, 140, 0.2) !important;
        }
        .btn-hover {
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
        }
        .btn-hover:active {
          transform: translateY(0);
        }
        .section-header {
          transition: all 0.2s ease;
        }
        .section-header:hover {
          color: #A07A4A !important;
        }
      `}</style>
      <div
        className="min-vh-100 p-4 position-relative"
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Background astrological elements */}
        <div
          className="position-absolute w-100 h-100"
          style={{ pointerEvents: "none" }}
        >
          {/* Constellation patterns */}
          <div
            className="position-absolute"
            style={{
              top: "5%",
              left: "10%",
              width: "80px",
              height: "50px",
              background:
                "linear-gradient(45deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)",
              opacity: 0.2,
            }}
          />
          <div
            className="position-absolute"
            style={{
              top: "15%",
              right: "15%",
              width: "60px",
              height: "40px",
              background:
                "radial-gradient(circle, #E8C78C 2px, transparent 2px)",
              backgroundSize: "15px 15px",
              opacity: 0.15,
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: "20%",
              left: "5%",
              width: "120px",
              height: "80px",
              background:
                "linear-gradient(135deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)",
              opacity: 0.2,
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: "10%",
              right: "10%",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid #E8C78C",
              opacity: 0.25,
            }}
          />
          {/* Individual stars */}
          <div
            className="position-absolute"
            style={{
              top: "25%",
              left: "20%",
              width: "3px",
              height: "3px",
              backgroundColor: "#E8C78C",
              borderRadius: "50%",
              opacity: 0.3,
            }}
          />
          <div
            className="position-absolute"
            style={{
              top: "35%",
              right: "25%",
              width: "2px",
              height: "2px",
              backgroundColor: "#E8C78C",
              borderRadius: "50%",
              opacity: 0.4,
            }}
          />
          <div
            className="position-absolute"
            style={{
              bottom: "35%",
              left: "25%",
              width: "4px",
              height: "4px",
              backgroundColor: "#E8C78C",
              borderRadius: "50%",
              opacity: 0.3,
            }}
          />
          {/* Crystal ball */}
          <div
            className="position-absolute"
            style={{
              top: "8%",
              right: "8%",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #E8C78C",
              opacity: 0.2,
            }}
          />
          <div
            className="position-absolute"
            style={{
              top: "12%",
              right: "12%",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #E8C78C 1px, transparent 1px)",
              backgroundSize: "8px 8px",
              opacity: 0.15,
            }}
          />
        </div>

        {/* Main container */}
        <div className="container-fluid px-3 px-md-4">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header */}
              <div className="text-center mb-5 mt-4">
                <h1
                  className="display-3 fw-bold mb-3"
                  style={{
                    fontFamily: "'Charm', cursive",
                    color: "#332211",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    position: "relative",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                    letterSpacing: "2px",
                    lineHeight: "1.2",
                  }}
                >
                  Chạm.
                  <FaHeart
                    className="position-absolute"
                    style={{
                      top: "-10px",
                      right: "-20px",
                      fontSize: "28px",
                      color: "#A07A4A",
                      animation: "float 3s ease-in-out infinite",
                      filter: "drop-shadow(0 2px 4px rgba(160, 122, 74, 0.3))",
                    }}
                  />
                </h1>
                <div
                  className="mx-auto"
                  style={{
                    width: "100px",
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, #E8C78C, transparent)",
                    marginTop: "10px",
                  }}
                />
              </div>

              {/* Content Sections */}
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-9">
                  {/* Introductory Quote */}
                  <div
                    className="card border-0 shadow-sm mb-4 mb-md-5 card-hover"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFF9F0 0%, #FCF8F0 100%)",
                      borderRadius: "20px",
                      border: "2px solid #E8C78C",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "15px",
                        opacity: 0.1,
                        fontSize: "60px",
                        color: "#A07A4A",
                      }}
                    >
                      <FaQuoteLeft />
                    </div>
                    <div className="card-body p-4 p-md-5">
                      <p
                        className="mb-0 text-center"
                        style={{
                          color: "#332211",
                          fontSize: "17px",
                          lineHeight: "1.8",
                          fontStyle: "italic",
                          position: "relative",
                          zIndex: 1,
                          fontSize: "clamp(15px, 2vw, 17px)",
                        }}
                      >
                        "CHẠM được sinh ra từ mong muốn giúp con người kết nối
                        lại với chính mình – thông qua những con số, cảm xúc và
                        khoảnh khắc nhỏ bé mỗi ngày. Với CHẠM, Thần số học không
                        còn là những con số khô khan, mà là hành trình dịu dàng
                        để hiểu – cảm – sống sâu hơn."
                      </p>
                    </div>
                  </div>

                  {/* CHẠM - Vì sao được tạo ra */}
                  <div
                    className="card border-0 shadow-sm mb-4 card-hover"
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid #E8C78C",
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 100%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="card-body p-4">
                      <h3
                        className="fw-bold mb-3 section-header"
                        onClick={() => toggleSection("why-created")}
                        style={{
                          color: "#332211",
                          fontSize: "19px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "4px 0",
                        }}
                      >
                        <FaCaretDown
                          style={{
                            color: "#A07A4A",
                            fontSize: "18px",
                            transform: expandedSections["why-created"]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <FaStar
                          style={{
                            color: "#E8C78C",
                            fontSize: "14px",
                            opacity: 0.6,
                          }}
                        />
                        CHẠM - Vì sao được tạo ra
                      </h3>
                      {expandedSections["why-created"] && (
                        <div
                          style={{
                            animation: "fadeIn 0.4s ease",
                            paddingLeft: "28px",
                            borderLeft: "3px solid #E8C78C",
                            marginLeft: "4px",
                          }}
                        >
                          <p
                            className="mb-0"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "1.8",
                            }}
                          >
                            Mọi người đều đang tìm cách hiểu mình, nhưng ít ai
                            có không gian để lắng nghe thật sự. CHẠM ra đời để
                            trở thành nơi mỗi người có thể dừng lại, hít thở, và
                            nhận ra: mình đủ, và mình đang đi đúng hướng.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHẠM - Ý nghĩa của cái tên */}
                  <div
                    className="card border-0 shadow-sm mb-4 card-hover"
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid #E8C78C",
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 100%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="card-body p-4">
                      <h3
                        className="fw-bold mb-3 section-header"
                        onClick={() => toggleSection("name-meaning")}
                        style={{
                          color: "#332211",
                          fontSize: "19px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "4px 0",
                        }}
                      >
                        <FaCaretDown
                          style={{
                            color: "#A07A4A",
                            fontSize: "18px",
                            transform: expandedSections["name-meaning"]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <FaStar
                          style={{
                            color: "#E8C78C",
                            fontSize: "14px",
                            opacity: 0.6,
                          }}
                        />
                        CHẠM - Ý nghĩa của cái tên
                      </h3>
                      {expandedSections["name-meaning"] && (
                        <div
                          style={{
                            animation: "fadeIn 0.4s ease",
                            paddingLeft: "28px",
                            borderLeft: "3px solid #E8C78C",
                            marginLeft: "4px",
                          }}
                        >
                          <p
                            className="mb-0"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "1.8",
                            }}
                          >
                            "CHẠM" là hành động nhỏ nhưng chứa cả thế giới. Một
                            cái chạm có thể mở ra nụ cười, một ký ức, hay một sự
                            thức tỉnh. Mỗi lần bạn chạm vào con số, chính là lúc
                            bạn đang chạm vào phần sâu nhất của linh hồn mình.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHẠM - Triết lý thương hiệu */}
                  <div
                    className="card border-0 shadow-sm mb-4 card-hover"
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid #E8C78C",
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 100%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="card-body p-4">
                      <h3
                        className="fw-bold mb-3 section-header"
                        onClick={() => toggleSection("brand-philosophy")}
                        style={{
                          color: "#332211",
                          fontSize: "19px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "4px 0",
                        }}
                      >
                        <FaCaretDown
                          style={{
                            color: "#A07A4A",
                            fontSize: "18px",
                            transform: expandedSections["brand-philosophy"]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <FaStar
                          style={{
                            color: "#E8C78C",
                            fontSize: "14px",
                            opacity: 0.6,
                          }}
                        />
                        CHẠM - Triết lý thương hiệu
                      </h3>
                      {expandedSections["brand-philosophy"] && (
                        <div
                          style={{
                            animation: "fadeIn 0.4s ease",
                            paddingLeft: "28px",
                            borderLeft: "3px solid #E8C78C",
                            marginLeft: "4px",
                          }}
                        >
                          <p
                            className="fw-bold mb-3"
                            style={{
                              color: "#A07A4A",
                              fontSize: "18px",
                              letterSpacing: "1px",
                            }}
                          >
                            Hiểu - Cảm - Sống.
                          </p>
                          <ul
                            className="mb-0 ps-3"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "2",
                              listStyle: "none",
                            }}
                          >
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Hiểu chính mình qua những con số.
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Cảm được thông điệp và năng lượng của ngày, tháng,
                              năm.
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Sống thật, theo nhịp tự nhiên của bản thân.
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHẠM - Cách CHẠM hoạt động */}
                  <div
                    className="card border-0 shadow-sm mb-4 card-hover"
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid #E8C78C",
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 100%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="card-body p-4">
                      <h3
                        className="fw-bold mb-3 section-header"
                        onClick={() => toggleSection("how-it-works")}
                        style={{
                          color: "#332211",
                          fontSize: "19px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "4px 0",
                        }}
                      >
                        <FaCaretDown
                          style={{
                            color: "#A07A4A",
                            fontSize: "18px",
                            transform: expandedSections["how-it-works"]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <FaStar
                          style={{
                            color: "#E8C78C",
                            fontSize: "14px",
                            opacity: 0.6,
                          }}
                        />
                        CHẠM - Cách CHẠM hoạt động
                      </h3>
                      {expandedSections["how-it-works"] && (
                        <div
                          style={{
                            animation: "fadeIn 0.4s ease",
                            paddingLeft: "28px",
                            borderLeft: "3px solid #E8C78C",
                            marginLeft: "4px",
                          }}
                        >
                          <p
                            className="mb-3"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "1.8",
                              fontWeight: "500",
                            }}
                          >
                            CHẠM dùng Thần số học như chiếc la bàn tinh thần:
                          </p>
                          <ul
                            className="mb-0 ps-0"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "2",
                              listStyle: "none",
                            }}
                          >
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Mỗi ngày, bạn nhận được năng lượng riêng (theo
                              ngày, tháng, năm cá nhân).
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Những câu gợi ý nhẹ nhàng giúp bạn điều chỉnh cảm
                              xúc và hành động.
                            </li>
                            <li
                              style={{
                                marginBottom: "10px",
                                paddingLeft: "20px",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: "0",
                                  color: "#A07A4A",
                                }}
                              >
                                •
                              </span>
                              Các con số được tính toán tự động, nhưng diễn giải
                              bằng ngôn ngữ của trái tim.
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHẠM – Sứ mệnh và tầm nhìn */}
                  <div
                    className="card border-0 shadow-sm mb-5 card-hover"
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid #E8C78C",
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #FFF9F0 100%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="card-body p-4">
                      <h3
                        className="fw-bold mb-3 section-header"
                        onClick={() => toggleSection("mission-vision")}
                        style={{
                          color: "#332211",
                          fontSize: "19px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                          userSelect: "none",
                          padding: "4px 0",
                        }}
                      >
                        <FaCaretDown
                          style={{
                            color: "#A07A4A",
                            fontSize: "18px",
                            transform: expandedSections["mission-vision"]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        <FaStar
                          style={{
                            color: "#E8C78C",
                            fontSize: "14px",
                            opacity: 0.6,
                          }}
                        />
                        CHẠM – Sứ mệnh và tầm nhìn
                      </h3>
                      {expandedSections["mission-vision"] && (
                        <div
                          style={{
                            animation: "fadeIn 0.4s ease",
                            paddingLeft: "28px",
                            borderLeft: "3px solid #E8C78C",
                            marginLeft: "4px",
                          }}
                        >
                          <p
                            className="mb-0"
                            style={{
                              color: "#332211",
                              fontSize: "15.5px",
                              lineHeight: "1.8",
                            }}
                          >
                            CHẠM không chỉ là ứng dụng hay website xem Thần số
                            học, mà là một hành trình chữa lành tập thể. Chúng
                            tôi tin rằng khi mỗi người hiểu mình hơn, thế giới
                            sẽ nhẹ nhàng hơn. Sứ mệnh: lan tỏa thói quen "chạm
                            vào bản thân mỗi ngày" – qua con số, qua cảm xúc,
                            qua sự tĩnh lặng. Tầm nhìn: trở thành thương hiệu
                            tinh thần Việt giúp con người sống sâu, sống tỉnh
                            thức và đầy yêu thương.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="text-center mb-5">
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                      <button
                        onClick={handleViewResults}
                        className="btn border-0 rounded-pill px-5 py-3 btn-hover"
                        style={{
                          background:
                            "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                          color: "white",
                          fontSize: "17px",
                          fontWeight: "600",
                          boxShadow: "0 6px 20px rgba(40, 167, 69, 0.4)",
                          letterSpacing: "0.5px",
                          minWidth: "200px",
                        }}
                      >
                        Xem Kết Quả Thần Số
                      </button>
                      <button
                        onClick={handleContinue}
                        className="btn border-0 rounded-pill px-5 py-3 btn-hover"
                        style={{
                          background:
                            "linear-gradient(135deg, #A07A4A 0%, #C99A6A 100%)",
                          color: "white",
                          fontSize: "17px",
                          fontWeight: "600",
                          boxShadow: "0 6px 20px rgba(160, 122, 74, 0.4)",
                          letterSpacing: "0.5px",
                          minWidth: "200px",
                        }}
                      >
                        Lời Khuyên Hàng Ngày
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

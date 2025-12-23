import { useSelector } from "react-redux";
import ChartDateName from "../DetailNumber/ChartDateName";
import ChartCombineEnergy from "../DetailNumber/ChartCombineEnergy";
export default function ChartsSection() {
  const birth_day = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_numb = useSelector(
    (state) => state.numberName.full_name_number
  );

  const combine_numb_birth_name =
    birth_day && full_name_numb ? birth_day + "" + full_name_numb : null;

  if (!birth_day) {
    return null;
  }

  return (
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
          background: "linear-gradient(90deg, #E8C78C, #B8860B, #E8C78C)",
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
              background: "linear-gradient(135deg, #E8C78C 0%, #A07A4A 100%)",
              boxShadow: "0 4px 12px rgba(232, 199, 140, 0.3)",
            }}
          >
            <span style={{ fontSize: "28px" }}>📊</span>
          </div>
          <h3
            className="fw-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #B8860B 0%, #332211 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.8rem",
              letterSpacing: "1px",
            }}
          >
            Biểu Đồ Thần Số Học
          </h3>
          <p
            style={{
              color: "#6e645b",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            Trực quan hóa năng lượng của bạn
          </p>
        </div>

        {/* Combined Birth & Name Charts in Single Container */}
        <div className="mb-4">
          <div
            className="p-4 p-md-5 rounded-4 position-relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(232, 199, 140, 0.08) 0%, rgba(255, 255, 255, 0.7) 100%)",
              border: "2px solid rgba(232, 199, 140, 0.25)",
              boxShadow: "0 6px 20px rgba(184, 134, 11, 0.12)",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            {/* Dual chart header */}
            <div className="row mb-3">
              <div className="col-6 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: "44px",
                    height: "44px",
                    background:
                      "linear-gradient(135deg, #52B788 0%, #28a745 100%)",
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px rgba(82, 183, 136, 0.3)",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>🎂</span>
                </div>
                <h6
                  className="fw-bold mb-0"
                  style={{
                    color: "#28a745",
                    fontSize: "0.85rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  NGÀY SINH
                </h6>
              </div>

              <div className="col-6 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: full_name_numb
                      ? "linear-gradient(135deg, #C4A1D8 0%, #9b59b6 100%)"
                      : "linear-gradient(135deg, #ccc 0%, #999 100%)",
                    borderRadius: "10px",
                    boxShadow: full_name_numb
                      ? "0 3px 10px rgba(155, 89, 182, 0.3)"
                      : "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>
                    {full_name_numb ? "✨" : "❓"}
                  </span>
                </div>
                <h6
                  className="fw-bold mb-0"
                  style={{
                    color: full_name_numb ? "#9b59b6" : "#999",
                    fontSize: "0.85rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  HỌ TÊN
                </h6>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(232, 199, 140, 0.3), transparent)",
                margin: "1rem 0",
              }}
            />

            {/* Charts Row */}
            <div className="row g-4 g-md-3">
              <div className="col-12 col-md-6">
                <div
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <ChartDateName
                    numbersData={birth_day}
                    color="#28a745"
                    buttonText="XEM CHI TIẾT NGÀY SINH"
                    buttonColor="#28a745"
                    id_link="date_to_known"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <ChartDateName
                    numbersData={full_name_numb || ""}
                    color="#9b59b6"
                    buttonText={
                      full_name_numb ? "XEM CHI TIẾT HỌ TÊN" : "CHƯA CÓ DỮ LIỆU"
                    }
                    buttonColor="#9b59b6"
                    disabled={!full_name_numb}
                    id_link="date_to_known"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Chart (Separate Premium Section) */}

        <div className="mb-4 mx-3">
          {combine_numb_birth_name && (
            <div
              className="p-4 rounded-4 position-relative card-hover"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232, 199, 140, 0.1) 0%, rgba(255, 248, 240, 0.8) 100%)",
                border: "2px solid rgba(232, 199, 140, 0.3)",
                boxShadow: "0 8px 24px rgba(184, 134, 11, 0.15)",
                overflow: "hidden",
              }}
            >
              {/* Header with Icon */}
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "64px",
                    height: "64px",
                    background:
                      "linear-gradient(135deg, #E8C78C 0%, #B8860B 100%)",
                    borderRadius: "16px",
                    boxShadow: "0 6px 16px rgba(232, 199, 140, 0.4)",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                >
                  <span style={{ fontSize: "32px" }}>🌟</span>
                </div>

                <h4
                  className="fw-bold mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #B8860B 0%, #E8C78C 50%, #B8860B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "1.4rem",
                    letterSpacing: "1.5px",
                  }}
                >
                  NĂNG LƯỢNG TỔNG HỢP
                </h4>
                <p
                  className="mb-0"
                  style={{
                    color: "#6e645b",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                  }}
                >
                  ⚡ Phân tích độ mạnh yếu của các con số trong cuộc đời bạn
                </p>
              </div>

              {/* Decorative divider */}
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, #E8C78C, transparent)",
                  margin: "0 auto 1.5rem",
                  width: "60%",
                }}
              />

              <div className="d-flex justify-content-center">
                <ChartCombineEnergy
                  color="#B8860B"
                  buttonText="TÓM TẮT VỀ BẠN"
                  buttonColor="#B8860B"
                  id_link="summary_all"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

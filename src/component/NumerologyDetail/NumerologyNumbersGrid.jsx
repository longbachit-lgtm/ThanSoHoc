import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NumerologyNumbersGrid() {
  const navigate = useNavigate();
  
  // Get numbers from Redux store
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const nameNumber = useSelector((state) => state.numberName.name);
  const destinyNumber = useSelector((state) => state.numberName.destiny);
  const atituteNumber = useSelector((state) => state.numberKarmaMain.atitute);
  const matureNumber = useSelector((state) => state.numberName.mature);
  const dayBirthNumber = useSelector((state) => state.numberKarmaMain.day_birth);
  const soulNumber = useSelector((state) => state.numberName.soul);
  const expressNumber = useSelector((state) => state.numberName.express);

  const handleNumberClick = (type, number) => {
    // Navigate to detail page with number type
    navigate(`/numerology-detail/${type}`, { state: { number, type } });
  };

  const numbers = [
    {
      label: "SỐ CHỦ ĐẠO",
      value: mainNumber || 0,
      color: "#28a745", // Green
      type: "main"
    },
    {
      label: "SỐ TÊN RIÊNG",
      value: nameNumber || 0,
      color: "#28a745", // Green
      type: "name"
    },
    {
      label: "SỐ ĐƯỜNG ĐỜI",
      value: mainNumber || 0,
      color: "#3498da", // Blue
      type: "life-path"
    },
    {
      label: "SỐ ĐỊNH MỆNH",
      value: destinyNumber || 0,
      color: "#9b59b6", // Purple
      type: "destiny"
    },
    {
      label: "SỐ THÁI ĐỘ",
      value: atituteNumber || 0,
      color: "#e74c3c", // Red
      type: "attitude"
    },
    {
      label: "SỐ TRƯỞNG THÀNH",
      value: matureNumber || 0,
      color: "#3498da", // Blue
      type: "mature"
    },
    {
      label: "SỐ NGÀY SINH",
      value: dayBirthNumber || 0,
      color: "#28a745", // Green
      type: "birth-day"
    },
    {
      label: "SỐ LINH HỒN",
      value: soulNumber || 0,
      color: "#28a745", // Green
      type: "soul"
    },
    {
      label: "SỐ BIỂU ĐẠT",
      value: expressNumber || 0,
      color: "#3498da", // Blue
      type: "express"
    }
  ];

  return (
    <div 
      className="card border-0 shadow-sm mb-4"
      style={{
        backgroundColor: '#FCF8F0',
        borderRadius: '15px',
        border: '1px solid #E8C78C'
      }}
    >
      <div className="card-body p-4">
        <div className="row g-3">
          {numbers.map((item, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="text-center">
                <p 
                  className="mb-2 fw-bold"
                  style={{
                    color: '#332211',
                    fontSize: '14px'
                  }}
                >
                  {item.label}
                </p>
                <button
                  onClick={() => handleNumberClick(item.type, item.value)}
                  className="btn border-0 rounded-pill w-100 py-3"
                  style={{
                    backgroundColor: item.color,
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {item.value || '?'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


import { useSelector } from "react-redux";
import UserProfileSection from "../component/NumerologyDetail/UserProfileSection";
import NumerologyNumbersGrid from "../component/NumerologyDetail/NumerologyNumbersGrid";
import ChartsSection from "../component/NumerologyDetail/ChartsSection";

export default function NumerologyDetailPage() {
  const mainNumber = useSelector((state) => state.numberKarmaMain.number);
  const birthDay = useSelector((state) => state.numberKarmaMain.birth_day);

  // Check if we have required data
  if (!mainNumber && !birthDay) {
    // Try to get from localStorage
    const userBirthDate = localStorage.getItem('userBirthDate');
    const userFullName = localStorage.getItem('userFullName');
    
    if (!userBirthDate || !userFullName) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
          <div className="text-center">
            <h2 className="mb-4" style={{ color: '#332211' }}>Chưa có dữ liệu</h2>
            <p className="mb-4" style={{ color: '#332211' }}>
              Vui lòng quay lại nhập <strong>Họ Tên</strong> &{" "}
              <strong>Ngày Tháng Năm Sinh</strong> để tiếp tục.
            </p>
            <a
              href="/name-input"
              className="btn rounded-pill px-4 py-2"
              style={{
                backgroundColor: '#A07A4A',
                color: '#fff'
              }}
            >
              Quay lại nhập thông tin
            </a>
          </div>
        </div>
      );
    }
  }

  return (
    <div 
      className="min-vh-100 p-4"
      style={{
        background: "#FDFBF6",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(232, 199, 140, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(232, 199, 140, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Background astrological elements */}
      <div className="position-absolute w-100 h-100" style={{ pointerEvents: 'none', top: 0, left: 0 }}>
        {/* Stars and constellations */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: '#E8C78C',
              borderRadius: '50%',
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}
        
        {/* Constellation patterns */}
        <div 
          className="position-absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '100px',
            height: '60px',
            background: 'linear-gradient(45deg, transparent 40%, #E8C78C 40%, #E8C78C 60%, transparent 60%)',
            opacity: 0.15
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '15%',
            right: '5%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid #E8C78C',
            opacity: 0.2
          }}
        />
      </div>

      {/* Main container */}
      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* User Profile Section */}
            <div 
              className="card border-0 shadow-sm mb-4"
              style={{
                backgroundColor: '#FCF8F0',
                borderRadius: '15px',
                border: '1px solid #E8C78C'
              }}
            >
              <div className="card-body p-4">
                <UserProfileSection />
              </div>
            </div>

            {/* Numerology Numbers Grid */}
            <NumerologyNumbersGrid />

            {/* Charts Section */}
            <ChartsSection />
          </div>
        </div>
      </div>
    </div>
  );
}


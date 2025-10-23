import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NameInputPage() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      alert("Vui lòng nhập họ và tên!");
      return;
    }
    
    // TODO: Lưu tên vào store hoặc localStorage
    localStorage.setItem('userFullName', fullName.trim());
    
    // Chuyển đến trang nhập ngày sinh hoặc trang tiếp theo
    navigate("/birth-date");
  };

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

            {/* Name Input Card */}
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
                  Họ Và Tên
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Nhập họ và tên của bạn"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #E8C78C',
                        backgroundColor: '#fff',
                        padding: '12px 16px',
                        fontSize: '15px',
                        color: '#332211',
                        textAlign: 'center'
                      }}
                      required
                    />
                  </div>

                  {/* Descriptive Text */}
                  <div className="text-center mb-4">
                    <p 
                      className="fst-italic mb-0"
                      style={{
                        color: '#6e645b',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}
                    >
                      Tên bạn không chỉ là âm thanh – đó là nhịp điệu mà vũ trụ gọi bạn mỗi ngày.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-lg border-0"
                      style={{
                        backgroundColor: '#A07A4A',
                        borderRadius: '50px',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        boxShadow: '0 4px 12px rgba(160, 122, 74, 0.3)'
                      }}
                    >
                      <span 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRight: '3px solid white',
                          borderBottom: '3px solid white',
                          transform: 'rotate(-45deg)',
                          marginLeft: '2px'
                        }}
                      />
                    </button>
                  </div>
                </form>
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
                Chạm
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

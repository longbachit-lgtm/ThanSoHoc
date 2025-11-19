import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        setError("Vui lòng nhập đầy đủ thông tin!");
        setLoading(false);
        return;
      }

      const response = await api.auth.login(username.trim(), password);
      
      // Lưu thông tin đăng nhập
      login(response.data.user, response.data.accessToken, response.data.refreshToken);
      
      // Kiểm tra xem user đã có dữ liệu thần số học chưa
      try {
        const numerologyResponse = await api.numerology.getMyData();
        
        if (numerologyResponse.data) {
          // Đã có dữ liệu → Navigate đến /about
          navigate("/about");
        } else {
          // Chưa có dữ liệu → Navigate đến flow nhập thông tin
          navigate("/name-input");
        }
      } catch (err) {
        // Nếu lỗi hoặc chưa có data → Navigate đến flow nhập thông tin
        navigate("/name-input");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const skipLogin = () => {
    alert("Bỏ qua đăng nhập (demo)");
    // Chuyển đến trang nhập họ tên khi bỏ qua đăng nhập
    navigate("/name-input");
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
            {/* Logo */}
            <div className="text-center mb-4">
              <h1 
                className="display-4 fw-bold mb-0"
                style={{
                  fontFamily: "'Charm', cursive",
                  color: '#332211',
                  fontSize: '2.5rem',
                  position: 'relative'
                }}
              >
      
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

            {/* Login Card */}
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
                    color: '#332211',
                    fontSize: '1.5rem',
                    letterSpacing: '1px'
                  }}
                >
                  ĐĂNG NHẬP
                </h2>

                <form onSubmit={submit}>
                  {error && (
                    <div className="mb-3 alert alert-danger" role="alert" style={{
                      borderRadius: '12px',
                      fontSize: '14px',
                      padding: '10px 15px'
                    }}>
                      {error}
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #E8C78C',
                        backgroundColor: '#fff',
                        padding: '12px 16px',
                        fontSize: '15px',
                        color: '#332211'
                      }}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #E8C78C',
                        backgroundColor: '#fff',
                        padding: '12px 16px',
                        fontSize: '15px',
                        color: '#332211'
                      }}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mb-4">
                    <button
                      type="submit"
                      className="btn btn-lg border-0"
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? '#d6c0a1' : '#B8860B',
                        borderRadius: '50px',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        boxShadow: loading ? 'none' : '0 4px 12px rgba(184, 134, 11, 0.3)',
                        cursor: loading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? (
                        <div className="spinner-border spinner-border-sm text-white" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
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
                      )}
                    </button>
                  </div>

                  {/* Links */}
                  <div className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                      <Link 
                        to="/signup" 
                        className="text-decoration-none"
                        style={{ color: '#007bff', fontSize: '14px' }}
                      >
                        Đăng kí.
                      </Link>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ 
                          color: '#6e645b', 
                          fontSize: '14px',
                          border: 'none',
                          background: 'none'
                        }}
                        onClick={skipLogin}
                      >
                        Bỏ qua bước đăng nhập
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

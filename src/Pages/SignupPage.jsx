import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/about", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!formData.username.trim()) {
      setError("Vui lòng nhập tên đăng nhập!");
      return;
    }
    
    if (!formData.registrationCode.trim()) {
      setError("Vui lòng nhập mã CODE đăng ký!");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.auth.register(
        formData.username.trim(),
        formData.password,
        formData.fullName.trim() || null,
        formData.email.trim() || null,
        formData.registrationCode.trim()
      );
      
      // Đăng ký thành công
      if (response && response.data) {
        // Tự động đăng nhập sau khi đăng ký (nếu API trả về token)
        if (response.data.accessToken && response.data.user) {
          login(
            response.data.user,
            response.data.accessToken,
            response.data.refreshToken || null
          );
          // Redirect đến trang nhập thông tin hoặc trang chính
          navigate("/name-input", { replace: true });
        } else {
          // Chỉ có thông báo, chưa tự động login
          alert("Đăng ký thành công! Vui lòng đăng nhập.");
          navigate("/login");
        }
      } else {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = "Đăng ký thất bại, vui lòng thử lại!";
      
      if (err.response) {
        // Lỗi từ server
        const status = err.response.status;
        if (status === 400) {
          errorMessage = err.response.data?.message || "Thông tin đăng ký không hợp lệ!";
        } else if (status === 403) {
          errorMessage = err.response.data?.message || "Mã CODE không hợp lệ hoặc đã được sử dụng!";
        } else if (status === 409) {
          errorMessage = err.response.data?.message || "Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.";
        } else if (status === 500) {
          errorMessage = "Lỗi server, vui lòng thử lại sau!";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // Không nhận được response từ server
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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

            {/* Signup Card */}
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
                  ĐĂNG KÝ
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
                      name="username"
                      className="form-control form-control-lg"
                      placeholder="Tên đăng nhập *"
                      value={formData.username}
                      onChange={handleChange}
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
                  
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control form-control-lg"
                      placeholder="Họ và tên"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #E8C78C',
                        backgroundColor: '#fff',
                        padding: '12px 16px',
                        fontSize: '15px',
                        color: '#332211'
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #E8C78C',
                        backgroundColor: '#fff',
                        padding: '12px 16px',
                        fontSize: '15px',
                        color: '#332211'
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="registrationCode"
                      className="form-control form-control-lg"
                      placeholder="Mã CODE đăng ký *"
                      value={formData.registrationCode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          registrationCode: e.target.value.toUpperCase()
                        });
                        setError("");
                      }}
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
                  
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
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
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                    <Link 
                      to="/login" 
                      className="text-decoration-none"
                      style={{ 
                        color: '#A07A4A', 
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#B8860B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#A07A4A';
                      }}
                    >
                      Đã có tài khoản? Đăng nhập ngay
                    </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}

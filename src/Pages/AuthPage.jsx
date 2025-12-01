import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated()) {
      // Lấy location từ state hoặc redirect về trang about để chọn
      const from = location.state?.from?.pathname || "/about";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const populateStoreFromData = (data) => {
    dispatch(numberKarmaActions.setKamarNumeroMain(data.number || 0));
    dispatch(numberKarmaActions.setKamarNumeroAtitute(data.atitute || 0));
    dispatch(numberKarmaActions.setKamarNumeroDayBirth(data.day_birth || 0));
    dispatch(numberKarmaActions.setBirthDayNumber(data.birthDayString || ""));
    dispatch(numberKarmaActions.setBirthDayList(data.birthDayList || ""));
    dispatch(numberKarmaActions.setArrow(data.arrow || []));
    dispatch(numberKarmaActions.setLackArrow(data.lack_arrow || []));
    dispatch(numberKarmaActions.setTop4Peak(data.top4 || {}));
    dispatch(numberKarmaActions.setStrongListNumb(data.strong_list || []));
    dispatch(numberKarmaActions.setWeakListNumb(data.weak_list || []));

    dispatch(numberNameActions.setNumberDestiny(data.destiny || 0));
    dispatch(numberNameActions.setNumberName(data.name || 0));
    dispatch(numberNameActions.setNumberSoul(data.soul || 0));
    dispatch(numberNameActions.setNumberInner(data.inner || "0"));
    dispatch(numberNameActions.setNumberExpress(data.express || 0));
    dispatch(numberNameActions.setNumberMature(data.mature || 0));
    dispatch(numberNameActions.setFullNameNumber(data.full_name_number || ""));
    dispatch(numberNameActions.setFullNameList(data.full_name_list || ""));

    if (data.full_name_list) {
      localStorage.setItem('userFullName', data.full_name_list);
    }

    if (data.birthDayList) {
      const parts = data.birthDayList.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts.map((part) => parseInt(part, 10));
        if (!Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)) {
          localStorage.setItem('userBirthDate', JSON.stringify({ day, month, year }));
        }
      }
    }
  };

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
      
      // Validate response
      if (!response || !response.data) {
        throw new Error("Phản hồi từ server không hợp lệ!");
      }

      if (!response.data.accessToken || !response.data.user) {
        throw new Error("Thông tin đăng nhập không đầy đủ!");
      }
      
      // Lưu thông tin đăng nhập
      login(
        response.data.user, 
        response.data.accessToken, 
        response.data.refreshToken || null
      );
      
      // Kiểm tra xem user đã có dữ liệu thần số học chưa
      try {
        const numerologyResponse = await api.numerology.getMyData();
        
        if (numerologyResponse.data) {
          populateStoreFromData(numerologyResponse.data);
          
          // Redirect về trang mà user muốn truy cập trước đó hoặc trang about để chọn
          const from = location.state?.from?.pathname || "/about";
          navigate(from, { replace: true });
        } else {
          // Chưa có dữ liệu → Navigate đến flow nhập thông tin
          const from = location.state?.from?.pathname;
          if (from && from.startsWith('/name-input')) {
            navigate("/name-input", { replace: true });
          } else {
            navigate("/name-input", { replace: true });
          }
        }
      } catch (err) {
        console.error("Error loading numerology data:", err);
        // Nếu lỗi hoặc chưa có data → Navigate đến flow nhập thông tin
        navigate("/name-input", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = "Đăng nhập thất bại, vui lòng thử lại!";
      
      // Check for network errors first
      if (err.isNetworkError || err.name === 'TypeError') {
        errorMessage = err.message || "Không thể kết nối đến server. Vui lòng:\n" +
          "1. Đảm bảo backend server đang chạy tại http://localhost:5000\n" +
          "2. Kiểm tra kết nối mạng\n" +
          "3. Kiểm tra console để xem chi tiết lỗi";
      } else if (err.response) {
        // Lỗi từ server
        const status = err.response.status;
        if (status === 401) {
          errorMessage = err.response.data?.message || "Tên đăng nhập hoặc mật khẩu không đúng!";
        } else if (status === 404) {
          errorMessage = err.response.data?.message || "Không tìm thấy tài khoản!";
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
                    <Link 
                      to="/signup" 
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
                      Chưa có tài khoản? Đăng ký ngay
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

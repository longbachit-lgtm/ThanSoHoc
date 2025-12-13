import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      [e.target.name]: e.target.value,
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
          errorMessage =
            err.response.data?.message || "Thông tin đăng ký không hợp lệ!";
        } else if (status === 403) {
          errorMessage =
            err.response.data?.message ||
            "Mã CODE không hợp lệ hoặc đã được sử dụng!";
        } else if (status === 409) {
          errorMessage =
            err.response.data?.message ||
            "Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.";
        } else if (status === 500) {
          errorMessage = "Lỗi server, vui lòng thử lại sau!";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // Không nhận được response từ server
        errorMessage =
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
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
                  color: "#332211",
                  fontSize: "2.5rem",
                  position: "relative",
                }}
              >
                Chạm
                <span
                  className="position-absolute"
                  style={{
                    top: "-5px",
                    right: "-15px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#E8C78C",
                    borderRadius: "50%",
                  }}
                />
              </h1>
            </div>

            {/* Signup Card */}
            <div
              className="card border-0 shadow-sm"
              style={{
                backgroundColor: "#FCF8F0",
                borderRadius: "20px",
                border: "1px solid #E8C78C",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <h2
                  className="text-center fw-bold mb-4"
                  style={{
                    color: "#332211",
                    fontSize: "1.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  ĐĂNG KÝ
                </h2>

                <form onSubmit={submit}>
                  {error && (
                    <div
                      className="mb-3 alert alert-danger"
                      role="alert"
                      style={{
                        borderRadius: "12px",
                        fontSize: "14px",
                        padding: "10px 15px",
                      }}
                    >
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
                        borderRadius: "12px",
                        border: "2px solid #E8C78C",
                        backgroundColor: "#fff",
                        padding: "12px 16px",
                        fontSize: "15px",
                        color: "#332211",
                      }}
                      required
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
                        borderRadius: "12px",
                        border: "2px solid #E8C78C",
                        backgroundColor: "#fff",
                        padding: "12px 16px",
                        fontSize: "15px",
                        color: "#332211",
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
                          registrationCode: e.target.value.toUpperCase(),
                        });
                        setError("");
                      }}
                      disabled={loading}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #E8C78C",
                        backgroundColor: "#fff",
                        padding: "12px 16px",
                        fontSize: "15px",
                        color: "#332211",
                      }}
                      required
                    />
                  </div>

                  <div className="mb-3" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #E8C78C",
                        backgroundColor: "#fff",
                        padding: "12px 45px 12px 16px",
                        fontSize: "15px",
                        color: "#332211",
                      }}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#A07A4A",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        userSelect: "none",
                      }}
                    >
                      {showPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>

                  <div className="mb-4" style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #E8C78C",
                        backgroundColor: "#fff",
                        padding: "12px 45px 12px 16px",
                        fontSize: "15px",
                        color: "#332211",
                      }}
                      required
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#A07A4A",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        userSelect: "none",
                      }}
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mb-4">
                    <button
                      type="submit"
                      className="btn btn-lg border-0"
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? "#d6c0a1" : "#B8860B",
                        borderRadius: "50px",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        boxShadow: loading
                          ? "none"
                          : "0 4px 12px rgba(184, 134, 11, 0.3)",
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                    >
                      {loading ? (
                        <div
                          className="spinner-border spinner-border-sm text-white"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRight: "3px solid white",
                            borderBottom: "3px solid white",
                            transform: "rotate(-45deg)",
                            marginLeft: "-5px",
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
                        color: "#A07A4A",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#B8860B";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#A07A4A";
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
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#d6c0a1",
                    opacity: 0.6,
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#B8860B",
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#d6c0a1",
                    opacity: 0.6,
                  }}
                />
                <span
                  className="rounded-circle"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#d6c0a1",
                    opacity: 0.6,
                  }}
                />
                <span
                  className="rounded-circle border"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderColor: "#B8860B",
                    borderWidth: "2px",
                    backgroundColor: "transparent",
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

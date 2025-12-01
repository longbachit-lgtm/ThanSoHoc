import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";

export default function RegistrationCodeAdminPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("all"); // all, used, unused, expired
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });

  // Create form state
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    expiresAt: "",
    quantity: 1
  });

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Load codes function
  const loadCodes = useCallback(async () => {
    // Double check authentication
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        filter: filter
      };
      
      const response = await api.registrationCode.getAll(params);
      
      if (response && response.data) {
        setCodes(response.data.codes || []);
        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            total: response.data.pagination.total,
            pages: response.data.pagination.pages
          }));
        }
      }
    } catch (err) {
      console.error("Load codes error:", err);
      setError(err.message || "Không thể tải danh sách mã CODE. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [filter, pagination.page, pagination.limit, isAuthenticated, navigate]);

  // Load codes when filter or page changes
  useEffect(() => {
    if (isAuthenticated()) {
      loadCodes();
    }
  }, [filter, pagination.page, loadCodes, isAuthenticated]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const codeData = {
        code: formData.code.trim() || undefined, // undefined để auto-generate
        description: formData.description.trim() || null,
        expiresAt: formData.expiresAt || null,
        quantity: parseInt(formData.quantity) || 1
      };

      const response = await api.registrationCode.create(codeData);
      
      if (response && response.data) {
        setSuccess(response.message || "Tạo mã CODE thành công!");
        setShowCreateForm(false);
        setFormData({ code: "", description: "", expiresAt: "", quantity: 1 });
        loadCodes();
      }
    } catch (err) {
      console.error("Create code error:", err);
      setError(err.message || "Không thể tạo mã CODE. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mã CODE này?")) {
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.registrationCode.delete(id);
      setSuccess("Xóa mã CODE thành công!");
      loadCodes();
    } catch (err) {
      console.error("Delete code error:", err);
      setError(err.message || "Không thể xóa mã CODE. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setSuccess(`Đã copy mã CODE: ${code}`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không có";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const isExpired = (code) => {
    if (!code.expiresAt) return false;
    return new Date(code.expiresAt) < new Date();
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      padding: "20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ 
          background: "white", 
          borderRadius: "15px", 
          padding: "25px", 
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ margin: 0, color: "#333", fontSize: "28px", fontWeight: "bold" }}>
              Quản lý mã CODE đăng ký
            </h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
            >
              {showCreateForm ? "✕ Đóng" : "+ Tạo mã CODE"}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div style={{
            background: "#fee",
            border: "1px solid #fcc",
            color: "#c33",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{
            background: "#efe",
            border: "1px solid #cfc",
            color: "#3c3",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            {success}
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div style={{
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
              Tạo mã CODE mới
            </h2>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#555" }}>
                  Mã CODE (để trống để tự động tạo)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="VD: ABC12345"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "2px solid #ddd",
                    fontSize: "16px"
                  }}
                  maxLength={20}
                  pattern="[A-Z0-9]{6,20}"
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#555" }}>
                  Mô tả (tùy chọn)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả mã CODE"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "2px solid #ddd",
                    fontSize: "16px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#555" }}>
                  Ngày hết hạn (tùy chọn)
                </label>
                <input
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "2px solid #ddd",
                    fontSize: "16px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#555" }}>
                  Số lượng (1-100)
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) })}
                  min={1}
                  max={100}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "2px solid #ddd",
                    fontSize: "16px"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? "Đang tạo..." : "Tạo mã CODE"}
              </button>
            </form>
          </div>
        )}

        {/* Filter */}
        <div style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["all", "unused", "used", "expired"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: filter === f ? "2px solid #667eea" : "2px solid #ddd",
                  background: filter === f ? "#667eea" : "white",
                  color: filter === f ? "white" : "#333",
                  cursor: "pointer",
                  fontWeight: filter === f ? "600" : "400"
                }}
              >
                {f === "all" ? "Tất cả" : f === "unused" ? "Chưa dùng" : f === "used" ? "Đã dùng" : "Hết hạn"}
              </button>
            ))}
          </div>
        </div>

        {/* Codes List */}
        <div style={{
          background: "white",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          {loading && codes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              Đang tải...
            </div>
          ) : codes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              Không có mã CODE nào.
            </div>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #eee" }}>
                      <th style={{ padding: "12px", textAlign: "left", color: "#666", fontWeight: "600" }}>Mã CODE</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#666", fontWeight: "600" }}>Mô tả</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#666", fontWeight: "600" }}>Hết hạn</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#666", fontWeight: "600" }}>Trạng thái</th>
                      <th style={{ padding: "12px", textAlign: "left", color: "#666", fontWeight: "600" }}>Người dùng</th>
                      <th style={{ padding: "12px", textAlign: "center", color: "#666", fontWeight: "600" }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.map((code) => (
                      <tr key={code._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "12px" }}>
                          <code style={{
                            background: "#f5f5f5",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontFamily: "monospace",
                            fontWeight: "600",
                            color: "#333"
                          }}>
                            {code.code}
                          </code>
                        </td>
                        <td style={{ padding: "12px", color: "#666" }}>
                          {code.description || "-"}
                        </td>
                        <td style={{ padding: "12px", color: "#666" }}>
                          {formatDate(code.expiresAt)}
                        </td>
                        <td style={{ padding: "12px" }}>
                          {code.isUsed ? (
                            <span style={{
                              background: "#fee",
                              color: "#c33",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              Đã dùng
                            </span>
                          ) : isExpired(code) ? (
                            <span style={{
                              background: "#fff3cd",
                              color: "#856404",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              Hết hạn
                            </span>
                          ) : (
                            <span style={{
                              background: "#efe",
                              color: "#3c3",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              Chưa dùng
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "12px", color: "#666" }}>
                          {code.usedBy ? (
                            code.usedBy.username || code.usedBy.fullname || "-"
                          ) : (
                            "-"
                          )}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                            <button
                              onClick={() => handleCopy(code.code)}
                              style={{
                                background: "#667eea",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px"
                              }}
                              title="Copy mã CODE"
                            >
                              Copy
                            </button>
                            {!code.isUsed && (
                              <button
                                onClick={() => handleDelete(code._id)}
                                style={{
                                  background: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "12px"
                                }}
                                title="Xóa mã CODE"
                              >
                                Xóa
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid #eee"
                }}>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1 || loading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      background: pagination.page === 1 ? "#f5f5f5" : "white",
                      cursor: pagination.page === 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    ← Trước
                  </button>
                  <span style={{ color: "#666" }}>
                    Trang {pagination.page} / {pagination.pages} (Tổng: {pagination.total})
                  </span>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.pages || loading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      background: pagination.page === pagination.pages ? "#f5f5f5" : "white",
                      cursor: pagination.page === pagination.pages ? "not-allowed" : "pointer"
                    }}
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


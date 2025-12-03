const { sendError } = require("../utils/response");
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    // Kiểm tra xem đã có thông tin user từ authMiddleware chưa
    if (!req.user) {
      return sendError(
        res,
        "Bạn cần đăng nhập để truy cập tính năng này.",
        401
      );
    }

    // Lấy role từ JWT token (nếu có)
    let userRole = req.user.role;

    // Nếu token không có role, lấy từ database
    if (!userRole) {
      const user = await User.getUserById(req.user.userId);
      if (!user) {
        return sendError(
          res,
          "Không tìm thấy thông tin người dùng.",
          401
        );
      }
      userRole = user.role || 'user';
    }

    // Kiểm tra role Admin
    if (userRole !== 'admin') {
      return sendError(
        res,
        "Bạn không có quyền truy cập tính năng này. Chỉ Admin mới có quyền.",
        403
      );
    }

    // Lưu role vào request để sử dụng sau này
    req.user.role = userRole;
    
    return next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return sendError(
      res,
      "Có lỗi khi kiểm tra quyền truy cập.",
      500
    );
  }
};

module.exports = isAdmin;


const NumerologyData = require("../models/NumerologyData");
const User = require("../models/User");
const cache = require("../utils/cache");
const { sendSuccess, sendError } = require("../utils/response");

class NumerologyController {
  // Save or update numerology data (optimized: upsert)
  save = async (req, res) => {
    try {
      const userId = req.user.userId;
      const {
        fullName,
        birthDate,
        birthDayString,
        birthDayList,
        // Number Karma
        number,
        atitute,
        day_birth,
        arrow,
        lack_arrow,
        top4,
        strong_list,
        weak_list,
        // Number Name
        destiny,
        name,
        inner,
        express,
        soul,
        mature,
        full_name_number,
        full_name_list,
      } = req.body;

      // Validate required fields
      if (!fullName || !birthDate) {
        return sendError(res, "Họ tên và ngày sinh là bắt buộc.", 400);
      }

      // Verify user exists
      const user = await User.getUserById(userId);
      if (!user) {
        return sendError(res, "User không tồn tại.", 404);
      }

      // Prepare data
      const numerologyData = {
        fullName: fullName.trim(),
        birthDate: new Date(birthDate),
        birthDayString,
        birthDayList,
        number: number || 0,
        atitute: atitute || 0,
        day_birth: day_birth || 0,
        arrow: Array.isArray(arrow) ? arrow : [],
        lack_arrow: Array.isArray(lack_arrow) ? lack_arrow : [],
        top4: top4 || {},
        strong_list: Array.isArray(strong_list) ? strong_list : [],
        weak_list: Array.isArray(weak_list) ? weak_list : [],
        destiny: destiny || 0,
        name: name || 0,
        inner: inner || "0",
        express: express || 0,
        soul: soul || 0,
        mature: mature || 0,
        full_name_number: full_name_number || "",
        full_name_list: full_name_list || "",
      };

      // Upsert (update if exists, create if not)
      const result = await NumerologyData.upsertByUserId(
        userId,
        numerologyData
      );

      // Clear cache
      cache.delete(`numerology:${userId}`);

      return sendSuccess(
        res,
        result,
        "Lưu dữ liệu thần số học thành công.",
        200
      );
    } catch (error) {
      console.error("Save numerology data error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lưu dữ liệu, vui lòng thử lại.",
        500
      );
    }
  };

  // Get user's numerology data (with caching)
  getMyData = async (req, res) => {
    try {
      // const userId = req.user.userId;

      // Check cache first
      // const cacheKey = `numerology:${userId}`;
      // const cachedData = cache.get(cacheKey);

      // if (cachedData) {
      //   return sendSuccess(
      //     res,
      //     cachedData,
      //     "Lấy dữ liệu thành công (cached).",
      //     200
      //   );
      // }

      // Fetch from database
      const numerologyData = await NumerologyData.findByUserId(userId);

      if (!numerologyData) {
        return sendError(res, "Chưa có dữ liệu thần số học.", 404);
      }

      // Cache the result (10 minutes)
      cache.set(cacheKey, numerologyData, 10 * 60 * 1000);

      return sendSuccess(res, numerologyData, "Lấy dữ liệu thành công.", 200);
    } catch (error) {
      console.error("Get numerology data error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy dữ liệu, vui lòng thử lại.",
        500
      );
    }
  };

  // Get calculation history
  getHistory = async (req, res) => {
    try {
      const userId = req.user.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await NumerologyData.getHistory(userId, page, limit);

      return sendSuccess(res, result, "Lấy lịch sử thành công.", 200);
    } catch (error) {
      console.error("Get history error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy lịch sử, vui lòng thử lại.",
        500
      );
    }
  };

  // Delete numerology data (soft delete)
  delete = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const numerologyData = await NumerologyData.findOne({
        _id: id,
        userId,
        deletedAt: null,
      });

      if (!numerologyData) {
        return sendError(res, "Không tìm thấy dữ liệu.", 404);
      }

      await numerologyData.delete(); // Soft delete

      // Clear cache
      cache.delete(`numerology:${userId}`);

      return sendSuccess(res, null, "Xóa dữ liệu thành công.", 200);
    } catch (error) {
      console.error("Delete numerology data error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi xóa dữ liệu, vui lòng thử lại.",
        500
      );
    }
  };
}

module.exports = new NumerologyController();

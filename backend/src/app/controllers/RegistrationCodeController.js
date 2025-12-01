const RegistrationCode = require("../models/RegistrationCode");
const { sendSuccess, sendError } = require("../utils/response");
const crypto = require("crypto");

class RegistrationCodeController {
  // Generate a random code
  generateCode = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Create a new registration code
  create = async (req, res) => {
    try {
      const { code, description, expiresAt, quantity = 1 } = req.body;

      // Validate quantity
      if (quantity < 1 || quantity > 100) {
        return sendError(res, "Số lượng mã CODE phải từ 1 đến 100.", 400);
      }

      const createdCodes = [];
      const errors = [];

      // Create multiple codes if quantity > 1
      for (let i = 0; i < quantity; i++) {
        try {
          let finalCode = code;
          
          // If no code provided, generate one
          if (!finalCode || finalCode.trim() === '') {
            let attempts = 0;
            do {
              finalCode = this.generateCode(8);
              attempts++;
              if (attempts > 10) {
                throw new Error("Không thể tạo mã CODE duy nhất sau nhiều lần thử.");
              }
            } while (await RegistrationCode.findByCode(finalCode));
          } else {
            finalCode = finalCode.toUpperCase().trim();
            
            // Check if code already exists
            const existing = await RegistrationCode.findByCode(finalCode);
            if (existing) {
              errors.push(`Mã CODE "${finalCode}" đã tồn tại.`);
              continue;
            }
          }

          // Validate code format
          if (!/^[A-Z0-9]{6,20}$/.test(finalCode)) {
            errors.push(`Mã CODE "${finalCode}" không hợp lệ. Phải từ 6-20 ký tự, chỉ chứa chữ cái và số.`);
            continue;
          }

          const newCode = new RegistrationCode({
            code: finalCode,
            description: description?.trim() || null,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            createdBy: req.user?.username || 'system'
          });

          await newCode.save();
          createdCodes.push(newCode);
        } catch (error) {
          if (error.code === 11000) {
            errors.push(`Mã CODE "${code || 'auto-generated'}" đã tồn tại.`);
          } else {
            errors.push(error.message || "Lỗi khi tạo mã CODE.");
          }
        }
      }

      if (createdCodes.length === 0) {
        return sendError(
          res,
          `Không thể tạo mã CODE nào. ${errors.join(' ')}`,
          400
        );
      }

      const message = createdCodes.length === 1
        ? "Tạo mã CODE thành công."
        : `Đã tạo ${createdCodes.length} mã CODE thành công.`;

      return sendSuccess(
        res,
        {
          codes: createdCodes,
          errors: errors.length > 0 ? errors : undefined
        },
        message,
        201
      );
    } catch (error) {
      console.error("Create registration code error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi tạo mã CODE, vui lòng thử lại.",
        500
      );
    }
  };

  // Get all registration codes with pagination and filters
  getAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const filter = req.query.filter || 'all'; // all, used, unused, expired
      const search = req.query.search || '';

      const skip = (page - 1) * limit;

      // Build query
      const query = { deletedAt: null };

      if (filter === 'used') {
        query.isUsed = true;
      } else if (filter === 'unused') {
        query.isUsed = false;
        query.$or = [
          { expiresAt: null },
          { expiresAt: { $gt: new Date() } }
        ];
      } else if (filter === 'expired') {
        query.isUsed = false;
        query.expiresAt = { $lte: new Date() };
      }

      if (search) {
        query.code = { $regex: search.toUpperCase(), $options: 'i' };
      }

      // Get total count
      const total = await RegistrationCode.countDocuments(query);

      // Get codes
      const codes = await RegistrationCode.find(query)
        .populate('usedBy', 'username fullname email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return sendSuccess(
        res,
        {
          codes,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        },
        "Lấy danh sách mã CODE thành công.",
        200
      );
    } catch (error) {
      console.error("Get registration codes error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy danh sách mã CODE, vui lòng thử lại.",
        500
      );
    }
  };

  // Get single registration code by ID
  getById = async (req, res) => {
    try {
      const { id } = req.params;

      const code = await RegistrationCode.findOne({
        _id: id,
        deletedAt: null
      }).populate('usedBy', 'username fullname email').lean();

      if (!code) {
        return sendError(res, "Không tìm thấy mã CODE.", 404);
      }

      return sendSuccess(res, code, "Lấy thông tin mã CODE thành công.", 200);
    } catch (error) {
      console.error("Get registration code by ID error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy thông tin mã CODE, vui lòng thử lại.",
        500
      );
    }
  };

  // Update registration code
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, expiresAt } = req.body;

      const code = await RegistrationCode.findOne({
        _id: id,
        deletedAt: null
      });

      if (!code) {
        return sendError(res, "Không tìm thấy mã CODE.", 404);
      }

      if (code.isUsed) {
        return sendError(res, "Không thể cập nhật mã CODE đã được sử dụng.", 400);
      }

      if (description !== undefined) {
        code.description = description?.trim() || null;
      }

      if (expiresAt !== undefined) {
        code.expiresAt = expiresAt ? new Date(expiresAt) : null;
      }

      await code.save();

      return sendSuccess(res, code, "Cập nhật mã CODE thành công.", 200);
    } catch (error) {
      console.error("Update registration code error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi cập nhật mã CODE, vui lòng thử lại.",
        500
      );
    }
  };

  // Delete registration code
  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const code = await RegistrationCode.findOne({
        _id: id,
        deletedAt: null
      });

      if (!code) {
        return sendError(res, "Không tìm thấy mã CODE.", 404);
      }

      if (code.isUsed) {
        return sendError(res, "Không thể xóa mã CODE đã được sử dụng.", 400);
      }

      await code.delete();

      return sendSuccess(res, null, "Xóa mã CODE thành công.", 200);
    } catch (error) {
      console.error("Delete registration code error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi xóa mã CODE, vui lòng thử lại.",
        500
      );
    }
  };

  // Validate code (public endpoint)
  validate = async (req, res) => {
    try {
      const { code } = req.body;

      if (!code || !code.trim()) {
        return sendError(res, "Mã CODE là bắt buộc.", 400);
      }

      const validation = await RegistrationCode.validateCode(code);

      if (!validation.isValid) {
        return sendError(res, validation.message, 403);
      }

      return sendSuccess(
        res,
        {
          code: validation.codeDoc.code,
          description: validation.codeDoc.description,
          expiresAt: validation.codeDoc.expiresAt
        },
        "Mã CODE hợp lệ.",
        200
      );
    } catch (error) {
      console.error("Validate registration code error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi kiểm tra mã CODE, vui lòng thử lại.",
        500
      );
    }
  };
}

module.exports = new RegistrationCodeController();


const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const RegistrationCode = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    default: null,
    trim: true
  },
  expiresAt: {
    type: Date,
    default: null,
    index: true
  },
  isUsed: {
    type: Boolean,
    default: false,
    index: true
  },
  usedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  usedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: String,
    default: 'system'
  }
}, {
  timestamps: true
});

// Add plugins
RegistrationCode.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});

// Static method: Find by code (case-insensitive)
RegistrationCode.statics.findByCode = async function(code) {
  if (!code) return null;
  return await this.findOne({
    code: code.toUpperCase().trim(),
    deletedAt: null
  });
};

// Static method: Validate code
RegistrationCode.statics.validateCode = async function(code) {
  if (!code || !code.trim()) {
    return {
      isValid: false,
      message: "Mã CODE là bắt buộc."
    };
  }

  const codeUpper = code.toUpperCase().trim();
  const codeDoc = await this.findByCode(codeUpper);

  if (!codeDoc) {
    return {
      isValid: false,
      message: "Mã CODE không tồn tại."
    };
  }

  if (codeDoc.isUsed) {
    return {
      isValid: false,
      message: "Mã CODE đã được sử dụng."
    };
  }

  // Check expiration
  if (codeDoc.expiresAt && new Date() > codeDoc.expiresAt) {
    return {
      isValid: false,
      message: "Mã CODE đã hết hạn."
    };
  }

  return {
    isValid: true,
    codeDoc: codeDoc
  };
};

// Static method: Mark code as used
RegistrationCode.statics.markAsUsed = async function(code, userId) {
  const codeUpper = code.toUpperCase().trim();
  const codeDoc = await this.findByCode(codeUpper);
  
  if (!codeDoc) {
    throw new Error("Mã CODE không tồn tại.");
  }

  codeDoc.isUsed = true;
  codeDoc.usedBy = userId;
  codeDoc.usedAt = new Date();
  await codeDoc.save();
  
  return codeDoc;
};

module.exports = mongoose.model("RegistrationCode", RegistrationCode);


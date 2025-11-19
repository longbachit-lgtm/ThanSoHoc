const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const User = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  email: { 
    type: String, 
    default: null,
    lowercase: true,
    trim: true,
    sparse: true // Allow multiple nulls
  },
  fullname: { 
    type: String, 
    default: null,
    trim: true
  },
  avatar: { 
    type: String, 
    default: null 
  },
  refreshToken: { 
    type: String, 
    default: null 
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Add plugins
User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// Static methods
User.statics.getUser = async function (username) {
  try {
    const user = await this.findOne({ username: username.toLowerCase() });
    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

User.statics.getUserById = async function (userId) {
  try {
    const user = await this.findById(userId);
    return user;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
};

User.statics.updateRefreshToken = async function (username, refreshToken) {
  try {
    const user = await this.findOne({ username: username.toLowerCase() });
    if (user) {
      user.refreshToken = refreshToken;
      await user.save();
      return true;
    }
    return false;
  } catch (err) {
    console.error("Update refresh token error:", err);
    return false;
  }
};

User.statics.updateLastLogin = async function (username) {
  try {
    await this.updateOne(
      { username: username.toLowerCase() },
      { lastLoginAt: new Date() }
    );
  } catch (error) {
    console.error("Update last login error:", error);
  }
};

module.exports = mongoose.model("User", User);


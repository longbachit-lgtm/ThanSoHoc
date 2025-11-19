const randToken = require("rand-token");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const authMethod = require("../sub/subFunc");
const { sendSuccess, sendError } = require("../utils/response");

const jwtVariable = require("../../variables/jwt");
const { SALT_ROUNDS } = require("../../variables/auth");

class AuthController {
  register = async (req, res) => {
    try {
      const username = req.body.username.toLowerCase().trim();
      const { password, fullname, email } = req.body;

      // Check if user exists
      const existingUser = await User.getUser(username);
      if (existingUser) {
        return sendError(res, "Tên tài khoản đã tồn tại.", 409);
      }

      // Check email if provided
      if (email) {
        const existingEmail = await User.findOne({ 
          email: email.toLowerCase().trim() 
        });
        if (existingEmail) {
          return sendError(res, "Email đã được sử dụng.", 409);
        }
      }

      // Hash password
      const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      
      // Create user
      const newUser = new User({
        username,
        password: hashPassword,
        fullname: fullname?.trim() || null,
        email: email?.toLowerCase().trim() || null,
      });

      await newUser.save();
      
      return sendSuccess(
        res,
        {
          username: newUser.username,
          email: newUser.email,
          fullname: newUser.fullname
        },
        "Đăng ký thành công.",
        201
      );
    } catch (error) {
      console.error("Register error:", error);
      
      // Handle duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return sendError(
          res,
          `${field === 'username' ? 'Tên đăng nhập' : 'Email'} đã tồn tại.`,
          409
        );
      }
      
      return sendError(
        res,
        "Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.",
        500
      );
    }
  };

  login = async (req, res) => {
    try {
      const username = req.body.username.toLowerCase().trim();
      const password = req.body.password;

      const user = await User.getUser(username);
      if (!user) {
        return sendError(res, "Tên đăng nhập không tồn tại.", 401);
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return sendError(res, "Mật khẩu không chính xác.", 401);
      }

      // Generate tokens
      const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
      const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

      const dataForAccessToken = {
        username: user.username,
        userId: user._id.toString(),
      };
      
      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );

      if (!accessToken) {
        return sendError(
          res,
          "Đăng nhập không thành công, vui lòng thử lại.",
          500
        );
      }

      // Handle refresh token
      let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);

      if (!user.refreshToken) {
        await User.updateRefreshToken(user.username, refreshToken);
      } else {
        refreshToken = user.refreshToken;
      }

      // Update last login
      await User.updateLastLogin(user.username);

      return sendSuccess(
        res,
        {
          accessToken,
          refreshToken,
          user: {
            userId: user._id.toString(),
            username: user.username,
            fullname: user.fullname,
            email: user.email,
          },
        },
        "Đăng nhập thành công."
      );
    } catch (error) {
      console.error("Login error:", error);
      return sendError(res, "Có lỗi xảy ra, vui lòng thử lại.", 500);
    }
  };

  refreshToken = async (req, res) => {
    try {
      const accessTokenFromHeader = req.headers.x_authorization || 
                                    req.headers.authorization?.replace('Bearer ', '');

      if (!accessTokenFromHeader) {
        return sendError(res, "Không tìm thấy access token.", 400);
      }

      const refreshTokenFromBody = req.body.refreshToken;
      if (!refreshTokenFromBody) {
        return sendError(res, "Không tìm thấy refresh token.", 400);
      }

      const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
      const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

      const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
      );
      
      if (!decoded) {
        return sendError(res, "Access token không hợp lệ.", 400);
      }

      const username = decoded.payload.username;
      const user = await User.getUser(username);
      
      if (!user) {
        return sendError(res, "User không tồn tại.", 401);
      }

      if (refreshTokenFromBody !== user.refreshToken) {
        return sendError(res, "Refresh token không hợp lệ.", 400);
      }

      const dataForAccessToken = {
        username,
        userId: user._id.toString(),
      };

      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );
      
      if (!accessToken) {
        return sendError(
          res,
          "Tạo access token không thành công, vui lòng thử lại.",
          500
        );
      }
      
      return sendSuccess(res, { accessToken }, "Refresh token thành công.");
    } catch (error) {
      console.error("Refresh token error:", error);
      return sendError(res, "Có lỗi xảy ra, vui lòng thử lại.", 500);
    }
  };
}

module.exports = new AuthController();


const authMethod = require("../sub/subFunc");
const jwtVariable = require("../../variables/jwt");
const { sendError } = require("../utils/response");

const isAuth = async (req, res, next) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.x_authorization || 
                                req.headers.authorization?.replace('Bearer ', '');
    
  if (!accessTokenFromHeader) {
    return sendError(res, "Không tìm thấy access token!", 401);
  }

  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const verified = await authMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );

  if (!verified) {
    return sendError(
      res,
      "Bạn không có quyền truy cập vào tính năng này!",
      401
    );
  }

  // Lưu thông tin user từ token vào request
  req.user = verified.payload;
  return next();
};

module.exports = isAuth;


const { body, validationResult } = require('express-validator');
const { sendError } = require('../utils/response');

// Validation rules
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username phải từ 3-30 ký tự')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username chỉ chứa chữ cái, số và dấu gạch dưới'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email không hợp lệ'),
  body('fullname')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Họ tên tối đa 100 ký tự')
];

const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username là bắt buộc'),
  body('password')
    .notEmpty()
    .withMessage('Mật khẩu là bắt buộc')
];

const numerologyValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Họ tên là bắt buộc')
    .isLength({ max: 200 })
    .withMessage('Họ tên tối đa 200 ký tự'),
  body('birthDate')
    .notEmpty()
    .withMessage('Ngày sinh là bắt buộc')
    .isISO8601()
    .withMessage('Ngày sinh không hợp lệ'),
  body('birthDayString')
    .notEmpty()
    .withMessage('Chuỗi ngày sinh là bắt buộc'),
  body('birthDayList')
    .notEmpty()
    .withMessage('Ngày sinh định dạng là bắt buộc')
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(
      res,
      'Dữ liệu không hợp lệ',
      400,
      errors.array()
    );
  }
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  numerologyValidation,
  validate
};


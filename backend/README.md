# Than So Hoc Backend API

## 🚀 Quick Start

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
```bash
cp .env.example .env
# Chỉnh sửa .env với thông tin của bạn
```

### 3. Đảm bảo MongoDB đang chạy
```bash
# Windows: Mở MongoDB Compass hoặc service
# Linux/Mac: 
sudo systemctl start mongod
# hoặc
brew services start mongodb-community
```

### 4. Chạy server
```bash
# Development (với nodemon)
npm run dev

# Production
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📚 API Documentation

### Auth Endpoints

#### POST /api/auth/register
Đăng ký tài khoản mới
```json
{
  "username": "string (required, 3-30 chars)",
  "password": "string (required, min 6 chars)",
  "email": "string (optional)",
  "fullname": "string (optional)"
}
```

#### POST /api/auth/login
Đăng nhập
```json
{
  "username": "string",
  "password": "string"
}
```

#### POST /api/auth/refresh
Refresh access token
```json
{
  "refreshToken": "string"
}
Headers: { "x_authorization": "accessToken" }
```

### Numerology Endpoints

#### POST /api/numerology/save
Lưu/cập nhật dữ liệu thần số học (cần authentication)
```json
{
  "fullName": "string",
  "birthDate": "ISO date string",
  "birthDayString": "string",
  "birthDayList": "string",
  "number": 0,
  "atitute": 0,
  // ... all calculated fields
}
```

#### GET /api/numerology/my-data
Lấy dữ liệu của user hiện tại (cần authentication, có cache)

#### GET /api/numerology/history?page=1&limit=10
Lấy lịch sử tính toán (cần authentication)

#### DELETE /api/numerology/:id
Xóa dữ liệu (soft delete, cần authentication)

## 🔧 Features

- ✅ JWT Authentication
- ✅ Password hashing với bcrypt
- ✅ Input validation
- ✅ Response compression
- ✅ In-memory caching
- ✅ Database indexes tự động
- ✅ Soft delete
- ✅ Error handling
- ✅ Standardized API responses

## 📊 Database

### Collections
- `users`: Thông tin người dùng
- `numerology_data`: Dữ liệu thần số học

### Indexes
Tự động tạo khi server khởi động:
- `users.username` (unique)
- `users.email` (unique, sparse)
- `numerology_data.userId` (compound)
- Và nhiều indexes khác...

## 🎯 Performance Optimizations

1. **Database Indexes**: Tự động tạo indexes cho queries nhanh
2. **Caching**: In-memory cache cho `/my-data` endpoint (10 phút)
3. **Response Compression**: Gzip compression cho tất cả responses
4. **Lean Queries**: Sử dụng `.lean()` cho read-only queries
5. **Upsert Pattern**: Update nếu có, create nếu chưa có

## 🔐 Security

- Password hashing với bcrypt (SALT_ROUNDS = 10)
- JWT tokens với expiration
- Input validation
- CORS protection
- Error messages không leak sensitive info

## 📝 Notes

- Database indexes được tạo tự động khi server start
- Cache được clean tự động mỗi 5 phút
- Soft delete được sử dụng cho tất cả collections
- API responses có format chuẩn: `{ success, message, data }`


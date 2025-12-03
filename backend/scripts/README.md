# Scripts Directory

Thư mục chứa các script tiện ích cho backend.

## 📜 Danh sách Scripts

### 1. `createAdminAccount.js`

Script để tạo tài khoản admin đầu tiên trong hệ thống.

**Tính năng:**
- ✅ Kiểm tra xem đã có tài khoản admin nào chưa
- ✅ Chỉ tạo admin nếu chưa có admin nào trong hệ thống
- ✅ Hỗ trợ nhập thông tin từ command line arguments hoặc interactive
- ✅ Validate đầy đủ thông tin (username, password, email)
- ✅ Hash password an toàn bằng bcrypt

**Cách sử dụng:**

```bash
cd backend

# Cách 1: Interactive mode (nhập thông tin từ console)
node scripts/createAdminAccount.js

# Cách 2: Truyền thông tin qua arguments
node scripts/createAdminAccount.js <username> <password> [email] [fullname]

# Ví dụ:
node scripts/createAdminAccount.js admin admin123
node scripts/createAdminAccount.js admin admin123 admin@example.com "Admin User"
```

**Lưu ý:**
- Script chỉ tạo admin nếu chưa có admin nào trong hệ thống
- Nếu đã có admin, script sẽ báo và thoát
- MongoDB URI được lấy từ environment variable `MONGODB_URI` hoặc mặc định `mongodb://localhost:27017/thansohoc`

---

### 2. `setAdminRole.js`

Script để set role admin cho một user đã tồn tại.

**Tính năng:**
- ✅ Tìm user theo username
- ✅ Set role = 'admin' cho user
- ✅ Kiểm tra user đã có role admin chưa

**Cách sử dụng:**

```bash
cd backend

node scripts/setAdminRole.js <username> [mongodb_uri]

# Ví dụ:
node scripts/setAdminRole.js longbt
node scripts/setAdminRole.js admin mongodb://localhost:27017/thansohoc
```

**Lưu ý:**
- User phải đã tồn tại trong hệ thống
- Nếu user đã có role admin, script sẽ báo và không làm gì
- MongoDB URI có thể được truyền qua argument hoặc environment variable

---

## 🔧 Yêu cầu

Tất cả scripts yêu cầu:
- Node.js đã được cài đặt
- MongoDB đang chạy
- Các dependencies của backend đã được cài đặt (`npm install`)

---

## 📝 Ví dụ Workflow

### Tạo admin đầu tiên:

```bash
# Bước 1: Tạo admin đầu tiên
cd backend
node scripts/createAdminAccount.js admin admin123 admin@example.com "Super Admin"

# Bước 2: Đăng nhập với tài khoản admin vừa tạo
# Sử dụng trên frontend hoặc API
```

### Tạo admin từ user đã tồn tại:

```bash
# Bước 1: User đã đăng ký với role 'user'
# (thông qua signup page)

# Bước 2: Set role admin cho user đó
cd backend
node scripts/setAdminRole.js username123

# Bước 3: User cần đăng nhập lại để lấy token mới có role
```

---

## ⚠️ Lưu ý Bảo mật

1. **Bảo mật mật khẩu**: Đảm bảo mật khẩu admin mạnh và an toàn
2. **Bảo mật script**: Không commit thông tin nhạy cảm vào git
3. **Environment variables**: Sử dụng environment variables cho MongoDB URI trong production
4. **Backup**: Luôn backup database trước khi chạy script

---

## 🐛 Troubleshooting

### Lỗi kết nối database:
- Kiểm tra MongoDB đang chạy
- Kiểm tra MongoDB URI đúng không
- Kiểm tra quyền truy cập database

### Lỗi module not found:
- Chạy `npm install` trong thư mục backend
- Đảm bảo đang chạy script từ thư mục backend

### Lỗi validation:
- Kiểm tra format username (3-30 ký tự, chữ thường, số, dấu gạch dưới)
- Kiểm tra password (ít nhất 6 ký tự)
- Kiểm tra email format (nếu có)


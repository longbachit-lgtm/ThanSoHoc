# Hướng Dẫn Sử Dụng Hệ Thống Mã CODE Đăng Ký

## 📋 Tổng Quan

Hệ thống mã CODE đăng ký cho phép bạn kiểm soát việc đăng ký tài khoản mới. Mỗi mã CODE chỉ được sử dụng **một lần duy nhất** và phải trùng khớp với mã CODE được tạo ra từ hệ thống.

## 🚀 Cách Sử Dụng

### 1. Tạo Mã CODE (Dành cho Admin)

#### Truy cập trang Admin:
- Đăng nhập vào hệ thống
- Truy cập: `http://localhost:5173/admin/registration-codes`

#### Tạo mã CODE mới:

**Cách 1: Tạo mã tự động (Khuyến nghị)**
1. Click nút **"Tạo Mã CODE"**
2. Điền thông tin:
   - **Số lượng**: Nhập số lượng mã CODE cần tạo (1-100)
   - **Mã CODE**: Để trống (hệ thống sẽ tự động tạo)
   - **Mô tả** (tùy chọn): Mô tả cho mã CODE
   - **Hết hạn** (tùy chọn): Chọn ngày hết hạn
3. Click **"Tạo Mã CODE"**

**Cách 2: Tạo mã CODE tùy chỉnh**
1. Click nút **"Tạo Mã CODE"**
2. Điền thông tin:
   - **Số lượng**: 1
   - **Mã CODE**: Nhập mã CODE tùy chỉnh (6-20 ký tự, chỉ chữ cái và số)
   - **Mô tả** (tùy chọn)
   - **Hết hạn** (tùy chọn)
3. Click **"Tạo Mã CODE"**

#### Tính năng trang Admin:
- ✅ **Xem danh sách mã CODE**: Tất cả, Chưa dùng, Đã dùng
- ✅ **Copy mã CODE**: Click icon copy để copy mã CODE
- ✅ **Xóa mã CODE**: Chỉ có thể xóa mã CODE chưa sử dụng
- ✅ **Phân trang**: Xem nhiều mã CODE
- ✅ **Tìm kiếm**: (Sẽ được cập nhật trong tương lai)

### 2. Sử Dụng Mã CODE Đăng Ký (Dành cho User)

1. Truy cập trang đăng ký: `http://localhost:5173/signup`
2. Điền thông tin:
   - **Tên đăng nhập**: Tên đăng nhập của bạn
   - **Mã CODE**: Nhập mã CODE được cấp
   - **Họ và tên**: (Tùy chọn)
   - **Email**: (Tùy chọn)
   - **Mật khẩu**: Mật khẩu của bạn
   - **Xác nhận mật khẩu**: Nhập lại mật khẩu
3. Click nút **"Đăng ký"**

#### Điều kiện đăng ký thành công:
- ✅ Mã CODE phải tồn tại
- ✅ Mã CODE chưa được sử dụng
- ✅ Mã CODE chưa hết hạn (nếu có ngày hết hạn)
- ✅ Tên đăng nhập chưa tồn tại
- ✅ Mật khẩu phải có ít nhất 6 ký tự
- ✅ Mật khẩu xác nhận phải khớp

#### Sau khi đăng ký thành công:
- Mã CODE sẽ được đánh dấu là **"Đã dùng"**
- Không thể sử dụng mã CODE này để đăng ký tài khoản khác
- Hệ thống sẽ tự động đăng nhập và chuyển đến trang nhập thông tin

## 🔧 API Endpoints (Cho Developers)

### Public Endpoints (Không cần authentication)

#### Validate mã CODE
```
POST /api/registration-code/validate
Body: { "code": "ABC12345" }
Response: { success: true, message: "Mã CODE hợp lệ.", data: {...} }
```

### Protected Endpoints (Cần authentication)

#### Tạo mã CODE
```
POST /api/registration-code
Headers: { x_authorization: "your_token" }
Body: {
  "code": "ABC12345",  // Optional - để trống sẽ tự động tạo
  "description": "Mã CODE cho khách hàng VIP",
  "expiresAt": "2024-12-31T23:59:59.000Z",  // Optional
  "quantity": 1  // Số lượng mã CODE cần tạo (1-100)
}
```

#### Lấy danh sách mã CODE
```
GET /api/registration-code?page=1&limit=20&isUsed=false&search=ABC
Headers: { x_authorization: "your_token" }
```

#### Lấy mã CODE theo ID
```
GET /api/registration-code/:id
Headers: { x_authorization: "your_token" }
```

#### Cập nhật mã CODE
```
PUT /api/registration-code/:id
Headers: { x_authorization: "your_token" }
Body: {
  "description": "Mô tả mới",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

#### Xóa mã CODE
```
DELETE /api/registration-code/:id
Headers: { x_authorization: "your_token" }
```

### Đăng ký với mã CODE
```
POST /api/auth/register
Body: {
  "username": "username",
  "password": "password",
  "fullname": "Full Name",
  "email": "email@example.com",
  "registrationCode": "ABC12345"  // Bắt buộc
}
```

## 📝 Lưu Ý Quan Trọng

1. **Mã CODE chỉ dùng một lần**: Sau khi đăng ký thành công, mã CODE sẽ không thể sử dụng lại
2. **Mã CODE phân biệt chữ hoa/thường**: Hệ thống tự động chuyển sang chữ HOA
3. **Hết hạn**: Nếu mã CODE có ngày hết hạn, không thể sử dụng sau ngày đó
4. **Xóa mã CODE**: Chỉ có thể xóa mã CODE chưa được sử dụng
5. **Tạo hàng loạt**: Có thể tạo nhiều mã CODE cùng lúc (tối đa 100 mã)

## 🎯 Ví Dụ Sử Dụng

### Tạo mã CODE cho khách hàng VIP:
1. Vào trang Admin
2. Tạo mã CODE với:
   - Mã CODE: `VIP2024`
   - Mô tả: "Mã CODE cho khách hàng VIP năm 2024"
   - Hết hạn: 31/12/2024
3. Gửi mã CODE cho khách hàng
4. Khách hàng sử dụng mã CODE để đăng ký

### Tạo nhiều mã CODE cùng lúc:
1. Vào trang Admin
2. Tạo mã CODE với:
   - Số lượng: 50
   - Để trống mã CODE (hệ thống tự tạo)
   - Mô tả: "Mã CODE sự kiện"
3. Hệ thống sẽ tạo 50 mã CODE tự động
4. Copy và phân phối mã CODE

## ⚠️ Xử Lý Lỗi

### Lỗi thường gặp:

1. **"Mã CODE không tồn tại"**
   - Kiểm tra lại mã CODE đã nhập đúng chưa
   - Mã CODE có thể đã bị xóa

2. **"Mã CODE đã được sử dụng"**
   - Mã CODE đã được dùng để đăng ký tài khoản khác
   - Không thể sử dụng lại

3. **"Mã CODE đã hết hạn"**
   - Mã CODE có ngày hết hạn và đã qua ngày đó
   - Liên hệ admin để cấp mã CODE mới

4. **"Vui lòng nhập mã CODE đăng ký"**
   - Chưa nhập mã CODE
   - Vui lòng điền mã CODE vào form đăng ký

## 🔒 Bảo Mật

- Tất cả mã CODE được lưu trong database với mã hóa
- Mã CODE chỉ có thể xem trong trang Admin (cần đăng nhập)
- Mã CODE sau khi sử dụng sẽ không thể sử dụng lại
- Hệ thống ghi nhận người dùng đã sử dụng mã CODE

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra lại mã CODE
2. Kiểm tra mã CODE có hết hạn không
3. Liên hệ admin để được hỗ trợ

---

**Chúc bạn sử dụng hệ thống thành công!** 🎉



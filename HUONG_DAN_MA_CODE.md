# Hướng dẫn sử dụng hệ thống mã CODE đăng ký

## Tổng quan

Hệ thống mã CODE đăng ký giúp bạn kiểm soát việc đăng ký tài khoản mới. Mỗi mã CODE:
- **Không được trùng lặp**: Mỗi mã CODE là duy nhất
- **Chỉ sử dụng một lần**: Sau khi được sử dụng, mã CODE không thể dùng lại
- **Có thể có ngày hết hạn**: Tùy chọn thiết lập thời hạn sử dụng

## Cách sử dụng

### 1. Truy cập trang quản lý mã CODE

Đăng nhập vào hệ thống, sau đó truy cập:
```
http://localhost:5173/admin/registration-codes
```

### 2. Tạo mã CODE mới

1. Nhấn nút **"+ Tạo mã CODE"** ở góc trên bên phải
2. Điền thông tin:
   - **Mã CODE**: 
     - Để trống để hệ thống tự động tạo (8 ký tự ngẫu nhiên)
     - Hoặc nhập mã CODE tùy chỉnh (6-20 ký tự, chỉ chữ cái và số)
   - **Mô tả** (tùy chọn): Ghi chú về mã CODE này
   - **Ngày hết hạn** (tùy chọn): Thiết lập thời hạn sử dụng
   - **Số lượng**: Tạo nhiều mã CODE cùng lúc (1-100)
3. Nhấn **"Tạo mã CODE"**

### 3. Quản lý mã CODE

#### Lọc mã CODE
- **Tất cả**: Hiển thị tất cả mã CODE
- **Chưa dùng**: Chỉ hiển thị mã CODE chưa được sử dụng
- **Đã dùng**: Hiển thị mã CODE đã được sử dụng
- **Hết hạn**: Hiển thị mã CODE đã hết hạn

#### Copy mã CODE
- Nhấn nút **"Copy"** bên cạnh mã CODE để sao chép vào clipboard

#### Xóa mã CODE
- Chỉ có thể xóa mã CODE **chưa được sử dụng**
- Nhấn nút **"Xóa"** và xác nhận

### 4. Sử dụng mã CODE khi đăng ký

1. Truy cập trang đăng ký: `http://localhost:5173/signup`
2. Điền đầy đủ thông tin, bao gồm:
   - Tên đăng nhập
   - Họ và tên (tùy chọn)
   - Email (tùy chọn)
   - Mật khẩu
   - Xác nhận mật khẩu
   - **Mã CODE đăng ký** (bắt buộc)
3. Nhấn nút đăng ký

### 5. Lưu ý

- Mã CODE **phải hợp lệ** và **chưa được sử dụng**
- Mã CODE **không được hết hạn** (nếu có thiết lập ngày hết hạn)
- Sau khi đăng ký thành công, mã CODE sẽ tự động được đánh dấu là **đã sử dụng**
- Không thể sử dụng lại mã CODE đã dùng

## API Endpoints

### Public Endpoints

#### Validate Code
```
POST /api/registration-code/validate
Body: { "code": "ABC12345" }
```

### Protected Endpoints (Cần đăng nhập)

#### Create Code
```
POST /api/registration-code
Headers: { "x_authorization": "<token>" }
Body: {
  "code": "ABC12345",           // Optional, để trống để auto-generate
  "description": "Mã cho khách VIP",
  "expiresAt": "2024-12-31T23:59:59.000Z",  // Optional
  "quantity": 1                 // 1-100
}
```

#### Get All Codes
```
GET /api/registration-code?page=1&limit=20&filter=all&search=
Headers: { "x_authorization": "<token>" }
Query params:
  - page: Số trang (default: 1)
  - limit: Số lượng mỗi trang (default: 20)
  - filter: all|used|unused|expired (default: all)
  - search: Tìm kiếm theo mã CODE
```

#### Get Code by ID
```
GET /api/registration-code/:id
Headers: { "x_authorization": "<token>" }
```

#### Update Code
```
PUT /api/registration-code/:id
Headers: { "x_authorization": "<token>" }
Body: {
  "description": "Mô tả mới",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

#### Delete Code
```
DELETE /api/registration-code/:id
Headers: { "x_authorization": "<token>" }
```

## Cấu trúc dữ liệu

### RegistrationCode Model
```javascript
{
  code: String,           // Mã CODE (unique, uppercase)
  description: String,    // Mô tả (optional)
  expiresAt: Date,       // Ngày hết hạn (optional)
  isUsed: Boolean,       // Đã sử dụng chưa (default: false)
  usedBy: ObjectId,      // ID người dùng đã sử dụng (ref: User)
  usedAt: Date,          // Thời gian sử dụng
  createdBy: String,     // Người tạo
  createdAt: Date,       // Thời gian tạo
  updatedAt: Date        // Thời gian cập nhật
}
```

## Troubleshooting

### Không thể tạo mã CODE
- Kiểm tra mã CODE có trùng với mã CODE hiện có không
- Kiểm tra định dạng mã CODE (6-20 ký tự, chỉ chữ cái và số)

### Không thể đăng ký với mã CODE
- Kiểm tra mã CODE có tồn tại không
- Kiểm tra mã CODE đã được sử dụng chưa
- Kiểm tra mã CODE có hết hạn không

### Mã CODE tự động bị uppercase
- Đây là tính năng bình thường, hệ thống tự động chuyển mã CODE sang chữ hoa


# Mô tả Luồng và Cách Sử Dụng API Mã CODE

## 📋 Mục Lục

1. [Tổng quan hệ thống](#tổng-quan-hệ-thống)
2. [Luồng hoạt động](#luồng-hoạt-động)
3. [API Endpoints](#api-endpoints)
4. [Ví dụ sử dụng](#ví-dụ-sử-dụng)
5. [Cấu trúc dữ liệu](#cấu-trúc-dữ-liệu)
6. [Xử lý lỗi](#xử-lý-lỗi)

---

## 🎯 Tổng quan hệ thống

Hệ thống mã CODE đăng ký cho phép:
- **Tạo mã CODE**: Tạo mã CODE thủ công hoặc tự động
- **Quản lý mã CODE**: Xem, cập nhật, xóa mã CODE
- **Validate mã CODE**: Kiểm tra mã CODE có hợp lệ không
- **Theo dõi sử dụng**: Biết mã CODE nào đã được sử dụng

### Các tính năng chính:

- ✅ Mã CODE **không trùng lặp** (unique)
- ✅ Mỗi mã CODE **chỉ sử dụng một lần**
- ✅ Hỗ trợ **ngày hết hạn**
- ✅ Tạo **nhiều mã CODE** cùng lúc (1-100)
- ✅ **Auto-generate** mã CODE nếu không cung cấp

---

## 🔄 Luồng hoạt động

### 1. Luồng tạo và quản lý mã CODE

```
┌─────────────────┐
│  Admin/User     │
│  đăng nhập      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Tạo mã CODE     │
│ (POST /api/     │
│ registration-   │
│ code)           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Mã CODE được    │
│ lưu vào DB      │
│ (isUsed = false)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Phân phối mã    │
│ CODE cho người  │
│ dùng            │
└─────────────────┘
```

### 2. Luồng sử dụng mã CODE khi đăng ký

```
┌─────────────────┐
│  User muốn      │
│  đăng ký        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User nhập mã    │
│ CODE vào form   │
│ đăng ký         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Gửi request     │
│ đăng ký với     │
│ mã CODE         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend validate│
│ mã CODE:        │
│ - Tồn tại?      │
│ - Đã dùng?      │
│ - Hết hạn?      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌──────────┐
│ Hợp  │  │ Không    │
│ lệ   │  │ hợp lệ   │
└──┬───┘  └────┬─────┘
   │           │
   ▼           ▼
┌──────┐  ┌──────────┐
│ Tạo  │  │ Trả về   │
│ user │  │ lỗi      │
│ mới  │  │          │
└──┬───┘  └──────────┘
   │
   ▼
┌─────────────────┐
│ Đánh dấu mã CODE│
│ đã sử dụng:     │
│ isUsed = true   │
│ usedBy = userId │
└─────────────────┘
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api/registration-code
```

### Authentication

**Protected routes** (CRUD) yêu cầu header:
```
x_authorization: <access_token>
```

**Public route** (validate) không cần authentication.

---

### 1. Validate Code (Public)

Kiểm tra mã CODE có hợp lệ không.

**Endpoint:**
```
POST /api/registration-code/validate
```

**Request:**
```json
{
  "code": "ABC12345"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Mã CODE hợp lệ.",
  "data": {
    "code": "ABC12345",
    "description": "Mã cho khách VIP",
    "expiresAt": "2024-12-31T23:59:59.000Z"
  }
}
```

**Response (Error - 403):**
```json
{
  "success": false,
  "message": "Mã CODE không tồn tại.",
  "data": null
}
```

**Các trường hợp lỗi:**
- `Mã CODE là bắt buộc.` (400)
- `Mã CODE không tồn tại.` (403)
- `Mã CODE đã được sử dụng.` (403)
- `Mã CODE đã hết hạn.` (403)

---

### 2. Create Code (Protected)

Tạo mã CODE mới. Có thể tạo một hoặc nhiều mã CODE cùng lúc.

**Endpoint:**
```
POST /api/registration-code
Headers: {
  "Content-Type": "application/json",
  "x_authorization": "<access_token>"
}
```

**Request - Tạo mã CODE tự động:**
```json
{
  "description": "Mã cho khách VIP tháng 12",
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "quantity": 5
}
```

**Request - Tạo mã CODE thủ công:**
```json
{
  "code": "VIP2024",
  "description": "Mã VIP cho khách hàng đặc biệt",
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "quantity": 1
}
```

**Request - Tạo nhiều mã CODE tự động:**
```json
{
  "description": "Mã đại lý",
  "quantity": 10
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Đã tạo 5 mã CODE thành công.",
  "data": {
    "codes": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "code": "A1B2C3D4",
        "description": "Mã cho khách VIP tháng 12",
        "expiresAt": "2024-12-31T23:59:59.000Z",
        "isUsed": false,
        "usedBy": null,
        "usedAt": null,
        "createdBy": "admin",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      // ... 4 mã CODE khác
    ],
    "errors": null
  }
}
```

**Response - Có một số mã CODE lỗi:**
```json
{
  "success": true,
  "message": "Đã tạo 3 mã CODE thành công.",
  "data": {
    "codes": [...],
    "errors": [
      "Mã CODE \"VIP2024\" đã tồn tại.",
      "Mã CODE \"ABC123\" không hợp lệ. Phải từ 6-20 ký tự, chỉ chứa chữ cái và số."
    ]
  }
}
```

**Các trường hợp lỗi:**
- `Số lượng mã CODE phải từ 1 đến 100.` (400)
- `Không thể tạo mã CODE nào. <danh sách lỗi>` (400)
- `Mã CODE đã tồn tại.` (khi tạo mã CODE thủ công trùng)

**Lưu ý:**
- Nếu không cung cấp `code`, hệ thống sẽ tự động tạo mã CODE 8 ký tự ngẫu nhiên
- `quantity` từ 1-100
- Mã CODE tự động được chuyển sang **UPPERCASE**
- Định dạng mã CODE: 6-20 ký tự, chỉ chữ cái và số (A-Z, 0-9)

---

### 3. Get All Codes (Protected)

Lấy danh sách mã CODE với phân trang và lọc.

**Endpoint:**
```
GET /api/registration-code?page=1&limit=20&filter=all&search=
Headers: {
  "x_authorization": "<access_token>"
}
```

**Query Parameters:**
- `page` (optional): Số trang (default: 1)
- `limit` (optional): Số lượng mỗi trang (default: 20)
- `filter` (optional): Lọc theo trạng thái
  - `all`: Tất cả
  - `used`: Đã sử dụng
  - `unused`: Chưa sử dụng (và chưa hết hạn)
  - `expired`: Hết hạn
- `search` (optional): Tìm kiếm theo mã CODE (case-insensitive)

**Request Examples:**
```
GET /api/registration-code?page=1&limit=20&filter=unused
GET /api/registration-code?filter=used&page=2&limit=10
GET /api/registration-code?search=VIP&filter=all
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Lấy danh sách mã CODE thành công.",
  "data": {
    "codes": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "code": "VIP2024",
        "description": "Mã VIP",
        "expiresAt": "2024-12-31T23:59:59.000Z",
        "isUsed": false,
        "usedBy": null,
        "usedAt": null,
        "createdBy": "admin",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

---

### 4. Get Code by ID (Protected)

Lấy thông tin chi tiết một mã CODE.

**Endpoint:**
```
GET /api/registration-code/:id
Headers: {
  "x_authorization": "<access_token>"
}
```

**Request Example:**
```
GET /api/registration-code/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Lấy thông tin mã CODE thành công.",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "code": "VIP2024",
    "description": "Mã VIP",
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "isUsed": true,
    "usedBy": {
      "_id": "65x1y2z3a4b5c6d7e8f9g0h1",
      "username": "user123",
      "fullname": "Nguyễn Văn A",
      "email": "user@example.com"
    },
    "usedAt": "2024-01-20T14:30:00.000Z",
    "createdBy": "admin",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T14:30:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Không tìm thấy mã CODE.",
  "data": null
}
```

---

### 5. Update Code (Protected)

Cập nhật thông tin mã CODE (chỉ mã CODE chưa sử dụng).

**Endpoint:**
```
PUT /api/registration-code/:id
Headers: {
  "Content-Type": "application/json",
  "x_authorization": "<access_token>"
}
```

**Request:**
```json
{
  "description": "Mã VIP cập nhật",
  "expiresAt": "2025-12-31T23:59:59.000Z"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Cập nhật mã CODE thành công.",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "code": "VIP2024",
    "description": "Mã VIP cập nhật",
    "expiresAt": "2025-12-31T23:59:59.000Z",
    // ... các trường khác
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Không thể cập nhật mã CODE đã được sử dụng.",
  "data": null
}
```

**Lưu ý:**
- Chỉ có thể cập nhật `description` và `expiresAt`
- Không thể cập nhật mã CODE đã được sử dụng
- Không thể thay đổi `code` (mã CODE là bất biến)

---

### 6. Delete Code (Protected)

Xóa mã CODE (chỉ mã CODE chưa sử dụng).

**Endpoint:**
```
DELETE /api/registration-code/:id
Headers: {
  "x_authorization": "<access_token>"
}
```

**Request Example:**
```
DELETE /api/registration-code/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Xóa mã CODE thành công.",
  "data": null
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Không thể xóa mã CODE đã được sử dụng.",
  "data": null
}
```

**Lưu ý:**
- Chỉ có thể xóa mã CODE chưa được sử dụng
- Mã CODE đã sử dụng không thể xóa (để đảm bảo tính toàn vẹn dữ liệu)

---

## 💻 Ví dụ sử dụng

### Ví dụ 1: Tạo mã CODE tự động bằng cURL

```bash
# 1. Đăng nhập để lấy token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'

# Response sẽ có accessToken, dùng token này cho các request sau

# 2. Tạo mã CODE tự động
curl -X POST http://localhost:5000/api/registration-code \
  -H "Content-Type: application/json" \
  -H "x_authorization: YOUR_ACCESS_TOKEN" \
  -d '{
    "description": "Mã cho khách VIP",
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "quantity": 5
  }'
```

### Ví dụ 2: Tạo mã CODE thủ công bằng JavaScript (Frontend)

```javascript
import api from './service/api';

// Tạo một mã CODE thủ công
async function createCustomCode() {
  try {
    const response = await api.registrationCode.create({
      code: "VIP2024",
      description: "Mã VIP cho khách hàng đặc biệt",
      expiresAt: "2024-12-31T23:59:59.000Z",
      quantity: 1
    });
    
    console.log("Mã CODE đã tạo:", response.data.codes[0].code);
    return response.data.codes[0];
  } catch (error) {
    console.error("Lỗi tạo mã CODE:", error.message);
    throw error;
  }
}
```

### Ví dụ 3: Tạo nhiều mã CODE tự động

```javascript
// Tạo 10 mã CODE tự động
async function createMultipleCodes() {
  try {
    const response = await api.registrationCode.create({
      description: "Mã đại lý tháng 1/2024",
      quantity: 10
      // Không cung cấp "code" để tự động tạo
    });
    
    console.log(`Đã tạo ${response.data.codes.length} mã CODE:`);
    response.data.codes.forEach((code, index) => {
      console.log(`${index + 1}. ${code.code}`);
    });
    
    return response.data.codes;
  } catch (error) {
    console.error("Lỗi:", error.message);
    throw error;
  }
}
```

### Ví dụ 4: Lấy danh sách mã CODE chưa sử dụng

```javascript
async function getUnusedCodes() {
  try {
    const response = await api.registrationCode.getAll({
      filter: 'unused',
      page: 1,
      limit: 20
    });
    
    console.log(`Tổng: ${response.data.pagination.total} mã CODE`);
    console.log(`Trang ${response.data.pagination.page}/${response.data.pagination.pages}`);
    
    response.data.codes.forEach(code => {
      console.log(`- ${code.code}: ${code.description || 'Không có mô tả'}`);
    });
    
    return response.data;
  } catch (error) {
    console.error("Lỗi:", error.message);
    throw error;
  }
}
```

### Ví dụ 5: Validate mã CODE trước khi đăng ký

```javascript
async function validateCodeBeforeSignup(code) {
  try {
    const response = await api.registrationCode.validate(code);
    console.log("Mã CODE hợp lệ:", response.data);
    return true;
  } catch (error) {
    console.error("Mã CODE không hợp lệ:", error.message);
    return false;
  }
}

// Sử dụng
const isValid = await validateCodeBeforeSignup("VIP2024");
if (isValid) {
  // Tiếp tục đăng ký
} else {
  // Hiển thị lỗi cho user
}
```

### Ví dụ 6: Cập nhật mã CODE

```javascript
async function updateCode(codeId) {
  try {
    const response = await api.registrationCode.update(codeId, {
      description: "Mô tả mới",
      expiresAt: "2025-12-31T23:59:59.000Z"
    });
    
    console.log("Đã cập nhật:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi:", error.message);
    throw error;
  }
}
```

### Ví dụ 7: Xóa mã CODE

```javascript
async function deleteCode(codeId) {
  try {
    await api.registrationCode.delete(codeId);
    console.log("Đã xóa mã CODE thành công");
  } catch (error) {
    console.error("Lỗi:", error.message);
    // Lỗi có thể do mã CODE đã được sử dụng
    throw error;
  }
}
```

### Ví dụ 8: Tìm kiếm mã CODE

```javascript
async function searchCodes(searchTerm) {
  try {
    const response = await api.registrationCode.getAll({
      search: searchTerm,
      filter: 'all',
      page: 1,
      limit: 20
    });
    
    console.log(`Tìm thấy ${response.data.codes.length} mã CODE`);
    return response.data;
  } catch (error) {
    console.error("Lỗi:", error.message);
    throw error;
  }
}
```

---

## 📊 Cấu trúc dữ liệu

### RegistrationCode Model

```javascript
{
  _id: ObjectId,              // ID tự động
  code: String,               // Mã CODE (unique, uppercase, 6-20 ký tự)
  description: String | null, // Mô tả (optional)
  expiresAt: Date | null,     // Ngày hết hạn (optional)
  isUsed: Boolean,            // Đã sử dụng chưa (default: false)
  usedBy: ObjectId | null,    // ID người dùng đã sử dụng (ref: User)
  usedAt: Date | null,        // Thời gian sử dụng
  createdBy: String,          // Người tạo (username hoặc 'system')
  createdAt: Date,            // Thời gian tạo
  updatedAt: Date,            // Thời gian cập nhật cuối
  deletedAt: Date | null      // Soft delete timestamp
}
```

### Response Format

Tất cả response đều theo format:

```javascript
{
  success: Boolean,    // true nếu thành công
  message: String,     // Thông báo
  data: Object | null  // Dữ liệu (null nếu có lỗi)
}
```

---

## ⚠️ Xử lý lỗi

### Mã trạng thái HTTP

- `200`: Thành công
- `201`: Tạo thành công
- `400`: Bad Request (dữ liệu không hợp lệ)
- `401`: Unauthorized (chưa đăng nhập)
- `403`: Forbidden (không có quyền / mã CODE không hợp lệ)
- `404`: Not Found (không tìm thấy)
- `500`: Internal Server Error (lỗi server)

### Các lỗi thường gặp

#### 1. Lỗi Authentication
```json
{
  "success": false,
  "message": "Không tìm thấy access token.",
  "data": null
}
```
**Giải pháp**: Đăng nhập lại để lấy token mới

#### 2. Mã CODE đã tồn tại
```json
{
  "success": false,
  "message": "Mã CODE đã tồn tại.",
  "data": null
}
```
**Giải pháp**: Sử dụng mã CODE khác hoặc để trống để tự động tạo

#### 3. Mã CODE đã được sử dụng
```json
{
  "success": false,
  "message": "Mã CODE đã được sử dụng.",
  "data": null
}
```
**Giải pháp**: Mỗi mã CODE chỉ dùng một lần, cần tạo mã CODE mới

#### 4. Mã CODE hết hạn
```json
{
  "success": false,
  "message": "Mã CODE đã hết hạn.",
  "data": null
}
```
**Giải pháp**: Tạo mã CODE mới hoặc cập nhật ngày hết hạn (nếu chưa dùng)

#### 5. Định dạng mã CODE không hợp lệ
```json
{
  "success": false,
  "message": "Mã CODE không hợp lệ. Phải từ 6-20 ký tự, chỉ chứa chữ cái và số.",
  "data": null
}
```
**Giải pháp**: Mã CODE phải:
- 6-20 ký tự
- Chỉ chứa chữ cái in hoa (A-Z) và số (0-9)
- Không có ký tự đặc biệt, khoảng trắng

---

## 🔒 Bảo mật

1. **Authentication**: Tất cả API CRUD yêu cầu token hợp lệ
2. **Validation**: Mã CODE được validate kỹ trước khi lưu
3. **Uniqueness**: Mã CODE phải unique trong database
4. **One-time use**: Mỗi mã CODE chỉ dùng một lần
5. **Soft delete**: Mã CODE được soft delete, không xóa vĩnh viễn

---

## 📝 Best Practices

1. **Tạo mã CODE trước khi cần**: Tạo mã CODE sớm, không đợi đến khi user cần
2. **Đặt ngày hết hạn**: Luôn đặt ngày hết hạn để quản lý tốt hơn
3. **Mô tả rõ ràng**: Thêm description để dễ quản lý
4. **Validate trước khi dùng**: Validate mã CODE trước khi cho phép đăng ký
5. **Theo dõi sử dụng**: Kiểm tra định kỳ mã CODE nào đã được sử dụng

---

## 🚀 Quick Start

### Bước 1: Đăng nhập
```javascript
const loginResponse = await api.auth.login("admin", "password");
const token = loginResponse.data.accessToken;
```

### Bước 2: Tạo mã CODE
```javascript
const codeResponse = await api.registrationCode.create({
  description: "Mã đăng ký mới",
  quantity: 5
});
const codes = codeResponse.data.codes;
```

### Bước 3: Phân phối mã CODE
```javascript
codes.forEach(code => {
  console.log(`Mã CODE: ${code.code}`);
  // Gửi mã CODE cho user qua email, SMS, v.v.
});
```

### Bước 4: User sử dụng mã CODE khi đăng ký
```javascript
await api.auth.register(
  username,
  password,
  fullname,
  email,
  registrationCode  // Mã CODE từ bước 3
);
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Backend server có đang chạy không
2. Token có hợp lệ không
3. Định dạng request có đúng không
4. Console logs để xem lỗi chi tiết


# Hướng dẫn Debug trang Admin Registration Codes

Nếu bạn không thể truy cập trang `http://localhost:5173/admin/registration-codes`, hãy làm theo các bước sau:

## 1. Kiểm tra đã đăng nhập chưa

**Quan trọng**: Trang admin yêu cầu đăng nhập. Bạn phải đăng nhập trước khi truy cập.

- Truy cập: `http://localhost:5173/login`
- Đăng nhập với tài khoản hợp lệ
- Sau đó mới truy cập trang admin

## 2. Kiểm tra Console trình duyệt

1. Mở trình duyệt (Chrome/Firefox/Edge)
2. Nhấn `F12` hoặc `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Mở tab **Console**
4. Xem có lỗi JavaScript nào không

**Các lỗi thường gặp:**

### Lỗi 404 (Not Found)
```
GET http://localhost:5000/api/registration-code 404
```
→ **Giải pháp**: Kiểm tra backend server có đang chạy không

### Lỗi 401 (Unauthorized)
```
401 Unauthorized
```
→ **Giải pháp**: Token đã hết hạn, cần đăng nhập lại

### Lỗi CORS
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
→ **Giải pháp**: Kiểm tra cấu hình CORS trong backend

### Lỗi Network
```
Failed to fetch
```
→ **Giải pháp**: Backend server không chạy hoặc không kết nối được

## 3. Kiểm tra Backend Server

Đảm bảo backend server đang chạy:

```bash
cd backend
npm start
# hoặc
node src/index.js
```

Kiểm tra:
- Backend chạy trên port 5000 (hoặc port đã cấu hình)
- Không có lỗi khi start server
- Route `/api/registration-code` đã được đăng ký

## 4. Kiểm tra Network Requests

1. Mở DevTools (`F12`)
2. Tab **Network**
3. Thử truy cập lại trang admin
4. Xem request `GET /api/registration-code`:
   - **Status**: Phải là 200 (OK)
   - **Headers**: Phải có `x_authorization` với token
   - **Response**: Phải trả về dữ liệu JSON

## 5. Kiểm tra LocalStorage

1. Mở DevTools (`F12`)
2. Tab **Application** (Chrome) hoặc **Storage** (Firefox)
3. Chọn **Local Storage** → `http://localhost:5173`
4. Kiểm tra key `auth`:
   - Phải có `accessToken`
   - Phải có `user`
   - Giá trị phải hợp lệ JSON

**Nếu không có key `auth`**: Bạn chưa đăng nhập, cần đăng nhập lại

## 6. Kiểm tra Route

Xác nhận route đã được thêm vào `src/App.jsx`:

```jsx
<Route 
  path="/admin/registration-codes" 
  element={
    <ProtectedRoute>
      <RegistrationCodeAdminPage />
    </ProtectedRoute>
  } 
/>
```

## 7. Kiểm tra Import

Xác nhận component đã được import:

```jsx
import RegistrationCodeAdminPage from "./Pages/RegistrationCodeAdminPage";
```

## 8. Kiểm tra API Service

Xác nhận API đã được cấu hình trong `src/service/api.js`:

```javascript
registrationCode: {
  getAll: async (params = {}) => { ... },
  // ... các method khác
}
```

## 9. Restart Development Server

Đôi khi cần restart để áp dụng thay đổi:

1. Dừng server frontend (`Ctrl+C`)
2. Chạy lại:
   ```bash
   npm run dev
   ```

## 10. Kiểm tra URL chính xác

Đảm bảo URL đúng:
- ✅ `http://localhost:5173/admin/registration-codes`
- ❌ `http://localhost:5173/admin/registration-code` (thiếu 's')
- ❌ `http://localhost:3000/admin/registration-codes` (sai port)

## Checklist nhanh

- [ ] Đã đăng nhập vào hệ thống
- [ ] Backend server đang chạy (port 5000)
- [ ] Frontend server đang chạy (port 5173)
- [ ] Không có lỗi trong Console
- [ ] LocalStorage có key `auth` hợp lệ
- [ ] Route đã được thêm vào App.jsx
- [ ] Component đã được import đúng

## Thông báo lỗi cụ thể

Nếu bạn gặp lỗi cụ thể, hãy gửi:
1. Screenshot Console error
2. Screenshot Network tab (request/response)
3. Mô tả chi tiết các bước đã thực hiện

## Liên hệ hỗ trợ

Nếu vẫn không giải quyết được, hãy cung cấp:
- Log từ backend server
- Screenshot từ browser DevTools
- Version của Node.js, npm, và các package chính

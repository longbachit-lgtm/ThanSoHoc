# 📚 Tài Liệu Luồng Hoạt Động - Ứng Dụng Thần Số Học CHẠM

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Kiến Trúc Ứng Dụng](#kiến-trúc-ứng-dụng)
3. [Luồng Authentication](#luồng-authentication)
4. [Luồng Navigation](#luồng-navigation)
5. [Cấu Trúc Routes](#cấu-trúc-routes)
6. [State Management](#state-management)
7. [Luồng Chi Tiết Các Trang](#luồng-chi-tiết-các-trang)
8. [Luồng Logout](#luồng-logout)
9. [Sơ Đồ Luồng](#sơ-đồ-luồng)

---

## 🌟 Tổng Quan

**CHẠM** là ứng dụng Thần Số Học giúp người dùng:
- Hiểu bản thân qua những con số
- Nhận lời khuyên hàng ngày dựa trên năng lượng cá nhân
- Xem chi tiết kết quả thần số học của mình
- Quản lý TODO list dựa trên lời khuyên

### Công Nghệ Sử Dụng
- **Frontend Framework**: React + Vite
- **Routing**: React Router DOM v6
- **State Management**: 
  - Redux Toolkit (cho numerology data)
  - Zustand (cho authentication)
- **UI**: Bootstrap 5 + Custom CSS
- **Icons**: React Icons

---

## 🏗️ Kiến Trúc Ứng Dụng

```
src/
├── Pages/              # Các trang chính
│   ├── AuthPage.jsx          # Trang đăng nhập
│   ├── SignupPage.jsx        # Trang đăng ký
│   ├── AboutPage.jsx         # Trang giới thiệu/chọn chức năng
│   ├── DailyAdvicePage.jsx   # Trang lời khuyên hàng ngày
│   ├── TodoListPage.jsx      # Trang quản lý TODO
│   ├── NumerologyDetailPage.jsx  # Trang chi tiết thần số học
│   └── ...                   # Các trang khác
├── component/          # Các component tái sử dụng
│   ├── ProtectedRoute.jsx    # Component bảo vệ routes
│   └── DailyAdvice/          # Components cho Daily Advice
├── store/              # State management
│   ├── useAuthStore.js       # Zustand store cho auth
│   ├── numberKarma.js        # Redux slice cho karma numbers
│   └── numberName.js         # Redux slice cho name numbers
└── service/            # API services
    └── api.js                # API client
```

---

## 🔐 Luồng Authentication

### 1. Kiểm Tra Authentication

**ProtectedRoute Component** (`src/component/ProtectedRoute.jsx`):
- Kiểm tra authentication bằng cách đọc trực tiếp từ `localStorage` (source of truth)
- Nếu không có `auth` data hoặc không hợp lệ → Redirect về `/login`
- Lưu location hiện tại trong state để redirect lại sau khi login

```javascript
// Kiểm tra auth từ localStorage
const checkAuth = () => {
  const authData = localStorage.getItem('auth');
  if (!authData) return false;
  
  const parsed = JSON.parse(authData);
  return !!(parsed && parsed.accessToken && parsed.user);
};
```

### 2. Đăng Nhập (Login)

**Trang**: `/login` hoặc `/` (AuthPage.jsx)

**Luồng**:
1. User nhập username và password
2. Gửi request đến API: `api.auth.login(username, password)`
3. Nhận response với `accessToken`, `refreshToken`, và `user` data
4. Lưu vào Zustand store và localStorage:
   ```javascript
   login(user, accessToken, refreshToken);
   // Tự động lưu vào localStorage trong useAuthStore
   ```
5. Kiểm tra xem user đã có dữ liệu thần số học chưa:
   - **Nếu có**: Load data từ API → Populate Redux store → Redirect đến `/about`
   - **Nếu chưa có**: Redirect đến `/name-input` để nhập thông tin

**Code Flow**:
```javascript
// 1. Login API call
const response = await api.auth.login(username, password);

// 2. Save auth data
login(response.data.user, response.data.accessToken, response.data.refreshToken);

// 3. Load numerology data if exists
const numerologyResponse = await api.numerology.getMyData();

// 4. Populate Redux store
if (numerologyResponse.data) {
  populateStoreFromData(numerologyResponse.data);
  navigate("/about", { replace: true });
} else {
  navigate("/name-input", { replace: true });
}
```

### 3. Đăng Ký (Signup)

**Trang**: `/signup` (SignupPage.jsx)

**Luồng**:
1. User nhập thông tin: username, fullName, email, password, confirmPassword
2. Validate form (password length, match confirm password)
3. Gửi request đến API: `api.auth.register(...)`
4. Nếu thành công và có token → Auto login → Redirect đến `/name-input`
5. Nếu không có token → Redirect đến `/login`

---

## 🧭 Luồng Navigation

### Entry Point

**URL mặc định**: `http://localhost:5173/` → Redirect đến `/login`

### Sau Khi Đăng Nhập

1. **User đã có dữ liệu thần số học**:
   ```
   Login → Load Data → Populate Redux → Redirect → /about
   ```
   
2. **User chưa có dữ liệu**:
   ```
   Login → Redirect → /name-input → /birth-date → /gender-selection → /job-input → /about
   ```

### Trang About (`/about`)

**Mục đích**: Cho phép user chọn giữa 2 chức năng chính

**2 Lựa Chọn**:
1. **"Xem Kết Quả Thần Số"** → Navigate đến `/numerology-detail`
2. **"Lời Khuyên Hàng Ngày"** → Navigate đến `/daily-advice`

---

## 🛣️ Cấu Trúc Routes

### Public Routes (Không cần authentication)

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | AuthPage | Trang đăng nhập (mặc định) |
| `/login` | AuthPage | Trang đăng nhập |
| `/signup` | SignupPage | Trang đăng ký |

### Protected Routes (Cần authentication)

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/about` | AboutPage | Trang giới thiệu và chọn chức năng |
| `/name-input` | NameInputPage | Nhập họ tên |
| `/birth-date` | BirthDatePage | Nhập ngày sinh |
| `/gender-selection` | GenderSelectionPage | Chọn giới tính |
| `/job-input` | JobInputPage | Nhập thông tin công việc |
| `/daily-advice` | DailyAdvicePage | **Trang lời khuyên hàng ngày** |
| `/todo-list` | TodoListPage | Trang quản lý TODO list |
| `/numerology-detail` | NumerologyDetailPage | Chi tiết kết quả thần số học |
| `/detail-number` | Numerlogy | Chi tiết số học |
| `/form-infor` | FormInfor | Form nhập thông tin |

**Tất cả protected routes được bọc trong `<ProtectedRoute>` component**

---

## 💾 State Management

### 1. Authentication Store (Zustand)

**File**: `src/store/useAuthStore.js`

**State**:
```javascript
{
  user: null | UserObject,
  accessToken: null | string,
  refreshToken: null | string
}
```

**Methods**:
- `login(userData, accessToken, refreshToken)`: Lưu auth data vào store và localStorage
- `logout()`: Xóa auth data khỏi store và localStorage
- `isAuthenticated()`: Kiểm tra xem user đã đăng nhập chưa
- `updateToken(accessToken)`: Cập nhật access token mới

**Storage**: Lưu trong `localStorage` với key `'auth'`

### 2. Redux Store

**Slices**:

**a. numberKarma** (`src/store/numberKarma.js`):
```javascript
{
  number: 0,              // Số đường đời
  atitute: 0,
  day_birth: 0,
  birth_day: "",
  birth_day_list: "",
  arrow: "",
  lack_arrow: "",
  top4: "",
  strong_list: [],
  weak_list: []
}
```

**Actions**:
- `setKamarNumeroMain(number)`
- `setBirthDay(birthDay)`
- `setBirthDayList(dateString)`
- `resetNumberKarma()` - Reset về initial state

**b. numberName** (`src/store/numberName.js`):
```javascript
{
  destiny: 0,             // Số sứ mệnh
  name: 0,
  inner: "0",
  express: 0,             // Số nhân cách
  soul: 0,                // Số linh hồn
  mature: 0,
  full_name_number: "",
  full_name_list: ""
}
```

**Actions**:
- `setNumberDestiny(number)`
- `setNumberSoul(number)`
- `setNumberExpress(number)`
- `setFullNameList(name)`
- `resetNumberName()` - Reset về initial state

---

## 📄 Luồng Chi Tiết Các Trang

### 1. Trang Daily Advice (`/daily-advice`)

**Component**: `DailyAdvicePage.jsx`

**Luồng Hoạt Động**:

1. **Kiểm tra Authentication**:
   - ProtectedRoute kiểm tra authentication
   - Nếu chưa đăng nhập → Redirect về `/login`

2. **Load Dữ Liệu**:
   ```javascript
   useEffect(() => {
     // Nếu đã có data trong Redux → Skip
     if (fullName || birthDayList) return;
     
     // Load từ API nếu authenticated
     if (isAuthenticated()) {
       const response = await api.numerology.getMyData();
       populateStoreFromData(response.data);
     }
   }, [isAuthenticated, fullName, birthDayList]);
   ```

3. **Tính Toán Các Con Số Cá Nhân**:
   - Dựa trên ngày sinh hiện tại và birth date
   - Tính: Personal Day, Personal Month, Personal Year
   - Sử dụng function `calculateAllPersonalNumbers(day, month, year, targetDate)`

4. **Lấy Lời Khuyên**:
   - Dựa trên Personal Day number
   - Sử dụng function `getAdviceByNumber(personalDayNumber)`
   - Data từ `dailyAdviceData.js`

5. **Hiển Thị**:
   - **Header**: UserNumerologyHeader (avatar, tên, các con số)
   - **Navigation Menu**: PageNavigationMenu (chuyển giữa Daily Advice và TodoList)
   - **Period Navigation**: PeriodNavigationTabs (chọn ngày/tuần/tháng/năm)
   - **Advice Card**: Hiển thị lời khuyên và actions
   - **Suggested Actions Card**: Hiển thị các hành động đề xuất

6. **Lưu Vào TODO**:
   - Khi user click "Lưu vào TODO LIST" từ AdviceCard hoặc SuggestedActionsCard
   - Gọi API: `api.todo.create({ content, period, targetDate })`
   - Sau khi thành công → Navigate đến `/todo-list`

**Components Chính**:
- `UserNumerologyHeader`: Header hiển thị thông tin user
- `PageNavigationMenu`: Menu chuyển giữa Daily Advice và TodoList
- `PeriodNavigationTabs`: Tabs chọn thời gian (hôm nay, tuần này, tháng này, năm nay)
- `AdviceCard`: Card hiển thị lời khuyên chính
- `SuggestedActionsCard`: Card hiển thị các hành động đề xuất

**Navigation Từ Trang Này**:
- Click vào avatar hoặc các số → Navigate đến `/numerology-detail`
- Click "TODOLIST" trong menu → Navigate đến `/todo-list`
- Click "Lưu vào TODO LIST" → Navigate đến `/todo-list` (sau khi save thành công)

### 2. Trang TodoList (`/todo-list`)

**Component**: `TodoListPage.jsx`

**Luồng**:
1. Kiểm tra authentication
2. Hiển thị TodoListComponent
3. User có thể xem, thêm, sửa, xóa các TODO items
4. TODO được lọc theo period và targetDate

**Đặc Điểm**:
- Không có PeriodNavigationTabs (đã bị remove)
- Chỉ tập trung vào quản lý TODO list

### 3. Trang Numerology Detail (`/numerology-detail`)

**Component**: `NumerologyDetailPage.jsx`

**Luồng**:
1. Kiểm tra authentication
2. Load data từ Redux store hoặc API
3. Hiển thị chi tiết các con số thần số học:
   - Số đường đời
   - Số linh hồn
   - Số nhân cách
   - Số sứ mệnh
   - Và nhiều thông tin khác

### 4. Trang About (`/about`)

**Component**: `AboutPage.jsx`

**Mục Đích**: 
- Giới thiệu về ứng dụng CHẠM
- Cho phép user chọn giữa 2 chức năng:
  1. **"Xem Kết Quả Thần Số"** → `/numerology-detail`
  2. **"Lời Khuyên Hàng Ngày"** → `/daily-advice`

**Đây là trang đầu tiên user thấy sau khi đăng nhập thành công**

---

## 🚪 Luồng Logout

**Component**: `UserNumerologyHeader.jsx` (nút logout ở góc trên bên phải)

**Luồng**:

1. **User Click Nút Logout**:
   - Hiển thị confirm dialog: "Bạn có chắc chắn muốn đăng xuất?"

2. **Nếu Xác Nhận**:

   ```javascript
   handleLogout() {
     // Step 1: Clear localStorage FIRST
     localStorage.removeItem('auth');
     localStorage.removeItem('userFullName');
     localStorage.removeItem('userBirthDate');
     
     // Step 2: Logout from Zustand store
     logout();
     
     // Step 3: Reset Redux store
     dispatch(numberKarmaActions.resetNumberKarma());
     dispatch(numberNameActions.resetNumberName());
     
     // Step 4: Force reload to login
     window.location.replace('/login');
   }
   ```

3. **Thứ Tự Clear**:
   - ✅ Clear localStorage trước (auth, userFullName, userBirthDate)
   - ✅ Logout từ Zustand store (clear in-memory state)
   - ✅ Reset Redux store về initial state
   - ✅ Force reload trang bằng `window.location.replace('/login')`

4. **Tại Sao Dùng `window.location.replace()`?**
   - Force reload hoàn toàn trang
   - Clear tất cả JavaScript state
   - Không thể quay lại bằng nút back
   - Đảm bảo mọi thứ được reset sạch sẽ

**ProtectedRoute sẽ chặn ngay lập tức**:
- Kiểm tra từ localStorage (source of truth)
- Nếu không có auth → Redirect về `/login`

---

## 📊 Sơ Đồ Luồng

### Sơ Đồ Luồng Authentication & Navigation

```
┌─────────────────────────────────────────────────────────────┐
│                     USER VISITS APP                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   / (Homepage)  │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   /login        │
            │  (AuthPage)     │
            └────────┬────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐         ┌──────────────┐
│  Not Logged  │         │   Logged In  │
└──────┬───────┘         └──────┬───────┘
       │                        │
       │                        │
       ▼                        ▼
┌──────────────┐         ┌──────────────────┐
│  Enter Creds │         │ Check Data Exists│
│  Login/Signup│         └──────┬───────────┘
└──────┬───────┘                │
       │                        │
       │                        ├──────────────┐
       │                        │              │
       │                        ▼              ▼
       │              ┌─────────────┐  ┌─────────────┐
       │              │ Has Data    │  │ No Data     │
       │              └──────┬──────┘  └──────┬──────┘
       │                     │                │
       │                     │                ▼
       │                     │       ┌──────────────────┐
       │                     │       │  /name-input     │
       │                     │       │  (Input Flow)    │
       │                     │       └────────┬─────────┘
       │                     │                │
       │                     │                ▼
       │                     │       ┌──────────────────┐
       │                     │       │  /birth-date     │
       │                     │       └────────┬─────────┘
       │                     │                │
       │                     │                ▼
       │                     │       ┌──────────────────┐
       │                     │       │  /gender-selection│
       │                     │       └────────┬─────────┘
       │                     │                │
       │                     │                ▼
       │                     │       ┌──────────────────┐
       │                     │       │  /job-input      │
       │                     │       └────────┬─────────┘
       │                     │                │
       │                     └────────┬───────┘
       │                              │
       │                              ▼
       │                    ┌──────────────────┐
       │                    │    /about        │
       │                    │  (Choose Feature)│
       │                    └────────┬─────────┘
       │                             │
       │                ┌────────────┴────────────┐
       │                │                         │
       │                ▼                         ▼
       │      ┌──────────────────┐   ┌──────────────────┐
       │      │ "Kết Quả Thần Số"│   │"Lời Khuyên Hàng Ngày"│
       │      └────────┬─────────┘   └────────┬─────────┘
       │               │                      │
       │               │                      │
       │               ▼                      ▼
       │      ┌──────────────────┐   ┌──────────────────┐
       │      │/numerology-detail│   │  /daily-advice   │
       │      └──────────────────┘   └────────┬─────────┘
       │                                      │
       │                                      ▼
       │                            ┌──────────────────┐
       │                            │  /todo-list      │
       │                            │  (From Save)     │
       │                            └──────────────────┘
       │
       └──────────────────────────────────────────────────┘
```

### Sơ Đồ Luồng Daily Advice Page

```
┌─────────────────────────────────────────────────────────────┐
│              USER ACCESSES /daily-advice                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ ProtectedRoute  │
            │ Check Auth      │
            └────────┬────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐         ┌──────────────┐
│ Not Auth     │         │   Auth OK    │
│ → /login     │         │              │
└──────────────┘         └──────┬───────┘
                                 │
                                 ▼
                    ┌─────────────────────┐
                    │ Check Redux Store   │
                    │ Has Data?           │
                    └──────┬──────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌──────────────────┐     ┌──────────────────┐
    │ Has Data in Redux│     │  No Data         │
    │ (Skip API call)  │     │  Load from API   │
    └─────────┬────────┘     └────────┬─────────┘
              │                       │
              └───────────┬───────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │ Calculate Personal   │
              │ Numbers (Day/Month/  │
              │ Year)                │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Get Advice by        │
              │ Personal Day Number  │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Render Components:   │
              │ - Header             │
              │ - Navigation Menu    │
              │ - Period Tabs        │
              │ - Advice Card        │
              │ - Actions Card       │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ User Actions:        │
              │ 1. Select Period     │
              │ 2. View Advice       │
              │ 3. Save to TODO      │
              └──────────┬───────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
┌──────────────────┐     ┌──────────────────┐
│ Save to TODO     │     │  Click Navigation│
│ → /todo-list     │     │  → Other pages   │
└──────────────────┘     └──────────────────┘
```

### Sơ Đồ Luồng Logout

```
┌─────────────────────────────────────────────────────────────┐
│              USER CLICKS LOGOUT BUTTON                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Confirm Dialog │
            │  "Đăng xuất?"   │
            └────────┬────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐         ┌──────────────┐
│   Cancel     │         │   Confirm    │
│  (Do Nothing)│         │              │
└──────────────┘         └──────┬───────┘
                                 │
                                 ▼
                    ┌─────────────────────┐
                    │ Step 1: Clear       │
                    │ localStorage        │
                    │ - auth              │
                    │ - userFullName      │
                    │ - userBirthDate     │
                    └──────┬──────────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │ Step 2: Logout from │
                    │ Zustand Store       │
                    │ (Clear in-memory)   │
                    └──────┬──────────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │ Step 3: Reset       │
                    │ Redux Store         │
                    │ - resetNumberKarma  │
                    │ - resetNumberName   │
                    └──────┬──────────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │ Step 4: Force Reload│
                    │ window.location.    │
                    │ replace('/login')   │
                    └──────┬──────────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │ ProtectedRoute      │
                    │ Detects No Auth     │
                    │ (Already on /login) │
                    └─────────────────────┘
```

---

## 🔑 Các Điểm Quan Trọng

### 1. Protected Routes
- **Tất cả routes** (trừ `/`, `/login`, `/signup`) đều được bảo vệ
- **ProtectedRoute** kiểm tra từ localStorage (source of truth)
- Nếu không có auth → Redirect về `/login` và lưu location để quay lại sau

### 2. Data Loading Strategy
- **Ưu tiên Redux store**: Nếu đã có data trong Redux → Không gọi API
- **Fallback localStorage**: Nếu Redux trống, check localStorage
- **API call**: Chỉ gọi khi authenticated và không có data

### 3. Authentication Flow
- **Login** → Load data → Redirect đến `/about` (nếu có data) hoặc `/name-input` (nếu chưa)
- **Signup** → Auto login → Redirect đến `/name-input`
- **Logout** → Clear tất cả → Force reload về `/login`

### 4. Navigation Flow
- **Sau login**: Luôn về `/about` để user chọn chức năng
- **Từ `/about`**: Có thể chọn "Kết Quả Thần Số" hoặc "Lời Khuyên Hàng Ngày"
- **Từ `/daily-advice`**: Có thể navigate đến `/todo-list` hoặc `/numerology-detail`

### 5. State Management
- **Zustand**: Quản lý auth state (user, tokens)
- **Redux**: Quản lý numerology data (numbers, dates, etc.)
- **localStorage**: Persistent storage cho cả auth và user data

---

## 📝 Notes

### Lưu Ý Khi Phát Triển

1. **Khi thêm route mới**:
   - Nhớ wrap trong `<ProtectedRoute>` nếu cần authentication
   - Update file này nếu route quan trọng

2. **Khi modify auth flow**:
   - Đảm bảo clear cả localStorage và Zustand/Redux store
   - Test logout flow để đảm bảo mọi thứ được reset

3. **Khi modify data loading**:
   - Luôn check Redux store trước khi gọi API
   - Có fallback localStorage nếu cần

4. **Performance**:
   - Redux store giúp tránh re-fetch data không cần thiết
   - localStorage giúp persist data giữa các session

---

## 📞 Liên Hệ & Hỗ Trợ

Nếu có thắc mắc về luồng hoạt động, vui lòng:
1. Đọc lại phần liên quan trong tài liệu này
2. Xem code comments trong các file components
3. Check console logs khi debug

---

**Tài liệu được cập nhật lần cuối**: Hôm nay
**Version**: 1.0.0


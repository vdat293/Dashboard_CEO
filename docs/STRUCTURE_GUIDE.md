# 📖 Hướng dẫn chi tiết về cấu trúc Dashboard CEO

## Mục lục
1. [Tổng quan kiến trúc](#tổng-quan-kiến-trúc)
2. [Luồng hoạt động](#luồng-hoạt-động)
3. [Chi tiết từng component](#chi-tiết-từng-component)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

---

## Tổng quan kiến trúc

Dashboard CEO được xây dựng theo mô hình **MVC đơn giản**:

```
┌─────────────────────────────────────────┐
│           index.html (View)             │
│  - Hiển thị giao diện                   │
│  - Cấu trúc HTML                        │
└───────────────┬─────────────────────────┘
                │
        ┌───────┴────────┐
        │                │
┌───────▼──────┐  ┌──────▼─────────┐
│  CSS Files   │  │   JS Files     │
│  (Style)     │  │  (Logic)       │
│              │  │                │
│ - variables  │  │ - data.js      │
│ - style      │  │ - charts.js    │
│              │  │ - main.js      │
└──────────────┘  └────────────────┘
```

### Vai trò của từng phần:

1. **HTML (View)**: Hiển thị giao diện cho người dùng
2. **CSS (Style)**: Trang trí, màu sắc, layout
3. **JavaScript (Controller + Model)**:
   - data.js: Model (dữ liệu)
   - charts.js: Controller (xử lý biểu đồ)
   - main.js: Controller (xử lý chính)

---

## Luồng hoạt động

### Khi người dùng mở dashboard:

```
1. Trình duyệt load index.html
   │
   ├─> Load CSS files (variables.css, style.css)
   │   └─> Áp dụng styling cho trang
   │
   ├─> Load external libraries
   │   ├─> Bootstrap (layout, components)
   │   ├─> AdminLTE (admin template)
   │   └─> ApexCharts (biểu đồ)
   │
   ├─> Load JavaScript files theo thứ tự:
   │   ├─> 1. data.js (khai báo dữ liệu)
   │   ├─> 2. charts.js (khai báo hàm biểu đồ)
   │   └─> 3. main.js (khởi tạo và chạy)
   │
   └─> Sự kiện DOMContentLoaded được trigger
       └─> main.js gọi initDashboard()
           ├─> initRevenueChart()
           ├─> initProductChart()
           └─> initAllSparklines()
```

---

## Chi tiết từng component

### 1. HTML Structure

```html
<body>
  <div class="wrapper">
    <!-- 1. Header (Navbar) -->
    <nav class="main-header">
      - Logo, menu toggle
      - Notifications
      - User menu
    </nav>

    <!-- 2. Sidebar -->
    <aside class="main-sidebar">
      - Brand logo
      - User panel
      - Navigation menu
    </aside>

    <!-- 3. Content -->
    <div class="content-wrapper">
      - Breadcrumb
      - KPI boxes (Info boxes)
      - Charts (Revenue, Product)
      - Tables (Top products)
      - Activity feed
    </div>

    <!-- 4. Footer -->
    <footer class="main-footer">
      - Copyright
      - Version info
    </footer>
  </div>
</body>
```

### 2. CSS Organization

#### variables.css
```css
:root {
  /* Định nghĩa các biến toàn cục */
  --primary-color: #007bff;
  --spacing-md: 1rem;
  /* ... */
}

/* Ưu điểm:
   - Dễ thay đổi theme
   - Nhất quán về màu sắc
   - Dễ maintain
*/
```

#### style.css
```css
/* Cấu trúc theo component */

/* 1. Info Box */
.info-box { ... }

/* 2. Cards */
.card { ... }

/* 3. Tables */
.table { ... }

/* 4. Responsive */
@media (max-width: 768px) { ... }

/* 5. Animations */
@keyframes fadeIn { ... }
```

### 3. JavaScript Organization

#### data.js - Dữ liệu
```javascript
// Chỉ chứa dữ liệu, không có logic
const revenueData = { ... };
const kpiData = { ... };

// Tách biệt data giúp:
// - Dễ test
// - Dễ thay đổi
// - Dễ kết nối API sau này
```

#### charts.js - Xử lý biểu đồ
```javascript
// Các hàm tạo biểu đồ
function initRevenueChart(selector, data) {
  // 1. Cấu hình options
  // 2. Tạo chart instance
  // 3. Render
  // 4. Return instance
}

// Tách biệt charts giúp:
// - Code dễ đọc
// - Tái sử dụng được
// - Dễ maintain
```

#### main.js - Logic chính
```javascript
// Entry point của ứng dụng
document.addEventListener('DOMContentLoaded', initDashboard);

function initDashboard() {
  // Khởi tạo tất cả components
}

// Tập trung logic ở đây giúp:
// - Kiểm soát flow
// - Debug dễ dàng
// - Mở rộng thuận tiện
```

---

## Best Practices

### 1. Tổ chức file

✅ **Nên làm:**
```
assets/
  css/
    variables.css  # Biến
    style.css      # Styles chính
  js/
    data.js        # Dữ liệu
    charts.js      # Biểu đồ
    main.js        # Logic chính
```

❌ **Không nên:**
```
styles.css         # Tất cả CSS trong 1 file lớn
script.js          # Tất cả JS trong 1 file lớn
```

### 2. Naming Convention

✅ **Tên có ý nghĩa:**
```javascript
const revenueData = { ... };        // Rõ ràng
function initRevenueChart() { ... } // Mô tả đúng chức năng
```

❌ **Tên không rõ ràng:**
```javascript
const data1 = { ... };    // data1 là gì?
function func() { ... }   // func làm gì?
```

### 3. Comments

✅ **Comment rõ ràng:**
```javascript
/**
 * Khởi tạo biểu đồ doanh thu theo tháng
 * @param {string} selector - CSS selector
 * @param {Object} data - Dữ liệu {months, values}
 */
function initRevenueChart(selector, data) { ... }
```

### 4. Code Structure

✅ **Tách nhỏ functions:**
```javascript
// Mỗi function làm 1 việc
function initRevenueChart() { ... }
function initProductChart() { ... }
function initSparklines() { ... }
```

❌ **Function quá lớn:**
```javascript
function initEverything() {
  // 500 dòng code...
}
```

---

## Mở rộng Dashboard

### Thêm một KPI box mới

**Bước 1: Thêm HTML**
```html
<div class="col-12 col-sm-6 col-md-3">
  <div class="info-box">
    <span class="info-box-icon bg-gradient-danger">
      <i class="bi bi-person"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text">Nhân viên</span>
      <span class="info-box-number">250</span>
    </div>
  </div>
</div>
```

**Bước 2: Thêm dữ liệu (data.js)**
```javascript
const kpiData = {
  // ... existing data
  employees: {
    value: '250',
    trend: 'up',
    percentage: 5
  }
};
```

**Bước 3: (Optional) Thêm logic nếu cần**

### Thêm một biểu đồ mới

**Bước 1: Thêm container trong HTML**
```html
<div id="my-new-chart" style="height: 300px;"></div>
```

**Bước 2: Tạo hàm trong charts.js**
```javascript
function initMyNewChart(selector, data) {
  const options = {
    // ... chart configuration
  };
  const chart = new ApexCharts(
    document.querySelector(selector),
    options
  );
  chart.render();
  return chart;
}
```

**Bước 3: Gọi hàm trong main.js**
```javascript
function initDashboard() {
  // ... existing code
  initMyNewChart('#my-new-chart', myData);
}
```

---

## Troubleshooting

### Biểu đồ không hiển thị

**Nguyên nhân:** File JS load sai thứ tự

**Giải pháp:**
```html
<!-- Phải load theo thứ tự này -->
<script src="assets/js/data.js"></script>      <!-- 1 -->
<script src="assets/js/charts.js"></script>    <!-- 2 -->
<script src="assets/js/main.js"></script>      <!-- 3 -->
```

### CSS không áp dụng

**Nguyên nhân:** Đường dẫn file sai

**Kiểm tra:**
```html
<!-- Đường dẫn tương đối từ index.html -->
<link rel="stylesheet" href="assets/css/style.css" />
```

### Console báo lỗi "... is not defined"

**Nguyên nhân:** Biến/hàm được sử dụng trước khi khai báo

**Giải pháp:** Đảm bảo load file theo đúng thứ tự

### Responsive không hoạt động

**Kiểm tra:** Có meta viewport tag không?
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## Tips học tập

### Cho người mới bắt đầu:

1. **Bắt đầu từ HTML**
   - Hiểu cấu trúc trang
   - Xem từng phần một (header, sidebar, content)

2. **Tiếp theo là CSS**
   - Xem variables.css để hiểu về biến
   - Thay đổi màu sắc để thấy hiệu quả
   - Học CSS selector

3. **Cuối cùng là JavaScript**
   - Đọc data.js trước (dễ nhất)
   - Sau đó đọc main.js (logic đơn giản)
   - Cuối cùng đọc charts.js (phức tạp hơn)

4. **Thực hành**
   - Thay đổi dữ liệu
   - Thêm/bớt components
   - Tạo theme riêng
   - Debug bằng Console (F12)

### Tài nguyên học thêm:

- **DevTools**: F12 → Xem cấu trúc, style, console
- **W3Schools**: Tài liệu cơ bản về HTML/CSS/JS
- **MDN**: Tài liệu chuyên sâu hơn
- **Stack Overflow**: Giải đáp thắc mắc

---

**Happy Coding! 🚀**

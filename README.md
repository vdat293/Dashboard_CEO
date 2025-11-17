# 📊 Dashboard CEO - Tổng Quan Kinh Doanh

Dashboard CEO là một ứng dụng web hiển thị các chỉ số kinh doanh quan trọng (KPI) cho người điều hành doanh nghiệp. Dự án được thiết kế đơn giản, dễ hiểu, phù hợp cho người mới bắt đầu học lập trình web.

## 🎯 Tính năng

### Trang chính (index.html)
- ✅ Hiển thị các chỉ số KPI quan trọng (Doanh thu, Lợi nhuận, Khách hàng, Đơn hàng)
- 📈 Biểu đồ doanh thu theo tháng
- 🥧 Biểu đồ tròn thị phần sản phẩm
- 📋 Bảng top sản phẩm bán chạy với sparkline charts
- 🔔 Danh sách hoạt động gần đây

### Trang Doanh Thu (pages/revenue.html)
- 💰 Thống kê tổng quan: doanh thu tháng, năm, trung bình, tăng trưởng
- 📊 Biểu đồ xu hướng doanh thu so sánh 2 năm
- 🗺️ Biểu đồ doanh thu theo khu vực (Miền Bắc, Nam, Trung, Quốc tế)
- 📅 Biểu đồ so sánh doanh thu 3 năm
- 📋 Bảng chi tiết doanh thu, chi phí, lợi nhuận theo tháng

### Trang Khách Hàng (pages/customers.html)
- 👥 Thống kê: Tổng khách hàng, mới, VIP, mất khách hàng
- 📈 Biểu đồ xu hướng khách hàng mới
- 🎯 Biểu đồ phân loại khách hàng (VIP, Thân thiết, Thường xuyên, Bình thường)
- 🌟 Bảng top 10 khách hàng VIP với phân hạng: Diamond, Platinum, Gold, Silver
- 📄 Pagination cho danh sách khách hàng

### Trang Sản Phẩm (pages/products.html)
- 📦 Thống kê: Tổng sản phẩm, còn hàng, sắp hết, hết hàng
- 📊 Biểu đồ doanh số theo danh mục
- 📉 Biểu đồ tỷ lệ tồn kho
- 📋 Bảng sản phẩm bán chạy với xu hướng tăng/giảm
- ⚠️ Cảnh báo tồn kho thấp và sản phẩm hết hàng
- 🔍 Tìm kiếm sản phẩm

### Tính năng chung
- 📱 Responsive design - tương thích với mobile, tablet, desktop
- 🎨 Giao diện đẹp, chuyên nghiệp sử dụng AdminLTE
- 🧭 Navigation sidebar với active state
- 🍞 Breadcrumb navigation trên mọi trang
- 🎯 Consistent UI/UX trên tất cả trang

## 📁 Cấu trúc dự án

```
Dashboard_CEO/
├── index.html              # Trang chính của dashboard
├── README.md              # File hướng dẫn này
│
├── assets/                # Thư mục chứa tài nguyên
│   ├── css/              # Thư mục chứa file CSS
│   │   ├── variables.css # Các biến màu sắc, font, spacing
│   │   └── style.css     # Custom styles cho dashboard
│   │
│   ├── js/               # Thư mục chứa file JavaScript
│   │   ├── data.js       # Dữ liệu mẫu cho dashboard
│   │   ├── charts.js     # Các hàm tạo biểu đồ
│   │   └── main.js       # File JavaScript chính
│   │
│   └── images/           # Thư mục chứa hình ảnh (nếu có)
│
├── pages/                # Thư mục chứa các trang khác
│   ├── revenue.html      # Trang chi tiết doanh thu
│   ├── customers.html    # Trang quản lý khách hàng
│   └── products.html     # Trang quản lý sản phẩm
│
└── docs/                 # Thư mục tài liệu
    ├── STRUCTURE_GUIDE.md      # Hướng dẫn chi tiết về kiến trúc
    └── PROJECT_STRUCTURE.txt   # Sơ đồ cấu trúc dự án
```

## 🚀 Cách sử dụng

### Cách 1: Mở trực tiếp bằng trình duyệt

1. Download toàn bộ project về máy
2. Mở file `index.html` bằng trình duyệt (Chrome, Firefox, Edge, Safari)
3. Dashboard sẽ hiển thị ngay lập tức

### Cách 2: Sử dụng Live Server (Khuyến nghị)

1. Cài đặt Visual Studio Code
2. Cài extension "Live Server" trong VS Code
3. Mở folder project trong VS Code
4. Click chuột phải vào file `index.html` → chọn "Open with Live Server"
5. Dashboard sẽ tự động mở trên trình duyệt

### Cách 3: Sử dụng Python HTTP Server

```bash
# Di chuyển vào thư mục project
cd Dashboard_CEO

# Chạy server (Python 3)
python -m http.server 8000

# Mở trình duyệt và truy cập
# http://localhost:8000
```

## 📚 Giải thích cấu trúc cho người mới

### 1. File HTML (index.html)

File HTML chứa cấu trúc trang web:
- `<head>`: Chứa metadata, links đến CSS, fonts
- `<body>`: Chứa nội dung hiển thị
  - Header: Thanh menu trên cùng
  - Sidebar: Menu bên trái
  - Content: Nội dung chính (KPI boxes, charts, tables)
  - Footer: Chân trang

### 2. File CSS

#### `assets/css/variables.css`
- Chứa các biến CSS để dễ tùy chỉnh màu sắc, font, spacing
- Thay đổi màu sắc toàn bộ dashboard chỉ bằng cách sửa biến ở đây

#### `assets/css/style.css`
- Chứa các custom styles cho các components
- Mỗi class có comment giải thích rõ ràng

### 3. File JavaScript

#### `assets/js/data.js`
- Chứa tất cả dữ liệu mẫu
- Trong thực tế, dữ liệu này sẽ lấy từ API backend
- Dễ dàng thay đổi dữ liệu để test

#### `assets/js/charts.js`
- Chứa các hàm tạo biểu đồ
- Sử dụng thư viện ApexCharts
- Mỗi hàm có comment giải thích

#### `assets/js/main.js`
- File JavaScript chính, khởi tạo dashboard
- Chứa các event handlers
- Các hàm utility (format số, tiền tệ, etc.)

## 🎨 Tùy chỉnh Dashboard

### Thay đổi màu sắc

Mở file `assets/css/variables.css` và sửa các biến:

```css
:root {
  --primary-color: #007bff;     /* Màu chính */
  --success-color: #28a745;     /* Màu xanh lá */
  --warning-color: #ffc107;     /* Màu vàng */
  /* ... */
}
```

### Thay đổi dữ liệu

Mở file `assets/js/data.js` và sửa các biến:

```javascript
// Dữ liệu doanh thu
const revenueData = {
  months: ['Tháng 1', 'Tháng 2', ...],
  values: [1800, 2100, ...]  // Sửa số liệu ở đây
};
```

### Thêm tính năng mới

1. Thêm HTML vào `index.html`
2. Thêm styles vào `assets/css/style.css`
3. Thêm logic vào `assets/js/main.js`

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và animations
- **JavaScript (ES6)**: Logic và tương tác
- **Bootstrap 4**: Framework CSS cho responsive
- **AdminLTE**: Template cho admin dashboard
- **ApexCharts**: Thư viện biểu đồ
- **Bootstrap Icons**: Icon set

## 📖 Học thêm

### Tài liệu tham khảo:

1. **HTML & CSS cơ bản**
   - https://www.w3schools.com/html/
   - https://www.w3schools.com/css/

2. **JavaScript**
   - https://javascript.info/
   - https://www.w3schools.com/js/

3. **Bootstrap**
   - https://getbootstrap.com/docs/4.6/

4. **ApexCharts**
   - https://apexcharts.com/docs/

5. **AdminLTE**
   - https://adminlte.io/docs/

## 🎓 Bài tập thực hành cho người mới

### Bài 1: Thay đổi dữ liệu
- Thay đổi số liệu KPI trong `data.js`
- Thay đổi dữ liệu biểu đồ
- Quan sát kết quả trên dashboard

### Bài 2: Thay đổi màu sắc
- Sửa màu primary thành màu khác
- Thay đổi màu gradient của info boxes
- Tạo theme riêng cho công ty bạn

### Bài 3: Thêm KPI box mới
- Copy một info-box trong HTML
- Thêm dữ liệu mới vào `data.js`
- Hiển thị chỉ số mới (VD: Nhân viên, Chi phí)

### Bài 4: Tạo trang mới
- Tạo file `pages/revenue.html`
- Copy cấu trúc từ `index.html`
- Tạo trang chi tiết về doanh thu

### Bài 5: Responsive
- Mở Developer Tools (F12)
- Test dashboard trên các kích thước màn hình khác nhau
- Thêm CSS để cải thiện hiển thị mobile

## ❓ FAQ - Câu hỏi thường gặp

**Q: Tại sao biểu đồ không hiển thị?**
A: Kiểm tra Console (F12) xem có lỗi không. Đảm bảo các file JS được load đúng thứ tự.

**Q: Làm sao để kết nối với backend/database?**
A: Thay thế dữ liệu trong `data.js` bằng API calls sử dụng `fetch()` hoặc `axios`.

**Q: Dashboard có hoạt động offline không?**
A: Hiện tại cần internet vì sử dụng CDN. Để offline, download các thư viện về local.

**Q: Tôi có thể sử dụng cho dự án thương mại không?**
A: Có, nhưng kiểm tra license của các thư viện bên thứ ba (Bootstrap, AdminLTE, ApexCharts).

## 🤝 Đóng góp

Nếu bạn muốn đóng góp vào project:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được tạo ra cho mục đích học tập. Bạn có thể tự do sử dụng và chỉnh sửa.

## 📧 Liên hệ

Nếu có câu hỏi, hãy tạo issue trên GitHub hoặc liên hệ qua email.

---

**Chúc bạn học tập vui vẻ! 🎉**

Made with ❤️ for beginners

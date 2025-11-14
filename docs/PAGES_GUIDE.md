# 📄 Hướng dẫn các trang trong Dashboard CEO

## Tổng quan

Dashboard CEO hiện có **5 trang chính**, mỗi trang phục vụ một mục đích cụ thể trong quản lý kinh doanh.

---

## 1️⃣ Trang chủ - Tổng quan (index.html)

### 🎯 Mục đích
Hiển thị tổng quan nhanh về tình hình kinh doanh của công ty.

### 📊 Nội dung chính
- **4 KPI Boxes**: Doanh thu tháng, Lợi nhuận, Khách hàng mới, Đơn hàng
- **Biểu đồ doanh thu**: Area chart hiển thị doanh thu 12 tháng
- **Biểu đồ sản phẩm**: Donut chart thị phần sản phẩm
- **Bảng top 5 sản phẩm**: Với sparkline charts xu hướng
- **Hoạt động gần đây**: 5 hoạt động mới nhất

### 👥 Người dùng phù hợp
- CEO/Giám đốc cần xem tổng quan nhanh
- Quản lý cấp cao cần overview hàng ngày

### 💡 Use case
"Tôi muốn xem nhanh tình hình kinh doanh hôm nay có ổn không?"

---

## 2️⃣ Trang Doanh Thu (pages/revenue.html)

### 🎯 Mục đích
Phân tích chi tiết doanh thu theo nhiều góc độ khác nhau.

### 📊 Nội dung chính
- **4 Small Boxes**: Doanh thu tháng, năm, trung bình, tăng trưởng
- **Biểu đồ xu hướng**: So sánh doanh thu 2024 vs 2023
- **Biểu đồ khu vực**: Doanh thu theo Miền Bắc/Nam/Trung/Quốc tế (35%/28%/22%/15%)
- **Biểu đồ so sánh**: Bar chart so sánh 3 năm (2024, 2023, 2022)
- **Bảng chi tiết**: Doanh thu, chi phí, lợi nhuận từng tháng

### 👥 Người dùng phù hợp
- Giám đốc tài chính (CFO)
- Trưởng phòng kinh doanh
- CEO muốn xem chi tiết doanh thu

### 💡 Use case
"Doanh thu tháng này có đạt mục tiêu không? So với năm ngoái thế nào? Khu vực nào đóng góp nhiều nhất?"

### 🔍 Insights có thể rút ra
- Xu hướng tăng/giảm doanh thu theo thời gian
- Khu vực địa lý nào cần tập trung
- So sánh year-over-year để đánh giá tăng trưởng
- Biên lợi nhuận từng tháng

---

## 3️⃣ Trang Khách Hàng (pages/customers.html)

### 🎯 Mục đích
Quản lý và phân tích dữ liệu khách hàng.

### 📊 Nội dung chính
- **4 Info Boxes**: Tổng khách hàng (12,458), Mới (1,234), VIP (256), Mất (45)
- **Biểu đồ xu hướng**: Khách hàng mới 12 tháng
- **Biểu đồ phân loại**: VIP/Thân thiết/Thường xuyên/Bình thường
- **Top 10 VIP**: Bảng chi tiết với email, phone, chi tiêu, hạng

### 🌟 Hệ thống phân hạng
- **Diamond** 💎: Chi tiêu > 300 triệu
- **Platinum** ⭐: Chi tiêu 200-300 triệu
- **Gold** 🥇: Chi tiêu 150-200 triệu
- **Silver** 🥈: Chi tiêu 100-150 triệu

### 👥 Người dùng phù hợp
- Giám đốc Marketing
- Trưởng phòng chăm sóc khách hàng (CRM)
- CEO quan tâm đến customer retention

### 💡 Use case
"Ai là khách hàng VIP của chúng ta? Tỷ lệ giữ chân khách hàng thế nào? Khách hàng mới có tăng không?"

### 🔍 Insights có thể rút ra
- Nhận diện khách hàng có giá trị cao (VIP)
- Xu hướng tăng/giảm khách hàng mới
- Tỷ lệ mất khách hàng (churn rate)
- Phân khúc khách hàng để marketing hiệu quả

---

## 4️⃣ Trang Sản Phẩm (pages/products.html)

### 🎯 Mục đích
Quản lý tồn kho và hiệu suất sản phẩm.

### 📊 Nội dung chính
- **4 Small Boxes**: Tổng sản phẩm (458), Còn hàng (327), Sắp hết (89), Hết (42)
- **Biểu đồ doanh số**: Bar chart theo danh mục (Laptop, Phone, Tablet...)
- **Biểu đồ tồn kho**: Donut chart tỷ lệ còn/sắp hết/hết
- **Bảng sản phẩm**: Top sellers với giá, tồn kho, doanh thu, xu hướng
- **Cảnh báo**: Sản phẩm tồn kho thấp và hết hàng

### 🚨 Alert System
- **Warning** ⚠️: Tồn kho < 10 sản phẩm
- **Danger** 🚫: Hết hàng (0 sản phẩm)

### 👥 Người dùng phù hợp
- Giám đốc vận hành (COO)
- Quản lý kho
- Trưởng phòng mua hàng

### 💡 Use case
"Sản phẩm nào sắp hết hàng cần nhập thêm? Danh mục nào bán chạy nhất? Có sản phẩm nào bán chậm không?"

### 🔍 Insights có thể rút ra
- Sản phẩm nào cần nhập hàng gấp
- Danh mục nào có doanh số cao
- Tình trạng tồn kho tổng thể
- Xu hướng bán hàng của từng sản phẩm

---

## 5️⃣ Trang Báo Cáo (pages/reports.html)

### 🎯 Mục đích
Tổng hợp và phân tích toàn diện tình hình kinh doanh.

### 📊 Nội dung chính
- **Chọn thời gian**: Buttons để lọc theo Ngày/Tuần/Tháng/Năm
- **KPI với Progress**: Doanh thu, Lợi nhuận, Đơn hàng, Khách hàng với % hoàn thành
- **Bảng so sánh**: Doanh thu vs Khách hàng metrics
- **Biểu đồ tổng hợp**: Multi-type chart (Column + Line) xu hướng 12 tháng
- **Top Products**: Bar chart top 5 sản phẩm
- **Kênh bán**: Donut chart (Website 45%, Cửa hàng 30%, App 15%, Đối tác 10%)
- **Nhận xét & Đề xuất**: Phân tích điểm mạnh, yếu và recommendations

### 📥 Export Features
- **PDF Export**: Xuất báo cáo dạng PDF để in hoặc gửi email
- **Excel Export**: Xuất dữ liệu để phân tích sâu hơn

### 👥 Người dùng phù hợp
- CEO/Giám đốc điều hành
- Board of Directors
- Investors/Shareholders
- Managers cần báo cáo định kỳ

### 💡 Use case
"Chuẩn bị báo cáo tháng để họp với board. Cần tổng hợp toàn bộ dữ liệu và insights."

### 🔍 Insights có thể rút ra
- Performance tổng thể của công ty
- So sánh actual vs target
- Điểm mạnh để phát huy
- Điểm yếu cần cải thiện
- Action items cụ thể

---

## 🗺️ User Journey (Luồng sử dụng)

### Morning Check (Sáng)
1. **index.html** → Xem overview nhanh
2. Nếu thấy vấn đề → Click vào trang chi tiết tương ứng

### Weekly Review (Hàng tuần)
1. **revenue.html** → Xem xu hướng doanh thu
2. **customers.html** → Check khách hàng mới
3. **products.html** → Review tồn kho

### Monthly Report (Hàng tháng)
1. **reports.html** → Tạo báo cáo tổng hợp
2. Export PDF → Gửi cho stakeholders
3. Phân tích insights → Đề xuất actions

---

## 🎨 Thiết kế UI/UX

### Nguyên tắc thiết kế
- **Consistent**: Tất cả trang có layout tương tự
- **Intuitive**: Dễ tìm thông tin
- **Visual**: Charts giúp hiểu nhanh data
- **Actionable**: Mỗi page có call-to-action rõ ràng

### Color Coding
- 🔵 **Primary (Blue)**: Doanh thu, chính
- 🟢 **Success (Green)**: Lợi nhuận, tích cực
- 🟡 **Warning (Yellow)**: Cảnh báo, cần chú ý
- 🔴 **Danger (Red)**: Nguy hiểm, hết hàng
- 🔵 **Info (Cyan)**: Thông tin, khách hàng

### Icons
Sử dụng Bootstrap Icons nhất quán:
- 💰 `bi-currency-dollar`: Tiền bạc
- 👥 `bi-people`: Khách hàng
- 📦 `bi-box-seam`: Sản phẩm
- 📊 `bi-graph-up`: Doanh thu/Tăng trưởng
- 📋 `bi-clipboard-data`: Báo cáo

---

## 🔧 Tùy chỉnh từng trang

### Thêm KPI mới vào index.html
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

### Thêm biểu đồ mới vào revenue.html
1. Thêm div container trong HTML
2. Tạo ApexCharts config trong `<script>`
3. Render chart với `chart.render()`

### Thêm cột mới vào bảng customers.html
1. Thêm `<th>` vào `<thead>`
2. Thêm `<td>` tương ứng vào mỗi `<tr>` trong `<tbody>`

---

## 📱 Responsive Behavior

### Desktop (> 992px)
- Sidebar luôn hiện
- Charts full width
- Tables hiển thị đầy đủ columns

### Tablet (768px - 992px)
- Sidebar có thể thu gọn
- Charts co lại nhưng vẫn đọc được
- Tables có horizontal scroll

### Mobile (< 768px)
- Sidebar ẩn mặc định, hiện khi click menu
- KPI boxes xếp 1 cột
- Charts chiều cao giảm
- Tables scroll ngang

---

## 🚀 Mở rộng trong tương lai

### Trang có thể thêm:
1. **Settings** (`pages/settings.html`): Cài đặt dashboard, user profile
2. **Team** (`pages/team.html`): Quản lý nhân sự
3. **Marketing** (`pages/marketing.html`): Campaigns, ROI
4. **Finance** (`pages/finance.html`): Cash flow, balance sheet
5. **Analytics** (`pages/analytics.html`): Deep dive vào metrics

### Tính năng có thể thêm:
- Real-time updates với WebSocket
- Notifications system
- User authentication
- API integration
- Data export Excel/PDF thật
- Date range picker
- Filters và advanced search
- Dark mode
- Multi-language

---

## 📚 Tài liệu liên quan

- [README.md](../README.md): Hướng dẫn cài đặt và sử dụng
- [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md): Chi tiết kiến trúc code
- [PROJECT_STRUCTURE.txt](PROJECT_STRUCTURE.txt): Sơ đồ cấu trúc

---

**Version**: 1.0.0
**Last Updated**: 2024
**Maintainer**: Dashboard CEO Team

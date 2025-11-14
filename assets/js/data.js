/**
 * DỮ LIỆU MẪU CHO DASHBOARD CEO
 * File này chứa tất cả dữ liệu mẫu để hiển thị trên dashboard
 * Trong thực tế, dữ liệu này sẽ được lấy từ API backend
 */

// Dữ liệu doanh thu theo tháng (đơn vị: triệu VNĐ)
const revenueData = {
  months: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  values: [1800, 2100, 1950, 2350, 2200, 2450, 2500, 2800, 2650, 2900, 2750, 3100]
};

// Dữ liệu thị phần sản phẩm (đơn vị: triệu VNĐ)
const productMarketShare = {
  labels: ['Laptop', 'Điện thoại', 'Tablet', 'Tai nghe', 'Đồng hồ'],
  values: [857, 633, 437, 275, 191],
  colors: ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
};

// Dữ liệu sparkline cho từng sản phẩm (xu hướng bán hàng 7 ngày)
const sparklineData = {
  product1: [200, 210, 220, 230, 235, 240, 245], // Laptop - tăng
  product2: [150, 165, 170, 180, 185, 190, 198], // iPhone - tăng
  product3: [350, 370, 380, 390, 400, 410, 423], // AirPods - tăng
  product4: [100, 95, 90, 88, 87, 86, 87],       // Apple Watch - giảm
  product5: [120, 130, 135, 140, 145, 150, 156]  // iPad - tăng
};

// Dữ liệu KPI (các chỉ số quan trọng)
const kpiData = {
  revenue: {
    value: '2.5 tỷ',
    trend: 'up',
    percentage: 12
  },
  profit: {
    value: '850 triệu',
    trend: 'up',
    percentage: 8
  },
  customers: {
    value: '1,234',
    trend: 'up',
    percentage: 15
  },
  orders: {
    value: '3,567',
    trend: 'down',
    percentage: 3
  }
};

// Dữ liệu top sản phẩm bán chạy
const topProducts = [
  {
    name: 'Laptop Dell XPS 15',
    icon: 'bi-laptop',
    iconColor: 'text-primary',
    price: '35,000,000đ',
    sold: 245,
    revenue: '857 triệu',
    badge: 'success',
    sparklineId: 'sparkline-1'
  },
  {
    name: 'iPhone 15 Pro Max',
    icon: 'bi-phone',
    iconColor: 'text-info',
    price: '32,000,000đ',
    sold: 198,
    revenue: '633 triệu',
    badge: 'success',
    sparklineId: 'sparkline-2'
  },
  {
    name: 'AirPods Pro 2',
    icon: 'bi-headphones',
    iconColor: 'text-warning',
    price: '6,500,000đ',
    sold: 423,
    revenue: '275 triệu',
    badge: 'success',
    sparklineId: 'sparkline-3'
  },
  {
    name: 'Apple Watch Ultra 2',
    icon: 'bi-smartwatch',
    iconColor: 'text-danger',
    price: '22,000,000đ',
    sold: 87,
    revenue: '191 triệu',
    badge: 'warning',
    sparklineId: 'sparkline-4'
  },
  {
    name: 'iPad Pro M2',
    icon: 'bi-tablet',
    iconColor: 'text-success',
    price: '28,000,000đ',
    sold: 156,
    revenue: '437 triệu',
    badge: 'success',
    sparklineId: 'sparkline-5'
  }
];

// Dữ liệu hoạt động gần đây
const recentActivities = [
  {
    icon: 'bi-check-circle-fill',
    iconColor: 'text-success',
    title: 'Đơn hàng #DH2024-1234 đã hoàn thành',
    description: 'Khách hàng: Trần Văn B',
    time: '5 phút trước'
  },
  {
    icon: 'bi-person-plus-fill',
    iconColor: 'text-info',
    title: '3 khách hàng mới đăng ký',
    description: 'Từ chiến dịch marketing Q4',
    time: '15 phút trước'
  },
  {
    icon: 'bi-cash-coin',
    iconColor: 'text-success',
    title: 'Thanh toán 125 triệu đã được xác nhận',
    description: 'Hợp đồng #HD2024-089',
    time: '30 phút trước'
  },
  {
    icon: 'bi-exclamation-triangle-fill',
    iconColor: 'text-warning',
    title: 'Tồn kho sản phẩm A cần bổ sung',
    description: 'Chỉ còn 15 sản phẩm',
    time: '1 giờ trước'
  },
  {
    icon: 'bi-file-earmark-text',
    iconColor: 'text-primary',
    title: 'Báo cáo tài chính đã sẵn sàng',
    description: 'Quý 4 năm 2024',
    time: '2 giờ trước'
  }
];

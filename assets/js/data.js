/**
 * DỮ LIỆU MẪU CHO DASHBOARD CEO
 * File này chứa tất cả dữ liệu mẫu để hiển thị trên dashboard
 * Trong thực tế, dữ liệu này sẽ được lấy từ API backend
 *
 * CẬP NHẬT: Dữ liệu được làm realistic hơn với logic kinh doanh thực tế
 */

// Dữ liệu doanh thu theo tháng (đơn vị: triệu VNĐ)
// Logic: Cao đầu năm (sau Tết), thấp giữa năm, cao cuối năm (Black Friday, Noel)
const revenueData = {
  months: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  // T1-2: Cao (Tết), T3-6: Giảm dần, T7-8: Tăng (khuyến mãi), T9-10: Ổn định, T11-12: Cao (mùa mua sắm)
  values: [3250, 3480, 2890, 2650, 2420, 2380, 2950, 3180, 2780, 2850, 3420, 3680]
};

// Dữ liệu thị phần sản phẩm (đơn vị: triệu VNĐ)
// Tổng: 3680 triệu (doanh thu tháng 12)
const productMarketShare = {
  labels: ['Laptop', 'Điện thoại', 'Tablet', 'Tai nghe', 'Đồng hồ'],
  values: [1285, 1104, 736, 368, 187], // 35%, 30%, 20%, 10%, 5%
  colors: ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
};

// Dữ liệu sparkline cho từng sản phẩm (xu hướng bán hàng 7 ngày)
const sparklineData = {
  product1: [285, 295, 308, 320, 315, 328, 342], // Laptop - tăng mạnh cuối năm
  product2: [198, 205, 212, 208, 215, 223, 235], // iPhone - tăng ổn định
  product3: [156, 162, 168, 174, 181, 187, 195], // iPad - tăng đều
  product4: [95, 92, 88, 85, 82, 79, 76],        // Apple Watch - giảm (hết trend)
  product5: [68, 72, 75, 78, 82, 85, 89]         // AirPods - tăng nhẹ
};

// Dữ liệu KPI (các chỉ số quan trọng) - Tháng 12/2024
const kpiData = {
  revenue: {
    value: '3.68 tỷ',      // Doanh thu tháng 12 (cao nhất trong năm)
    trend: 'up',
    percentage: 7.6        // So với tháng 11: (3680-3420)/3420 * 100 = 7.6%
  },
  profit: {
    value: '1.25 tỷ',      // Biên lợi nhuận ~34%
    trend: 'up',
    percentage: 8.2
  },
  customers: {
    value: '1,456',        // Khách hàng mới tháng 12 (cao do mùa mua sắm)
    trend: 'up',
    percentage: 18.5       // Tăng mạnh so với tháng 11
  },
  orders: {
    value: '4,892',        // Đơn hàng tháng 12
    trend: 'up',
    percentage: 12.3       // Tăng do Black Friday + Noel
  }
};

// Dữ liệu top sản phẩm bán chạy (Tháng 12/2024)
const topProducts = [
  {
    name: 'Laptop Dell XPS 15',
    icon: 'bi-laptop',
    iconColor: 'text-primary',
    price: '34,990,000đ',
    sold: 342,                    // Tăng mạnh cuối năm (doanh nghiệp mua)
    revenue: '1,196 triệu',       // 342 x 34.99 triệu
    badge: 'success',
    sparklineId: 'sparkline-1'
  },
  {
    name: 'iPhone 15 Pro Max',
    icon: 'bi-phone',
    iconColor: 'text-info',
    price: '31,990,000đ',
    sold: 235,                    // Mùa Noel, quà tặng
    revenue: '752 triệu',         // 235 x 31.99 triệu
    badge: 'success',
    sparklineId: 'sparkline-2'
  },
  {
    name: 'iPad Pro M2 11"',
    icon: 'bi-tablet',
    iconColor: 'text-success',
    price: '24,990,000đ',
    sold: 195,                    // Học sinh, sinh viên mua cuối năm
    revenue: '487 triệu',         // 195 x 24.99 triệu
    badge: 'success',
    sparklineId: 'sparkline-3'
  },
  {
    name: 'AirPods Pro 2',
    icon: 'bi-headphones',
    iconColor: 'text-warning',
    price: '6,490,000đ',
    sold: 89,                     // Phụ kiện, không bán nhiều
    revenue: '58 triệu',          // 89 x 6.49 triệu
    badge: 'success',
    sparklineId: 'sparkline-5'
  },
  {
    name: 'Apple Watch Ultra 2',
    icon: 'bi-smartwatch',
    iconColor: 'text-danger',
    price: '21,990,000đ',
    sold: 76,                     // Giảm, hết trend
    revenue: '167 triệu',         // 76 x 21.99 triệu
    badge: 'warning',
    sparklineId: 'sparkline-4'
  }
];

// Dữ liệu hoạt động gần đây
const recentActivities = [
  {
    icon: 'bi-check-circle-fill',
    iconColor: 'text-success',
    title: 'Đơn hàng #DH2024-5892 đã hoàn thành',
    description: 'Khách hàng: Nguyễn Văn Minh - 3 Laptop Dell XPS',
    time: '5 phút trước'
  },
  {
    icon: 'bi-person-plus-fill',
    iconColor: 'text-info',
    title: '8 khách hàng mới đăng ký',
    description: 'Từ chiến dịch Flash Sale cuối năm',
    time: '15 phút trước'
  },
  {
    icon: 'bi-cash-coin',
    iconColor: 'text-success',
    title: 'Thanh toán 248 triệu đã được xác nhận',
    description: 'Hợp đồng doanh nghiệp #HD2024-156',
    time: '30 phút trước'
  },
  {
    icon: 'bi-exclamation-triangle-fill',
    iconColor: 'text-warning',
    title: 'Tồn kho iPhone 15 Pro Max cần bổ sung',
    description: 'Chỉ còn 12 máy - Dự kiến bán hết trong 2 ngày',
    time: '1 giờ trước'
  },
  {
    icon: 'bi-file-earmark-text',
    iconColor: 'text-primary',
    title: 'Báo cáo tài chính Q4/2024 đã sẵn sàng',
    description: 'Doanh thu tăng 15% so với Q4/2023',
    time: '2 giờ trước'
  }
];

// Dữ liệu khách hàng (realistic với tên thật, email, SĐT Việt Nam)
const customerData = {
  total: 15678,           // Tổng khách hàng tích lũy
  newThisMonth: 1456,     // Khách mới tháng 12
  vip: 342,               // Khách VIP
  lost: 89                // Khách bỏ đi tháng này
};

// Top khách hàng VIP
const topCustomers = [
  {
    id: 'KH00156',
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@techcorp.vn',
    phone: '0901234567',
    totalSpent: 485000000,      // 485 triệu
    orders: 142,
    tier: 'Diamond',
    tierColor: 'warning',
    status: 'active'
  },
  {
    id: 'KH00089',
    name: 'Trần Thị Hương',
    email: 'huong.tran@bizgroup.com',
    phone: '0912345678',
    totalSpent: 428000000,      // 428 triệu
    orders: 118,
    tier: 'Diamond',
    tierColor: 'warning',
    status: 'active'
  },
  {
    id: 'KH00234',
    name: 'Lê Hoàng Nam',
    email: 'nam.le.hoang@gmail.com',
    phone: '0923456789',
    totalSpent: 375000000,      // 375 triệu
    orders: 96,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'active'
  },
  {
    id: 'KH00512',
    name: 'Phạm Minh Châu',
    email: 'chau.pham@outlook.com',
    phone: '0934567890',
    totalSpent: 328000000,      // 328 triệu
    orders: 84,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'active'
  },
  {
    id: 'KH00678',
    name: 'Võ Thành Đạt',
    email: 'dat.vo@techsolutions.vn',
    phone: '0945678901',
    totalSpent: 295000000,      // 295 triệu
    orders: 72,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'inactive_30'        // Chưa mua 30 ngày
  },
  {
    id: 'KH00891',
    name: 'Đặng Thị Mai',
    email: 'mai.dang@gmail.com',
    phone: '0956789012',
    totalSpent: 268000000,      // 268 triệu
    orders: 65,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active'
  },
  {
    id: 'KH01023',
    name: 'Bùi Quang Huy',
    email: 'huy.bui@startup.io',
    phone: '0967890123',
    totalSpent: 242000000,      // 242 triệu
    orders: 58,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active'
  },
  {
    id: 'KH01156',
    name: 'Hoàng Thu Thảo',
    email: 'thao.hoang@company.vn',
    phone: '0978901234',
    totalSpent: 215000000,      // 215 triệu
    orders: 51,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active'
  },
  {
    id: 'KH01289',
    name: 'Dương Văn Long',
    email: 'long.duong@enterprise.com',
    phone: '0989012345',
    totalSpent: 188000000,      // 188 triệu
    orders: 45,
    tier: 'Silver',
    tierColor: 'secondary',
    status: 'active'
  },
  {
    id: 'KH01445',
    name: 'Trương Thị Lan',
    email: 'lan.truong@yahoo.com',
    phone: '0990123456',
    totalSpent: 165000000,      // 165 triệu
    orders: 39,
    tier: 'Silver',
    tierColor: 'secondary',
    status: 'active'
  }
];

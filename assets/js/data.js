/**
 * DỮ LIỆU MẪU CHO DASHBOARD CEO - MULTI-LOCATION
 * File này chứa dữ liệu cho 7 cơ sở kinh doanh
 * Cập nhật: Hỗ trợ so sánh giữa các cơ sở
 */

// ============================================
// DANH SÁCH CÁC CƠ SỞ / CHI NHÁNH
// ============================================

const locations = [
  { id: 'HN', name: 'Hà Nội', region: 'Miền Bắc', isHQ: true, color: '#007bff' },
  { id: 'HCM', name: 'Hồ Chí Minh', region: 'Miền Nam', isHQ: false, color: '#28a745' },
  { id: 'DN', name: 'Đà Nẵng', region: 'Miền Trung', isHQ: false, color: '#17a2b8' },
  { id: 'HP', name: 'Hải Phòng', region: 'Miền Bắc', isHQ: false, color: '#ffc107' },
  { id: 'CT', name: 'Cần Thơ', region: 'Miền Nam', isHQ: false, color: '#6f42c1' },
  { id: 'NT', name: 'Nha Trang', region: 'Miền Trung', isHQ: false, color: '#fd7e14' },
  { id: 'VT', name: 'Vũng Tàu', region: 'Miền Nam', isHQ: false, color: '#20c997' }
];

// ============================================
// DỮ LIỆU THEO CƠ SỞ VÀ THÁNG (2024)
// ============================================

const locationData = {
  // Hà Nội - Trụ sở chính (lớn nhất, ổn định nhưng có tháng khó khăn)
  HN: {
    revenue:    [3850, 4120, 2980, 2550, 2380, 2290, 3680, 3920, 3450, 3580, 4250, 4680], // 41,730 triệu/năm
    expenses:   [3735, 4008, 2911, 2526, 2404, 2336, 3534, 3763, 3347, 3473, 4080, 4482],
    profit:     [115, 112, 69, 24, -24, -46, 146, 157, 103, 107, 170, 198],  // Tỷ lệ lợi nhuận: ~2.8%, có tháng lỗ
    orders:     [4890, 5235, 3785, 3240, 3020, 2910, 4675, 4980, 4380, 4545, 5400, 5945],
    customers:  [1478, 1582, 1144, 980, 913, 880, 1413, 1506, 1324, 1374, 1632, 1797],
    employees: 85
  },

  // Hồ Chí Minh - Mạnh nhưng cạnh tranh cao, doanh thu không đều
  HCM: {
    revenue:    [3420, 3180, 3650, 2890, 2450, 3120, 2780, 3890, 3250, 2980, 3680, 4120], // 39,410 triệu/năm
    expenses:   [3352, 3148, 3577, 2861, 2450, 3089, 2808, 3773, 3185, 2960, 3570, 3996],
    profit:     [68, 32, 73, 29, 0, 31, -28, 117, 65, 20, 110, 124], // Tỷ lệ ~2.3%, T7 bị lỗ do khuyến mãi
    orders:     [4345, 4040, 4640, 3670, 3115, 3965, 3530, 4940, 4130, 3785, 4675, 5235],
    customers:  [1313, 1221, 1402, 1109, 941, 1198, 1066, 1493, 1248, 1144, 1413, 1582],
    employees: 72
  },

  // Đà Nẵng - Du lịch: đỉnh cao T6-T8 & Tết, yếu T9-T11
  DN: {
    revenue:    [2280, 2450, 1890, 1650, 1480, 2350, 2680, 2520, 1420, 1380, 1560, 2180], // 23,840 triệu/năm
    expenses:   [2212, 2352, 1871, 1667, 1495, 2256, 2573, 2420, 1449, 1408, 1591, 2090],
    profit:     [68, 98, 19, -17, -15, 94, 107, 100, -29, -28, -31, 90], // Seasonal, có tháng lỗ mùa thấp điểm
    orders:     [2900, 3115, 2400, 2095, 1880, 2985, 3405, 3200, 1805, 1755, 1985, 2770],
    customers:  [877, 941, 726, 633, 568, 902, 1029, 967, 545, 530, 600, 837],
    employees: 45
  },

  // Hải Phòng - Xu hướng giảm, mất thị phần vào tay đối thủ
  HP: {
    revenue:    [1850, 1780, 1620, 1480, 1390, 1280, 1420, 1350, 1290, 1240, 1180, 1320], // 17,200 triệu/năm
    expenses:   [1794, 1744, 1604, 1495, 1404, 1293, 1434, 1364, 1316, 1265, 1204, 1343],
    profit:     [56, 36, 16, -15, -14, -13, -14, -14, -26, -25, -24, -23], // Đang thua lỗ từ T4, cần tái cơ cấu
    orders:     [2350, 2260, 2060, 1880, 1765, 1625, 1805, 1715, 1640, 1575, 1500, 1675],
    customers:  [710, 683, 623, 568, 533, 491, 546, 518, 495, 476, 453, 506],
    employees: 38
  },

  // Cần Thơ - Tăng trưởng ổn định, thị trường mới nổi
  CT: {
    revenue:    [1180, 1250, 1320, 1380, 1450, 1520, 1580, 1650, 1720, 1780, 1850, 1920], // 18,600 triệu/năm
    expenses:   [1156, 1225, 1287, 1352, 1421, 1490, 1548, 1617, 1686, 1744, 1813, 1881],
    profit:     [24, 25, 33, 28, 29, 30, 32, 33, 34, 36, 37, 39], // Lợi nhuận thấp ~2% nhưng ổn định tăng
    orders:     [1500, 1590, 1680, 1755, 1845, 1935, 2010, 2100, 2190, 2265, 2355, 2445],
    customers:  [453, 480, 507, 530, 557, 585, 607, 634, 661, 684, 711, 738],
    employees: 35
  },

  // Nha Trang - Cực kỳ seasonal (du lịch), T1-2 & T6-8 tốt, còn lại yếu/lỗ
  NT: {
    revenue:    [1680, 1820, 980, 850, 780, 1950, 2180, 2050, 820, 750, 890, 1560], // 16,310 triệu/năm
    expenses:   [1597, 1729, 1000, 884, 819, 1872, 2093, 1968, 861, 795, 942, 1482],
    profit:     [83, 91, -20, -34, -39, 78, 87, 82, -41, -45, -52, 78], // Rất phụ thuộc mùa, nhiều tháng lỗ
    orders:     [2135, 2315, 1245, 1080, 990, 2480, 2770, 2605, 1040, 955, 1130, 1985],
    customers:  [645, 699, 376, 326, 299, 750, 837, 787, 314, 289, 342, 600],
    employees: 32
  },

  // Vũng Tàu - Cơ sở nhỏ, đang gặp khó khăn, nhiều tháng lỗ
  VT: {
    revenue:    [980, 1050, 890, 820, 750, 880, 920, 850, 780, 740, 810, 920], // 10,390 triệu/năm
    expenses:   [1000, 1063, 916, 869, 795, 907, 950, 892, 820, 785, 854, 938],
    profit:     [-20, -13, -26, -49, -45, -27, -30, -42, -40, -45, -44, -18], // Liên tục lỗ, cần xem xét đóng cửa
    orders:     [1245, 1335, 1130, 1040, 955, 1120, 1170, 1080, 990, 940, 1030, 1170],
    customers:  [376, 403, 342, 314, 289, 338, 353, 326, 299, 284, 311, 353],
    employees: 28
  }
};

// ============================================
// DỮ LIỆU LỊCH SỬ 3 NĂM (TỔNG TẤT CẢ CƠ SỞ)
// ============================================

const businessDataByMonth = {
  2024: {
    // Tổng của 7 cơ sở: HN + HCM + DN + HP + CT + NT + VT
    revenue:    [15240, 15650, 13330, 11620, 10680, 13390, 15240, 16230, 12730, 12450, 14220, 16700], // 167,480 triệu
    expenses:   [14846, 15269, 13166, 11654, 10788, 13243, 14940, 15797, 12664, 12430, 14044, 16212],
    profit:     [394, 381, 164, -34, -108, 147, 300, 433, 66, 20, 176, 488], // Tổng lợi nhuận: 2,427 triệu (~1.4%)
    orders:     [19365, 19890, 16940, 14760, 13570, 17030, 19365, 20630, 16175, 15825, 18070, 21225],
    customers:  [5852, 6009, 5120, 4460, 4100, 5144, 5852, 6234, 4886, 4781, 5441, 6392]
  },
  2023: {
    // Giảm ~12% so với 2024, profit margin tốt hơn một chút
    revenue:    [13414, 13773, 11731, 10226, 9399, 11783, 13414, 14282, 11203, 10956, 12513, 14696], // 147,390 triệu
    expenses:   [12806, 13144, 11198, 9766, 8977, 11250, 12806, 13629, 10693, 10457, 11940, 14023],
    profit:     [608, 629, 533, 460, 422, 533, 608, 653, 510, 499, 573, 673], // ~4,701 triệu (~3.2%)
    orders:     [17041, 17502, 14908, 12987, 11922, 14987, 17041, 18254, 14233, 13916, 15918, 18707],
    customers:  [5150, 5288, 4504, 3924, 3602, 4527, 5150, 5515, 4300, 4205, 4808, 5652]
  },
  2022: {
    // Giảm ~15% so với 2023, profit margin thấp hơn
    revenue:    [11402, 11707, 9971, 8692, 7989, 10016, 11402, 12140, 9523, 9313, 10636, 12492], // 125,283 triệu
    expenses:   [11060, 11356, 9671, 8430, 7749, 9716, 11060, 11776, 9237, 9034, 10317, 12117],
    profit:     [342, 351, 300, 262, 240, 300, 342, 364, 286, 279, 319, 375], // ~3,760 triệu (~3%)
    orders:     [14485, 14897, 12687, 11050, 10159, 12720, 14485, 15428, 12099, 11841, 13530, 15886],
    customers:  [4377, 4502, 3834, 3339, 3070, 3844, 4377, 4661, 3656, 3578, 4089, 4799]
  }
};

// Tên các tháng
const monthLabels = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const monthLabelsShort = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

// ============================================
// DỮ LIỆU SẢN PHẨM THEO CƠ SỞ
// ============================================

const productsByLocation = {
  HN: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [857, 633, 437, 275, 191, 158], // triệu VNĐ
    topProducts: [
      { name: 'iPhone 15 Pro Max', category: 'Điện tử', price: 32990000, sold: 145, revenue: 4783550000 },
      { name: 'Samsung Galaxy S24', category: 'Điện tử', price: 24990000, sold: 122, revenue: 3048780000 },
      { name: 'MacBook Air M3', category: 'Điện tử', price: 28990000, sold: 98, revenue: 2841020000 },
      { name: 'AirPods Pro 2', category: 'Điện tử', price: 6490000, sold: 234, revenue: 1518660000 },
      { name: 'iPad Pro 11"', category: 'Điện tử', price: 23990000, sold: 87, revenue: 2087130000 }
    ]
  },
  HCM: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [786, 580, 401, 252, 175, 145],
    topProducts: [
      { name: 'iPhone 15 Pro Max', category: 'Điện tử', price: 32990000, sold: 132, revenue: 4354680000 },
      { name: 'Samsung Galaxy S24', category: 'Điện tử', price: 24990000, sold: 115, revenue: 2873850000 },
      { name: 'Sony WH-1000XM5', category: 'Điện tử', price: 8990000, sold: 189, revenue: 1699110000 },
      { name: 'Apple Watch Ultra 2', category: 'Điện tử', price: 21990000, sold: 76, revenue: 1671240000 },
      { name: 'MacBook Air M3', category: 'Điện tử', price: 28990000, sold: 82, revenue: 2373180000 }
    ]
  },
  DN: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [480, 354, 245, 154, 107, 88],
    topProducts: [
      { name: 'iPhone 14', category: 'Điện tử', price: 19990000, sold: 98, revenue: 1959020000 },
      { name: 'Samsung Galaxy A54', category: 'Điện tử', price: 10490000, sold: 156, revenue: 1636440000 },
      { name: 'AirPods Pro 2', category: 'Điện tử', price: 6490000, sold: 187, revenue: 1213630000 },
      { name: 'iPad Air', category: 'Điện tử', price: 15990000, sold: 65, revenue: 1039350000 },
      { name: 'Apple Watch SE', category: 'Điện tử', price: 7490000, sold: 123, revenue: 921270000 }
    ]
  },
  HP: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [428, 316, 218, 137, 95, 79],
    topProducts: [
      { name: 'Samsung Galaxy A54', category: 'Điện tử', price: 10490000, sold: 145, revenue: 1521050000 },
      { name: 'iPhone 14', category: 'Điện tử', price: 19990000, sold: 76, revenue: 1519240000 },
      { name: 'Xiaomi Redmi Note 13', category: 'Điện tử', price: 5990000, sold: 234, revenue: 1401660000 },
      { name: 'AirPods 3', category: 'Điện tử', price: 4990000, sold: 167, revenue: 833330000 },
      { name: 'iPad 10', category: 'Điện tử', price: 10990000, sold: 58, revenue: 637420000 }
    ]
  },
  CT: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [382, 282, 195, 123, 85, 71],
    topProducts: [
      { name: 'Samsung Galaxy A34', category: 'Điện tử', price: 7990000, sold: 178, revenue: 1422220000 },
      { name: 'iPhone 13', category: 'Điện tử', price: 15990000, sold: 67, revenue: 1071330000 },
      { name: 'Xiaomi Redmi Note 13', category: 'Điện tử', price: 5990000, sold: 201, revenue: 1203990000 },
      { name: 'Oppo Reno 10', category: 'Điện tử', price: 9490000, sold: 123, revenue: 1167270000 },
      { name: 'Samsung Galaxy Buds2', category: 'Điện tử', price: 2990000, sold: 198, revenue: 592020000 }
    ]
  },
  NT: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [338, 250, 173, 109, 76, 63],
    topProducts: [
      { name: 'iPhone 13', category: 'Điện tử', price: 15990000, sold: 72, revenue: 1151280000 },
      { name: 'Samsung Galaxy A34', category: 'Điện tử', price: 7990000, sold: 156, revenue: 1246440000 },
      { name: 'Xiaomi Redmi Note 12', category: 'Điện tử', price: 4990000, sold: 189, revenue: 943110000 },
      { name: 'JBL Flip 6', category: 'Điện tử', price: 3490000, sold: 145, revenue: 506050000 },
      { name: 'Oppo A78', category: 'Điện tử', price: 6490000, sold: 112, revenue: 726880000 }
    ]
  },
  VT: {
    categories: ['Điện tử', 'Thời trang', 'Gia dụng', 'Thực phẩm', 'Mỹ phẩm', 'Sách vở'],
    sales: [303, 224, 155, 98, 68, 56],
    topProducts: [
      { name: 'Samsung Galaxy A34', category: 'Điện tử', price: 7990000, sold: 142, revenue: 1134580000 },
      { name: 'Xiaomi Redmi Note 12', category: 'Điện tử', price: 4990000, sold: 176, revenue: 878240000 },
      { name: 'iPhone 13', category: 'Điện tử', price: 15990000, sold: 54, revenue: 863460000 },
      { name: 'Oppo A78', category: 'Điện tử', price: 6490000, sold: 134, revenue: 869660000 },
      { name: 'Samsung Galaxy Buds FE', category: 'Điện tử', price: 1990000, sold: 167, revenue: 332330000 }
    ]
  }
};

// ============================================
// TÍNH TOÁN TỰ ĐỘNG
// ============================================

// Tính tổng doanh thu từng cơ sở
function getTotalRevenueByLocation() {
  const result = {};
  locations.forEach(loc => {
    result[loc.id] = locationData[loc.id].revenue.reduce((a, b) => a + b, 0);
  });
  return result;
}

// Lấy top N cơ sở theo doanh thu
function getTopLocationsByRevenue(n = 5) {
  const totals = getTotalRevenueByLocation();
  return locations
    .map(loc => ({ ...loc, totalRevenue: totals[loc.id] }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, n);
}

// Tính tổng toàn hệ thống
function getSystemTotals() {
  const currentMonth = 10; // Tháng 11 (index 10)
  let totalRevenue = 0, totalProfit = 0, totalCustomers = 0, totalOrders = 0, totalEmployees = 0;

  locations.forEach(loc => {
    const data = locationData[loc.id];
    totalRevenue += data.revenue[currentMonth];
    totalProfit += data.profit[currentMonth];
    totalCustomers += data.customers[currentMonth];
    totalOrders += data.orders[currentMonth];
    totalEmployees += data.employees;
  });

  return { totalRevenue, totalProfit, totalCustomers, totalOrders, totalEmployees };
}

// ============================================
// BACKWARD COMPATIBILITY
// ============================================

// Dữ liệu doanh thu (dùng tổng của tất cả cơ sở)
const revenueData = {
  months: monthLabels,
  values: businessDataByMonth[2024].revenue
};

// Dữ liệu sản phẩm (dùng của Hà Nội làm mặc định)
const productData = {
  categories: productsByLocation.HN.categories,
  values: productsByLocation.HN.sales
};

// Top sản phẩm (dùng của Hà Nội làm mặc định)
const topProducts = productsByLocation.HN.topProducts;

// ============================================
// DỮ LIỆU CHO BIỂU ĐỒ THỊ PHẦN SẢN PHẨM
// ============================================

// Dữ liệu thị phần sản phẩm (tổng hợp tất cả cơ sở)
const productMarketShare = {
  labels: ['Laptop', 'Smartphone', 'Tablet', 'Tai nghe', 'Smartwatch'],
  values: [1196, 752, 487, 58, 167], // triệu VNĐ
  colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#dc3545']
};

// ============================================
// DỮ LIỆU CHO SPARKLINE CHARTS (XU HƯỚNG SẢN PHẨM)
// ============================================

// Dữ liệu xu hướng bán hàng 12 tháng cho top 5 sản phẩm
const sparklineData = {
  product1: [28, 31, 35, 32, 38, 42, 45, 48, 52, 55, 58, 62], // Laptop Dell XPS 15 - tăng đều
  product2: [22, 25, 18, 20, 23, 21, 19, 22, 24, 20, 18, 21], // iPhone 15 Pro Max - dao động
  product3: [15, 18, 20, 17, 16, 19, 21, 18, 17, 16, 18, 19], // iPad Pro M2 - ổn định
  product4: [12, 10, 9, 8, 7, 6, 7, 8, 7, 8, 9, 8],          // AirPods Pro 2 - giảm nhẹ
  product5: [10, 11, 9, 8, 7, 6, 7, 6, 5, 6, 7, 8]           // Apple Watch Ultra 2 - giảm
};

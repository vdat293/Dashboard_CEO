/**
 * DỮ LIỆU MẪU CHO DASHBOARD CEO
 * File này chứa tất cả dữ liệu mẫu để hiển thị trên dashboard
 * Trong thực tế, dữ liệu này sẽ được lấy từ API backend
 *
 * CẬP NHẬT: Dữ liệu đầy đủ 3 năm (2022-2024) với khả năng so sánh và phân tích
 */

// ============================================
// DỮ LIỆU CHI TIẾT THEO THÁNG VÀ NĂM
// ============================================

// Dữ liệu chi tiết kinh doanh theo tháng (đơn vị: triệu VNĐ)
// Logic: Cao đầu năm (Tết), thấp giữa năm, cao cuối năm (mùa mua sắm)
const businessDataByMonth = {
  2024: {
    revenue:    [3250, 3480, 2890, 2650, 2420, 2380, 2950, 3180, 2780, 2850, 3420, 3680], // Tổng: 35,940
    expenses:   [2145, 2262, 1879, 1723, 1573, 1547, 1917, 2067, 1807, 1853, 2224, 2392], // ~65% của revenue
    profit:     [1105, 1218,  1011, 927,   847,  833,  1033, 1113,  973,  997,  1196, 1288], // ~35% margin
    orders:     [4250, 4580, 3820, 3520, 3210, 3150, 3890, 4200, 3680, 3780, 4520, 4892],
    customers:  [1285, 1378, 1156, 1065,  968,  952, 1175, 1268, 1110, 1142, 1365, 1456]
  },
  2023: {
    revenue:    [2825, 3024, 2513, 2304, 2104, 2069, 2565, 2765, 2417, 2478, 2974, 3200], // Tổng: 31,238
    expenses:   [1908, 2026, 1686, 1544, 1410, 1387, 1719, 1853, 1619, 1661, 1993, 2144], // ~67% của revenue
    profit:     [ 917,  998,  827,  760,  694,  682,  846,  912,  798,  817,  981, 1056], // ~33% margin
    orders:     [3915, 4220, 3521, 3245, 2960, 2904, 3585, 3870, 3391, 3482, 4166, 4515],
    customers:  [1165, 1250, 1050,  975,  880,  865, 1070, 1150, 1008, 1036, 1240, 1322]
  },
  2022: {
    revenue:    [2520, 2700, 2244, 2057, 1878, 1847, 2290, 2468, 2158, 2212, 2655, 2857], // Tổng: 27,886
    expenses:   [1765, 1890, 1571, 1440, 1315, 1293, 1603, 1728, 1511, 1548, 1859, 2000], // ~70% của revenue
    profit:     [ 755,  810,  673,  617,  563,  554,  687,  740,  647,  664,  796,  857], // ~30% margin
    orders:     [3680, 3970, 3310, 3052, 2785, 2731, 3372, 3640, 3189, 3275, 3918, 4246],
    customers:  [1105, 1185, 995,   925,  835,  820, 1015, 1090,  956,  983, 1176, 1254]
  }
};

// Tên các tháng
const monthLabels = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const monthLabelsShort = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

// Dữ liệu doanh thu (backward compatibility)
const revenueData = {
  months: monthLabels,
  values: businessDataByMonth[2024].revenue
};

// ============================================
// TỔNG KẾT NĂM
// ============================================

const yearlySummary = {
  2024: {
    revenue: 35940,
    expenses: 23389,
    profit: 12551,
    orders: 47492,
    customers: 15445,
    avgOrderValue: 757, // 35940000 / 47492
    profitMargin: 34.9  // (12551 / 35940) * 100
  },
  2023: {
    revenue: 31238,
    expenses: 20952,
    profit: 10286,
    orders: 43764,
    customers: 14011,
    avgOrderValue: 714,
    profitMargin: 32.9
  },
  2022: {
    revenue: 27886,
    expenses: 19523,
    profit: 8363,
    orders: 41168,
    customers: 13319,
    avgOrderValue: 677,
    profitMargin: 30.0
  }
};

// Tăng trưởng Year-over-Year
const yoyGrowth = {
  2024: {
    revenue: 15.0,    // (35940 - 31238) / 31238 * 100
    profit: 22.0,
    orders: 8.5,
    customers: 10.2
  },
  2023: {
    revenue: 12.0,    // (31238 - 27886) / 27886 * 100
    profit: 23.0,
    orders: 6.3,
    customers: 5.2
  }
};

// ============================================
// DỮ LIỆU SẢN PHẨM
// ============================================

// Thị phần sản phẩm tháng 12/2024 (đơn vị: triệu VNĐ)
const productMarketShare = {
  labels: ['Laptop', 'Điện thoại', 'Tablet', 'Tai nghe', 'Đồng hồ'],
  values: [1288, 1104, 736, 368, 184], // 35%, 30%, 20%, 10%, 5% của 3680
  colors: ['#007bff', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
};

// Dữ liệu sparkline cho từng sản phẩm (xu hướng bán 7 ngày gần đây)
const sparklineData = {
  product1: [285, 295, 308, 320, 315, 328, 342], // Laptop - tăng mạnh
  product2: [198, 205, 212, 208, 215, 223, 235], // iPhone - tăng ổn định
  product3: [156, 162, 168, 174, 181, 187, 195], // iPad - tăng đều
  product4: [95, 92, 88, 85, 82, 79, 76],        // Watch - giảm
  product5: [68, 72, 75, 78, 82, 85, 89]         // AirPods - tăng nhẹ
};

// Top sản phẩm bán chạy tháng 12/2024
const topProducts = [
  {
    name: 'Laptop Dell XPS 15',
    icon: 'bi-laptop',
    iconColor: 'text-primary',
    price: '34,990,000đ',
    sold: 342,
    revenue: '1,196 triệu',
    badge: 'success',
    sparklineId: 'sparkline-1'
  },
  {
    name: 'iPhone 15 Pro Max',
    icon: 'bi-phone',
    iconColor: 'text-info',
    price: '31,990,000đ',
    sold: 235,
    revenue: '752 triệu',
    badge: 'success',
    sparklineId: 'sparkline-2'
  },
  {
    name: 'iPad Pro M2 11"',
    icon: 'bi-tablet',
    iconColor: 'text-success',
    price: '24,990,000đ',
    sold: 195,
    revenue: '487 triệu',
    badge: 'success',
    sparklineId: 'sparkline-3'
  },
  {
    name: 'AirPods Pro 2',
    icon: 'bi-headphones',
    iconColor: 'text-warning',
    price: '6,490,000đ',
    sold: 89,
    revenue: '58 triệu',
    badge: 'success',
    sparklineId: 'sparkline-5'
  },
  {
    name: 'Apple Watch Ultra 2',
    icon: 'bi-smartwatch',
    iconColor: 'text-danger',
    price: '21,990,000đ',
    sold: 76,
    revenue: '167 triệu',
    badge: 'warning',
    sparklineId: 'sparkline-4'
  }
];

// ============================================
// KPI THÁNG HIỆN TẠI (THÁNG 12/2024)
// ============================================

const currentMonth = 11; // Index của tháng 12 (0-based)
const previousMonth = 10; // Tháng 11

const kpiData = {
  revenue: {
    value: '3.68 tỷ',
    trend: 'up',
    percentage: ((businessDataByMonth[2024].revenue[currentMonth] - businessDataByMonth[2024].revenue[previousMonth]) / businessDataByMonth[2024].revenue[previousMonth] * 100).toFixed(1)
  },
  profit: {
    value: '1.29 tỷ',
    trend: 'up',
    percentage: ((businessDataByMonth[2024].profit[currentMonth] - businessDataByMonth[2024].profit[previousMonth]) / businessDataByMonth[2024].profit[previousMonth] * 100).toFixed(1)
  },
  customers: {
    value: '1,456',
    trend: 'up',
    percentage: ((businessDataByMonth[2024].customers[currentMonth] - businessDataByMonth[2024].customers[previousMonth]) / businessDataByMonth[2024].customers[previousMonth] * 100).toFixed(1)
  },
  orders: {
    value: '4,892',
    trend: 'up',
    percentage: ((businessDataByMonth[2024].orders[currentMonth] - businessDataByMonth[2024].orders[previousMonth]) / businessDataByMonth[2024].orders[previousMonth] * 100).toFixed(1)
  }
};

// ============================================
// DỮ LIỆU KHÁCH HÀNG
// ============================================

const customerData = {
  total: 15678,           // Tổng khách hàng tích lũy đến T12/2024
  newThisMonth: 1456,     // Khách mới tháng 12
  vip: 342,               // Khách VIP
  lost: 89,               // Khách bỏ đi tháng này
  retentionRate: 92.5     // Tỷ lệ giữ chân khách hàng
};

// Phân loại khách hàng
const customerSegments = {
  vip: 342,           // Chi tiêu > 300 triệu
  loyal: 1289,        // Chi tiêu 100-300 triệu, mua thường xuyên
  regular: 3856,      // Chi tiêu 50-100 triệu
  normal: 10191       // Chi tiêu < 50 triệu
};

// Top 10 khách hàng VIP
const topCustomers = [
  {
    id: 'KH00156',
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@techcorp.vn',
    phone: '0901234567',
    totalSpent: 485000000,
    orders: 142,
    tier: 'Diamond',
    tierColor: 'warning',
    status: 'active',
    joinDate: '2022-03-15',
    lastPurchase: '2024-12-10'
  },
  {
    id: 'KH00089',
    name: 'Trần Thị Hương',
    email: 'huong.tran@bizgroup.com',
    phone: '0912345678',
    totalSpent: 428000000,
    orders: 118,
    tier: 'Diamond',
    tierColor: 'warning',
    status: 'active',
    joinDate: '2022-01-20',
    lastPurchase: '2024-12-08'
  },
  {
    id: 'KH00234',
    name: 'Lê Hoàng Nam',
    email: 'nam.le.hoang@gmail.com',
    phone: '0923456789',
    totalSpent: 375000000,
    orders: 96,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'active',
    joinDate: '2022-06-10',
    lastPurchase: '2024-12-05'
  },
  {
    id: 'KH00512',
    name: 'Phạm Minh Châu',
    email: 'chau.pham@outlook.com',
    phone: '0934567890',
    totalSpent: 328000000,
    orders: 84,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'active',
    joinDate: '2022-08-22',
    lastPurchase: '2024-12-12'
  },
  {
    id: 'KH00678',
    name: 'Võ Thành Đạt',
    email: 'dat.vo@techsolutions.vn',
    phone: '0945678901',
    totalSpent: 295000000,
    orders: 72,
    tier: 'Platinum',
    tierColor: 'info',
    status: 'inactive_30',
    joinDate: '2022-09-15',
    lastPurchase: '2024-11-05'
  },
  {
    id: 'KH00891',
    name: 'Đặng Thị Mai',
    email: 'mai.dang@gmail.com',
    phone: '0956789012',
    totalSpent: 268000000,
    orders: 65,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active',
    joinDate: '2023-01-10',
    lastPurchase: '2024-12-11'
  },
  {
    id: 'KH01023',
    name: 'Bùi Quang Huy',
    email: 'huy.bui@startup.io',
    phone: '0967890123',
    totalSpent: 242000000,
    orders: 58,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active',
    joinDate: '2023-03-05',
    lastPurchase: '2024-12-09'
  },
  {
    id: 'KH01156',
    name: 'Hoàng Thu Thảo',
    email: 'thao.hoang@company.vn',
    phone: '0978901234',
    totalSpent: 215000000,
    orders: 51,
    tier: 'Gold',
    tierColor: 'primary',
    status: 'active',
    joinDate: '2023-04-18',
    lastPurchase: '2024-12-07'
  },
  {
    id: 'KH01289',
    name: 'Dương Văn Long',
    email: 'long.duong@enterprise.com',
    phone: '0989012345',
    totalSpent: 188000000,
    orders: 45,
    tier: 'Silver',
    tierColor: 'secondary',
    status: 'active',
    joinDate: '2023-06-20',
    lastPurchase: '2024-12-06'
  },
  {
    id: 'KH01445',
    name: 'Trương Thị Lan',
    email: 'lan.truong@yahoo.com',
    phone: '0990123456',
    totalSpent: 165000000,
    orders: 39,
    tier: 'Silver',
    tierColor: 'secondary',
    status: 'active',
    joinDate: '2023-07-12',
    lastPurchase: '2024-12-04'
  }
];

// ============================================
// HOẠT ĐỘNG GẦN ĐÂY
// ============================================

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

// ============================================
// DỮ LIỆU PHU THEO KHU VỰC
// ============================================

const revenueByRegion = {
  labels: ['Miền Bắc', 'Miền Nam', 'Miền Trung', 'Quốc tế'],
  percentages: [35, 30, 22, 13],
  values: [12579, 10782, 7907, 4672] // Tổng năm 2024
};

// ============================================
// DỮ LIỆU THEO KÊNH BÁN HÀNG
// ============================================

const salesChannels = {
  labels: ['Website', 'Cửa hàng', 'Mobile App', 'Đối tác'],
  percentages: [45, 30, 15, 10],
  values: [16173, 10782, 5391, 3594] // Tổng năm 2024
};

// ============================================
// DỮ LIỆU CƠ SỞ (FACILITIES)
// ============================================

// Danh sách cơ sở theo khu vực
const facilitiesByRegion = {
  'Miền Bắc': [
    { id: 'HN', name: 'Hà Nội', code: 'HN' },
    { id: 'HP', name: 'Hải Phòng', code: 'HP' },
    { id: 'HD', name: 'Hải Dương', code: 'HD' },
    { id: 'QN', name: 'Quảng Ninh', code: 'QN' }
  ],
  'Miền Nam': [
    { id: 'HCM', name: 'TP. Hồ Chí Minh', code: 'HCM' },
    { id: 'BD', name: 'Bình Dương', code: 'BD' },
    { id: 'DN', name: 'Đồng Nai', code: 'DN' },
    { id: 'CT', name: 'Cần Thơ', code: 'CT' }
  ],
  'Miền Trung': [
    { id: 'DA', name: 'Đà Nẵng', code: 'DA' },
    { id: 'HUE', name: 'Huế', code: 'HUE' },
    { id: 'QNG', name: 'Quảng Ngãi', code: 'QNG' },
    { id: 'NT', name: 'Nha Trang', code: 'NT' }
  ],
  'Quốc tế': [
    { id: 'SG', name: 'Singapore', code: 'SG' },
    { id: 'TH', name: 'Thailand', code: 'TH' },
    { id: 'MY', name: 'Malaysia', code: 'MY' }
  ]
};

// Tỷ lệ phân bổ doanh thu cho từng cơ sở (% của tổng khu vực)
const facilityRevenueShare = {
  // Miền Bắc (35% tổng)
  'HN': 0.45,    // 45% của Miền Bắc
  'HP': 0.25,    // 25%
  'HD': 0.18,    // 18%
  'QN': 0.12,    // 12%

  // Miền Nam (30% tổng)
  'HCM': 0.55,   // 55% của Miền Nam
  'BD': 0.20,    // 20%
  'DN': 0.15,    // 15%
  'CT': 0.10,    // 10%

  // Miền Trung (22% tổng)
  'DA': 0.40,    // 40% của Miền Trung
  'HUE': 0.25,   // 25%
  'QNG': 0.20,   // 20%
  'NT': 0.15,    // 15%

  // Quốc tế (13% tổng)
  'SG': 0.50,    // 50% của Quốc tế
  'TH': 0.30,    // 30%
  'MY': 0.20     // 20%
};

// Hàm tính toán dữ liệu cho từng cơ sở dựa trên dữ liệu tổng
function getFacilityData(facilityCode, year = 2024) {
  // Tìm khu vực của cơ sở
  let region = null;
  let regionShare = 0;

  for (const [regionName, facilities] of Object.entries(facilitiesByRegion)) {
    if (facilities.some(f => f.code === facilityCode)) {
      region = regionName;
      const regionIndex = revenueByRegion.labels.indexOf(regionName);
      regionShare = revenueByRegion.percentages[regionIndex] / 100;
      break;
    }
  }

  if (!region) return null;

  const facilityShare = facilityRevenueShare[facilityCode];
  const totalMultiplier = regionShare * facilityShare;

  // Tính toán dữ liệu tháng dựa trên tỷ lệ
  const yearData = businessDataByMonth[year];
  const facilityData = {
    revenue: yearData.revenue.map(v => Math.round(v * totalMultiplier)),
    expenses: yearData.expenses.map(v => Math.round(v * totalMultiplier)),
    profit: yearData.profit.map(v => Math.round(v * totalMultiplier)),
    orders: yearData.orders.map(v => Math.round(v * totalMultiplier)),
    customers: yearData.customers.map(v => Math.round(v * totalMultiplier))
  };

  // Thêm biến động ngẫu nhiên nhỏ để tạo sự khác biệt giữa các cơ sở (±5%)
  const addVariation = (arr) => arr.map(v => {
    const variation = 0.95 + Math.random() * 0.10; // 95% - 105%
    return Math.round(v * variation);
  });

  return {
    revenue: addVariation(facilityData.revenue),
    expenses: addVariation(facilityData.expenses),
    profit: addVariation(facilityData.profit),
    orders: addVariation(facilityData.orders),
    customers: addVariation(facilityData.customers)
  };
}

// Hàm tính toán dữ liệu cho khu vực
function getRegionData(regionName, year = 2024) {
  const regionIndex = revenueByRegion.labels.indexOf(regionName);
  if (regionIndex === -1) return null;

  const regionShare = revenueByRegion.percentages[regionIndex] / 100;
  const yearData = businessDataByMonth[year];

  return {
    revenue: yearData.revenue.map(v => Math.round(v * regionShare)),
    expenses: yearData.expenses.map(v => Math.round(v * regionShare)),
    profit: yearData.profit.map(v => Math.round(v * regionShare)),
    orders: yearData.orders.map(v => Math.round(v * regionShare)),
    customers: yearData.customers.map(v => Math.round(v * regionShare))
  };
}

// Hàm lấy tất cả cơ sở
function getAllFacilities() {
  const allFacilities = [];
  for (const [region, facilities] of Object.entries(facilitiesByRegion)) {
    facilities.forEach(facility => {
      allFacilities.push({
        ...facility,
        region: region
      });
    });
  }
  return allFacilities;
}

// Lưu trữ cơ sở được chọn trong sessionStorage
const FacilityManager = {
  STORAGE_KEY: 'selected_facility',

  getSelected: function() {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { type: 'all', code: null, name: 'Tất cả cơ sở' };
  },

  setSelected: function(type, code, name, region = null) {
    const selection = { type, code, name, region };
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(selection));
    return selection;
  },

  clear: function() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  },

  // Lấy dữ liệu dựa trên lựa chọn hiện tại
  getCurrentData: function(year = 2024) {
    const selection = this.getSelected();

    if (selection.type === 'all') {
      // Trả về dữ liệu tổng
      return businessDataByMonth[year];
    } else if (selection.type === 'region') {
      // Trả về dữ liệu khu vực
      return getRegionData(selection.name, year);
    } else if (selection.type === 'facility') {
      // Trả về dữ liệu cơ sở
      return getFacilityData(selection.code, year);
    }

    return businessDataByMonth[year];
  }
};

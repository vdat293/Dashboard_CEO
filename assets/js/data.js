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
  // Hà Nội - Trụ sở chính (lớn nhất)
  HN: {
    revenue:    [3250, 3480, 2890, 2650, 2420, 2380, 2950, 3180, 2780, 2850, 3420, 3680], // 35,940 triệu/năm
    expenses:   [2145, 2262, 1879, 1723, 1573, 1547, 1917, 2067, 1807, 1853, 2224, 2392],
    profit:     [1105, 1218, 1011, 927, 847, 833, 1033, 1113, 973, 997, 1196, 1288],
    orders:     [4250, 4580, 3820, 3520, 3210, 3150, 3890, 4200, 3680, 3780, 4520, 4892],
    customers:  [1285, 1378, 1156, 1065, 968, 952, 1175, 1268, 1110, 1142, 1365, 1456],
    employees: 85
  },

  // Hồ Chí Minh - Cơ sở lớn thứ 2
  HCM: {
    revenue:    [2980, 3190, 2650, 2430, 2220, 2180, 2710, 2920, 2550, 2610, 3140, 3380], // 32,960 triệu/năm
    expenses:   [1967, 2105, 1749, 1604, 1465, 1439, 1789, 1927, 1683, 1723, 2072, 2230],
    profit:     [1013, 1085, 901, 826, 755, 741, 921, 993, 867, 887, 1068, 1150],
    orders:     [3890, 4180, 3490, 3220, 2940, 2890, 3560, 3850, 3370, 3460, 4150, 4480],
    customers:  [1175, 1262, 1055, 973, 887, 873, 1075, 1162, 1018, 1045, 1253, 1352],
    employees: 72
  },

  // Đà Nẵng - Miền Trung
  DN: {
    revenue:    [1820, 1950, 1620, 1485, 1355, 1330, 1650, 1780, 1555, 1595, 1915, 2060], // 20,115 triệu/năm
    expenses:   [1237, 1326, 1100, 1009, 921, 904, 1122, 1210, 1057, 1084, 1302, 1400],
    profit:     [583, 624, 520, 476, 434, 426, 528, 570, 498, 511, 613, 660],
    orders:     [2380, 2555, 2130, 1960, 1790, 1755, 2175, 2345, 2050, 2105, 2525, 2720],
    customers:  [718, 771, 643, 592, 540, 530, 656, 708, 619, 635, 762, 821],
    employees: 45
  },

  // Hải Phòng - Miền Bắc
  HP: {
    revenue:    [1620, 1740, 1445, 1325, 1210, 1190, 1475, 1590, 1390, 1425, 1710, 1840], // 17,960 triệu/năm
    expenses:   [1133, 1218, 1012, 928, 847, 833, 1033, 1113, 973, 998, 1197, 1288],
    profit:     [487, 522, 433, 397, 363, 357, 442, 477, 417, 427, 513, 552],
    orders:     [2120, 2280, 1900, 1750, 1600, 1570, 1945, 2100, 1835, 1885, 2260, 2435],
    customers:  [640, 688, 574, 528, 483, 474, 587, 634, 554, 569, 682, 735],
    employees: 38
  },

  // Cần Thơ - Đồng bằng sông Cửu Long
  CT: {
    revenue:    [1450, 1555, 1290, 1185, 1080, 1060, 1315, 1420, 1240, 1270, 1525, 1640], // 16,030 triệu/năm
    expenses:   [1015, 1089, 903, 830, 756, 742, 921, 994, 868, 889, 1068, 1148],
    profit:     [435, 466, 387, 355, 324, 318, 394, 426, 372, 381, 457, 492],
    orders:     [1900, 2040, 1700, 1565, 1430, 1405, 1735, 1875, 1640, 1680, 2015, 2170],
    customers:  [574, 616, 513, 473, 432, 424, 524, 566, 495, 507, 608, 655],
    employees: 35
  },

  // Nha Trang - Du lịch
  NT: {
    revenue:    [1280, 1375, 1140, 1045, 955, 940, 1165, 1260, 1100, 1130, 1355, 1460], // 14,205 triệu/năm
    expenses:   [896, 963, 798, 732, 669, 658, 816, 882, 770, 791, 949, 1022],
    profit:     [384, 412, 342, 313, 286, 282, 349, 378, 330, 339, 406, 438],
    orders:     [1680, 1805, 1505, 1385, 1265, 1245, 1540, 1665, 1455, 1495, 1790, 1930],
    customers:  [507, 545, 454, 418, 382, 376, 465, 502, 439, 451, 540, 582],
    employees: 32
  },

  // Vũng Tàu - Ven biển
  VT: {
    revenue:    [1150, 1235, 1025, 940, 855, 840, 1045, 1130, 985, 1010, 1215, 1310], // 12,740 triệu/năm
    expenses:   [805, 865, 718, 658, 599, 588, 732, 791, 690, 707, 851, 917],
    profit:     [345, 370, 307, 282, 256, 252, 313, 339, 295, 303, 364, 393],
    orders:     [1510, 1625, 1355, 1245, 1135, 1115, 1380, 1490, 1305, 1340, 1605, 1730],
    customers:  [456, 490, 409, 376, 343, 337, 416, 450, 394, 405, 485, 522],
    employees: 28
  }
};

// ============================================
// DỮ LIỆU LỊCH SỬ 3 NĂM (TỔNG TẤT CẢ CƠ SỞ)
// ============================================

const businessDataByMonth = {
  2024: {
    revenue:    [13550, 14525, 12060, 11060, 10095, 9920, 12310, 13280, 11600, 11890, 14280, 15370], // 149,950 triệu
    expenses:   [9198, 9828, 8159, 7484, 6830, 6711, 8330, 8984, 7848, 8045, 9663, 10397],
    profit:     [4352, 4697, 3901, 3576, 3265, 3209, 3980, 4296, 3752, 3845, 4617, 4973],
    orders:     [17730, 19065, 15900, 14645, 13370, 13130, 16275, 17525, 15335, 15745, 18865, 20357],
    customers:  [5355, 5750, 4804, 4425, 4035, 3966, 4913, 5290, 4629, 4754, 5695, 6123]
  },
  2023: {
    revenue:    [11775, 12623, 10479, 9613, 8778, 8624, 10699, 11537, 10082, 10340, 12413, 13357], // 130,320 triệu
    expenses:   [7948, 8520, 7073, 6488, 5925, 5821, 7222, 7788, 6805, 6979, 8379, 9011],
    profit:     [3827, 4103, 3406, 3125, 2853, 2803, 3477, 3749, 3277, 3361, 4034, 4346],
    orders:     [15410, 16542, 13755, 12642, 11545, 11344, 14067, 15168, 13258, 13604, 16315, 17578],
    customers:  [4655, 4994, 4153, 3818, 3487, 3426, 4248, 4580, 4004, 4109, 4925, 5305]
  },
  2022: {
    revenue:    [10220, 10959, 9099, 8350, 7624, 7489, 9291, 10021, 8757, 8984, 10782, 11604], // 113,180 triệu
    expenses:   [7154, 7671, 6369, 5845, 5337, 5242, 6504, 7015, 6130, 6289, 7548, 8122],
    profit:     [3066, 3288, 2730, 2505, 2287, 2247, 2787, 3006, 2627, 2695, 3234, 3482],
    orders:     [14180, 15220, 12650, 11620, 10610, 10420, 12925, 13940, 12185, 12505, 15000, 16155],
    customers:  [4280, 4594, 3818, 3508, 3203, 3147, 3903, 4210, 3680, 3776, 4530, 4877]
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

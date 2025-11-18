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
// DỮ LIỆU THEO CƠ SỞ VÀ THÁNG (2025)
// ============================================

const locationData = {
  // Hà Nội - Trụ sở chính (lớn nhất, ổn định nhưng có tháng khó khăn)
  HN: {
    revenue:       [4112, 4191, 3097, 2672, 2551, 2449, 3786, 4080, 3664, 3790, 4554, 4781], // 43,727 triệu/năm
    expenses:      [3999, 4099, 3016, 2604, 2527, 2506, 3671, 3938, 3549, 3659, 4373, 4634],
    profit:        [115, 92, 80, 69, 26, -57, 114, 140, 116, 131, 172, 147],  // Tỷ lệ lợi nhuận: ~2.8%, có tháng lỗ
    orders:        [5223, 5324, 3934, 3398, 3239, 3121, 4811, 5192, 4653, 4818, 5784, 6073],
    customers:     [1578, 1610, 1189, 1027, 978, 942, 1454, 1569, 1408, 1456, 1733, 1819], // Số KH hoạt động trong tháng
    newCustomers:  [465, 498, 359, 309, 287, 276, 444, 475, 417, 430, 514, 565], // Số KH mới trong tháng (~30%)
    cumulativeCustomers: [17073, 17571, 17930, 18239, 18526, 18802, 19246, 19721, 20138, 20568, 21082, 21647], // Tổng KH tích lũy
    employees: 85
  },

  // Hồ Chí Minh - Mạnh nhưng cạnh tranh cao, doanh thu không đều
  HCM: {
    revenue:       [3653, 3235, 3792, 3029, 2627, 3337, 2860, 4048, 3452, 3155, 3944, 4209], // 41,341 triệu/năm
    expenses:      [3588, 3219, 3706, 2950, 2574, 3313, 2918, 3949, 3376, 3118, 3835, 4132],
    profit:        [65, 16, 86, 79, 53, 24, -58, 99, 76, 37, 109, 77], // Tỷ lệ ~2.3%, T7 bị lỗ do khuyến mãi
    orders:        [4641, 4109, 4822, 3848, 3340, 4237, 3633, 5140, 4388, 4007, 5011, 5347],
    customers:     [1402, 1243, 1457, 1162, 1009, 1281, 1097, 1553, 1327, 1212, 1519, 1621], // Số KH hoạt động trong tháng
    newCustomers:  [440, 410, 471, 372, 315, 402, 357, 501, 418, 384, 473, 530], // Số KH mới trong tháng (~32%)
    cumulativeCustomers: [15681, 16091, 16562, 16934, 17249, 17651, 18008, 18509, 18927, 19311, 19784, 20314], // Tổng KH tích lũy
    employees: 72
  },

  // Đà Nẵng - Du lịch: đỉnh cao T6-T8 & Tết, yếu T9-T11
  DN: {
    revenue:       [2436, 2492, 1964, 1730, 1587, 2513, 2757, 2622, 1508, 1461, 1672, 2227], // 24,969 triệu/năm
    expenses:      [2368, 2405, 1939, 1719, 1571, 2420, 2674, 2533, 1536, 1483, 1709, 2161],
    profit:        [68, 87, 25, 11, 16, 93, 83, 89, -28, -22, -37, 66], // Seasonal, có tháng lỗ mùa thấp điểm
    orders:        [3098, 3168, 2494, 2196, 2016, 3190, 3504, 3330, 1918, 1858, 2128, 2829],
    customers:     [937, 958, 754, 664, 609, 964, 1059, 1006, 579, 561, 645, 858], // Số KH hoạt động trong tháng
    newCustomers:  [322, 345, 266, 232, 209, 331, 377, 354, 200, 195, 220, 307], // Số KH mới trong tháng (~35% - du lịch)
    cumulativeCustomers: [10026, 10371, 10637, 10869, 11078, 11409, 11786, 12140, 12340, 12535, 12755, 13062], // Tổng KH tích lũy
    employees: 45
  },

  // Hải Phòng - Xu hướng giảm, mất thị phần vào tay đối thủ
  HP: {
    revenue:       [1976, 1811, 1683, 1551, 1490, 1369, 1461, 1405, 1370, 1313, 1265, 1348], // 18,042 triệu/năm
    expenses:      [1920, 1783, 1662, 1541, 1475, 1387, 1490, 1428, 1395, 1333, 1293, 1389],
    profit:        [56, 28, 21, 10, 15, -18, -29, -23, -25, -20, -28, -41], // Đang thua lỗ từ T4, cần tái cơ cấu
    orders:        [2510, 2299, 2141, 1971, 1892, 1737, 1858, 1784, 1742, 1668, 1608, 1711],
    customers:     [758, 695, 647, 595, 571, 525, 562, 539, 526, 504, 487, 519], // Số KH hoạt động trong tháng
    newCustomers:  [187, 179, 164, 149, 139, 129, 144, 136, 130, 125, 118, 133], // Số KH mới trong tháng (~25% - đang giảm)
    cumulativeCustomers: [7340, 7519, 7683, 7832, 7971, 8100, 8244, 8380, 8510, 8635, 8753, 8886], // Tổng KH tích lũy
    employees: 38
  },

  // Cần Thơ - Tăng trưởng ổn định, thị trường mới nổi
  CT: {
    revenue:       [1261, 1272, 1371, 1447, 1555, 1626, 1626, 1717, 1827, 1884, 1983, 1961], // 19,530 triệu/năm
    expenses:      [1237, 1253, 1334, 1394, 1493, 1598, 1609, 1693, 1787, 1837, 1948, 1945],
    profit:        [24, 19, 37, 53, 62, 28, 17, 24, 40, 47, 35, 16], // Lợi nhuận thấp ~2% nhưng ổn định tăng
    orders:        [1602, 1617, 1746, 1840, 1978, 2068, 2069, 2185, 2327, 2398, 2524, 2497],
    customers:     [484, 488, 527, 556, 597, 625, 624, 660, 703, 725, 764, 756], // Số KH hoạt động trong tháng
    newCustomers:  [156, 166, 175, 183, 193, 202, 210, 219, 228, 237, 246, 256], // Số KH mới trong tháng (~33% - thị trường mới)
    cumulativeCustomers: [5914, 6080, 6255, 6438, 6631, 6833, 7043, 7262, 7490, 7727, 7973, 8229], // Tổng KH tích lũy
    employees: 35
  },

  // Nha Trang - Cực kỳ seasonal (du lịch), T1-2 & T6-8 tốt, còn lại yếu/lỗ
  NT: {
    revenue:       [1795, 1851, 1018, 891, 836, 2085, 2243, 2133, 871, 794, 954, 1594], // 17,065 triệu/năm
    expenses:      [1710, 1768, 1036, 911, 861, 2008, 2175, 2060, 913, 837, 1012, 1532],
    profit:        [85, 83, -18, -20, -25, 77, 68, 73, -42, -43, -58, 62], // Rất phụ thuộc mùa, nhiều tháng lỗ
    orders:        [2281, 2355, 1294, 1132, 1061, 2650, 2851, 2710, 1105, 1011, 1211, 2028],
    customers:     [689, 711, 391, 342, 321, 802, 861, 819, 334, 306, 368, 615], // Số KH hoạt động trong tháng
    newCustomers:  [270, 294, 157, 136, 126, 315, 351, 330, 132, 122, 144, 251], // Số KH mới trong tháng (~40% - du lịch seasonal)
    cumulativeCustomers: [7277, 7571, 7728, 7864, 7990, 8305, 8656, 8986, 9118, 9240, 9384, 9635], // Tổng KH tích lũy
    employees: 32
  },

  // Vũng Tàu - Cơ sở nhỏ, đang gặp khó khăn, nhiều tháng lỗ
  VT: {
    revenue:       [1047, 1068, 925, 860, 804, 941, 947, 885, 828, 783, 868, 940], // 10,896 triệu/năm
    expenses:      [1070, 1087, 949, 896, 835, 973, 987, 934, 869, 827, 917, 970],
    profit:        [-23, -19, -24, -36, -31, -32, -40, -49, -41, -44, -49, -30], // Liên tục lỗ, cần xem xét đóng cửa
    orders:        [1330, 1358, 1174, 1090, 1024, 1197, 1204, 1124, 1052, 995, 1104, 1195],
    customers:     [402, 410, 355, 329, 310, 361, 363, 339, 318, 301, 334, 362], // Số KH hoạt động trong tháng
    newCustomers:  [110, 118, 101, 92, 85, 100, 104, 95, 88, 84, 91, 104], // Số KH mới trong tháng (~28%)
    cumulativeCustomers: [3928, 4046, 4147, 4239, 4324, 4424, 4528, 4623, 4711, 4795, 4886, 4990], // Tổng KH tích lũy
    employees: 28
  }
};

// ============================================
// DỮ LIỆU LỊCH SỬ 3 NĂM (TỔNG TẤT CẢ CƠ SỞ)
// ============================================

const businessDataByMonth = {
  2025: {
    // Tăng trưởng chậm lại chỉ còn ~4.8% so với 2024, gặp khó khăn do cạnh tranh và suy thoái kinh tế
    revenue:      [16280, 15920, 13850, 12180, 11450, 14320, 15680, 16890, 13520, 13180, 15240, 17060], // 175,570 triệu
    expenses:     [15892, 15614, 13642, 12015, 11336, 14205, 15524, 16535, 13425, 13094, 15087, 16763],
    profit:       [388, 306, 208, 165, 114, 115, 156, 355, 95, 86, 153, 297], // Tổng lợi nhuận: 2,438 triệu (~1.39%)
    orders:       [20685, 20230, 17605, 15475, 14550, 18200, 19930, 21465, 17185, 16755, 19370, 21680],
    customers:    [6250, 6115, 5320, 4675, 4395, 5500, 6020, 6485, 5195, 5065, 5850, 6550], // Số KH hoạt động trong tháng
    newCustomers: [1950, 2010, 1693, 1473, 1354, 1755, 1987, 2110, 1613, 1577, 1806, 2146], // Số KH mới trong tháng (~31%)
    cumulativeCustomers: [67239, 69249, 70942, 72415, 73769, 75524, 77511, 79621, 81234, 82811, 84617, 86763] // Tổng KH tích lũy
  },
  2024: {
    // Tổng của 7 cơ sở: HN + HCM + DN + HP + CT + NT + VT
    revenue:      [15240, 15650, 13330, 11620, 10680, 13390, 15240, 16230, 12730, 12450, 14220, 16700], // 167,480 triệu
    expenses:     [14846, 15269, 13166, 11654, 10788, 13243, 14940, 15797, 12664, 12430, 14044, 16212],
    profit:       [394, 381, 164, -34, -108, 147, 300, 433, 66, 20, 176, 488], // Tổng lợi nhuận: 2,427 triệu (~1.4%)
    orders:       [19365, 19890, 16940, 14760, 13570, 17030, 19365, 20630, 16175, 15825, 18070, 21225],
    customers:    [5852, 6009, 5120, 4460, 4100, 5144, 5852, 6234, 4886, 4781, 5441, 6392], // Số KH hoạt động trong tháng
    newCustomers: [1861, 1917, 1615, 1405, 1292, 1674, 1896, 2013, 1539, 1505, 1724, 2048], // Số KH mới trong tháng (~31%)
    cumulativeCustomers: [46661, 48578, 50193, 51598, 52890, 54564, 56460, 58473, 60012, 61517, 63241, 65289] // Tổng KH tích lũy
  },
  2023: {
    // Tăng trưởng tốt ~17.6% so với 2022, profit margin khá
    revenue:      [13414, 13773, 11731, 10226, 9399, 11783, 13414, 14282, 11203, 10956, 12513, 14696], // 147,390 triệu
    expenses:     [12806, 13144, 11198, 9766, 8977, 11250, 12806, 13629, 10693, 10457, 11940, 14023],
    profit:       [608, 629, 533, 460, 422, 533, 608, 653, 510, 499, 573, 673], // ~4,701 triệu (~3.2%)
    orders:       [17041, 17502, 14908, 12987, 11922, 14987, 17041, 18254, 14233, 13916, 15918, 18707],
    customers:    [5150, 5288, 4504, 3924, 3602, 4527, 5150, 5515, 4300, 4205, 4808, 5652],
    newCustomers: [1619, 1668, 1405, 1223, 1124, 1457, 1649, 1751, 1339, 1309, 1500, 1782] // ~31% khách hàng mới
  },
  2022: {
    // Tăng trưởng đột biến ~34.2% so với 2021 do mở rộng mạnh sau COVID
    revenue:      [11402, 11707, 9971, 8692, 7989, 10016, 11402, 12140, 9523, 9313, 10636, 12492], // 125,283 triệu
    expenses:     [11060, 11356, 9671, 8430, 7749, 9716, 11060, 11776, 9237, 9034, 10317, 12117],
    profit:       [342, 351, 300, 262, 240, 300, 342, 364, 286, 279, 319, 375], // ~3,760 triệu (~3%)
    orders:       [14485, 14897, 12687, 11050, 10159, 12720, 14485, 15428, 12099, 11841, 13530, 15886],
    customers:    [4377, 4502, 3834, 3339, 3070, 3844, 4377, 4661, 3656, 3578, 4089, 4799],
    newCustomers: [1344, 1384, 1166, 1015, 933, 1209, 1369, 1453, 1111, 1086, 1245, 1479] // ~31% khách hàng mới
  },
  2021: {
    // Năm khó khăn do COVID-19, kinh doanh bị ảnh hưởng nặng
    revenue:      [8250, 8470, 7210, 6280, 5770, 7230, 8250, 8780, 6880, 6730, 7690, 9030], // 93,370 triệu
    expenses:     [8168, 8387, 7138, 6218, 5724, 7159, 8168, 8693, 6811, 6663, 7613, 8943],
    profit:       [82, 83, 72, 62, 46, 71, 82, 87, 69, 67, 77, 87], // ~883 triệu (~0.95%) - profit margin rất thấp
    orders:       [10485, 10770, 9165, 7980, 7335, 9195, 10485, 11165, 8745, 8550, 9775, 11475],
    customers:    [3168, 3254, 2768, 2411, 2216, 2777, 3168, 3373, 2643, 2584, 2953, 3467],
    newCustomers: [1008, 1038, 874, 761, 700, 907, 1027, 1090, 833, 815, 934, 1109] // ~32% khách hàng mới (COVID ảnh hưởng)
  }
};

// Tên các tháng
const monthLabels = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const monthLabelsShort = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

// ============================================
// HÀM TÍNH TOÁN DỮ LIỆU THEO PERIOD
// ============================================

/**
 * Tính tổng dữ liệu theo quý từ dữ liệu tháng
 * @param {Array} monthlyData - Mảng 12 giá trị theo tháng
 * @returns {Array} - Mảng 4 giá trị theo quý
 */
function calculateQuarterlyData(monthlyData) {
  const quarterly = [];
  for (let i = 0; i < 4; i++) {
    const start = i * 3;
    const sum = monthlyData[start] + monthlyData[start + 1] + monthlyData[start + 2];
    quarterly.push(sum);
  }
  return quarterly;
}

/**
 * Tính trung bình dữ liệu theo tuần từ dữ liệu tháng (ước lượng)
 * Giả định: Chia đều dữ liệu tháng thành 4 tuần
 * @param {Array} monthlyData - Mảng 12 giá trị theo tháng
 * @returns {Array} - Mảng ~48 giá trị theo tuần (4 tuần/tháng)
 */
function calculateWeeklyData(monthlyData) {
  const weekly = [];
  monthlyData.forEach(monthValue => {
    // Chia mỗi tháng thành 4 tuần với giá trị biến động nhẹ
    const baseWeekValue = monthValue / 4;
    weekly.push(
      Math.round(baseWeekValue * 0.9),  // Tuần 1: thấp hơn
      Math.round(baseWeekValue * 1.0),  // Tuần 2: trung bình
      Math.round(baseWeekValue * 1.1),  // Tuần 3: cao hơn
      Math.round(baseWeekValue * 1.0)   // Tuần 4: trung bình
    );
  });
  return weekly;
}

/**
 * Lấy labels theo period
 */
function getLabelsForPeriod(period) {
  if (period === 'weekly') {
    // Tạo labels cho 48 tuần (12 tháng x 4 tuần)
    const labels = [];
    for (let month = 1; month <= 12; month++) {
      for (let week = 1; week <= 4; week++) {
        labels.push(`T${month}/W${week}`);
      }
    }
    return labels;
  } else if (period === 'quarterly') {
    return ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'];
  } else { // monthly
    return monthLabelsShort;
  }
}

/**
 * Chuyển đổi dữ liệu theo period
 */
function transformDataByPeriod(monthlyData, period) {
  if (period === 'weekly') {
    return calculateWeeklyData(monthlyData);
  } else if (period === 'quarterly') {
    return calculateQuarterlyData(monthlyData);
  } else { // monthly
    return monthlyData;
  }
}

// ============================================
// NGUỒN KHÁCH HÀNG (CUSTOMER ACQUISITION CHANNELS)
// ============================================

// Dữ liệu khách hàng mới theo kênh marketing (năm 2025, tổng tất cả cơ sở)
const customerAcquisitionChannels = {
  channels: [
    { id: 'tiktok', name: 'TikTok Ads', color: '#000000' },
    { id: 'facebook', name: 'Facebook Ads', color: '#1877f2' },
    { id: 'google', name: 'Google Ads', color: '#4285f4' },
    { id: 'seo', name: 'Organic Search (SEO)', color: '#34a853' },
    { id: 'direct', name: 'Direct', color: '#6c757d' },
    { id: 'referral', name: 'Referral/Giới thiệu', color: '#ffc107' },
    { id: 'email', name: 'Email Marketing', color: '#ea4335' }
  ],

  // Phân bố khách hàng mới theo kênh (%)
  // TikTok đang nổi lên mạnh, Facebook giảm dần, SEO ổn định
  distribution: {
    tiktok: 32,    // 32% - Kênh mới, đang tăng mạnh, ROI tốt với Gen Z
    facebook: 24,  // 24% - Vẫn hiệu quả nhưng giảm dần, cạnh tranh cao
    google: 18,    // 18% - Ổn định, conversion rate cao
    seo: 12,       // 12% - Tự nhiên, miễn phí nhưng cần thời gian
    direct: 8,     // 8% - Khách quen, biết brand
    referral: 4,   // 4% - Chương trình referral
    email: 2       // 2% - Email marketing, conversion thấp
  },

  // Chi phí marketing trung bình mỗi kênh (triệu VNĐ/tháng)
  monthlyCost: {
    tiktok: 245,     // TikTok Ads budget
    facebook: 180,   // Facebook Ads budget
    google: 220,     // Google Ads budget
    seo: 45,         // SEO tools + content
    direct: 0,       // Không tốn phí
    referral: 35,    // Referral rewards
    email: 15        // Email platform + design
  },

  // CAC (Customer Acquisition Cost) - Chi phí để có 1 khách hàng mới (nghìn VNĐ)
  cac: {
    tiktok: 420,     // 420k/KH - Rẻ, hiệu quả với Gen Z
    facebook: 650,   // 650k/KH - Đắt hơn, cạnh tranh cao
    google: 1050,    // 1.05tr/KH - Đắt nhất nhưng conversion tốt
    seo: 325,        // 325k/KH - Rẻ nhưng cần thời gian
    direct: 0,       // Miễn phí
    referral: 750,   // 750k/KH - Bao gồm reward
    email: 650       // 650k/KH - Trung bình
  },

  // Conversion rate (%) - Tỷ lệ chuyển đổi từ click sang khách hàng
  conversionRate: {
    tiktok: 3.2,     // 3.2% - Cao nhờ video content hấp dẫn
    facebook: 2.1,   // 2.1% - Trung bình
    google: 4.8,     // 4.8% - Cao nhất, intent rõ ràng
    seo: 5.2,        // 5.2% - Rất cao, organic traffic chất lượng
    direct: 12.5,    // 12.5% - Khách đã biết brand
    referral: 8.5,   // 8.5% - Tin tưởng từ bạn bè
    email: 1.8       // 1.8% - Thấp nhất
  },

  // LTV (Customer Lifetime Value) trung bình theo kênh (triệu VNĐ)
  // Khách từ referral thường có LTV cao hơn
  ltv: {
    tiktok: 4.2,     // 4.2tr - Gen Z, mua ít hơn
    facebook: 5.8,   // 5.8tr
    google: 8.5,     // 8.5tr - Intent cao, mua nhiều
    seo: 7.2,        // 7.2tr - Organic, chất lượng tốt
    direct: 12.5,    // 12.5tr - Khách quen, trung thành
    referral: 15.8,  // 15.8tr - Cao nhất, trust từ bạn bè
    email: 3.5       // 3.5tr - Thấp
  }
};

// Xu hướng khách hàng mới từ TikTok theo tháng (2025)
// Tăng mạnh từ T3 khi bắt đầu invest nhiều vào TikTok
const tiktokGrowthByMonth = [280, 310, 450, 520, 480, 650, 720, 780, 590, 580, 670, 800];

// Xu hướng khách hàng mới từ Facebook theo tháng (2025)
// Giảm dần do chuyển budget sang TikTok
const facebookGrowthByMonth = [520, 510, 480, 450, 420, 480, 510, 540, 450, 430, 490, 550];

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
    result[loc.id] = getTotalRevenue(locationData, loc.id);
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
  const { currentMonth, prevMonth } = getCurrentAndPreviousMonth();
  let totalRevenue = 0, totalProfit = 0, totalCustomers = 0, totalOrders = 0, totalEmployees = 0;
  let prevRevenue = 0, prevProfit = 0, prevCustomers = 0, prevOrders = 0;

  locations.forEach(loc => {
    const data = locationData[loc.id];
    // Tháng hiện tại
    totalRevenue += data.revenue[currentMonth];
    totalProfit += data.profit[currentMonth];
    totalCustomers += data.newCustomers[currentMonth]; // Khách hàng mới trong tháng
    totalOrders += data.orders[currentMonth];
    totalEmployees += data.employees;

    // Tháng trước (để tính tăng trưởng)
    prevRevenue += data.revenue[prevMonth];
    prevProfit += data.profit[prevMonth];
    prevCustomers += data.newCustomers[prevMonth];
    prevOrders += data.orders[prevMonth];
  });

  // Tính % tăng trưởng
  const revenueGrowth = calculateGrowth(totalRevenue, prevRevenue, 0);
  const profitGrowth = calculateGrowth(totalProfit, prevProfit, 0);
  const customersGrowth = calculateGrowth(totalCustomers, prevCustomers, 0);
  const ordersGrowth = calculateGrowth(totalOrders, prevOrders, 0);

  return {
    totalRevenue,
    totalProfit,
    totalCustomers,
    totalOrders,
    totalEmployees,
    revenueGrowth: revenueGrowth.toFixed(1),
    profitGrowth: profitGrowth.toFixed(1),
    customersGrowth: customersGrowth.toFixed(1),
    ordersGrowth: ordersGrowth.toFixed(1)
  };
}

// ============================================
// BACKWARD COMPATIBILITY
// ============================================

// Dữ liệu doanh thu (dùng tổng của tất cả cơ sở)
const revenueData = {
  months: monthLabels,
  values: businessDataByMonth[2025].revenue
};

// Dữ liệu sản phẩm (dùng của Hà Nội làm mặc định)
const productData = {
  categories: productsByLocation.HN.categories,
  values: productsByLocation.HN.sales
};

// Top sản phẩm (dùng của Hà Nội làm mặc định)
const topProducts = productsByLocation.HN.topProducts;

// ============================================
// DỮ LIỆU KÊNH BÁN HÀNG
// ============================================

// Dữ liệu hiệu suất theo kênh bán hàng
const salesChannels = {
  labels: ['Cửa hàng', 'Website', 'App Mobile', 'Đại lý'],
  percentages: [45, 30, 18, 7],
  colors: ['#007bff', '#28a745', '#ffc107', '#dc3545']
};

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

// ============================================
// DỮ LIỆU THÔNG BÁO CHO TỪNG CƠ SỞ
// ============================================

const notificationsByLocation = {
  HN: [
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'iPhone 15 Pro Max',
      detail: 'Còn 12 chiếc, cần nhập thêm',
      time: '2 giờ trước',
      priority: 'high'
    },
    {
      type: 'out_stock',
      icon: 'bi-x-circle',
      color: 'danger',
      title: 'Hết hàng',
      product: 'MacBook Air M3 256GB',
      detail: 'Đã hết hàng, khách đang chờ',
      time: '4 giờ trước',
      priority: 'urgent'
    },
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'Apple Watch Series 8',
      detail: 'Tồn kho 45 ngày, 23 chiếc',
      time: '1 ngày trước',
      priority: 'low'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Đổi trả sản phẩm',
      product: 'iPad Pro 11" bị lỗi màn hình',
      detail: 'Khách Nguyễn Văn A yêu cầu đổi trả',
      time: '3 giờ trước',
      priority: 'medium'
    },
    {
      type: 'defect',
      icon: 'bi-bug',
      color: 'danger',
      title: 'Sản phẩm lỗi',
      product: 'AirPods Pro 2',
      detail: '3 khách báo lỗi pin trong tuần',
      time: '5 giờ trước',
      priority: 'high'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'Samsung Galaxy S24 Ultra',
      detail: 'Nhập 50 chiếc, giá tốt',
      time: '1 giờ trước',
      priority: 'medium'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Nhiều đổi trả',
      product: 'Sony WH-1000XM5',
      detail: '5 khách đổi trả trong 2 ngày',
      time: '6 giờ trước',
      priority: 'high'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'Samsung Galaxy Buds2 Pro',
      detail: 'Còn 8 chiếc',
      time: '7 giờ trước',
      priority: 'medium'
    }
  ],
  HCM: [
    {
      type: 'out_stock',
      icon: 'bi-x-circle',
      color: 'danger',
      title: 'Hết hàng',
      product: 'iPhone 15 Pro Max 1TB',
      detail: 'Hết hàng, có 3 khách đang chờ',
      time: '1 giờ trước',
      priority: 'urgent'
    },
    {
      type: 'defect',
      icon: 'bi-bug',
      color: 'danger',
      title: 'Sản phẩm lỗi',
      product: 'MacBook Pro M3',
      detail: 'Khách báo màn hình bị đốm',
      time: '3 giờ trước',
      priority: 'high'
    },
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'iPad Air 64GB',
      detail: 'Tồn 60 ngày, 18 chiếc',
      time: '2 ngày trước',
      priority: 'low'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'iPhone 15 Pro',
      detail: 'Nhập 100 chiếc các màu',
      time: '30 phút trước',
      priority: 'medium'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Đổi trả sản phẩm',
      product: 'Apple Watch Ultra 2',
      detail: 'Khách Trần Thị B đổi size dây',
      time: '4 giờ trước',
      priority: 'low'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'AirPods Max',
      detail: 'Còn 5 chiếc',
      time: '5 giờ trước',
      priority: 'high'
    }
  ],
  DN: [
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'Samsung Galaxy Tab S9',
      detail: 'Tồn 50 ngày, 15 chiếc',
      time: '1 ngày trước',
      priority: 'medium'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'iPhone 14',
      detail: 'Nhập 30 chiếc',
      time: '2 giờ trước',
      priority: 'medium'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Đổi trả sản phẩm',
      product: 'Samsung Galaxy A54',
      detail: 'Khách Lê Văn C đổi màu',
      time: '6 giờ trước',
      priority: 'low'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'AirPods Pro 2',
      detail: 'Còn 7 chiếc',
      time: '3 giờ trước',
      priority: 'high'
    }
  ],
  HP: [
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'iPhone 14',
      detail: 'Tồn 70 ngày, 28 chiếc',
      time: '3 ngày trước',
      priority: 'high'
    },
    {
      type: 'defect',
      icon: 'bi-bug',
      color: 'danger',
      title: 'Sản phẩm lỗi',
      product: 'Xiaomi Redmi Note 13',
      detail: '2 khách báo lỗi sạc',
      time: '4 giờ trước',
      priority: 'medium'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'Samsung Galaxy A54',
      detail: 'Nhập 25 chiếc',
      time: '5 giờ trước',
      priority: 'medium'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'AirPods 3',
      detail: 'Còn 4 chiếc',
      time: '2 giờ trước',
      priority: 'high'
    }
  ],
  CT: [
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'Xiaomi Redmi Note 13',
      detail: 'Nhập 40 chiếc, giá tốt',
      time: '1 giờ trước',
      priority: 'medium'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'Samsung Galaxy A34',
      detail: 'Còn 9 chiếc',
      time: '4 giờ trước',
      priority: 'medium'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Đổi trả sản phẩm',
      product: 'Oppo Reno 10',
      detail: 'Khách Phạm Thị D không ưng màu',
      time: '7 giờ trước',
      priority: 'low'
    },
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'iPhone 13',
      detail: 'Tồn 40 ngày, 12 chiếc',
      time: '2 ngày trước',
      priority: 'low'
    }
  ],
  NT: [
    {
      type: 'out_stock',
      icon: 'bi-x-circle',
      color: 'danger',
      title: 'Hết hàng',
      product: 'Samsung Galaxy A34',
      detail: 'Hết hàng do mùa cao điểm',
      time: '2 giờ trước',
      priority: 'urgent'
    },
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'Oppo A78',
      detail: 'Tồn 55 ngày, 20 chiếc',
      time: '2 ngày trước',
      priority: 'medium'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'iPhone 13',
      detail: 'Nhập 20 chiếc',
      time: '3 giờ trước',
      priority: 'medium'
    },
    {
      type: 'return',
      icon: 'bi-arrow-return-left',
      color: 'warning',
      title: 'Đổi trả sản phẩm',
      product: 'JBL Flip 6',
      detail: 'Khách Hoàng Văn E báo lỗi Bluetooth',
      time: '5 giờ trước',
      priority: 'medium'
    }
  ],
  VT: [
    {
      type: 'slow_moving',
      icon: 'bi-clock-history',
      color: 'info',
      title: 'Hàng tồn lâu',
      product: 'Samsung Galaxy A34',
      detail: 'Tồn 65 ngày, 25 chiếc',
      time: '3 ngày trước',
      priority: 'high'
    },
    {
      type: 'low_stock',
      icon: 'bi-exclamation-triangle',
      color: 'warning',
      title: 'Sắp hết hàng',
      product: 'Xiaomi Redmi Note 12',
      detail: 'Còn 6 chiếc',
      time: '4 giờ trước',
      priority: 'medium'
    },
    {
      type: 'defect',
      icon: 'bi-bug',
      color: 'danger',
      title: 'Sản phẩm lỗi',
      product: 'Oppo A78',
      detail: 'Khách báo camera bị mờ',
      time: '6 giờ trước',
      priority: 'high'
    },
    {
      type: 'new_stock',
      icon: 'bi-box-seam',
      color: 'success',
      title: 'Nhập hàng mới',
      product: 'Samsung Galaxy Buds FE',
      detail: 'Nhập 30 chiếc',
      time: '2 giờ trước',
      priority: 'medium'
    }
  ]
};

/**
 * UTILITY FUNCTIONS - DASHBOARD CEO
 * File chứa các hàm tiện ích dùng chung trong toàn bộ dự án
 * Tránh code trùng lặp, dễ bảo trì
 */

// ============================================
// 1. DATE & TIME UTILITIES
// ============================================

/**
 * Lấy tháng hiện tại (0-11)
 * @returns {number} - Index của tháng hiện tại (0 = tháng 1, 11 = tháng 12)
 */
function getCurrentMonth() {
  const now = new Date();
  return now.getMonth();
}

/**
 * Lấy tháng hiện tại và tháng trước
 * @returns {Object} - {currentMonth, prevMonth}
 */
function getCurrentAndPreviousMonth() {
  const currentMonth = getCurrentMonth();
  const prevMonth = currentMonth > 0 ? currentMonth - 1 : 11;
  return { currentMonth, prevMonth };
}

// ============================================
// 2. CALCULATION UTILITIES
// ============================================

/**
 * Tính phần trăm tăng trưởng (growth percentage)
 * @param {number} currentValue - Giá trị hiện tại
 * @param {number} previousValue - Giá trị trước đó
 * @param {number} decimals - Số chữ số thập phân (mặc định 1)
 * @returns {number} - Phần trăm tăng trưởng
 */
function calculateGrowth(currentValue, previousValue, decimals = 1) {
  if (!previousValue || previousValue === 0) {
    return 0;
  }
  const growth = ((currentValue - previousValue) / previousValue * 100);
  return decimals > 0 ? parseFloat(growth.toFixed(decimals)) : Math.round(growth);
}

/**
 * Tính tổng các phần tử trong mảng
 * @param {Array<number>} arr - Mảng số cần tính tổng
 * @returns {number} - Tổng các phần tử
 */
function sumArray(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * Tính tổng revenue theo location
 * @param {Object} locationData - Dữ liệu theo cơ sở
 * @param {string} locationId - ID của cơ sở
 * @returns {number} - Tổng revenue cả năm
 */
function getTotalRevenue(locationData, locationId) {
  if (!locationData || !locationData[locationId]) {
    return 0;
  }
  return sumArray(locationData[locationId].revenue);
}

// ============================================
// 3. FORMATTING UTILITIES
// ============================================

/**
 * Format số theo locale Việt Nam (dấu phẩy ngăn cách hàng nghìn)
 * @param {number} num - Số cần format
 * @returns {string} - Số đã được format
 */
function formatNumber(num) {
  if (num === null || num === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Format tiền tệ VND
 * @param {number} amount - Số tiền
 * @returns {string} - Số tiền đã format với ký hiệu VND
 */
function formatCurrency(amount) {
  if (amount === null || amount === undefined) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

/**
 * Format giá trị revenue (triệu/tỷ)
 * Nếu >= 1000 triệu thì hiển thị tỷ, ngược lại hiển thị triệu
 * @param {number} value - Giá trị revenue (đơn vị triệu VND)
 * @param {number} decimals - Số chữ số thập phân cho tỷ (mặc định 2)
 * @returns {string} - Giá trị đã format kèm đơn vị
 */
function formatRevenueValue(value, decimals = 2) {
  if (value === null || value === undefined) {
    return '0 triệu';
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + ' tỷ';
  }
  return value.toFixed(0) + ' triệu';
}

/**
 * Format giá trị cho chart tooltip (VND)
 * @param {number} value - Giá trị (đơn vị triệu VND)
 * @returns {string} - Giá trị đã format
 */
function formatChartValue(value) {
  if (value === null || value === undefined) {
    return '0 triệu VNĐ';
  }
  return value.toLocaleString() + ' triệu VNĐ';
}

/**
 * Format giá trị cho chart axis (tỷ)
 * @param {number} value - Giá trị (đơn vị triệu VND)
 * @param {number} decimals - Số chữ số thập phân (mặc định 1)
 * @returns {string} - Giá trị đã format
 */
function formatChartAxisValue(value, decimals = 1) {
  if (value === null || value === undefined) {
    return '0 tỷ';
  }
  return (value / 1000).toFixed(decimals) + ' tỷ';
}

// ============================================
// 4. CHART UTILITIES
// ============================================

/**
 * Destroy chart một cách an toàn (kiểm tra tồn tại trước)
 * @param {Object} chart - Chart instance cần destroy
 * @returns {boolean} - true nếu destroy thành công, false nếu chart không tồn tại
 */
function destroyChart(chart) {
  if (chart && typeof chart.destroy === 'function') {
    chart.destroy();
    return true;
  }
  return false;
}

/**
 * Destroy nhiều charts cùng lúc
 * @param {Array<Object>} charts - Mảng các chart instances
 */
function destroyCharts(charts) {
  if (!Array.isArray(charts)) {
    return;
  }

  charts.forEach(chart => {
    destroyChart(chart);
  });
}

/**
 * Destroy chart object chứa nhiều chart instances
 * @param {Object} chartObject - Object chứa các chart instances
 * @example destroyChartObject({revenue: chartInstance1, profit: chartInstance2})
 */
function destroyChartObject(chartObject) {
  if (!chartObject || typeof chartObject !== 'object') {
    return;
  }

  Object.keys(chartObject).forEach(key => {
    if (Array.isArray(chartObject[key])) {
      // Nếu là array (vd: sparklines)
      chartObject[key].forEach(chart => destroyChart(chart));
      chartObject[key] = [];
    } else {
      // Nếu là single chart
      if (destroyChart(chartObject[key])) {
        chartObject[key] = null;
      }
    }
  });
}

// ============================================
// 5. UI UTILITIES
// ============================================

/**
 * Lấy class CSS cho trend (tăng/giảm)
 * @param {number} growth - Giá trị growth
 * @returns {string} - Class name
 */
function getTrendClass(growth) {
  return parseFloat(growth) >= 0 ? 'trend-up' : 'trend-down';
}

/**
 * Lấy icon cho trend (mũi tên lên/xuống)
 * @param {number} growth - Giá trị growth
 * @returns {string} - Icon class name
 */
function getTrendIcon(growth) {
  return parseFloat(growth) >= 0 ? 'bi-arrow-up' : 'bi-arrow-down';
}

/**
 * Lấy badge class cho growth (success/danger)
 * @param {number} growth - Giá trị growth
 * @returns {string} - Badge class name
 */
function getGrowthBadgeClass(growth) {
  return parseFloat(growth) >= 0 ? 'badge-success' : 'badge-danger';
}

/**
 * Format growth với dấu + hoặc - và %
 * @param {number} growth - Giá trị growth
 * @returns {string} - Growth đã format (vd: "+5.2%" hoặc "-3.1%")
 */
function formatGrowthPercent(growth) {
  const value = parseFloat(growth);
  const sign = value >= 0 ? '+' : '';
  return sign + value + '%';
}

// ============================================
// 6. DATA VALIDATION UTILITIES
// ============================================

/**
 * Kiểm tra giá trị có phải là số hợp lệ không
 * @param {any} value - Giá trị cần kiểm tra
 * @returns {boolean}
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Parse số từ string, trả về 0 nếu không hợp lệ
 * @param {any} value - Giá trị cần parse
 * @returns {number}
 */
function parseNumber(value) {
  const parsed = parseFloat(value);
  return isValidNumber(parsed) ? parsed : 0;
}

// ============================================
// 7. LOCATION UTILITIES
// ============================================

/**
 * Lấy tên đầy đủ của location từ ID
 * @param {string} locationId - ID của location (vd: 'HN', 'HCM')
 * @returns {string} - Tên đầy đủ (vd: 'Hà Nội', 'Hồ Chí Minh')
 */
function getLocationName(locationId) {
  const locationNames = {
    'HN': 'Hà Nội',
    'HCM': 'Hồ Chí Minh',
    'DN': 'Đà Nẵng',
    'HP': 'Hải Phòng',
    'CT': 'Cần Thơ',
    'NT': 'Nha Trang',
    'VT': 'Vũng Tàu'
  };
  return locationNames[locationId] || locationId;
}

// ============================================
// EXPORT NOTE
// ============================================
// Các hàm trên đều được khai báo trong global scope
// Có thể sử dụng trực tiếp trong bất kỳ file JS nào
// sau khi import file utils.js này vào HTML

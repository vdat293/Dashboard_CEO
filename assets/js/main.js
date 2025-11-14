/**
 * FILE JAVASCRIPT CHÍNH CHO DASHBOARD CEO
 * File này khởi tạo tất cả các components và biểu đồ khi trang load
 */

// Biến lưu trữ các chart instances để có thể update hoặc destroy sau này
let charts = {
  revenue: null,
  product: null,
  sparklines: []
};

/**
 * Lấy dữ liệu dựa trên cơ sở được chọn
 * @param {number} year - Năm cần lấy dữ liệu
 * @returns {object} - Dữ liệu đã được filter theo cơ sở
 */
function getFilteredData(year = 2024) {
  // Kiểm tra xem FacilityManager có tồn tại không
  if (typeof FacilityManager !== 'undefined') {
    return FacilityManager.getCurrentData(year);
  }
  // Fallback về dữ liệu gốc nếu không có FacilityManager
  return businessDataByMonth[year];
}

/**
 * Lấy tên cơ sở hiện tại được chọn
 * @returns {string} - Tên cơ sở
 */
function getCurrentFacilityName() {
  if (typeof FacilityManager !== 'undefined') {
    const selection = FacilityManager.getSelected();
    return selection.name;
  }
  return 'Tất cả cơ sở';
}

/**
 * Cập nhật tiêu đề trang với tên cơ sở
 */
function updatePageTitle() {
  const facilityName = getCurrentFacilityName();
  const titleElement = document.querySelector('.content-header h1');

  if (titleElement && facilityName !== 'Tất cả cơ sở') {
    const currentTitle = titleElement.textContent;
    const facilityBadge = `<small class="badge badge-info ml-2">${facilityName}</small>`;

    // Chỉ thêm badge nếu chưa có
    if (!titleElement.querySelector('.badge')) {
      titleElement.innerHTML = currentTitle + ' ' + facilityBadge;
    }
  }
}

/**
 * Cập nhật các KPI boxes với dữ liệu đã lọc
 */
function updateKPIBoxes() {
  const filteredData = getFilteredData(2024);

  // Tính toán KPI từ dữ liệu đã lọc
  const currentMonth = 11; // December (0-based)
  const previousMonth = 10; // November

  // Doanh thu
  const currentRevenue = filteredData.revenue[currentMonth];
  const previousRevenue = filteredData.revenue[previousMonth];
  const revenueChange = calculatePercentageChange(currentRevenue, previousRevenue);

  // Lợi nhuận
  const currentProfit = filteredData.profit[currentMonth];
  const previousProfit = filteredData.profit[previousMonth];
  const profitChange = calculatePercentageChange(currentProfit, previousProfit);

  // Khách hàng
  const currentCustomers = filteredData.customers[currentMonth];
  const previousCustomers = filteredData.customers[previousMonth];
  const customersChange = calculatePercentageChange(currentCustomers, previousCustomers);

  // Đơn hàng
  const currentOrders = filteredData.orders[currentMonth];
  const previousOrders = filteredData.orders[previousMonth];
  const ordersChange = calculatePercentageChange(currentOrders, previousOrders);

  // Helper function để format giá trị
  const formatValue = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(2) + ' tỷ';
    }
    return value + ' triệu';
  };

  // Cập nhật DOM nếu các elements tồn tại
  const infoBoxes = document.querySelectorAll('.info-box-number');

  if (infoBoxes.length >= 4) {
    // Doanh thu
    infoBoxes[0].innerHTML = `
      ${formatValue(currentRevenue)}
      <small class="${revenueChange >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${revenueChange >= 0 ? 'up' : 'down'}"></i> ${Math.abs(revenueChange).toFixed(1)}%
      </small>
    `;

    // Lợi nhuận
    infoBoxes[1].innerHTML = `
      ${formatValue(currentProfit)}
      <small class="${profitChange >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${profitChange >= 0 ? 'up' : 'down'}"></i> ${Math.abs(profitChange).toFixed(1)}%
      </small>
    `;

    // Khách hàng
    infoBoxes[2].innerHTML = `
      ${formatNumber(currentCustomers)}
      <small class="${customersChange >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${customersChange >= 0 ? 'up' : 'down'}"></i> ${Math.abs(customersChange).toFixed(1)}%
      </small>
    `;

    // Đơn hàng
    infoBoxes[3].innerHTML = `
      ${formatNumber(currentOrders)}
      <small class="${ordersChange >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${ordersChange >= 0 ? 'up' : 'down'}"></i> ${Math.abs(ordersChange).toFixed(1)}%
      </small>
    `;
  }
}

/**
 * Hàm khởi tạo dashboard
 * Được gọi khi DOM đã load xong
 */
function initDashboard() {
  console.log('🚀 Khởi tạo Dashboard CEO...');

  // Cập nhật tiêu đề với cơ sở hiện tại
  updatePageTitle();

  // Cập nhật KPI boxes với dữ liệu đã lọc
  updateKPIBoxes();

  // Khởi tạo biểu đồ doanh thu
  initRevenueChartOnPage();

  // Khởi tạo biểu đồ thị phần sản phẩm
  initProductChartOnPage();

  // Khởi tạo các sparkline charts
  initSparklinesOnPage();

  // Thêm các event listeners
  setupEventListeners();

  console.log('✅ Dashboard đã sẵn sàng!');
}

/**
 * Khởi tạo biểu đồ doanh thu trên trang
 */
function initRevenueChartOnPage() {
  const revenueElement = document.querySelector('#revenue-chart');
  if (revenueElement) {
    // Sử dụng dữ liệu đã được filter theo cơ sở
    const filteredData = getFilteredData(2024);
    const chartData = {
      months: monthLabels,
      values: filteredData.revenue
    };
    charts.revenue = initRevenueChart('#revenue-chart', chartData);
    console.log('✓ Biểu đồ doanh thu đã load');
  }
}

/**
 * Khởi tạo biểu đồ sản phẩm trên trang
 */
function initProductChartOnPage() {
  const productElement = document.querySelector('#product-chart');
  if (productElement) {
    charts.product = initProductChart('#product-chart', productMarketShare);
    console.log('✓ Biểu đồ sản phẩm đã load');
  }
}

/**
 * Khởi tạo các sparkline charts
 */
function initSparklinesOnPage() {
  if (document.querySelector('#sparkline-1')) {
    initAllSparklines(sparklineData);
    console.log('✓ Sparkline charts đã load');
  }
}

/**
 * Thiết lập các event listeners
 */
function setupEventListeners() {
  // Có thể thêm các event listeners ở đây
  // Ví dụ: click vào nút refresh, filter, etc.

  // Example: Refresh button
  const refreshButtons = document.querySelectorAll('[data-action="refresh"]');
  refreshButtons.forEach(btn => {
    btn.addEventListener('click', handleRefresh);
  });
}

/**
 * Xử lý sự kiện refresh dữ liệu
 */
function handleRefresh(event) {
  event.preventDefault();
  console.log('🔄 Đang refresh dữ liệu...');

  // Trong thực tế, đây là nơi bạn sẽ gọi API để lấy dữ liệu mới
  // Sau đó update lại các biểu đồ

  // Giả lập việc refresh
  setTimeout(() => {
    console.log('✅ Dữ liệu đã được refresh');
    // updateChartData(charts.revenue, newData);
  }, 1000);
}

/**
 * Hàm format số thành định dạng tiền tệ VNĐ
 * @param {number} amount - Số tiền
 * @returns {string} - Chuỗi đã format
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

/**
 * Hàm format số với dấu phẩy ngăn cách
 * @param {number} num - Số cần format
 * @returns {string} - Chuỗi đã format
 */
function formatNumber(num) {
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Hàm tính phần trăm thay đổi
 * @param {number} current - Giá trị hiện tại
 * @param {number} previous - Giá trị trước đó
 * @returns {number} - Phần trăm thay đổi
 */
function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Hàm hiển thị notification
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại thông báo (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  // Trong thực tế, bạn có thể sử dụng thư viện như toastr, sweetalert, etc.
  console.log(`[${type.toUpperCase()}] ${message}`);

  // Hoặc tạo một notification DOM element đơn giản
  alert(message);
}

/**
 * Cleanup function - dọn dẹp khi rời khỏi trang
 */
function cleanup() {
  const allCharts = [charts.revenue, charts.product, ...charts.sparklines];
  destroyAllCharts(allCharts);
  console.log('🧹 Đã dọn dẹp resources');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Khởi tạo dashboard khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', initDashboard);

// Dọn dẹp khi rời khỏi trang
window.addEventListener('beforeunload', cleanup);

// Export các hàm để có thể sử dụng ở nơi khác (nếu cần)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initDashboard,
    formatCurrency,
    formatNumber,
    calculatePercentageChange,
    showNotification
  };
}

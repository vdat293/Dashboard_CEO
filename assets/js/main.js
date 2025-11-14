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
 * Hàm khởi tạo dashboard
 * Được gọi khi DOM đã load xong
 */
function initDashboard() {
  console.log('🚀 Khởi tạo Dashboard CEO...');

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
    charts.revenue = initRevenueChart('#revenue-chart', revenueData);
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

/**
 * FILE JAVASCRIPT CHÍNH CHO DASHBOARD CEO
 * File này khởi tạo tất cả các components và biểu đồ khi trang load
 * Hỗ trợ chuyển đổi giữa chế độ Tổng quan và Chi tiết cơ sở
 */

// Biến lưu trữ các chart instances để có thể update hoặc destroy sau này
let charts = {
  revenue: null,
  product: null,
  sparklines: [],
  modalRevenue: null
};

// Biến lưu trạng thái hiện tại
let currentLocationId = null; // null = tổng quan, có giá trị = chi tiết cơ sở

/**
 * Hàm khởi tạo dashboard
 * Được gọi khi DOM đã load xong
 */
function initDashboard() {
  console.log('🚀 Khởi tạo Dashboard CEO...');

  // Thiết lập event listener cho dropdown chọn cơ sở
  setupLocationSelector();

  // Hiển thị chế độ tổng quan ban đầu
  renderOverviewMode();

  console.log('✅ Dashboard đã sẵn sàng!');
}

/**
 * Thiết lập event listener cho dropdown chọn cơ sở
 */
function setupLocationSelector() {
  const selector = document.getElementById('location-selector');
  if (selector) {
    selector.addEventListener('change', function(e) {
      const locationId = e.target.value;
      currentLocationId = locationId || null;

      if (currentLocationId) {
        renderLocationDetailMode(currentLocationId);
      } else {
        renderOverviewMode();
      }
    });
  }
}

/**
 * Render chế độ tổng quan (không chọn cơ sở)
 * - Biểu đồ: So sánh doanh thu 7 cơ sở
 * - Thị phần: Thị phần các cơ sở
 * - Bảng: Top 5 cơ sở doanh thu tốt nhất
 * - Panel phải: Performance các cơ sở
 */
function renderOverviewMode() {
  console.log('🔄 Chuyển sang chế độ Tổng quan');

  // Cập nhật tiêu đề
  document.getElementById('main-chart-title').innerHTML = '<i class="bi bi-graph-up-arrow mr-2"></i>So sánh doanh thu 7 cơ sở';
  document.getElementById('market-share-title').textContent = 'Thị phần cơ sở';
  document.getElementById('top-table-title').textContent = 'Top 5 cơ sở doanh thu tốt nhất';
  document.getElementById('right-panel-title').innerHTML = '<i class="bi bi-bar-chart-fill mr-2" id="right-panel-icon"></i>Performance các cơ sở';

  // Destroy các chart cũ nếu có
  destroyCharts();

  // Render biểu đồ so sánh doanh thu các cơ sở
  charts.revenue = initLocationComparisonChart('#revenue-chart', locations, locationData);

  // Render biểu đồ thị phần các cơ sở
  charts.product = initLocationMarketShareChart('#product-chart', locations, locationData);

  // Render bảng Top 5 cơ sở
  renderTopLocationsTable();

  // Render Performance các cơ sở
  renderLocationPerformancePanel();
}

/**
 * Render chế độ chi tiết cơ sở (khi chọn một cơ sở)
 * - Biểu đồ: So sánh sản phẩm bán chạy
 * - Thị phần: Thị phần sản phẩm
 * - Bảng: Top 5 sản phẩm bán chạy
 * - Panel phải: Thông báo cơ sở
 */
function renderLocationDetailMode(locationId) {
  const location = locations.find(loc => loc.id === locationId);
  if (!location) {
    console.error('Không tìm thấy cơ sở:', locationId);
    return;
  }

  console.log('🔄 Chuyển sang chế độ Chi tiết cơ sở:', location.name);

  // Cập nhật tiêu đề
  document.getElementById('main-chart-title').innerHTML = `<i class="bi bi-graph-up-arrow mr-2"></i>So sánh sản phẩm bán chạy - ${location.name}`;
  document.getElementById('market-share-title').textContent = 'Thị phần sản phẩm';
  document.getElementById('top-table-title').textContent = 'Top 5 sản phẩm bán chạy';
  document.getElementById('right-panel-title').innerHTML = '<i class="bi bi-bell mr-2" id="right-panel-icon"></i>Thông báo';

  // Destroy các chart cũ nếu có
  destroyCharts();

  // Render biểu đồ so sánh sản phẩm
  charts.revenue = initLocationProductComparisonChart('#revenue-chart', locationId, productsByLocation);

  // Render biểu đồ thị phần sản phẩm của cơ sở
  const locationProducts = productsByLocation[locationId];
  if (locationProducts) {
    const productData = {
      labels: locationProducts.categories,
      values: locationProducts.sales,
      colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#dc3545', '#6f42c1']
    };
    charts.product = initProductChart('#product-chart', productData);
  }

  // Render bảng Top 5 sản phẩm
  renderTopProductsTable(locationId);

  // Render Panel thông báo
  renderNotificationPanel(locationId);
}

/**
 * Render bảng Top 5 cơ sở doanh thu tốt nhất
 */
function renderTopLocationsTable() {
  // Tính tổng doanh thu từng cơ sở
  const locationRevenues = locations.map(loc => {
    const totalRevenue = locationData[loc.id].revenue.reduce((a, b) => a + b, 0);
    const currentMonth = 10; // Tháng 11
    const prevMonth = 9;
    const growth = ((locationData[loc.id].revenue[currentMonth] - locationData[loc.id].revenue[prevMonth]) / locationData[loc.id].revenue[prevMonth] * 100).toFixed(1);
    return {
      ...loc,
      totalRevenue,
      currentRevenue: locationData[loc.id].revenue[currentMonth],
      growth
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  const tableHTML = `
    <table class="table table-striped table-valign-middle">
      <thead>
        <tr>
          <th>Cơ sở</th>
          <th>Doanh thu tháng</th>
          <th>Tổng năm</th>
          <th>Tăng trưởng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        ${locationRevenues.map((loc, index) => `
          <tr>
            <td>
              <span class="badge" style="background-color: ${loc.color}; width: 10px; height: 10px; display: inline-block; border-radius: 50%;"></span>
              <strong class="ml-2">${loc.name}</strong>
              ${loc.isHQ ? '<span class="badge badge-info ml-1">HQ</span>' : ''}
            </td>
            <td>${formatRevenueValue(loc.currentRevenue)}</td>
            <td>${(loc.totalRevenue / 1000).toFixed(2)} tỷ</td>
            <td>
              <span class="badge ${loc.growth >= 0 ? 'badge-success' : 'badge-danger'}">
                ${loc.growth >= 0 ? '+' : ''}${loc.growth}%
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-primary location-detail-btn" data-location="${loc.id}">
                <i class="bi bi-eye"></i> Chi tiết
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('top-table-container').innerHTML = tableHTML;

  // Thêm event listener cho các nút chi tiết
  document.querySelectorAll('.location-detail-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const locId = this.getAttribute('data-location');
      document.getElementById('location-selector').value = locId;
      renderLocationDetailMode(locId);
    });
  });
}

/**
 * Render bảng Top 5 sản phẩm bán chạy của cơ sở
 */
function renderTopProductsTable(locationId) {
  const locationProducts = productsByLocation[locationId];
  if (!locationProducts || !locationProducts.topProducts) {
    document.getElementById('top-table-container').innerHTML = '<p class="p-3">Không có dữ liệu sản phẩm</p>';
    return;
  }

  const topProducts = locationProducts.topProducts;

  const tableHTML = `
    <table class="table table-striped table-valign-middle">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Đã bán</th>
          <th>Doanh thu</th>
        </tr>
      </thead>
      <tbody>
        ${topProducts.map((product, index) => {
          const icons = ['bi-laptop', 'bi-phone', 'bi-tablet', 'bi-headphones', 'bi-smartwatch'];
          const colors = ['text-primary', 'text-success', 'text-info', 'text-warning', 'text-danger'];
          return `
            <tr>
              <td>
                <i class="bi ${icons[index] || 'bi-box'} ${colors[index] || 'text-secondary'} mr-2"></i>
                ${product.name}
              </td>
              <td>${formatCurrency(product.price)}</td>
              <td>
                <span class="badge ${product.sold > 100 ? 'badge-success' : 'badge-warning'}">${product.sold} cái</span>
              </td>
              <td>${(product.revenue / 1000000).toFixed(0)} triệu</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('top-table-container').innerHTML = tableHTML;
}

/**
 * Render Panel Performance các cơ sở
 */
function renderLocationPerformancePanel() {
  // Tính tổng doanh thu từng cơ sở (tháng hiện tại)
  const currentMonth = 10; // Tháng 11
  const prevMonth = 9;

  const locationPerformances = locations.map(loc => {
    const currentRevenue = locationData[loc.id].revenue[currentMonth];
    const growth = ((locationData[loc.id].revenue[currentMonth] - locationData[loc.id].revenue[prevMonth]) / locationData[loc.id].revenue[prevMonth] * 100).toFixed(1);
    return {
      ...loc,
      currentRevenue,
      growth
    };
  }).sort((a, b) => b.currentRevenue - a.currentRevenue);

  const panelHTML = `
    <table class="table table-sm" id="location-performance-table">
      <thead>
        <tr>
          <th>Cơ sở</th>
          <th class="text-right">Doanh thu</th>
          <th class="text-right">Tăng trưởng</th>
        </tr>
      </thead>
      <tbody>
        ${locationPerformances.map(loc => `
          <tr class="location-row" data-location="${loc.id}" style="cursor: pointer;">
            <td>
              <span class="badge" style="background-color: ${loc.color}; width: 10px; height: 10px; display: inline-block; border-radius: 50%;"></span>
              <strong class="ml-2">${loc.name}</strong>
            </td>
            <td class="text-right">${formatRevenueValue(loc.currentRevenue)}</td>
            <td class="text-right">
              <span class="badge ${loc.growth >= 0 ? 'badge-success' : 'badge-danger'}">
                ${loc.growth >= 0 ? '+' : ''}${loc.growth}%
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('right-panel-container').innerHTML = panelHTML;
  document.getElementById('right-panel-footer').innerHTML = '<small class="text-muted">Click vào cơ sở để xem chi tiết doanh thu</small>';

  // Thêm event listener cho click vào cơ sở
  setupLocationClickHandlers();
}

/**
 * Render Panel Thông báo của cơ sở
 */
function renderNotificationPanel(locationId) {
  const notifications = notificationsByLocation[locationId];
  if (!notifications || notifications.length === 0) {
    document.getElementById('right-panel-container').innerHTML = '<p class="p-3">Không có thông báo</p>';
    document.getElementById('right-panel-footer').innerHTML = '';
    return;
  }

  // Hiển thị 5 thông báo đầu tiên
  const visibleNotifications = notifications.slice(0, 5);

  const panelHTML = `
    <div class="p-2" id="notification-list">
      ${visibleNotifications.map((notif, index) => `
        <div class="notification-item p-2 mb-2 border-bottom">
          <div class="d-flex align-items-start">
            <i class="bi ${notif.icon} text-${notif.color} mr-2" style="font-size: 1.2rem;"></i>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between">
                <strong class="text-${notif.color}">${notif.title}</strong>
                <small class="text-muted">${notif.time}</small>
              </div>
              <div class="mt-1">
                <strong>${notif.product}</strong>
              </div>
              <small class="text-muted">${notif.detail}</small>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('right-panel-container').innerHTML = panelHTML;

  // Nếu có nhiều hơn 5 thông báo, hiển thị nút "Xem thêm"
  if (notifications.length > 5) {
    document.getElementById('right-panel-footer').innerHTML = `
      <button class="btn btn-sm btn-outline-primary" id="view-more-notifications">
        <i class="bi bi-plus-circle"></i> Xem thêm (${notifications.length - 5} thông báo)
      </button>
    `;

    // Thêm event listener cho nút "Xem thêm"
    document.getElementById('view-more-notifications').addEventListener('click', function() {
      showAllNotifications(locationId);
    });
  } else {
    document.getElementById('right-panel-footer').innerHTML = '<small class="text-muted">Tất cả thông báo đã được hiển thị</small>';
  }
}

/**
 * Hiển thị tất cả thông báo trong modal
 */
function showAllNotifications(locationId) {
  const notifications = notificationsByLocation[locationId];
  const location = locations.find(loc => loc.id === locationId);

  // Tạo modal HTML
  const modalHTML = `
    <div class="modal fade" id="allNotificationsModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-bell mr-2"></i>
              Tất cả thông báo - ${location.name}
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 500px; overflow-y: auto;">
            ${notifications.map(notif => `
              <div class="notification-item p-3 mb-2 border rounded">
                <div class="d-flex align-items-start">
                  <i class="bi ${notif.icon} text-${notif.color} mr-3" style="font-size: 1.5rem;"></i>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <strong class="text-${notif.color}" style="font-size: 1.1rem;">${notif.title}</strong>
                      <span class="badge badge-${notif.color}">${notif.priority}</span>
                    </div>
                    <div class="mb-1">
                      <i class="bi bi-box mr-1"></i>
                      <strong>${notif.product}</strong>
                    </div>
                    <p class="mb-1">${notif.detail}</p>
                    <small class="text-muted">
                      <i class="bi bi-clock mr-1"></i>${notif.time}
                    </small>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Xóa modal cũ nếu có
  const oldModal = document.getElementById('allNotificationsModal');
  if (oldModal) {
    oldModal.remove();
  }

  // Thêm modal vào body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Hiển thị modal
  $('#allNotificationsModal').modal('show');
}

/**
 * Thiết lập event handlers cho click vào cơ sở
 */
function setupLocationClickHandlers() {
  const locationRows = document.querySelectorAll('.location-row');
  locationRows.forEach(row => {
    row.addEventListener('click', function() {
      const locationId = this.getAttribute('data-location');
      showLocationDetail(locationId);
    });
  });
}

/**
 * Hiển thị chi tiết cơ sở trong modal
 * @param {string} locationId - ID của cơ sở (HN, HCM, DN, etc.)
 */
function showLocationDetail(locationId) {
  if (typeof locationData === 'undefined' || typeof locations === 'undefined') {
    console.error('Dữ liệu cơ sở không tồn tại');
    return;
  }

  // Tìm thông tin cơ sở
  const location = locations.find(loc => loc.id === locationId);
  const data = locationData[locationId];

  if (!location || !data) {
    console.error('Không tìm thấy dữ liệu cho cơ sở:', locationId);
    return;
  }

  // Lấy dữ liệu tháng hiện tại (tháng 11 - index 10)
  const currentMonth = 10;
  const currentRevenue = data.revenue[currentMonth];
  const currentProfit = data.profit[currentMonth];
  const currentOrders = data.orders[currentMonth];

  // Cập nhật tên cơ sở trong modal
  document.getElementById('modal-location-name').textContent = `Chi tiết cơ sở ${location.name}`;

  // Cập nhật các số liệu
  document.getElementById('modal-revenue').textContent = formatRevenueValue(currentRevenue);
  document.getElementById('modal-profit').textContent = formatRevenueValue(currentProfit);
  document.getElementById('modal-orders').textContent = formatNumber(currentOrders);

  // Hiển thị biểu đồ doanh thu theo tháng
  showLocationRevenueChart(location, data);

  // Hiển thị modal
  $('#locationDetailModal').modal('show');
}

/**
 * Hiển thị biểu đồ doanh thu theo tháng của cơ sở
 * @param {Object} location - Thông tin cơ sở
 * @param {Object} data - Dữ liệu cơ sở
 */
function showLocationRevenueChart(location, data) {
  // Xóa biểu đồ cũ nếu có
  if (charts.modalRevenue) {
    charts.modalRevenue.destroy();
  }

  const options = {
    series: [{
      name: 'Doanh thu',
      data: data.revenue
    }, {
      name: 'Lợi nhuận',
      data: data.profit
    }],
    chart: {
      height: 300,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    colors: [location.color, '#28a745'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: monthLabelsShort
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          if (value >= 1000) {
            return (value / 1000).toFixed(1) + ' tỷ';
          }
          return value.toFixed(0) + ' triệu';
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return value.toFixed(0) + ' triệu VNĐ';
        }
      }
    },
    legend: {
      position: 'top'
    },
    grid: {
      borderColor: '#f1f1f1'
    }
  };

  charts.modalRevenue = new ApexCharts(document.querySelector('#modal-revenue-chart'), options);
  charts.modalRevenue.render();
}

/**
 * Destroy tất cả các charts hiện tại
 */
function destroyCharts() {
  if (charts.revenue) {
    charts.revenue.destroy();
    charts.revenue = null;
  }
  if (charts.product) {
    charts.product.destroy();
    charts.product = null;
  }
  charts.sparklines.forEach(chart => {
    if (chart && chart.destroy) {
      chart.destroy();
    }
  });
  charts.sparklines = [];
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
 * Format giá trị doanh thu
 * @param {number} value - Giá trị doanh thu (triệu)
 * @returns {string} - Chuỗi đã format
 */
function formatRevenueValue(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + ' tỷ';
  }
  return value.toFixed(0) + ' triệu';
}

/**
 * Cleanup function - dọn dẹp khi rời khỏi trang
 */
function cleanup() {
  destroyCharts();
  if (charts.modalRevenue) {
    charts.modalRevenue.destroy();
  }
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
    formatRevenueValue
  };
}

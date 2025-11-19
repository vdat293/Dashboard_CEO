/**
 * PAGES - Content templates cho từng trang
 * Chứa HTML và logic cho mỗi trang trong SPA
 */

const Pages = {
  /**
   * Trang Dashboard / Tổng quan
   */
  dashboard: {
    render() {
      return `
        <!-- Content Header -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard CEO</h1>
              </div>
              <div class="col-sm-6">
                <div class="float-sm-right">
                  <select id="location-selector" class="form-control location-filter" style="width: auto; display: inline-block; min-width: 200px;">
                    <option value="">Tất cả cơ sở (Tổng quan)</option>
                    <option value="HN">Hà Nội</option>
                    <option value="HCM">TP. Hồ Chí Minh</option>
                    <option value="DN">Đà Nẵng</option>
                    <option value="HP">Hải Phòng</option>
                    <option value="CT">Cần Thơ</option>
                    <option value="NT">Nha Trang</option>
                    <option value="VT">Vũng Tàu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">

            <!-- Info boxes - Chỉ số KPI -->
            <div class="row">
              <!-- Doanh thu -->
              <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-primary elevation-1">
                    <i class="bi bi-currency-dollar"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Doanh thu tháng</span>
                    <span class="info-box-number">
                      3.68 tỷ
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> 7.6%
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Lợi nhuận -->
              <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-success elevation-1">
                    <i class="bi bi-graph-up"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Lợi nhuận</span>
                    <span class="info-box-number">
                      1.29 tỷ
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> 7.7%
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Khách hàng -->
              <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-info elevation-1">
                    <i class="bi bi-people"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Khách hàng mới</span>
                    <span class="info-box-number">
                      1,456
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> 6.7%
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Đơn hàng -->
              <div class="col-12 col-sm-6 col-md-3">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-warning elevation-1">
                    <i class="bi bi-cart"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Đơn hàng</span>
                    <span class="info-box-number">
                      4,892
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> 8.2%
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Charts Row -->
            <div class="row">
              <!-- Biểu đồ doanh thu / So sánh sản phẩm - Full width -->
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-0">
                    <div class="d-flex justify-content-between">
                      <h3 class="card-title" id="main-chart-title">
                        <i class="bi bi-graph-up-arrow me-2"></i>
                        So sánh doanh thu 7 cơ sở
                      </h3>
                      <a href="#/revenue" data-route="/revenue" class="btn btn-sm btn-primary">Xem chi tiết</a>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="revenue-chart" style="height: 400px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Table và Activity Row -->
            <div class="row">
              <!-- Bảng Top 5: Cơ sở hoặc Sản phẩm -->
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title" id="top-table-title">Top 5 cơ sở doanh thu tốt nhất</h3>
                  </div>
                  <div class="card-body table-responsive p-0" id="top-table-container">
                    <!-- Nội dung sẽ được thay đổi bởi JavaScript -->
                  </div>
                </div>
              </div>

              <!-- Biểu đồ cột / Thông báo -->
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title" id="right-panel-title">
                      <i class="bi bi-bar-chart-fill me-2" id="right-panel-icon"></i>
                      Tổng doanh thu năm 2025
                    </h3>
                  </div>
                  <div class="card-body" id="right-panel-container">
                    <!-- Nội dung sẽ được thay đổi bởi JavaScript -->
                    <div id="location-bar-chart" style="height: 350px;"></div>
                  </div>
                  <div class="card-footer text-center" id="right-panel-footer">
                    <small class="text-muted">Click vào cột để xem chi tiết cơ sở</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;
    },

    init() {
      // Khởi tạo dashboard khi trang được load
      if (typeof initDashboard === 'function') {
        initDashboard();
      }
    }
  },

  /**
   * Placeholder cho các trang khác - sẽ được implement sau
   */
  revenue: {
    render() {
      return `
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Doanh Thu Chi Tiết</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Trang Doanh thu đang được phát triển. Vui lòng quay lại sau.
            </div>
          </div>
        </section>
      `;
    },
    init() { }
  },

  customers: {
    render() {
      return `
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Quản Lý Khách Hàng</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Trang Khách hàng đang được phát triển. Vui lòng quay lại sau.
            </div>
          </div>
        </section>
      `;
    },
    init() { }
  },

  products: {
    render() {
      return `
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Quản Lý Sản Phẩm</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Trang Sản phẩm đang được phát triển. Vui lòng quay lại sau.
            </div>
          </div>
        </section>
      `;
    },
    init() { }
  },

  kim: {
    render() {
      return `
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Kim - Trợ lý ảo</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Kim AI Assistant đang được phát triển. Vui lòng quay lại sau.
            </div>
          </div>
        </section>
      `;
    },
    init() { }
  },

  settings: {
    render() {
      return `
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Cài Đặt</h1>
              </div>
            </div>
          </div>
        </div>
        <section class="content">
          <div class="container-fluid">
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Trang Cài đặt đang được phát triển. Vui lòng quay lại sau.
            </div>
          </div>
        </section>
      `;
    },
    init() { }
  }
};

Pages.myNewPage = {
  render() {
    return `<div>Your HTML here</div>`;
  },
  init() {
    // Initialize charts, events, etc.
  }
};
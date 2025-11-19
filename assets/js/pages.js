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
              <div class="col-sm-6">
                <div class="float-sm-end">
                  <select id="location-selector" class="form-control location-filter" style="width: auto; display: inline-block; min-width: 200px;">
                    <option value="">Tất cả cơ sở (Tổng hợp)</option>
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

            <!-- Tổng quan doanh thu -->
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-primary elevation-1">
                    <i class="bi bi-currency-dollar"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Doanh thu tháng này</span>
                    <span class="info-box-number" id="kpi-revenue">
                      14.22 tỷ
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> <span id="kpi-revenue-growth">14.1%</span>
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-success elevation-1">
                    <i class="bi bi-graph-up-arrow"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Doanh thu năm nay</span>
                    <span class="info-box-number" id="kpi-yearly">
                      167.48 tỷ
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-info elevation-1">
                    <i class="bi bi-bar-chart"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Trung bình/tháng</span>
                    <span class="info-box-number" id="kpi-average">
                      13.96 tỷ
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-warning elevation-1">
                    <i class="bi bi-arrow-up-circle"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Tăng trưởng YoY</span>
                    <span class="info-box-number" id="kpi-yoy">
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> +13.6%
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Biểu đồ doanh thu -->
            <div class="row">
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header border-0">
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                      <h3 class="card-title mb-2 mb-md-0">
                        <i class="bi bi-graph-up mr-2"></i>
                        <span id="chart-title">Doanh thu theo tháng (Tổng hợp)</span>
                      </h3>
                      <div class="btn-group-sm">
                        <button type="button" class="btn btn-sm btn-outline-primary" id="btn-compare-years">
                          <i class="bi bi-calendar3-range"></i>
                          <span class="d-none d-sm-inline"> So sánh năm</span>
                        </button>
                        <button type="button" class="btn btn-sm btn-primary ml-1">
                          <i class="bi bi-download"></i>
                          <span class="d-none d-sm-inline"> Xuất dữ liệu</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="revenue-trend-chart" style="height: 400px;"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-pie-chart mr-2"></i>
                      Phân bố doanh thu
                    </h3>
                  </div>
                  <div class="card-body">
                    <div id="revenue-distribution-chart" style="height: 400px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phân tích chi tiết -->
            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-bar-chart-line mr-2"></i>
                      So sánh Doanh thu - Chi phí - Lợi nhuận
                    </h3>
                  </div>
                  <div class="card-body">
                    <div id="revenue-expense-profit-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-percent mr-2"></i>
                      Biên lợi nhuận theo tháng
                    </h3>
                  </div>
                  <div class="card-body">
                    <div id="profit-margin-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bảng chi tiết -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-table mr-2"></i>
                      Chi tiết doanh thu theo tháng
                    </h3>
                  </div>
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover table-striped">
                      <thead class="bg-light">
                        <tr>
                          <th>Tháng</th>
                          <th class="text-right">Doanh thu</th>
                          <th class="text-right">Chi phí</th>
                          <th class="text-right">Lợi nhuận</th>
                          <th class="text-center">Biên LN</th>
                          <th class="text-center">So với năm trước</th>
                          <th class="text-center">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody id="revenue-table-body">
                        <!-- Will be populated by JavaScript -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;
    },

    init() {
      // Khởi tạo revenue page khi được load
      if (typeof initRevenuePage === 'function') {
        initRevenuePage();
      }
    }
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
              <div class="col-sm-6">
                <div class="float-sm-right">
                  <select id="location-selector" class="form-control location-filter" style="width: auto; display: inline-block; min-width: 200px;">
                    <option value="">Tất cả cơ sở (Tổng hợp)</option>
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

            <!-- Thống kê khách hàng -->
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-info elevation-1">
                    <i class="bi bi-person-plus"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Khách hàng mới tháng này</span>
                    <span class="info-box-number" id="kpi-new-customers">
                      1,806
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> 4.8%
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-success elevation-1">
                    <i class="bi bi-people-fill"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Tổng khách hàng tích lũy</span>
                    <span class="info-box-number" id="kpi-total-customers">
                      84,617
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-warning elevation-1">
                    <i class="bi bi-star"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Khách hàng VIP</span>
                    <span class="info-box-number" id="kpi-vip">
                      423
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-primary elevation-1">
                    <i class="bi bi-cart"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Trung bình đơn/KH</span>
                    <span class="info-box-number" id="kpi-orders-per-customer">
                      3.31
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Biểu đồ -->
            <div class="row">
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-graph-up mr-2"></i>
                      <span id="chart-title">Phân tích xu hướng khách hàng (Tổng hợp)</span>
                    </h3>
                    <div class="card-tools">
                      <small class="text-muted">Doanh thu & Khách hàng mới</small>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="customer-trend-chart" style="height: 400px;"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-megaphone mr-2"></i>
                      Nguồn khách hàng mới
                    </h3>
                    <div class="card-tools">
                      <small class="text-muted">Kênh marketing hiệu quả nhất</small>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="customer-distribution-chart" style="height: 400px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phân tích chi tiết -->
            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-graph-up mr-2"></i>
                      Xu hướng Marketing: TikTok vs Facebook
                    </h3>
                    <div class="card-tools">
                      <small class="text-muted">Khách hàng mới theo tháng</small>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="customers-orders-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-cash-coin mr-2"></i>
                      Hiệu quả Marketing - ROI theo kênh
                    </h3>
                    <div class="card-tools">
                      <small class="text-muted">LTV/CAC Ratio</small>
                    </div>
                  </div>
                  <div class="card-body">
                    <div id="customer-segment-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Danh sách khách hàng VIP -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <h3 class="card-title">
                        <i class="bi bi-star-fill text-warning mr-2"></i>
                        Top 10 Khách Hàng VIP
                      </h3>
                      <div>
                        <button type="button" class="btn btn-sm btn-outline-primary">
                          <i class="bi bi-funnel"></i> Lọc
                        </button>
                        <button type="button" class="btn btn-sm btn-primary">
                          <i class="bi bi-plus-circle"></i> Thêm khách hàng
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                      <thead class="bg-light">
                        <tr>
                          <th>STT</th>
                          <th>ID</th>
                          <th>Tên khách hàng</th>
                          <th>Email</th>
                          <th>Điện thoại</th>
                          <th class="text-right">Tổng chi tiêu</th>
                          <th class="text-center">Đơn hàng</th>
                          <th class="text-center">Hạng</th>
                          <th class="text-center">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>1</strong></td>
                          <td><span class="badge badge-light">#KH00156</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Nguyễn Văn Minh</strong>
                            </div>
                          </td>
                          <td><small>minh.nguyen@techcorp.vn</small></td>
                          <td><small>0901234567</small></td>
                          <td class="text-right"><span class="text-success"><strong>485 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">142</span></td>
                          <td class="text-center"><span class="badge badge-warning"><i class="bi bi-star-fill"></i> Diamond</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>2</strong></td>
                          <td><span class="badge badge-light">#KH00089</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Trần Thị Hương</strong>
                            </div>
                          </td>
                          <td><small>huong.tran@bizgroup.com</small></td>
                          <td><small>0912345678</small></td>
                          <td class="text-right"><span class="text-success"><strong>428 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">118</span></td>
                          <td class="text-center"><span class="badge badge-warning"><i class="bi bi-star-fill"></i> Diamond</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>3</strong></td>
                          <td><span class="badge badge-light">#KH00234</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Lê Hoàng Nam</strong>
                            </div>
                          </td>
                          <td><small>nam.le.hoang@gmail.com</small></td>
                          <td><small>0923456789</small></td>
                          <td class="text-right"><span class="text-success"><strong>375 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">96</span></td>
                          <td class="text-center"><span class="badge badge-info"><i class="bi bi-star"></i> Platinum</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>4</strong></td>
                          <td><span class="badge badge-light">#KH00512</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Phạm Minh Châu</strong>
                            </div>
                          </td>
                          <td><small>chau.pham@outlook.com</small></td>
                          <td><small>0934567890</small></td>
                          <td class="text-right"><span class="text-success"><strong>328 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">84</span></td>
                          <td class="text-center"><span class="badge badge-info"><i class="bi bi-star"></i> Platinum</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>5</strong></td>
                          <td><span class="badge badge-light">#KH00678</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Võ Thành Đạt</strong>
                            </div>
                          </td>
                          <td><small>dat.vo@techsolutions.vn</small></td>
                          <td><small>0945678901</small></td>
                          <td class="text-right"><span class="text-success"><strong>295 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">72</span></td>
                          <td class="text-center"><span class="badge badge-info"><i class="bi bi-star"></i> Platinum</span></td>
                          <td class="text-center"><span class="badge badge-warning">Chưa hoạt động 30 ngày</span></td>
                        </tr>
                        <tr>
                          <td><strong>6</strong></td>
                          <td><span class="badge badge-light">#KH00891</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Đặng Thị Mai</strong>
                            </div>
                          </td>
                          <td><small>mai.dang@gmail.com</small></td>
                          <td><small>0956789012</small></td>
                          <td class="text-right"><span class="text-success"><strong>268 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">65</span></td>
                          <td class="text-center"><span class="badge badge-primary"><i class="bi bi-star"></i> Gold</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>7</strong></td>
                          <td><span class="badge badge-light">#KH01023</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Bùi Quang Huy</strong>
                            </div>
                          </td>
                          <td><small>huy.bui@startup.io</small></td>
                          <td><small>0967890123</small></td>
                          <td class="text-right"><span class="text-success"><strong>242 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">58</span></td>
                          <td class="text-center"><span class="badge badge-primary"><i class="bi bi-star"></i> Gold</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>8</strong></td>
                          <td><span class="badge badge-light">#KH01156</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Hoàng Thu Thảo</strong>
                            </div>
                          </td>
                          <td><small>thao.hoang@company.vn</small></td>
                          <td><small>0978901234</small></td>
                          <td class="text-right"><span class="text-success"><strong>215 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">51</span></td>
                          <td class="text-center"><span class="badge badge-primary"><i class="bi bi-star"></i> Gold</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>9</strong></td>
                          <td><span class="badge badge-light">#KH01289</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Dương Văn Long</strong>
                            </div>
                          </td>
                          <td><small>long.duong@enterprise.com</small></td>
                          <td><small>0989012345</small></td>
                          <td class="text-right"><span class="text-success"><strong>188 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">45</span></td>
                          <td class="text-center"><span class="badge badge-secondary"><i class="bi bi-star"></i> Silver</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                        <tr>
                          <td><strong>10</strong></td>
                          <td><span class="badge badge-light">#KH01445</span></td>
                          <td>
                            <div class="d-flex align-items-center">
                              <i class="bi bi-person-circle text-primary mr-2" style="font-size: 1.5rem;"></i>
                              <strong>Trương Thị Lan</strong>
                            </div>
                          </td>
                          <td><small>lan.truong@yahoo.com</small></td>
                          <td><small>0990123456</small></td>
                          <td class="text-right"><span class="text-success"><strong>165 triệu</strong></span></td>
                          <td class="text-center"><span class="badge badge-info">39</span></td>
                          <td class="text-center"><span class="badge badge-secondary"><i class="bi bi-star"></i> Silver</span></td>
                          <td class="text-center"><span class="badge badge-success">Hoạt động</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer clearfix">
                    <ul class="pagination pagination-sm m-0 float-end">
                      <li class="page-item"><a class="page-link" href="#">«</a></li>
                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">»</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;
    },

    init() {
      // Khởi tạo customers page khi được load
      if (typeof initCustomersPage === 'function') {
        initCustomersPage();
      }
    }
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
              <div class="col-sm-6">
                <div class="float-sm-right">
                  <select id="location-selector" class="form-control location-filter" style="width: auto; display: inline-block; min-width: 200px;">
                    <option value="">Tất cả cơ sở (Tổng hợp)</option>
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

            <!-- Thống kê sản phẩm -->
            <div class="row">
              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-primary elevation-1">
                    <i class="bi bi-box-seam"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Doanh số sản phẩm</span>
                    <span class="info-box-number" id="kpi-total-sales">
                      2.55 tỷ
                      <small class="trend-up">
                        <i class="bi bi-arrow-up"></i> <span id="kpi-sales-growth">12.3%</span>
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-success elevation-1">
                    <i class="bi bi-check-circle"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Sản phẩm bán chạy</span>
                    <span class="info-box-number" id="kpi-best-seller">
                      iPhone 15 Pro Max
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-info elevation-1">
                    <i class="bi bi-bar-chart"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Danh mục hàng đầu</span>
                    <span class="info-box-number" id="kpi-top-category">
                      Điện tử
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-6">
                <div class="info-box">
                  <span class="info-box-icon bg-gradient-warning elevation-1">
                    <i class="bi bi-exclamation-triangle"></i>
                  </span>
                  <div class="info-box-content">
                    <span class="info-box-text">Cảnh báo tồn kho</span>
                    <span class="info-box-number" id="kpi-alerts">
                      <small class="text-warning">
                        <span id="alert-count">12</span> sản phẩm
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Biểu đồ -->
            <div class="row">
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-graph-up mr-2"></i>
                      <span id="sales-trend-title">Xu hướng doanh số sản phẩm (Tổng hợp)</span>
                    </h3>
                  </div>
                  <div class="card-body">
                    <div id="sales-trend-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header border-0">
                    <h3 class="card-title">
                      <i class="bi bi-pie-chart mr-2"></i>
                      Doanh số theo danh mục
                    </h3>
                  </div>
                  <div class="card-body">
                    <div id="category-sales-chart" style="height: 350px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Danh sách sản phẩm -->
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Danh sách sản phẩm bán chạy</h3>
                    <div class="card-tools">
                      <div class="input-group input-group-sm" style="width: 250px;">
                        <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm..." />
                        <div class="input-group-append">
                          <button type="submit" class="btn btn-default">
                            <i class="bi bi-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên sản phẩm</th>
                          <th>Danh mục</th>
                          <th>Giá bán</th>
                          <th class="text-center">Đã bán</th>
                          <th class="text-right">Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody id="products-table-body">
                        <!-- Sẽ được populate bằng JavaScript -->
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer clearfix">
                    <button type="button" class="btn btn-sm btn-primary float-end">
                      <i class="bi bi-plus-circle"></i> Thêm sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cảnh báo tồn kho -->
            <div class="row">
              <div class="col-md-6">
                <div class="card card-warning">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="bi bi-exclamation-triangle mr-1"></i>
                      Cảnh báo quan trọng
                    </h3>
                    <div class="card-tools">
                      <button type="button" class="btn btn-sm btn-warning" onclick="viewAllAlerts('warning')">
                        <i class="bi bi-eye"></i> Xem đầy đủ
                      </button>
                    </div>
                  </div>
                  <div class="card-body p-0" id="warning-alerts-container" style="max-height: 400px; overflow-y: auto;">
                    <!-- Sẽ được populate bằng JavaScript -->
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="bi bi-x-circle mr-1"></i>
                      Cảnh báo khẩn cấp
                    </h3>
                    <div class="card-tools">
                      <button type="button" class="btn btn-sm btn-danger" onclick="viewAllAlerts('danger')">
                        <i class="bi bi-eye"></i> Xem đầy đủ
                      </button>
                    </div>
                  </div>
                  <div class="card-body p-0" id="danger-alerts-container" style="max-height: 400px; overflow-y: auto;">
                    <!-- Sẽ được populate bằng JavaScript -->
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      `;
    },

    init() {
      // Khởi tạo products page khi được load
      if (typeof initProductsPage === 'function') {
        initProductsPage();
      }
    }
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
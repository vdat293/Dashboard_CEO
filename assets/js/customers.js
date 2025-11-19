/**
 * CUSTOMERS PAGE - Trang quản lý khách hàng
 * Khởi tạo charts và logic cho trang customers
 */

// State management
let customersState = {
  currentLocation: '',
  charts: {
    customerTrend: null,
    distribution: null,
    customersOrders: null,
    segment: null
  }
};

/**
 * Hàm khởi tạo trang customers
 * Được gọi khi route customers được load
 */
function initCustomersPage() {
  // Populate location selector dựa trên quyền user
  populateLocationSelector('location-selector');

  // Khởi tạo charts
  initCustomerCharts();

  // Load data ban đầu
  updateCustomerDashboard();

  // Event listeners
  const locationSelector = document.getElementById('location-selector');
  if (locationSelector) {
    locationSelector.addEventListener('change', function() {
      customersState.currentLocation = this.value;
      updateCustomerDashboard();
    });
  }
}

/**
 * Khởi tạo tất cả charts
 */
function initCustomerCharts() {
  // Customer trend chart - Combo Chart (Column + Line)
  customersState.charts.customerTrend = new ApexCharts(document.querySelector('#customer-trend-chart'), {
    series: [],
    chart: {
      height: 400,
      type: 'line',
      toolbar: { show: true },
      zoom: { enabled: true }
    },
    colors: ['#28a745', '#007bff'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [0, 3] // 0 for column, 3 for line
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: monthLabelsShort,
      title: { text: 'Tháng' }
    },
    yaxis: [{
      title: { text: 'Doanh thu (triệu VNĐ)' },
      labels: {
        formatter: val => formatNumber(val)
      }
    }, {
      opposite: true,
      title: { text: 'Số khách hàng mới' },
      labels: {
        formatter: val => formatNumber(val)
      }
    }],
    tooltip: {
      shared: true,
      intersect: false,
      y: [{
        formatter: val => formatChartValue(val)
      }, {
        formatter: val => formatNumber(val) + ' khách hàng'
      }]
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  });
  customersState.charts.customerTrend.render();

  // Distribution chart
  customersState.charts.distribution = new ApexCharts(document.querySelector('#customer-distribution-chart'), {
    series: [],
    chart: { type: 'donut', height: 400 },
    labels: [],
    colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#6f42c1', '#fd7e14', '#20c997'],
    legend: { position: 'bottom' },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng',
              formatter: (w) => {
                const total = sumArray(w.globals.seriesTotals);
                return formatNumber(total);
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: val => formatNumber(val) + ' khách hàng'
      }
    }
  });
  customersState.charts.distribution.render();

  // Customers & Orders chart
  customersState.charts.customersOrders = new ApexCharts(document.querySelector('#customers-orders-chart'), {
    series: [],
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false }
    },
    colors: ['#007bff', '#28a745'],
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 5 },
    xaxis: { categories: monthLabelsShort },
    yaxis: [{
      title: { text: 'Khách hàng' },
      labels: {
        formatter: val => formatNumber(val)
      }
    }, {
      opposite: true,
      title: { text: 'Đơn hàng' },
      labels: {
        formatter: val => formatNumber(val)
      }
    }],
    tooltip: {
      y: {
        formatter: val => formatNumber(val)
      }
    },
    legend: { position: 'top' }
  });
  customersState.charts.customersOrders.render();

  // Marketing ROI chart (horizontal bar)
  customersState.charts.segment = new ApexCharts(document.querySelector('#customer-segment-chart'), {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: { show: false }
  });
  customersState.charts.segment.render();
}

/**
 * Cập nhật toàn bộ dashboard
 */
function updateCustomerDashboard() {
  updateCustomerKPIs();
  updateCustomerTrendChart();
  updateCustomerDistributionChart();
  updateCustomersOrdersChart();
  updateCustomerSegmentChart();
}

/**
 * Cập nhật KPIs
 */
function updateCustomerKPIs() {
  const currentMonth = getCurrentMonth();
  let data, title;

  if (customersState.currentLocation === '') {
    // All locations - use aggregated data filtered by permission
    data = getAggregatedData(locationData);

    // Get user to determine title
    const user = getCurrentUser();
    const authorizedLocations = getAuthorizedLocations();
    if (authorizedLocations.length === 1) {
      const loc = locations.find(l => l.id === authorizedLocations[0]);
      title = loc ? loc.name : 'Tất cả cơ sở';
    } else {
      title = 'Tất cả cơ sở';
    }
  } else {
    // Single location
    data = locationData[customersState.currentLocation];
    const loc = locations.find(l => l.id === customersState.currentLocation);
    title = loc ? loc.name : customersState.currentLocation;
  }

  // Calculate totals
  const monthlyNewCustomers = data.newCustomers[currentMonth];
  const totalCumulativeCustomers = data.cumulativeCustomers[currentMonth]; // Tổng KH tích lũy đến tháng hiện tại
  const monthlyOrders = data.orders[currentMonth];
  const monthlyCustomers = data.customers[currentMonth];
  const ordersPerCustomer = monthlyOrders / monthlyCustomers;

  // YoY growth for new customers
  const lastYearData = customersState.currentLocation === '' ? businessDataByMonth[2024] : null;
  let yoyGrowth = 0;
  if (lastYearData) {
    const lastYearNewCustomers = lastYearData.newCustomers[currentMonth];
    yoyGrowth = ((monthlyNewCustomers - lastYearNewCustomers) / lastYearNewCustomers * 100);
  } else {
    yoyGrowth = 4.8; // Default for single location
  }

  // VIP customers (estimated 0.5% of cumulative total - more realistic)
  const vipCustomers = Math.round(totalCumulativeCustomers * 0.005);

  // Update KPIs
  const kpiNewCustomers = document.getElementById('kpi-new-customers');
  if (kpiNewCustomers) {
    kpiNewCustomers.innerHTML = `
      ${monthlyNewCustomers.toLocaleString()}
      <small class="${yoyGrowth >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${yoyGrowth >= 0 ? 'up' : 'down'}"></i> ${Math.abs(yoyGrowth).toFixed(1)}%
      </small>
    `;
  }

  const kpiTotalCustomers = document.getElementById('kpi-total-customers');
  if (kpiTotalCustomers) {
    kpiTotalCustomers.textContent = totalCumulativeCustomers.toLocaleString();
  }

  const kpiVip = document.getElementById('kpi-vip');
  if (kpiVip) {
    kpiVip.textContent = vipCustomers.toLocaleString();
  }

  const kpiOrdersPerCustomer = document.getElementById('kpi-orders-per-customer');
  if (kpiOrdersPerCustomer) {
    kpiOrdersPerCustomer.textContent = ordersPerCustomer.toFixed(2);
  }

  // Update chart title
  const chartTitle = document.getElementById('chart-title');
  if (chartTitle) {
    chartTitle.textContent = `Phân tích xu hướng khách hàng (${title})`;
  }
}

/**
 * Cập nhật customer trend chart - Combo Chart (Revenue + New Customers)
 */
function updateCustomerTrendChart() {
  let series = [];

  if (customersState.currentLocation === '') {
    // All locations - use aggregated data filtered by permission
    const aggregatedData = getAggregatedData(locationData);

    series = [
      {
        name: 'Doanh thu',
        type: 'column',
        data: aggregatedData.revenue
      },
      {
        name: 'Khách hàng mới',
        type: 'line',
        data: aggregatedData.newCustomers
      }
    ];
  } else {
    // Single location
    series = [
      {
        name: 'Doanh thu',
        type: 'column',
        data: locationData[customersState.currentLocation].revenue
      },
      {
        name: 'Khách hàng mới',
        type: 'line',
        data: locationData[customersState.currentLocation].newCustomers
      }
    ];
  }

  customersState.charts.customerTrend.updateSeries(series);
}

/**
 * Cập nhật distribution chart - Customer Acquisition Channels
 */
function updateCustomerDistributionChart() {
  // Hiển thị nguồn khách hàng theo kênh marketing
  const channels = customerAcquisitionChannels.channels.filter(ch => ch.id !== 'direct');
  const distribution = customerAcquisitionChannels.distribution;

  const labels = channels.map(ch => ch.name);
  const values = channels.map(ch => distribution[ch.id]);
  const colors = channels.map(ch => ch.color);

  customersState.charts.distribution.updateOptions({
    chart: { type: 'donut' },
    series: values,
    labels: labels,
    colors: colors,
    legend: {
      position: 'bottom',
      fontSize: '13px'
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng',
              formatter: () => '100%'
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => val + '%'
      }
    }
  });
}

/**
 * Cập nhật Customers & Orders chart - Marketing Trends (TikTok vs Facebook)
 */
function updateCustomersOrdersChart() {
  // Hiển thị xu hướng TikTok vs Facebook
  const series = [
    {
      name: 'TikTok Ads',
      data: tiktokGrowthByMonth,
      color: '#000000'
    },
    {
      name: 'Facebook Ads',
      data: facebookGrowthByMonth,
      color: '#1877f2'
    }
  ];

  customersState.charts.customersOrders.updateSeries(series);
}

/**
 * Cập nhật segment chart - Marketing ROI (LTV/CAC Ratio)
 */
function updateCustomerSegmentChart() {
  // Tính ROI cho mỗi kênh marketing (LTV/CAC)
  // ROI > 3 là tốt (LTV gấp 3 lần CAC)
  const channels = customerAcquisitionChannels.channels.filter(ch => ch.id !== 'direct');
  const ltv = customerAcquisitionChannels.ltv;
  const cac = customerAcquisitionChannels.cac;

  // Tính ROI ratio cho mỗi kênh (LTV/CAC)
  const roiData = channels.map(ch => {
    const ltvValue = ltv[ch.id];
    const cacValue = cac[ch.id] / 1000; // Convert từ nghìn VNĐ sang triệu VNĐ
    return cacValue > 0 ? (ltvValue / cacValue).toFixed(1) : 0;
  });

  const labels = channels.map(ch => ch.name);
  const colors = channels.map(ch => ch.color);

  customersState.charts.segment.updateOptions({
    chart: { type: 'bar', horizontal: true },
    series: [{
      name: 'ROI (LTV/CAC)',
      data: roiData.map(v => parseFloat(v))
    }],
    xaxis: {
      categories: labels,
      title: { text: 'ROI Ratio' }
    },
    yaxis: {
      title: { text: 'Kênh Marketing' }
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(1) + 'x',
      offsetX: 30,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(1) + 'x (LTV/CAC)',
        title: {
          formatter: () => 'ROI: '
        }
      }
    }
  });
}

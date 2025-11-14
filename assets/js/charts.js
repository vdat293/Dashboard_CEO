/**
 * CÁC HÀM TẠO BIỂU ĐỒ CHO DASHBOARD CEO
 * File này chứa các hàm khởi tạo và render biểu đồ
 * Sử dụng thư viện ApexCharts
 */

/**
 * Khởi tạo biểu đồ doanh thu theo tháng
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {Object} data - Dữ liệu doanh thu {months: [], values: []}
 */
function initRevenueChart(selector, data) {
  const options = {
    series: [
      {
        name: 'Doanh thu',
        data: data.values
      }
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#007bff'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    xaxis: {
      categories: data.months
    },
    yaxis: {
      labels: {
        formatter: function(value) {
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
    grid: {
      borderColor: '#f1f1f1',
    }
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();

  return chart;
}

/**
 * Khởi tạo biểu đồ tròn thị phần sản phẩm
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {Object} data - Dữ liệu sản phẩm {labels: [], values: [], colors: []}
 */
function initProductChart(selector, data) {
  const options = {
    series: data.values,
    chart: {
      type: 'donut',
      height: 300
    },
    labels: data.labels,
    colors: data.colors,
    legend: {
      position: 'bottom',
      fontSize: '14px'
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val.toFixed(1) + '%';
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return value + ' triệu VNĐ';
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng doanh thu',
              formatter: function(w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return total + ' triệu';
              }
            }
          }
        }
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();

  return chart;
}

/**
 * Khởi tạo sparkline chart (biểu đồ nhỏ trong bảng)
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {Array} data - Mảng dữ liệu số
 * @param {string} color - Màu của đường biểu đồ
 */
function createSparkline(selector, data, color) {
  const options = {
    series: [{ data: data }],
    chart: {
      type: 'line',
      width: 150,
      height: 30,
      sparkline: {
        enabled: true
      }
    },
    colors: [color],
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return 'Số lượng: ';
          }
        }
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();

  return chart;
}

/**
 * Khởi tạo tất cả các sparkline charts cho bảng sản phẩm
 * @param {Object} data - Object chứa dữ liệu cho từng sản phẩm
 */
function initAllSparklines(data) {
  // Màu cho từng sparkline (tương ứng với xu hướng)
  const colors = {
    product1: '#28a745', // Xanh lá - tăng
    product2: '#17a2b8', // Xanh dương - tăng
    product3: '#ffc107', // Vàng - tăng
    product4: '#dc3545', // Đỏ - giảm
    product5: '#28a745'  // Xanh lá - tăng
  };

  // Tạo sparkline cho từng sản phẩm
  Object.keys(data).forEach((key, index) => {
    const selector = `#sparkline-${index + 1}`;
    if (document.querySelector(selector)) {
      createSparkline(selector, data[key], colors[key]);
    }
  });
}

/**
 * Hàm helper để update biểu đồ với dữ liệu mới
 * @param {Object} chart - Instance của ApexCharts
 * @param {Array} newData - Dữ liệu mới
 */
function updateChartData(chart, newData) {
  chart.updateSeries([{
    data: newData
  }]);
}

/**
 * Hàm helper để destroy tất cả biểu đồ (dọn dẹp bộ nhớ)
 * @param {Array} charts - Mảng các chart instances
 */
function destroyAllCharts(charts) {
  charts.forEach(chart => {
    if (chart && chart.destroy) {
      chart.destroy();
    }
  });
}

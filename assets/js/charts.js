/**
 * CÁC HÀM TẠO BIỂU ĐỒ CHO DASHBOARD CEO
 * File này chứa các hàm khởi tạo và render biểu đồ
 * Sử dụng thư viện ApexCharts
 */

/**
 * Khởi tạo biểu đồ so sánh doanh thu giữa các cơ sở
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {Array} locations - Mảng thông tin các cơ sở
 * @param {Object} locationData - Dữ liệu chi tiết từng cơ sở
 */
function initLocationComparisonChart(selector, locations, locationData) {
  // Chuẩn bị series data cho từng cơ sở
  const series = locations.map(loc => ({
    name: loc.name,
    data: locationData[loc.id].revenue
  }));

  const options = {
    series: series,
    chart: {
      height: 400,
      type: 'line',
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: locations.map(loc => loc.color),
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
      position: 'top',
      horizontalAlign: 'center'
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
 * Khởi tạo biểu đồ cột so sánh doanh thu các cơ sở
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {Array} locations - Mảng thông tin các cơ sở
 * @param {Object} locationData - Dữ liệu chi tiết từng cơ sở
 */
function initLocationBarChart(selector, locations, locationData) {
  // Tính tổng doanh thu từng cơ sở
  const totals = locations.map(loc => {
    return locationData[loc.id].revenue.reduce((a, b) => a + b, 0);
  });

  const options = {
    series: [{
      name: 'Doanh thu năm 2025',
      data: totals
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
      events: {
        dataPointSelection: function(event, chartContext, config) {
          // Lấy index của cột được click
          const locationIndex = config.dataPointIndex;
          const locationId = locations[locationIndex].id;

          // Gọi hàm hiển thị chi tiết (hàm này được định nghĩa trong main.js)
          if (typeof showLocationDetail === 'function') {
            showLocationDetail(locationId);
          }
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return (val / 1000).toFixed(1) + ' tỷ';
      },
      offsetY: -20,
      style: {
        fontSize: '11px',
        colors: ["#304758"],
        fontWeight: 'bold'
      }
    },
    xaxis: {
      categories: locations.map(loc => loc.name),
      position: 'bottom',
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return (value / 1000).toFixed(1) + ' tỷ';
        }
      }
    },
    colors: locations.map(loc => loc.color),
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return (val / 1000).toFixed(2) + ' tỷ VNĐ';
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.15,
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.2,
        }
      }
    }
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();

  return chart;
}

/**
 * Khởi tạo biểu đồ so sánh sản phẩm của một cơ sở
 * @param {string} selector - CSS selector của element chứa biểu đồ
 * @param {string} locationId - ID của cơ sở
 * @param {Object} productsByLocation - Dữ liệu sản phẩm theo cơ sở
 */
function initLocationProductComparisonChart(selector, locationId, productsByLocation) {
  const locationProducts = productsByLocation[locationId];
  if (!locationProducts) {
    console.error('Không tìm thấy dữ liệu sản phẩm cho cơ sở:', locationId);
    return null;
  }

  const topProducts = locationProducts.topProducts;

  // Chuẩn bị dữ liệu cho biểu đồ
  const series = [{
    name: 'Doanh thu',
    data: topProducts.map(p => (p.revenue / 1000000).toFixed(0)) // Chuyển sang triệu
  }];

  const options = {
    series: series,
    chart: {
      height: 400,
      type: 'bar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        dataLabels: {
          position: 'right'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val + ' triệu';
      },
      offsetX: 30,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    xaxis: {
      categories: topProducts.map(p => p.name),
      labels: {
        formatter: function(value) {
          return value + ' triệu';
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    colors: ['#007bff'],
    tooltip: {
      y: {
        formatter: function(value) {
          return value + ' triệu VNĐ';
        }
      }
    },
    grid: {
      borderColor: '#f1f1f1'
    }
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();

  return chart;
}

/**
 * REVENUE PAGE - Trang quản lý doanh thu
 * Khởi tạo charts và logic cho trang revenue
 */

// State management
let revenueState = {
  currentLocation: '',
  showYearComparison: false,
  charts: {
    revenueTrend: null,
    distribution: null,
    revenueExpenseProfit: null,
    profitMargin: null
  }
};

/**
 * Hàm khởi tạo trang revenue
 * Được gọi khi route revenue được load
 */
function initRevenuePage() {
  // Khởi tạo charts
  initRevenueCharts();

  // Load data ban đầu
  updateRevenueDashboard();

  // Event listeners
  const locationSelector = document.getElementById('location-selector');
  if (locationSelector) {
    locationSelector.addEventListener('change', function() {
      revenueState.currentLocation = this.value;
      updateRevenueDashboard();
    });
  }

  const btnCompareYears = document.getElementById('btn-compare-years');
  if (btnCompareYears) {
    btnCompareYears.addEventListener('click', function() {
      revenueState.showYearComparison = !revenueState.showYearComparison;
      updateRevenueTrendChart();
      this.classList.toggle('btn-primary');
      this.classList.toggle('btn-outline-primary');

      // Update button text
      const icon = this.querySelector('i');
      const text = this.querySelector('span');
      if (revenueState.showYearComparison) {
        icon.classList.remove('bi-calendar3-range');
        icon.classList.add('bi-calendar-check');
        if (text) text.textContent = ' Đang so sánh 3 năm';
      } else {
        icon.classList.remove('bi-calendar-check');
        icon.classList.add('bi-calendar3-range');
        if (text) text.textContent = ' So sánh năm';
      }
    });
  }
}

/**
 * Khởi tạo tất cả charts
 */
function initRevenueCharts() {
  // Revenue trend chart
  revenueState.charts.revenueTrend = new ApexCharts(document.querySelector('#revenue-trend-chart'), {
    series: [],
    chart: {
      height: 400,
      type: 'bar',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    colors: ['#007bff', '#28a745', '#ffc107'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: val => formatChartAxisValue(val),
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ['#304758'],
        fontWeight: 600
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: monthLabelsShort,
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: val => formatChartAxisValue(val),
        style: {
          fontSize: '11px'
        }
      }
    },
    fill: {
      opacity: 0.95
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: val => formatChartValue(val)
      }
    },
    legend: {
      position: 'top',
      fontSize: '13px',
      fontWeight: 600,
      markers: {
        width: 12,
        height: 12,
        radius: 3
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        }
      }
    }]
  });
  revenueState.charts.revenueTrend.render();

  // Distribution chart (Donut for overall, Bar for single location)
  revenueState.charts.distribution = new ApexCharts(document.querySelector('#revenue-distribution-chart'), {
    series: [],
    chart: {
      type: 'donut',
      height: 400,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      }
    },
    labels: [],
    colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#6f42c1', '#fd7e14', '#20c997'],
    legend: {
      position: 'bottom',
      fontSize: '12px',
      markers: {
        width: 10,
        height: 10,
        radius: 2
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              fontSize: '14px',
              fontWeight: 600
            },
            value: {
              fontSize: '20px',
              fontWeight: 700,
              formatter: val => formatChartAxisValue(val)
            },
            total: {
              show: true,
              label: 'Tổng',
              fontSize: '14px',
              fontWeight: 600,
              formatter: (w) => {
                const total = sumArray(w.globals.seriesTotals);
                return formatChartAxisValue(total, 2);
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: val => formatChartAxisValue(val, 2) + ' VNĐ'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 320
        },
        legend: {
          position: 'bottom',
          fontSize: '11px'
        }
      }
    }]
  });
  revenueState.charts.distribution.render();

  // Revenue-Expense-Profit comparison chart
  revenueState.charts.revenueExpenseProfit = new ApexCharts(document.querySelector('#revenue-expense-profit-chart'), {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ['#007bff', '#dc3545', '#28a745'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 6,
        dataLabels: { position: 'top' }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: val => formatChartAxisValue(val),
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ['#304758'],
        fontWeight: 600
      }
    },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: monthLabelsShort,
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: val => formatChartAxisValue(val),
        style: {
          fontSize: '11px'
        }
      }
    },
    fill: { opacity: 0.9 },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: val => formatChartValue(val)
      }
    },
    legend: {
      position: 'top',
      fontSize: '13px',
      fontWeight: 600
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        }
      }
    }]
  });
  revenueState.charts.revenueExpenseProfit.render();

  // Profit margin chart
  revenueState.charts.profitMargin = new ApexCharts(document.querySelector('#profit-margin-chart'), {
    series: [{
      name: 'Biên lợi nhuận',
      data: []
    }],
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ['#28a745'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: monthLabelsShort,
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: val => val.toFixed(1) + '%',
        style: {
          fontSize: '11px'
        }
      }
    },
    annotations: {
      yaxis: [{
        y: 0,
        borderColor: '#999',
        strokeDashArray: 4,
        label: {
          borderColor: '#999',
          style: {
            color: '#fff',
            background: '#999'
          },
          text: 'Hòa vốn'
        }
      }]
    },
    tooltip: {
      y: {
        formatter: val => val.toFixed(2) + '%'
      }
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 280
        }
      }
    }]
  });
  revenueState.charts.profitMargin.render();
}

/**
 * Update dashboard based on selected location
 */
function updateRevenueDashboard() {
  updateRevenueKPIs();
  updateRevenueTrendChart();
  updateRevenueDistributionChart();
  updateRevenueExpenseProfitChart();
  updateProfitMarginChart();
  updateRevenueTable();
}

/**
 * Update KPI boxes
 */
function updateRevenueKPIs() {
  const currentMonth = getCurrentMonth();
  let data, title;

  if (revenueState.currentLocation === '') {
    // All locations
    data = businessDataByMonth[2025];
    title = 'Tất cả cơ sở';
  } else {
    // Single location
    data = locationData[revenueState.currentLocation];
    const loc = locations.find(l => l.id === revenueState.currentLocation);
    title = loc.name;
  }

  // Calculate totals
  const monthlyRevenue = data.revenue[currentMonth];
  const yearlyRevenue = sumArray(data.revenue);
  const avgRevenue = yearlyRevenue / 12;

  // YoY growth
  const lastYearData = revenueState.currentLocation === '' ? businessDataByMonth[2024] : null;
  let yoyGrowth = 0;
  if (lastYearData) {
    const lastYearRevenue = lastYearData.revenue[currentMonth];
    yoyGrowth = ((monthlyRevenue - lastYearRevenue) / lastYearRevenue * 100);
  } else {
    yoyGrowth = 13.6; // Default for single location
  }

  // Update KPIs
  const kpiRevenue = document.getElementById('kpi-revenue');
  if (kpiRevenue) {
    kpiRevenue.innerHTML = `
      ${formatChartAxisValue(monthlyRevenue, 2)}
      <small class="${yoyGrowth >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${yoyGrowth >= 0 ? 'up' : 'down'}"></i> ${Math.abs(yoyGrowth).toFixed(1)}%
      </small>
    `;
  }

  const kpiYearly = document.getElementById('kpi-yearly');
  if (kpiYearly) {
    kpiYearly.textContent = formatChartAxisValue(yearlyRevenue, 2);
  }

  const kpiAverage = document.getElementById('kpi-average');
  if (kpiAverage) {
    kpiAverage.textContent = formatChartAxisValue(avgRevenue, 2);
  }

  const kpiYoy = document.getElementById('kpi-yoy');
  if (kpiYoy) {
    kpiYoy.innerHTML = `
      <small class="${yoyGrowth >= 0 ? 'trend-up' : 'trend-down'}">
        <i class="bi bi-arrow-${yoyGrowth >= 0 ? 'up' : 'down'}"></i> ${yoyGrowth >= 0 ? '+' : ''}${yoyGrowth.toFixed(1)}%
      </small>
    `;
  }

  // Update chart title
  const chartTitle = document.getElementById('chart-title');
  if (chartTitle) {
    chartTitle.textContent = `Doanh thu theo tháng (${title})`;
  }
}

/**
 * Update revenue trend chart
 */
function updateRevenueTrendChart() {
  let series = [];

  if (revenueState.currentLocation === '') {
    // All locations - show comparison with previous years
    if (revenueState.showYearComparison) {
      series = [
        { name: '2025', data: businessDataByMonth[2025].revenue },
        { name: '2024', data: businessDataByMonth[2024].revenue },
        { name: '2023', data: businessDataByMonth[2023].revenue }
      ];
    } else {
      series = [
        { name: '2025', data: businessDataByMonth[2025].revenue },
        { name: '2024', data: businessDataByMonth[2024].revenue }
      ];
    }
  } else {
    // Single location
    series = [
      { name: revenueState.currentLocation, data: locationData[revenueState.currentLocation].revenue }
    ];
  }

  revenueState.charts.revenueTrend.updateSeries(series);
}

/**
 * Update distribution chart
 */
function updateRevenueDistributionChart() {
  if (revenueState.currentLocation === '') {
    // Show all locations distribution (yearly total)
    const locationTotals = locations.map(loc => {
      return getTotalRevenue(locationData, loc.id);
    });
    const labels = locations.map(loc => loc.name);

    revenueState.charts.distribution.updateOptions({
      chart: {
        type: 'donut',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: locationTotals,
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                fontSize: '14px',
                fontWeight: 600
              },
              value: {
                fontSize: '20px',
                fontWeight: 700,
                formatter: val => formatChartAxisValue(val)
              },
              total: {
                show: true,
                label: 'Tổng',
                fontSize: '14px',
                fontWeight: 600,
                formatter: (w) => {
                  const total = sumArray(w.globals.seriesTotals);
                  return formatChartAxisValue(total, 2);
                }
              }
            }
          }
        }
      }
    });
  } else {
    // Show monthly distribution for single location (as bar chart)
    const data = locationData[revenueState.currentLocation].revenue;

    revenueState.charts.distribution.updateOptions({
      chart: {
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [{
        name: 'Doanh thu',
        data: data
      }],
      labels: monthLabelsShort,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 6,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: val => formatChartAxisValue(val),
        offsetY: -20,
        style: {
          fontSize: '10px',
          colors: ['#304758'],
          fontWeight: 600
        }
      },
      xaxis: {
        categories: monthLabelsShort,
        labels: {
          style: {
            fontSize: '11px'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: val => formatChartAxisValue(val),
          style: {
            fontSize: '11px'
          }
        }
      }
    });
  }
}

/**
 * Update Revenue-Expense-Profit chart
 */
function updateRevenueExpenseProfitChart() {
  let data;

  if (revenueState.currentLocation === '') {
    data = businessDataByMonth[2025];
  } else {
    data = locationData[revenueState.currentLocation];
  }

  const series = [
    { name: 'Doanh thu', data: data.revenue },
    { name: 'Chi phí', data: data.expenses },
    { name: 'Lợi nhuận', data: data.profit }
  ];

  revenueState.charts.revenueExpenseProfit.updateSeries(series);
}

/**
 * Update Profit Margin chart
 */
function updateProfitMarginChart() {
  let data;

  if (revenueState.currentLocation === '') {
    data = businessDataByMonth[2025];
  } else {
    data = locationData[revenueState.currentLocation];
  }

  // Calculate profit margin for each month
  const profitMargins = data.revenue.map((rev, idx) => {
    return (data.profit[idx] / rev * 100);
  });

  revenueState.charts.profitMargin.updateSeries([{
    name: 'Biên lợi nhuận',
    data: profitMargins
  }]);
}

/**
 * Update table
 */
function updateRevenueTable() {
  const tableBody = document.getElementById('revenue-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  let data2025, data2024;

  if (revenueState.currentLocation === '') {
    data2025 = businessDataByMonth[2025];
    data2024 = businessDataByMonth[2024];
  } else {
    data2025 = locationData[revenueState.currentLocation];
    // For single location, we don't have 2024 data, so use estimate
    data2024 = {
      revenue: data2025.revenue.map(r => r * 0.952), // Assume ~5% growth from 2024
      expenses: data2025.expenses.map(e => e * 0.952),
      profit: data2025.profit.map(p => p * 0.952)
    };
  }

  // Iterate through months in reverse (December to January)
  for (let i = 11; i >= 0; i--) {
    const revenue = data2025.revenue[i];
    const expenses = data2025.expenses[i];
    const profit = data2025.profit[i];
    const profitMargin = ((profit / revenue) * 100);

    // Calculate YoY growth
    const revenueLastYear = data2024.revenue[i];
    const yoyGrowth = (((revenue - revenueLastYear) / revenueLastYear) * 100);

    // Determine status
    let status, statusClass;
    if (profit > 0 && yoyGrowth >= 10) {
      status = 'Xuất sắc';
      statusClass = 'success';
    } else if (profit > 0 && yoyGrowth >= 0) {
      status = 'Tốt';
      statusClass = 'info';
    } else if (profit > 0) {
      status = 'Trung bình';
      statusClass = 'warning';
    } else {
      status = 'Cần cải thiện';
      statusClass = 'danger';
    }

    const badgeClass = yoyGrowth >= 0 ? 'success' : 'danger';
    const growthSign = yoyGrowth >= 0 ? '+' : '';
    const profitClass = profit >= 0 ? 'text-success' : 'text-danger';

    const row = `
      <tr>
        <td><strong>Tháng ${i + 1}/2025</strong></td>
        <td class="text-right"><strong>${formatChartAxisValue(revenue, 2)}</strong></td>
        <td class="text-right">${formatChartAxisValue(expenses, 2)}</td>
        <td class="text-right ${profitClass}"><strong>${profit >= 0 ? formatChartAxisValue(profit, 2) : '(' + formatChartAxisValue(Math.abs(profit), 2) + ')'}</strong></td>
        <td class="text-center"><span class="badge badge-${profit >= 0 ? 'success' : 'danger'}">${profitMargin.toFixed(1)}%</span></td>
        <td class="text-center"><span class="badge badge-${badgeClass}">${growthSign}${yoyGrowth.toFixed(1)}%</span></td>
        <td class="text-center"><span class="badge badge-${statusClass}">${status}</span></td>
      </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', row);
  }
}

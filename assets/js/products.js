/**
 * PRODUCTS PAGE - Trang quản lý sản phẩm
 * Khởi tạo charts và logic cho trang products
 */

// State management
let productsState = {
  currentLocation: '',
  charts: {
    salesTrend: null,
    categorySales: null
  }
};

/**
 * Hàm khởi tạo trang products
 * Được gọi khi route products được load
 */
function initProductsPage() {
  // Khởi tạo charts
  initProductCharts();

  // Load data ban đầu
  updateProductsDashboard();

  // Event listeners
  const locationSelector = document.getElementById('location-selector');
  if (locationSelector) {
    locationSelector.addEventListener('change', function() {
      productsState.currentLocation = this.value;
      updateProductsDashboard();
    });
  }
}

/**
 * Khởi tạo tất cả charts
 */
function initProductCharts() {
  // Sales trend chart (area chart by categories)
  productsState.charts.salesTrend = new ApexCharts(document.querySelector('#sales-trend-chart'), {
    series: [],
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
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
    colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#6f42c1', '#fd7e14'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: monthLabelsShort,
      labels: {
        style: { fontSize: '11px' }
      }
    },
    yaxis: {
      title: { text: 'Doanh số (triệu VNĐ)' },
      labels: {
        formatter: val => val.toFixed(0),
        style: { fontSize: '11px' }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
      fontWeight: 600
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: val => val.toFixed(0) + ' triệu VNĐ'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 280 },
        dataLabels: { enabled: false },
        legend: {
          position: 'bottom',
          fontSize: '11px'
        }
      }
    }]
  });
  productsState.charts.salesTrend.render();

  // Category sales chart (donut or bar)
  productsState.charts.categorySales = new ApexCharts(document.querySelector('#category-sales-chart'), {
    series: [],
    chart: {
      type: 'donut',
      height: 350,
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
    colors: ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#6f42c1', '#fd7e14'],
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
              fontSize: '18px',
              fontWeight: 700,
              formatter: val => val + ' tr'
            },
            total: {
              show: true,
              label: 'Tổng',
              fontSize: '14px',
              fontWeight: 600,
              formatter: (w) => {
                const total = sumArray(w.globals.seriesTotals);
                return total.toFixed(0) + ' tr';
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: val => val + ' triệu VNĐ'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 300 },
        legend: {
          position: 'bottom',
          fontSize: '11px'
        }
      }
    }]
  });
  productsState.charts.categorySales.render();
}

/**
 * Update dashboard based on selected location
 */
function updateProductsDashboard() {
  updateProductsKPIs();
  updateSalesTrendChart();
  updateCategorySalesChart();
  updateProductsTable();
  updateProductAlerts();
}

/**
 * Update KPI boxes
 */
function updateProductsKPIs() {
  let productData, title;

  if (productsState.currentLocation === '') {
    // Aggregate all locations
    productData = {
      categories: productsByLocation.HN.categories,
      sales: productsByLocation.HN.categories.map((cat, idx) => {
        return locations.reduce((sum, loc) => {
          return sum + (productsByLocation[loc.id].sales[idx] || 0);
        }, 0);
      }),
      topProducts: []
    };

    // Aggregate top products from all locations
    const allProducts = {};
    locations.forEach(loc => {
      productsByLocation[loc.id].topProducts.forEach(p => {
        if (!allProducts[p.name]) {
          allProducts[p.name] = { ...p };
        } else {
          allProducts[p.name].sold += p.sold;
          allProducts[p.name].revenue += p.revenue;
        }
      });
    });
    productData.topProducts = Object.values(allProducts).sort((a, b) => b.revenue - a.revenue);
    title = 'Tổng hợp';
  } else {
    productData = productsByLocation[productsState.currentLocation];
    const loc = locations.find(l => l.id === productsState.currentLocation);
    title = loc.name;
  }

  // Calculate KPIs
  const totalSales = sumArray(productData.sales);
  const bestSeller = productData.topProducts[0];
  const topCategory = productData.categories[productData.sales.indexOf(Math.max(...productData.sales))];

  // Get alerts count
  const alertsLoc = productsState.currentLocation === '' ? 'HN' : productsState.currentLocation;
  const alerts = notificationsByLocation[alertsLoc] || [];
  const alertCount = alerts.filter(a =>
    a.type === 'low_stock' || a.type === 'out_stock'
  ).length;

  // Update KPIs
  const kpiTotalSales = document.getElementById('kpi-total-sales');
  if (kpiTotalSales) {
    kpiTotalSales.innerHTML = `
      ${(totalSales / 1000).toFixed(2)} tỷ
      <small class="trend-up">
        <i class="bi bi-arrow-up"></i> <span>12.3%</span>
      </small>
    `;
  }

  const kpiBestSeller = document.getElementById('kpi-best-seller');
  if (kpiBestSeller) {
    kpiBestSeller.textContent = bestSeller ? bestSeller.name : 'N/A';
  }

  const kpiTopCategory = document.getElementById('kpi-top-category');
  if (kpiTopCategory) {
    kpiTopCategory.textContent = topCategory;
  }

  const alertCountElem = document.getElementById('alert-count');
  if (alertCountElem) {
    alertCountElem.textContent = alertCount;
  }

  // Update chart title
  const salesTrendTitle = document.getElementById('sales-trend-title');
  if (salesTrendTitle) {
    salesTrendTitle.textContent = `Xu hướng doanh số sản phẩm (${title})`;
  }
}

/**
 * Update sales trend chart
 */
function updateSalesTrendChart() {
  let series = [];

  if (productsState.currentLocation === '') {
    // Show all categories trend (aggregate from all locations)
    const categories = productsByLocation.HN.categories;
    series = categories.map(cat => {
      // Generate mock monthly data for each category
      const baseSales = locations.reduce((sum, loc) => {
        const idx = productsByLocation[loc.id].categories.indexOf(cat);
        return sum + (productsByLocation[loc.id].sales[idx] || 0);
      }, 0);

      // Create trend data (simulate monthly growth)
      const monthlyData = monthLabelsShort.map((_, monthIdx) => {
        const variance = (Math.random() * 0.2 - 0.1); // ±10% variance
        const trend = 1 + (monthIdx * 0.02); // 2% monthly growth
        return Math.round(baseSales / 12 * trend * (1 + variance));
      });

      return { name: cat, data: monthlyData };
    });
  } else {
    // Show categories trend for single location
    const categories = productsByLocation[productsState.currentLocation].categories;
    series = categories.map(cat => {
      const idx = productsByLocation[productsState.currentLocation].categories.indexOf(cat);
      const baseSales = productsByLocation[productsState.currentLocation].sales[idx];

      // Create trend data
      const monthlyData = monthLabelsShort.map((_, monthIdx) => {
        const variance = (Math.random() * 0.2 - 0.1);
        const trend = 1 + (monthIdx * 0.02);
        return Math.round(baseSales / 12 * trend * (1 + variance));
      });

      return { name: cat, data: monthlyData };
    });
  }

  productsState.charts.salesTrend.updateSeries(series);
}

/**
 * Update category sales chart
 */
function updateCategorySalesChart() {
  let productData;

  if (productsState.currentLocation === '') {
    // Aggregate all locations
    productData = {
      categories: productsByLocation.HN.categories,
      sales: productsByLocation.HN.categories.map((cat, idx) => {
        return locations.reduce((sum, loc) => {
          return sum + (productsByLocation[loc.id].sales[idx] || 0);
        }, 0);
      })
    };
  } else {
    productData = productsByLocation[productsState.currentLocation];
  }

  productsState.charts.categorySales.updateOptions({
    series: productData.sales,
    labels: productData.categories
  });
}

/**
 * Update products table
 */
function updateProductsTable() {
  const tableBody = document.getElementById('products-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  let products;

  if (productsState.currentLocation === '') {
    // Aggregate top products from all locations
    const allProducts = {};
    locations.forEach(loc => {
      productsByLocation[loc.id].topProducts.forEach(p => {
        if (!allProducts[p.name]) {
          allProducts[p.name] = { ...p };
        } else {
          allProducts[p.name].sold += p.sold;
          allProducts[p.name].revenue += p.revenue;
        }
      });
    });
    products = Object.values(allProducts).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
  } else {
    products = productsByLocation[productsState.currentLocation].topProducts;
  }

  // Render products
  products.forEach((product, idx) => {
    const icon = getProductIcon(product.category);
    const badgeColor = getCategoryBadgeColor(product.category);

    const row = `
      <tr>
        <td><strong>${idx + 1}</strong></td>
        <td>
          <i class="bi ${icon} text-${badgeColor} mr-2"></i>
          <strong>${product.name}</strong>
        </td>
        <td><span class="badge badge-${badgeColor}">${product.category}</span></td>
        <td>${formatCurrency(product.price)}</td>
        <td class="text-center"><strong>${product.sold}</strong></td>
        <td class="text-right text-success"><strong>${formatRevenueValue(product.revenue / 1000)}</strong></td>
      </tr>
    `;

    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

/**
 * Update alerts
 */
function updateProductAlerts() {
  const alertsLoc = productsState.currentLocation === '' ? 'HN' : productsState.currentLocation;
  const alerts = notificationsByLocation[alertsLoc] || [];

  // Phân loại alerts
  const warningAlerts = alerts.filter(a =>
    a.priority === 'high' || a.priority === 'medium' || a.type === 'low_stock' || a.type === 'return' || a.type === 'slow_moving'
  ).slice(0, 5);

  const dangerAlerts = alerts.filter(a =>
    a.priority === 'urgent' || a.type === 'out_stock' || a.type === 'defect'
  ).slice(0, 5);

  // Render warning alerts
  const warningContainer = document.getElementById('warning-alerts-container');
  if (warningContainer) {
    warningContainer.innerHTML = '<ul class="products-list product-list-in-card pl-2 pr-2">' +
      warningAlerts.map(alert => `
        <li class="item">
          <div class="product-img">
            <i class="bi ${alert.icon} text-${alert.color}" style="font-size: 2rem;"></i>
          </div>
          <div class="product-info">
            <a href="#" class="product-title">
              ${alert.product}
              <span class="badge badge-${alert.color} float-end">${alert.title}</span>
            </a>
            <span class="product-description">
              ${alert.detail}
              <br>
              <small class="text-muted"><i class="bi bi-clock"></i> ${alert.time}</small>
            </span>
          </div>
        </li>
      `).join('') +
      '</ul>';
  }

  // Render danger alerts
  const dangerContainer = document.getElementById('danger-alerts-container');
  if (dangerContainer) {
    dangerContainer.innerHTML = '<ul class="products-list product-list-in-card pl-2 pr-2">' +
      dangerAlerts.map(alert => `
        <li class="item">
          <div class="product-img">
            <i class="bi ${alert.icon} text-${alert.color}" style="font-size: 2rem;"></i>
          </div>
          <div class="product-info">
            <a href="#" class="product-title">
              ${alert.product}
              <span class="badge badge-${alert.color} float-end">${alert.title}</span>
            </a>
            <span class="product-description">
              ${alert.detail}
              <br>
              <small class="text-muted"><i class="bi bi-clock"></i> ${alert.time}</small>
            </span>
          </div>
        </li>
      `).join('') +
      '</ul>';
  }
}

/**
 * Helper function to get product icon
 */
function getProductIcon(category) {
  const icons = {
    'Điện tử': 'bi-laptop',
    'Thời trang': 'bi-bag',
    'Gia dụng': 'bi-house',
    'Thực phẩm': 'bi-cup-straw',
    'Mỹ phẩm': 'bi-heart',
    'Sách vở': 'bi-book'
  };
  return icons[category] || 'bi-box';
}

/**
 * Helper function to get category badge color
 */
function getCategoryBadgeColor(category) {
  const colors = {
    'Điện tử': 'primary',
    'Thời trang': 'success',
    'Gia dụng': 'info',
    'Thực phẩm': 'warning',
    'Mỹ phẩm': 'danger',
    'Sách vở': 'secondary'
  };
  return colors[category] || 'dark';
}

/**
 * Function to view all alerts (called from onclick in HTML)
 */
function viewAllAlerts(type) {
  const alertsLoc = productsState.currentLocation === '' ? 'HN' : productsState.currentLocation;
  const alerts = notificationsByLocation[alertsLoc] || [];

  let filteredAlerts;
  let modalTitle;

  if (type === 'warning') {
    filteredAlerts = alerts.filter(a =>
      a.priority === 'high' || a.priority === 'medium' || a.type === 'low_stock' || a.type === 'return' || a.type === 'slow_moving'
    );
    modalTitle = 'Tất cả cảnh báo quan trọng';
  } else {
    filteredAlerts = alerts.filter(a =>
      a.priority === 'urgent' || a.type === 'out_stock' || a.type === 'defect'
    );
    modalTitle = 'Tất cả cảnh báo khẩn cấp';
  }

  alert(`${modalTitle}\n\n${filteredAlerts.map((a, i) =>
    `${i+1}. ${a.product}\n   ${a.title}: ${a.detail}\n   Thời gian: ${a.time}`
  ).join('\n\n')}`);
}

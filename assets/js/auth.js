/**
 * AUTHENTICATION & AUTHORIZATION SYSTEM
 * Hệ thống đăng nhập và phân quyền mockup
 */

// Danh sách users mockup
const USERS = {
  // Chủ tịch - xem tất cả dữ liệu
  'ceo': {
    username: 'ceo',
    password: '123456',
    fullName: 'Nguyễn Vũ Đạt',
    role: 'ceo',
    title: 'Chủ tịch',
    locations: ['ALL'], // Xem tất cả cơ sở
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Vu+Dat&background=667eea&color=fff'
  },

  // Giám đốc Hà Nội
  'gd_hn': {
    username: 'gd_hn',
    password: '123456',
    fullName: 'Trần Văn Hùng',
    role: 'director',
    title: 'Giám đốc Hà Nội',
    locations: ['HN'],
    avatar: 'https://ui-avatars.com/api/?name=Tran+Van+Hung&background=007bff&color=fff'
  },

  // Giám đốc Hồ Chí Minh
  'gd_hcm': {
    username: 'gd_hcm',
    password: '123456',
    fullName: 'Lê Thị Mai',
    role: 'director',
    title: 'Giám đốc Hồ Chí Minh',
    locations: ['HCM'],
    avatar: 'https://ui-avatars.com/api/?name=Le+Thi+Mai&background=28a745&color=fff'
  },

  // Giám đốc Đà Nẵng
  'gd_dn': {
    username: 'gd_dn',
    password: '123456',
    fullName: 'Phạm Minh Tuấn',
    role: 'director',
    title: 'Giám đốc Đà Nẵng',
    locations: ['DN'],
    avatar: 'https://ui-avatars.com/api/?name=Pham+Minh+Tuan&background=17a2b8&color=fff'
  },

  // Giám đốc Hải Phòng
  'gd_hp': {
    username: 'gd_hp',
    password: '123456',
    fullName: 'Hoàng Văn Nam',
    role: 'director',
    title: 'Giám đốc Hải Phòng',
    locations: ['HP'],
    avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+Nam&background=ffc107&color=333'
  },

  // Giám đốc Cần Thơ
  'gd_ct': {
    username: 'gd_ct',
    password: '123456',
    fullName: 'Nguyễn Thị Lan',
    role: 'director',
    title: 'Giám đốc Cần Thơ',
    locations: ['CT'],
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Thi+Lan&background=6f42c1&color=fff'
  },

  // Giám đốc Nha Trang
  'gd_nt': {
    username: 'gd_nt',
    password: '123456',
    fullName: 'Võ Văn Hải',
    role: 'director',
    title: 'Giám đốc Nha Trang',
    locations: ['NT'],
    avatar: 'https://ui-avatars.com/api/?name=Vo+Van+Hai&background=fd7e14&color=fff'
  },

  // Giám đốc Vũng Tàu
  'gd_vt': {
    username: 'gd_vt',
    password: '123456',
    fullName: 'Đặng Thị Hoa',
    role: 'director',
    title: 'Giám đốc Vũng Tàu',
    locations: ['VT'],
    avatar: 'https://ui-avatars.com/api/?name=Dang+Thi+Hoa&background=20c997&color=fff'
  },

  // Kim - Trợ lý (giới hạn tại cơ sở Hà Nội)
  'kim': {
    username: 'kim',
    password: '123456',
    fullName: 'Kim',
    role: 'assistant',
    title: 'Trợ lý - Cơ sở Hà Nội',
    locations: ['HN'],
    avatar: 'https://ui-avatars.com/api/?name=Kim&background=e83e8c&color=fff'
  }
};

/**
 * Đăng nhập
 */
function login(username, password) {
  const user = USERS[username];

  if (!user) {
    return false;
  }

  if (user.password !== password) {
    return false;
  }

  // Lưu thông tin user vào localStorage
  const userData = {
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    title: user.title,
    locations: user.locations,
    avatar: user.avatar,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('currentUser', JSON.stringify(userData));
  localStorage.setItem('isLoggedIn', 'true');

  return true;
}

/**
 * Đăng xuất
 */
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');

  // Tính toán đúng path về index.html
  // Nếu đang ở trong thư mục pages/, cần dùng ../index.html
  // Nếu đang ở root, dùng index.html
  const currentPath = window.location.pathname;
  if (currentPath.includes('/pages/')) {
    window.location.href = '../index.html';
  } else {
    window.location.href = 'index.html';
  }
}

/**
 * Kiểm tra đã đăng nhập chưa
 */
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Lấy thông tin user hiện tại
 */
function getCurrentUser() {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) {
    return null;
  }
  return JSON.parse(userJson);
}

/**
 * Kiểm tra quyền xem cơ sở
 */
function canViewLocation(locationId) {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }

  // CEO có thể xem tất cả
  if (user.locations.includes('ALL')) {
    return true;
  }

  // Kiểm tra cơ sở cụ thể
  return user.locations.includes(locationId);
}

/**
 * Lấy danh sách cơ sở user có quyền xem
 */
function getAuthorizedLocations() {
  const user = getCurrentUser();
  if (!user) {
    return [];
  }

  // CEO xem tất cả
  if (user.locations.includes('ALL')) {
    return ['HN', 'HCM', 'DN', 'HP', 'CT', 'NT', 'VT'];
  }

  // Giám đốc/Trợ lý chỉ xem cơ sở của họ
  return user.locations;
}

/**
 * Filter dữ liệu theo quyền
 * @param {Object} locationData - Dữ liệu theo cơ sở từ data.js
 * @returns {Object} - Dữ liệu đã được filter
 */
function filterDataByPermission(locationData) {
  const authorizedLocations = getAuthorizedLocations();
  const filteredData = {};

  authorizedLocations.forEach(locId => {
    if (locationData[locId]) {
      filteredData[locId] = locationData[locId];
    }
  });

  return filteredData;
}

/**
 * Tính tổng dữ liệu của các cơ sở user có quyền xem
 */
function getAggregatedData(locationData) {
  const authorizedLocations = getAuthorizedLocations();
  const result = {
    revenue: Array(12).fill(0),
    expenses: Array(12).fill(0),
    profit: Array(12).fill(0),
    orders: Array(12).fill(0),
    customers: Array(12).fill(0),
    newCustomers: Array(12).fill(0),
    cumulativeCustomers: Array(12).fill(0),
    employees: 0
  };

  authorizedLocations.forEach(locId => {
    const data = locationData[locId];
    if (!data) return;

    for (let i = 0; i < 12; i++) {
      result.revenue[i] += data.revenue[i];
      result.expenses[i] += data.expenses[i];
      result.profit[i] += data.profit[i];
      result.orders[i] += data.orders[i];
      result.customers[i] += data.customers[i];
      result.newCustomers[i] += data.newCustomers[i];
      result.cumulativeCustomers[i] += data.cumulativeCustomers[i];
    }
    result.employees += data.employees;
  });

  return result;
}

/**
 * Kiểm tra authentication khi load trang
 */
function requireAuth() {
  if (!isLoggedIn()) {
    // Nếu không phải trang login thì chuyển về login
    if (!window.location.pathname.includes('index.html')) {
      window.location.href = 'index.html';
    }
    return false;
  }
  return true;
}

/**
 * Hiển thị thông tin user trên UI
 */
function displayUserInfo() {
  const user = getCurrentUser();
  if (!user) return;

  // Update user name and show after loading
  const userNameElements = document.querySelectorAll('.user-name, .username');
  userNameElements.forEach(el => {
    el.textContent = user.fullName;
    el.classList.add('loaded'); // Hiển thị với opacity: 1
  });

  // Update user title and show after loading
  const userTitleElements = document.querySelectorAll('.user-title');
  userTitleElements.forEach(el => {
    el.textContent = user.title;
    el.classList.add('loaded'); // Hiển thị với opacity: 1
  });

  // Update user avatar
  const userAvatarElements = document.querySelectorAll('.user-avatar');
  userAvatarElements.forEach(el => {
    el.src = user.avatar;
  });

  // Show location filter for CEO and reset value
  const locationFilters = document.querySelectorAll('.location-filter');
  if (user.role === 'ceo') {
    locationFilters.forEach(el => {
      el.style.display = 'block';
      // Reset location selector value to show "Tất cả cơ sở"
      if (el.tagName === 'SELECT') {
        el.value = '';
      }
    });
  } else {
    // Hide location filter for directors/assistants
    locationFilters.forEach(el => {
      el.style.display = 'none';
    });
  }

  // Show CEO-only menu items only for CEO
  const ceoOnlyElements = document.querySelectorAll('.ceo-only');
  if (user.role === 'ceo') {
    ceoOnlyElements.forEach(el => {
      el.style.display = '';
    });
  } else {
    // Ensure hidden for non-CEO (CSS already hides by default, but be explicit)
    ceoOnlyElements.forEach(el => {
      el.style.display = 'none';
    });
  }
}

// Export functions to window object for global access
window.login = login;
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.canViewLocation = canViewLocation;
window.getAuthorizedLocations = getAuthorizedLocations;
window.filterDataByPermission = filterDataByPermission;
window.getAggregatedData = getAggregatedData;
window.requireAuth = requireAuth;
window.displayUserInfo = displayUserInfo;

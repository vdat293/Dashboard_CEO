/**
 * ROUTER - Single Page Application Router
 * Xử lý routing cho ứng dụng SPA
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.init();
  }

  /**
   * Khởi tạo router
   */
  init() {
    // Lắng nghe sự kiện popstate (khi người dùng nhấn back/forward)
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Lắng nghe sự kiện DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
      this.handleRoute();
    });

    // Lắng nghe click vào các link nội bộ
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('data-route');
        this.navigate(path);
      }
    });
  }

  /**
   * Đăng ký route
   * @param {string} path - Đường dẫn
   * @param {object} config - Cấu hình route {title, render, beforeEnter, afterEnter}
   */
  register(path, config) {
    this.routes[path] = config;
  }

  /**
   * Điều hướng đến route mới
   * @param {string} path - Đường dẫn
   * @param {boolean} replace - Thay thế history thay vì push
   */
  navigate(path, replace = false) {
    if (replace) {
      window.history.replaceState({ path }, '', `#${path}`);
    } else {
      window.history.pushState({ path }, '', `#${path}`);
    }
    this.handleRoute();
  }

  /**
   * Xử lý route hiện tại
   */
  handleRoute() {
    // Lấy path từ hash
    let path = window.location.hash.slice(1) || '/';

    // Nếu không có hash, mặc định là /
    if (!path || path === '') {
      path = '/';
    }

    // Tìm route config
    const routeConfig = this.routes[path];

    if (!routeConfig) {
      console.warn(`Route not found: ${path}`);
      // Fallback to home
      this.navigate('/', true);
      return;
    }

    // Execute beforeEnter hook
    if (routeConfig.beforeEnter) {
      const canEnter = routeConfig.beforeEnter();
      if (canEnter === false) {
        return; // Prevent navigation
      }
    }

    // Update page title
    if (routeConfig.title) {
      document.title = `${routeConfig.title} | Dashboard CEO`;
    }

    // Update active menu item
    this.updateActiveMenu(path);

    // Render content
    if (routeConfig.render) {
      this.renderContent(routeConfig.render);
    }

    // Execute afterEnter hook
    if (routeConfig.afterEnter) {
      // Chờ một chút để DOM được render
      setTimeout(() => {
        routeConfig.afterEnter();
      }, 50);
    }

    // Update current route
    this.currentRoute = path;
  }

  /**
   * Render nội dung
   * @param {Function} renderFn - Hàm render trả về HTML string
   */
  renderContent(renderFn) {
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
      const html = renderFn();
      contentWrapper.innerHTML = html;

      // Scroll to top
      contentWrapper.scrollTop = 0;
    }
  }

  /**
   * Cập nhật menu item active
   * @param {string} path - Đường dẫn hiện tại
   */
  updateActiveMenu(path) {
    // Remove active class from all menu items
    document.querySelectorAll('.nav-sidebar .nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current menu item
    const activeLink = document.querySelector(`.nav-sidebar .nav-link[data-route="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  /**
   * Get current route path
   */
  getCurrentPath() {
    return this.currentRoute;
  }
}

// Export router instance
const router = new Router();

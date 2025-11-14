/**
 * CEO Dashboard Chatbot
 * Chatbot chào mừng và hỗ trợ điều hướng cho CEO Dashboard
 */

class CEOChatbot {
  constructor(options = {}) {
    this.userName = options.userName || 'Tổng giám đốc';
    this.isOpen = false;
    this.hasShownWelcome = false;
    this.container = null;
    this.messageHistory = [];

    // Quick action buttons
    this.quickActions = [
      { text: 'Xem doanh thu', page: 'pages/revenue.html', icon: 'bi-graph-up' },
      { text: 'Quản lý khách hàng', page: 'pages/customers.html', icon: 'bi-people' },
      { text: 'Sản phẩm', page: 'pages/products.html', icon: 'bi-box-seam' },
      { text: 'Báo cáo', page: 'pages/reports.html', icon: 'bi-file-text' }
    ];

    this.init();
  }

  init() {
    this.createChatbotWidget();
    this.attachEventListeners();

    // Show welcome message after a short delay
    setTimeout(() => {
      this.showWelcomeMessage();
    }, 1500);
  }

  createChatbotWidget() {
    // Create chatbot container
    const widget = document.createElement('div');
    widget.id = 'ceo-chatbot';
    widget.innerHTML = `
      <!-- Chatbot Toggle Button (floating button) -->
      <div class="chatbot-toggle-btn" id="chatbot-toggle">
        <i class="bi bi-chat-dots-fill"></i>
        <span class="chatbot-badge" id="chatbot-badge">1</span>
      </div>

      <!-- Chatbot Window -->
      <div class="chatbot-window" id="chatbot-window">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-content">
            <div class="chatbot-avatar">
              <i class="bi bi-robot"></i>
            </div>
            <div class="chatbot-title">
              <h4>Trợ lý CEO</h4>
              <span class="chatbot-status">Trực tuyến</span>
            </div>
          </div>
          <button class="chatbot-close" id="chatbot-close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="chatbot-messages" id="chatbot-messages">
          <!-- Messages will be inserted here -->
        </div>

        <!-- Quick Actions -->
        <div class="chatbot-quick-actions" id="chatbot-quick-actions">
          ${this.quickActions.map(action => `
            <button class="quick-action-btn" data-page="${action.page}">
              <i class="${action.icon}"></i>
              <span>${action.text}</span>
            </button>
          `).join('')}
        </div>

        <!-- Input Area -->
        <div class="chatbot-input-area">
          <input
            type="text"
            class="chatbot-input"
            id="chatbot-input"
            placeholder="Nhập câu hỏi của bạn..."
            autocomplete="off"
          />
          <button class="chatbot-send-btn" id="chatbot-send">
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
    this.container = widget;
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');

    // Toggle chatbot
    toggleBtn.addEventListener('click', () => {
      this.toggleChatbot();
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
      this.closeChatbot();
    });

    // Send message
    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // Quick action buttons
    quickActionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.currentTarget.dataset.page;
        this.handleQuickAction(page, e.currentTarget.textContent.trim());
      });
    });
  }

  toggleChatbot() {
    const window = document.getElementById('chatbot-window');
    const badge = document.getElementById('chatbot-badge');

    if (this.isOpen) {
      this.closeChatbot();
    } else {
      window.classList.add('active');
      this.isOpen = true;

      // Hide badge
      if (badge) {
        badge.style.display = 'none';
      }

      // Focus on input
      setTimeout(() => {
        document.getElementById('chatbot-input').focus();
      }, 300);
    }
  }

  closeChatbot() {
    const window = document.getElementById('chatbot-window');
    window.classList.remove('active');
    this.isOpen = false;
  }

  showWelcomeMessage() {
    if (this.hasShownWelcome) return;

    const welcomeMessages = [
      `Chào ${this.userName}! 👋`,
      'Hôm nay ngài muốn xem gì?',
      'Tôi có thể giúp ngài điều hướng đến các trang quan trọng:'
    ];

    let delay = 500;
    welcomeMessages.forEach((message, index) => {
      setTimeout(() => {
        this.addMessage(message, 'bot');

        // Show quick actions after last message
        if (index === welcomeMessages.length - 1) {
          setTimeout(() => {
            this.showQuickActions();
          }, 500);
        }
      }, delay);
      delay += 1000;
    });

    this.hasShownWelcome = true;

    // Auto-open chatbot
    setTimeout(() => {
      if (!this.isOpen) {
        this.toggleChatbot();
      }
    }, 2000);
  }

  addMessage(text, sender = 'bot', options = {}) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <i class="bi bi-robot"></i>
        </div>
        <div class="message-content">
          <div class="message-bubble">${text}</div>
          <div class="message-time">${this.getCurrentTime()}</div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-bubble">${text}</div>
          <div class="message-time">${this.getCurrentTime()}</div>
        </div>
        <div class="message-avatar">
          <i class="bi bi-person-circle"></i>
        </div>
      `;
    }

    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: 'smooth'
    });

    // Store in history
    this.messageHistory.push({ text, sender, timestamp: new Date() });
  }

  showQuickActions() {
    const quickActions = document.getElementById('chatbot-quick-actions');
    quickActions.classList.add('visible');
  }

  sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Process and respond
    setTimeout(() => {
      this.processBotResponse(message);
    }, 500);
  }

  processBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    // Simple keyword-based responses
    if (lowerMessage.includes('doanh thu') || lowerMessage.includes('revenue')) {
      response = 'Tôi sẽ đưa ngài đến trang Doanh Thu để xem chi tiết. 📊';
      setTimeout(() => {
        window.location.href = 'pages/revenue.html';
      }, 1500);
    } else if (lowerMessage.includes('khách hàng') || lowerMessage.includes('customer')) {
      response = 'Đang chuyển đến trang Quản lý Khách hàng... 👥';
      setTimeout(() => {
        window.location.href = 'pages/customers.html';
      }, 1500);
    } else if (lowerMessage.includes('sản phẩm') || lowerMessage.includes('product')) {
      response = 'Đang mở trang Sản phẩm... 📦';
      setTimeout(() => {
        window.location.href = 'pages/products.html';
      }, 1500);
    } else if (lowerMessage.includes('báo cáo') || lowerMessage.includes('report')) {
      response = 'Đang chuyển đến trang Báo cáo... 📈';
      setTimeout(() => {
        window.location.href = 'pages/reports.html';
      }, 1500);
    } else if (lowerMessage.includes('tổng quan') || lowerMessage.includes('dashboard')) {
      response = 'Ngài đang ở trang Tổng quan. Ngài muốn xem phần nào cụ thể không? 🏠';
    } else if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = `Xin chào ${this.userName}! Tôi có thể giúp gì cho ngài? 😊`;
    } else if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thanks')) {
      response = 'Rất vui được giúp đỡ ngài! Nếu cần gì hãy gọi tôi nhé. 🙏';
    } else {
      response = 'Tôi có thể giúp ngài điều hướng đến các trang: Doanh thu, Khách hàng, Sản phẩm, hoặc Báo cáo. Ngài muốn xem trang nào? 🤔';
    }

    this.addMessage(response, 'bot');
  }

  handleQuickAction(page, actionText) {
    this.addMessage(actionText, 'user');

    setTimeout(() => {
      this.addMessage(`Đang chuyển hướng đến ${actionText}... ✨`, 'bot');

      setTimeout(() => {
        window.location.href = page;
      }, 1000);
    }, 500);
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Get user name from the page (from sidebar or navbar)
  let userName = 'Tổng giám đốc';
  const userNameElement = document.querySelector('.user-panel .info a') ||
                          document.querySelector('.navbar-nav .nav-link span');

  if (userNameElement) {
    userName = userNameElement.textContent.trim();
  }

  // Initialize chatbot
  window.ceoChatbot = new CEOChatbot({ userName: userName });
});

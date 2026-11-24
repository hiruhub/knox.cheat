/**
 * js/app.js
 * Entry point của toàn bộ ứng dụng.
 */
import { MediaManager } from './media.js';
import { Navigation } from './navigation.js';
import { Auth } from './auth.js';
import { Dashboard } from './dashboard.js';
import { UI } from './ui.js';

class App {
    constructor() {
        // 1. Khởi tạo các module
        this.ui = new UI(this);
        this.mediaManager = new MediaManager();
        this.navigation = new Navigation();
        this.dashboard = new Dashboard(this);
        this.auth = new Auth(this);
        
        this.init();
    }

    init() {
        // 2. Kích hoạt các module cơ bản
        this.ui.init();
        this.mediaManager.init();
        this.auth.init();
    }

    /**
     * Được gọi khi đăng nhập thành công (từ auth.js)
     */
    loginSuccess() {
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        // Chuyển đổi Media
        this.mediaManager.switchToDashboard();

        // Hiệu ứng chuyển cảnh
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none';
            
            appScreen.style.display = 'flex';
            void appScreen.offsetWidth; // Trigger reflow
            
            appScreen.classList.add('active');
            appScreen.style.opacity = '1';
            
            // 3. Khởi tạo Navigation và Render dữ liệu Dashboard
            this.navigation.init();
            this.dashboard.init(); // Bơm dữ liệu Features/QuickFeatures
            
            this.showToast('Đăng nhập thành công!', 'success');
        }, 500);
    }

    logout() {
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        this.mediaManager.switchToLogin();

        appScreen.style.opacity = '0';
        
        setTimeout(() => {
            appScreen.classList.remove('active');
            appScreen.style.display = 'none';
            
            loginScreen.style.display = 'flex';
            void loginScreen.offsetWidth;
            
            loginScreen.classList.add('active');
            loginScreen.style.opacity = '1';
            
            document.getElementById('login-form').reset();
            this.showToast('Đã đăng xuất khỏi hệ thống', 'error');
        }, 500);
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let icon = '';
        if (type === 'success') {
            icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
            toast.style.borderColor = 'var(--success)';
        } else {
            icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            toast.style.borderColor = 'var(--error)';
        }

        toast.innerHTML = `${icon} <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
            setTimeout(() => {
                if(toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
    }
}

// Khởi chạy
window.addEventListener('DOMContentLoaded', () => {
    window.corexApp = new App();
});
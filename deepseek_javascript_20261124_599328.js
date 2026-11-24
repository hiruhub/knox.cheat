/**
 * js/app.js
 * Entry point của toàn bộ ứng dụng. Khởi tạo và quản lý state.
 */
import { MediaManager } from './media.js';
import { Navigation } from './navigation.js';
import { Auth } from './auth.js';

class App {
    constructor() {
        // Khởi tạo các module
        this.mediaManager = new MediaManager();
        this.navigation = new Navigation();
        this.auth = new Auth(this); // Truyền 'this' để Auth có thể gọi App
        
        this.init();
    }

    init() {
        // Khởi tạo Media (Audio/Video)
        this.mediaManager.init();
        
        // Khởi tạo Logic Login
        this.auth.init();
    }

    /**
     * Được gọi khi đăng nhập thành công (từ auth.js)
     */
    loginSuccess() {
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        // 1. Chuyển đổi Media (Âm thanh, Video)
        this.mediaManager.switchToDashboard();

        // 2. Hiệu ứng chuyển cảnh (Fade Out -> Fade In)
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none'; // Đảm bảo bị ẩn hoàn toàn
            
            appScreen.style.display = 'flex';
            // Trigger reflow để animation hoạt động
            void appScreen.offsetWidth; 
            
            appScreen.classList.add('active');
            appScreen.style.opacity = '1';
            
            // 3. Khởi tạo Navigation sau khi Dashboard hiển thị
            this.navigation.init();
            
            // Hiển thị thông báo
            this.showToast('Đăng nhập thành công!', 'success');
        }, 500); // Khớp với thời gian transition trong CSS
    }

    /**
     * Xử lý đăng xuất (gắn vào nút trong trang Manage)
     */
    logout() {
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        // Chuyển đổi Media về lại Login
        this.mediaManager.switchToLogin();

        appScreen.style.opacity = '0';
        
        setTimeout(() => {
            appScreen.classList.remove('active');
            appScreen.style.display = 'none';
            
            loginScreen.style.display = 'flex';
            void loginScreen.offsetWidth;
            
            loginScreen.classList.add('active');
            loginScreen.style.opacity = '1';
            
            // Reset form login
            document.getElementById('login-form').reset();
            
            this.showToast('Đã đăng xuất khỏi hệ thống', 'error');
        }, 500);
    }

    /**
     * Hàm tiện ích tạo thông báo Toast
     */
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Icon dựa trên loại thông báo
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

        // Tự động xóa sau 3 giây
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
            setTimeout(() => {
                if(toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
    }
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
window.addEventListener('DOMContentLoaded', () => {
    // Gán instance vào window để có thể gọi từ HTML (ví dụ: onclick="window.corexApp.logout()")
    window.corexApp = new App();
});
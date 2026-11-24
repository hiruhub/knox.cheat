/**
 * js/auth.js
 * Xử lý logic form Đăng nhập và xác thực.
 */
export class Auth {
    constructor(app) {
        this.app = app; // Tham chiếu đến App chính để gọi hàm loginSuccess
        this.form = document.getElementById('login-form');
        this.btnLogin = document.getElementById('btn-login');
        this.keyInput = document.getElementById('key-input');
        this.pasteBtn = document.getElementById('btn-paste');
        this.captchaRefresh = document.getElementById('btn-refresh-captcha');
        this.captchaText = document.getElementById('captcha-text');
    }

    init() {
        // Khởi tạo Captcha ban đầu
        this.generateCaptcha();

        // Xử lý Submit form
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Xử lý nút Dán (Paste)
        this.pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                this.keyInput.value = text;
            } catch (err) {
                // Fallback nếu trình duyệt chặn Clipboard API
                this.keyInput.value = "COREX-VIP-2026-XXXX-XXXX";
            }
        });

        // Làm mới Captcha
        this.captchaRefresh.addEventListener('click', () => this.generateCaptcha());
    }

    generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.captchaText.innerText = result;
    }

    handleLogin(e) {
        e.preventDefault();
        const key = this.keyInput.value.trim();

        // Validation cơ bản
        if (!key) {
            this.keyInput.parentElement.style.borderColor = 'var(--error)';
            setTimeout(() => this.keyInput.parentElement.style.borderColor = 'var(--glass-border)', 2000);
            return;
        }

        // Hiển thị trạng thái Loading
        const originalHtml = this.btnLogin.innerHTML;
        this.btnLogin.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path>
            </svg> 
            Authenticating...
        `;
        this.btnLogin.style.opacity = '0.7';
        this.btnLogin.style.pointerEvents = 'none';

        // Giả lập gọi API (1.5 giây)
        setTimeout(() => {
            // Gọi hàm loginSuccess từ App chính
            this.app.loginSuccess();
            
            // Reset lại nút
            this.btnLogin.innerHTML = originalHtml;
            this.btnLogin.style.opacity = '1';
            this.btnLogin.style.pointerEvents = 'auto';
        }, 1500);
    }
}

/**
 * js/media.js
 * Quản lý Âm thanh và Video nền.
 */
import { CONFIG } from '../data/config.js';

export class MediaManager {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = '';
        this.isMuted = false;
        
        // DOM Elements
        this.audioToggleBtn = document.getElementById('audio-toggle');
        this.iconMuted = document.getElementById('icon-muted');
        this.iconUnmuted = document.getElementById('icon-unmuted');
        this.volumeSlider = document.getElementById('volume-slider');
        
        this.audio.volume = 0.5; // Âm lượng mặc định
        this.audio.loop = true;
    }

    init() {
        // Tải nhạc nền Login ban đầu
        this.loadTrack(CONFIG.media.loginAudio);

        // Xử lý nút Bật/Tắt âm thanh
        this.audioToggleBtn.addEventListener('click', () => this.toggleMute());
        
        // Xử lý thanh trượt âm lượng
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value;
            if (this.audio.volume > 0 && this.isMuted) {
                this.toggleMute(); // Tự động bỏ tắt tiếng nếu kéo thanh trượt
            }
        });

        // Xử lý chính sách Autoplay của trình duyệt
        // Trình duyệt chặn phát nhạc tự động có âm thanh. Ta phải đợi click đầu tiên.
        const resumeAudio = () => {
            if (this.audio.paused && !this.isMuted) {
                this.audio.play().catch(() => {
                    // Vẫn bị chặn, chờ click tiếp theo
                });
            }
            // Xóa sự kiện sau khi đã tương tác thành công
            document.removeEventListener('click', resumeAudio);
            document.removeEventListener('keydown', resumeAudio);
        };
        document.addEventListener('click', resumeAudio);
        document.addEventListener('keydown', resumeAudio);
    }

    loadTrack(src) {
        if (this.currentTrack === src) return;
        this.currentTrack = src;
        this.audio.src = src;
        
        // Cố gắng phát nhạc (sẽ thất bại nếu trình duyệt chặn autoplay)
        this.audio.play().catch(e => {
            console.log("Autoplay bị chặn. Đang chờ tương tác từ người dùng.");
            // Hiển thị icon tắt tiếng để báo hiệu cần click
            this.isMuted = true;
            this.iconMuted.style.display = 'block';
            this.iconUnmuted.style.display = 'none';
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        
        if (this.isMuted) {
            this.iconMuted.style.display = 'block';
            this.iconUnmuted.style.display = 'none';
            this.audio.pause();
        } else {
            this.iconMuted.style.display = 'none';
            this.iconUnmuted.style.display = 'block';
            this.audio.play().catch(() => {});
        }
    }

    switchToDashboard() {
        // Hiệu ứng giảm âm lượng dần (Fade out)
        let fadeOut = setInterval(() => {
            if (this.audio.volume > 0.05) {
                this.audio.volume -= 0.05;
            } else {
                clearInterval(fadeOut);
                this.audio.pause();
                this.audio.currentTime = 0;
                
                // Chuyển sang nhạc Dashboard
                this.currentTrack = '';
                this.loadTrack(CONFIG.media.dashAudio);
                this.audio.volume = this.volumeSlider.value; // Khôi phục âm lượng
                
                // Quản lý Video
                document.getElementById('login-bg-video').pause();
                const dashVideo = document.getElementById('app-bg-video');
                dashVideo.play().catch(() => {});
            }
        }, 50);
    }

    switchToLogin() {
        this.audio.pause();
        this.currentTrack = '';
        this.loadTrack(CONFIG.media.loginAudio);
        this.audio.volume = this.volumeSlider.value;
        
        document.getElementById('app-bg-video').pause();
        const loginVideo = document.getElementById('login-bg-video');
        loginVideo.play().catch(() => {});
    }
}
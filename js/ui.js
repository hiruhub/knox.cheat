/**
 * js/ui.js
 * Xử lý các thành phần UI tương tác chung (Toggle switches).
 */
export class UI {
    constructor(app) {
        this.app = app;
    }

    init() {
        // Sử dụng Event Delegation cho tất cả các nút Toggle trên toàn bộ document
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle')) {
                // Đổi trạng thái
                e.target.classList.toggle('active');
                const isActive = e.target.classList.contains('active');
                
                // Tìm tên tính năng để hiển thị thông báo
                const card = e.target.closest('.feature-card');
                let featureName = 'Feature';
                if (card) {
                    const titleEl = card.querySelector('h4');
                    if (titleEl) {
                        // Lấy chữ đầu tiên làm tên (vd: "Marker RISK" -> "Marker")
                        featureName = titleEl.innerText.split(' ')[0]; 
                    }
                }
                
                // Gọi Toast thông báo
                this.app.showToast(
                    `${featureName} ${isActive ? 'Enabled' : 'Disabled'}`, 
                    isActive ? 'success' : 'error'
                );
            }
        });
    }
}

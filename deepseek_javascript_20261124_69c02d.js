/**
 * js/navigation.js
 * Xử lý điều hướng SPA (Single Page Application) giữa các tab.
 */
export class Navigation {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        this.pageSections = document.querySelectorAll('.page-section');
        this.viewAllLinks = document.querySelectorAll('.view-all');
    }

    init() {
        // Gắn sự kiện cho Menu chính (Sidebar & Mobile)
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('data-target');
                if (target) this.navigate(target);
            });
        });

        // Gắn sự kiện cho các nút "View All"
        this.viewAllLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                if (target) this.navigate(target);
            });
        });
    }

    navigate(targetId) {
        // 1. Cập nhật trạng thái Active cho Menu
        this.navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
                // Cập nhật CSS cho nav-item (đổi màu, viền trái)
                if(item.classList.contains('nav-item')) {
                    item.style.background = 'rgba(138, 43, 226, 0.15)';
                    item.style.borderLeft = '3px solid var(--accent)';
                    item.style.color = 'white';
                }
            } else {
                item.classList.remove('active');
                if(item.classList.contains('nav-item')) {
                    item.style.background = 'transparent';
                    item.style.borderLeft = '3px solid transparent';
                    item.style.color = 'var(--text-muted)';
                }
            }
        });

        // 2. Chuyển đổi Page Section
        this.pageSections.forEach(page => {
            if (page.id === `page-${targetId}`) {
                page.classList.add('active');
                // Reset và chạy lại animation fade in
                page.style.animation = 'none';
                page.offsetHeight; /* trigger reflow */
                page.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                page.classList.remove('active');
            }
        });
    }
}
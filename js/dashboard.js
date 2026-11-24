/**
 * js/dashboard.js
 * Render dữ liệu động cho các Widget và trang Features.
 */
import { FEATURES, QUICK_FEATURES } from '../data/features.js';

export class Dashboard {
    constructor(app) {
        this.app = app;
        this.quickGrid = document.querySelector('.quick-grid');
        this.featureList = document.querySelector('.feature-list');
    }

    init() {
        this.renderQuickFeatures();
        this.renderFeatures();
    }

    renderQuickFeatures() {
        if (!this.quickGrid) return;
        this.quickGrid.innerHTML = '';
        
        QUICK_FEATURES.forEach(feature => {
            const div = document.createElement('div');
            // Sử dụng inline style tạm thời cho layout để khớp với CSS đã viết
            div.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 15px; text-align: center; cursor: pointer; transition: var(--trans-fast); display: flex; flex-direction: column; align-items: center; gap: 10px;';
            
            div.innerHTML = `
                <div style="width: 40px; height: 40px; border-radius: var(--radius-sm); background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--primary-light);">
                    ${this.getIcon(feature.icon)}
                </div>
                <span style="font-size: 0.8rem; font-weight: 500;">${feature.name}</span>
            `;
            
            // Hiệu ứng Hover
            div.addEventListener('mouseenter', () => { 
                div.style.background = 'rgba(138, 43, 226, 0.15)'; 
                div.style.borderColor = 'var(--primary)'; 
                div.style.transform = 'translateY(-2px)'; 
            });
            div.addEventListener('mouseleave', () => { 
                div.style.background = 'rgba(255,255,255,0.03)'; 
                div.style.borderColor = 'var(--glass-border)'; 
                div.style.transform = 'translateY(0)'; 
            });
            
            // Click sự kiện
            div.addEventListener('click', () => {
                this.app.showToast(`Activated ${feature.name}`, 'success');
            });
            
            this.quickGrid.appendChild(div);
        });
    }

    renderFeatures() {
        if (!this.featureList) return;
        this.featureList.innerHTML = '';

        FEATURES.forEach(feature => {
            const card = document.createElement('div');
            card.className = 'glass-panel feature-card';
            card.style.cssText = 'display: flex; align-items: center; padding: 20px; gap: 20px;';
            
            // Render Tag (RISK / NEW)
            let tagHtml = feature.tag ? `<span class="badge ${feature.tagType}">${feature.tag}</span>` : '';
            
            // Render Slider (nếu có)
            let sliderHtml = '';
            if (feature.hasSlider) {
                sliderHtml = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${feature.sliderValue}</span>
                        <input type="range" min="1" max="5" value="1" step="0.1" style="width: 100px; accent-color: var(--primary); cursor: pointer;">
                    </div>
                `;
            }

            card.innerHTML = `
                <div style="width: 50px; height: 50px; border-radius: var(--radius-md); background: rgba(138, 43, 226, 0.15); display: flex; align-items: center; justify-content: center; color: var(--primary-light); flex-shrink: 0;">
                    ${this.getIcon(feature.icon)}
                </div>
                <div style="flex: 1;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 4px; display: flex; align-items: center; gap: 10px;">
                        ${feature.title} ${tagHtml}
                    </h4>
                    <p class="text-muted" style="font-size: 0.85rem;">${feature.desc}</p>
                    ${sliderHtml}
                </div>
                <div class="toggle ${feature.active ? 'active' : ''}" data-feature-id="${feature.id}"></div>
            `;
            
            this.featureList.appendChild(card);
        });
    }

    /**
     * Hàm helper trả về thẻ SVG dựa trên tên icon
     */
    getIcon(name) {
        const icons = {
            ghost: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
            target: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line></svg>',
            zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
            crosshair: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
            shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
            heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
            wifi: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>',
            grid: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
            snowflake: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"></path></svg>',
            refresh: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>'
        };
        return icons[name] || icons.grid; // Fallback icon
    }
}

/**
 * data/features.js
 * Chứa dữ liệu cho các tính năng (Features) và phím tắt (Quick Features).
 */

// Danh sách tính năng chính (Trang Features)
export const FEATURES = [
    { 
        id: 'marker', 
        title: 'Marker', 
        desc: 'Marks every enemy on your screen.', 
        tag: 'RISK', 
        tagType: 'risk',
        active: true, 
        icon: 'ghost',
        hasSlider: false
    },
    { 
        id: 'aimpoint', 
        title: 'AimPoint', 
        desc: 'Moves your aim to the chest.', 
        tag: 'NEW', 
        tagType: 'new',
        active: true, 
        icon: 'target',
        hasSlider: false
    },
    { 
        id: 'speed', 
        title: 'Speed Boost', 
        desc: 'Makes your character faster.', 
        tag: null, 
        tagType: null,
        active: false, 
        icon: 'zap',
        hasSlider: true,
        sliderValue: 'x1.0'
    },
    { 
        id: 'aimlag', 
        title: 'Aim Lag', 
        desc: 'Freezes the enemy for a moment.', 
        tag: null, 
        tagType: null,
        active: true, 
        icon: 'snowflake',
        hasSlider: false
    },
    { 
        id: 'gloo', 
        title: 'Gloo Wall Rotation', 
        desc: 'Turns your gloo wall to the angle you set.', 
        tag: null, 
        tagType: null,
        active: true, 
        icon: 'refresh',
        hasSlider: true,
        sliderValue: '180°'
    },
    { 
        id: 'revive', 
        title: 'Fast Revive', 
        desc: 'Picks up a knocked teammate faster.', 
        tag: null, 
        tagType: null,
        active: false, 
        icon: 'heart',
        hasSlider: false
    }
];

// Danh sách phím tắt (Trang Home Widget)
export const QUICK_FEATURES = [
    { name: 'Phantom Beta', icon: 'ghost' },
    { name: 'AimPoint Pro', icon: 'target' },
    { name: 'Speed Boost', icon: 'zap' },
    { name: 'Aim Lag Fix', icon: 'crosshair' },
    { name: 'Gloo Wall Rotation', icon: 'shield' },
    { name: 'Fast Revive', icon: 'heart' },
    { name: 'No Internet Fix', icon: 'wifi' },
    { name: 'More Tools', icon: 'grid' }
];
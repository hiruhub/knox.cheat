/**
 * data/config.js
 * Chứa các cấu hình toàn cục, thông tin media và dữ liệu tĩnh.
 */
export const CONFIG = {
    appName: "COREX CLIENT",
    version: "v1.9.0 Premium Edition",
    
    // Đường dẫn Media theo yêu cầu nghiêm ngặt
    media: {
        loginVideo: "https://github.com/hiruhub/Source/raw/refs/heads/main/video1.mp4",
        loginAudio: "https://github.com/hiruhub/Source/raw/refs/heads/main/music2.mp3",
        dashVideo: "https://github.com/hiruhub/Source/raw/refs/heads/main/video2.mp4",
        dashAudio: "https://github.com/hiruhub/Source/raw/refs/heads/main/music.m4a"
    },

    // Dữ liệu người dùng (Mock data cho UI)
    user: {
        name: "NoHardX User",
        role: "Premium",
        avatarText: "NH",
        expireDate: "23 Nov 2026",
        deviceName: "Android 16 • 2311DRK48G",
        deviceId: "PHTM-CDOE-3F22-BEOD",
        systemStatus: "Ready",
        connection: "Connected",
        lastRefreshed: "19 min ago"
    }
};
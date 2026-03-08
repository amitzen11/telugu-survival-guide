// ========================================
// GLOBAL INITIALIZATION — Telugu Survival
// ========================================

// Storage Manager
window.swalpaStorage = {
    save: function(key, data) {
        localStorage.setItem(`telugu_app_${key}`, JSON.stringify(data));
    },
    load: function(key) {
        const item = localStorage.getItem(`telugu_app_${key}`);
        return item ? JSON.parse(item) : null;
    }
};

// Global Event Bus
window.events = {
    subscribers: {},
    publish: function(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(callback => callback(data));
    },
    subscribe: function(event, callback) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(callback);
    }
};

// Log visit activity (1 point daily)
document.addEventListener('DOMContentLoaded', () => {
    import('./activity.js').then(actModule => {
        actModule.logActivity(1);
    });
});

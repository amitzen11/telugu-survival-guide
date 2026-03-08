// ========================================
// BADGES & REWARDS ENGINE
// ========================================

const BADGE_DEFINITIONS = {
    'first_lesson':  { title: 'Namaskaram',     description: 'Finish your first lesson.', emoji: '🙏' },
    'meter_check':   { title: 'Meter Haaki',    description: 'Play the Auto-Rickshaw game.', emoji: '🛺' },
    'flashcard_pro': { title: 'Flash Memory',   description: 'Try the speaking flashcards.', emoji: '🧠' },
    'biryani_lover': { title: 'Biryani Lover',  description: 'Learn food vocabulary.', emoji: '🥘' },
    'slang_master':  { title: 'Kiraak',         description: 'Check out the Hyderabad slang list.', emoji: '😎' },
    'true_local':    { title: 'True Local',     description: 'Complete all 10 lessons.', emoji: '👑' },
};

function getUnlockedBadges() {
    return window.swalpaStorage.load('unlocked_badges') || [];
}

function unlockBadge(badgeId) {
    const unlocked = getUnlockedBadges();
    if (unlocked.includes(badgeId)) return; // Already unlocked
    
    unlocked.push(badgeId);
    window.swalpaStorage.save('unlocked_badges', unlocked);
    
    // Publish event
    window.events.publish('badge_unlocked', badgeId);
    
    // Show Toast Notification
    showBadgeToast(badgeId);
    
    // Re-render grid if on profile page
    if (window.renderBadgeGrid) window.renderBadgeGrid();
}

function showBadgeToast(badgeId) {
    const badge = BADGE_DEFINITIONS[badgeId];
    if (!badge) return;
    
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <strong>${badge.emoji} Badge Unlocked!</strong>
        <p style="margin: 4px 0 0 0; font-size: 0.9em;">${badge.title}</p>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Make accessible globally
window.unlockBadge = unlockBadge;

// Render logic for Profile page
window.renderBadgeGrid = function() {
    const grid = document.getElementById('badge-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const unlocked = getUnlockedBadges();
    
    Object.keys(BADGE_DEFINITIONS).forEach(id => {
        const badge = BADGE_DEFINITIONS[id];
        const isUnlocked = unlocked.includes(id);
        
        const el = document.createElement('div');
        el.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
        el.title = badge.description;
        
        el.innerHTML = `
            <div style="font-size: 2.5em; margin-bottom: 8px;">${badge.emoji}</div>
            <div style="font-size: 0.8em; font-weight: bold;">${badge.title}</div>
            ${!isUnlocked ? '<div style="font-size: 0.7em; margin-top: 4px;">Locked</div>' : ''}
        `;
        
        grid.appendChild(el);
    });
};

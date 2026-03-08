// ========================================
// RANK & PROGRESS ENGINE
// ========================================

const RANKS = [
    { title: '🌱 Tourist',       minPoints: 0,   emoji: '🌱', desc: 'Just arrived. Confused but curious.' },
    { title: '🚶 Regular',       minPoints: 100, emoji: '🚶', desc: 'Starting to find your way around Hyderabad.' },
    { title: '🏃 Local',         minPoints: 300, emoji: '🏃', desc: 'You know the shortcuts. Kiraak!' },
    { title: '🧭 Insider',       minPoints: 600, emoji: '🧭', desc: 'People ask YOU for directions.' },
    { title: '👑 Hyderabad Guru',minPoints: 1000,emoji: '👑', desc: 'Maximum respect achieved. True Hyderabadi.' },
];

export function addPoints(amount) {
    let pts = window.swalpaStorage.load('respect_points') || 0;
    pts += amount;
    window.swalpaStorage.save('respect_points', pts);
    window.events.publish('points_changed', pts);
}

export function calculateProgress() {
    const points = window.swalpaStorage.load('respect_points') || 0;
    
    let currentRank = RANKS[0];
    let nextRank = RANKS[1];
    
    for (let i = 0; i < RANKS.length; i++) {
        if (points >= RANKS[i].minPoints) {
            currentRank = RANKS[i];
            nextRank = RANKS[i+1] || null;
        }
    }
    
    let percentToNext = 100;
    let pointsNeeded = 0;
    
    if (nextRank) {
        const range = nextRank.minPoints - currentRank.minPoints;
        const ptsInRank = points - currentRank.minPoints;
        percentToNext = Math.min(100, (ptsInRank / range) * 100);
        pointsNeeded = nextRank.minPoints - points;
    }
    
    return {
        points,
        currentRank,
        nextRank,
        percentToNext,
        pointsNeeded
    };
}

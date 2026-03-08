// ========================================
// WORD OF THE DAY & STREAK ENGINE
// ========================================

const WOTD_PHRASES = [
    { english: "Hello / Greetings", phonetic: "Na-mas-kaa-ram", telugu: "నమస్కారం", emoji: "🙏" },
    { english: "Awesome / Fantastic", phonetic: "Ki-raak", telugu: "కిరాక్", emoji: "✨" },
    { english: "Bro / Friend (Slang)", phonetic: "Ma-ma", telugu: "మామ", emoji: "🤜" },
    { english: "Take it easy", phonetic: "Lite tees-ko", telugu: "లైట్ తీస్కో", emoji: "☕" },
    { english: "I don't want / No thanks", phonetic: "Vad-dhu", telugu: "వద్దు", emoji: "🛑" },
    { english: "How are you?", phonetic: "Baa-gun-naa-ra?", telugu: "బాగున్నారా?", emoji: "👋" },
    { english: "I am hungry", phonetic: "Naa-ku aa-ka-li ga un-di", telugu: "నాకు ఆకలి గా ఉంది", emoji: "🤤" },
    { english: "Please come", phonetic: "Ran-di", telugu: "రండి", emoji: "🏠" },
    { english: "What is the price?", phonetic: "Dheen ve-la en-tha?", telugu: "దీని వెల ఎంత?", emoji: "💰" },
    { english: "Nonsense (Slang)", phonetic: "Bai-gan", telugu: "బైగన్", emoji: "🍆" },
    { english: "Let's go", phonetic: "Pa-dhan-di", telugu: "పదండి", emoji: "🚶" },
    { english: "House / Home", phonetic: "Il-lu", telugu: "ఇల్లు", emoji: "🏡" },
    { english: "Good morning", phonetic: "Su-bho-da-yam", telugu: "శుభోదయం", emoji: "🌅" },
    { english: "Where is the auto stand?", phonetic: "Auto stand ek-ka-da un-di?", telugu: "ఆటో స్టాండ్ ఎక్కడ ఉంది?", emoji: "🛺" },
    { english: "Food / Rice", phonetic: "An-nam", telugu: "అన్నం", emoji: "🍚" }
];

function getDeterministicIndex(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % WOTD_PHRASES.length;
}

function initWotd() {
    const root = document.getElementById('wotd-root');
    if (!root) return;

    const today = new Date();
    const todayStr = today.toLocaleDateString('en-CA'); // YYYY-MM-DD

    // --- Streak Calculation ---
    let lastVisit = window.swalpaStorage.load('last_visit');
    let streak = parseInt(window.swalpaStorage.load('streak')) || 0;

    if (!lastVisit) {
        streak = 1;
    } else if (lastVisit !== todayStr) {
        const lastDate = new Date(lastVisit + 'T00:00:00');
        const diffDays = Math.floor((today - lastDate) / (1000 * 3600 * 24));
        streak = (diffDays === 1) ? streak + 1 : 1;

        // Earn RP for returning
        if (window.events && streak > 1) {
            import('./progress.js').then(m => m.addPoints(5));
        }
    }

    // Award streak badges
    if (window.unlockBadge) {
        if (streak >= 2) window.unlockBadge('streak_2'); // Assume we need to define these later or ignore if missing
        if (streak >= 5) window.unlockBadge('streak_5');
    }

    window.swalpaStorage.save('last_visit', todayStr);
    window.swalpaStorage.save('streak', streak.toString());

    // --- Render ---
    const phrase = WOTD_PHRASES[getDeterministicIndex(todayStr)];
    root.innerHTML = `
        <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--brand-gold);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; color: var(--brand-gold);">Word of the Day</h3>
                <div class="streak-pill" style="background: ${streak > 1 ? 'var(--brand-gold)' : 'var(--brand-neutral)'}; color: white; padding: 4px 12px; border-radius: 16px; font-weight: bold; font-size: 0.9em;">
                    <span>${streak > 1 ? '🔥' : '⏳'}</span>
                    <span>${streak} ${streak === 1 ? 'Day' : 'Days'} Streak</span>
                </div>
            </div>
            
            <div style="text-align: center; padding: 12px 0;">
                <div style="font-size: 3em; margin-bottom: 8px;">${phrase.emoji}</div>
                <div style="font-size: 1.5em; font-weight: bold;">"${phrase.english}"</div>
                <div style="font-size: 1.2em; color: var(--brand-accent); font-family: 'Outfit', sans-serif; margin-top: 8px;">
                    ${phrase.telugu} ⟨${phrase.phonetic}⟩
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', initWotd);

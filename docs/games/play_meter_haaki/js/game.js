/* ========================================
   GAME ENGINE — Meter Haaki
   ======================================== */
import { NPCS, LEVELS } from './data.js';

const state = {
    respect: 50,
    wallet: 1000,
    level: 1,
    currentStep: 'start',
    activeNPC: null,
    isTypewriting: false
};

// DOM Elements
const els = {
    startScreen: document.getElementById('start-screen'),
    gameUi: document.getElementById('game-ui'),
    endScreen: document.getElementById('end-screen'),
    speakerName: document.getElementById('speaker-name'),
    dialogueText: document.getElementById('dialogue-text'),
    choicesContainer: document.getElementById('choices-container'),
    respectFill: document.getElementById('respect-fill'),
    walletFill: document.getElementById('wallet-fill'),
    feedbackAnchor: document.getElementById('feedback-anchor')
};

window.startGame = (npcId) => {
    state.activeNPC = NPCS[npcId];
    els.startScreen.classList.remove('active');
    els.gameUi.classList.add('active');
    
    // Reset state
    state.respect = 50;
    state.wallet = 1000;
    state.level = 1;
    state.currentStep = 'start';
    
    updateMeters();
    renderNode();
};

function updateMeters() {
    els.respectFill.style.width = `${Math.max(0, Math.min(100, state.respect))}%`;
    els.walletFill.style.width = `${(state.wallet / 1000) * 100}%`;
}

function showFeedback(text, value) {
    const el = document.createElement('div');
    el.className = `floating-text ${value >= 0 ? 'pos-feedback' : 'neg-feedback'}`;
    el.innerText = text;
    els.feedbackAnchor.appendChild(el);
    setTimeout(() => el.remove(), 2000);
}

function typeWriter(text, cb) {
    state.isTypewriting = true;
    els.dialogueText.innerHTML = '';
    els.choicesContainer.innerHTML = '';
    
    let i = 0;
    const speed = 20; // ms per char
    
    function type() {
        if (i < text.length) {
            els.dialogueText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            state.isTypewriting = false;
            if (cb) cb();
        }
    }
    type();
}

function renderNode() {
    const levelData = LEVELS[state.level];
    if (!levelData) return endGame();

    // Set level background image
    document.getElementById('game-scene').style.backgroundImage = levelData.background;
    document.getElementById('game-scene').style.backgroundSize = 'cover';
    document.getElementById('game-scene').style.backgroundPosition = 'center';

    const node = levelData.dialogue[state.currentStep];
    
    if (state.currentStep === 'level_complete') {
        state.level++;
        state.currentStep = 'start';
        return renderNode();
    }

    els.speakerName.innerText = state.activeNPC.name;
    
    typeWriter(node.text, () => {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `${choice.text} <span class="choice-translation">${choice.translation}</span>`;
            btn.onclick = () => handleChoice(choice);
            els.choicesContainer.appendChild(btn);
        });
    });
}

function handleChoice(choice) {
    if (state.isTypewriting) return;

    // Apply modifiers
    const rModifier = state.activeNPC.modifiers.respect;
    const rDiff = choice.effect.respect ? Math.round(choice.effect.respect * rModifier) : 0;
    
    state.respect += rDiff;
    if (choice.effect.wallet) state.wallet += choice.effect.wallet;
    
    updateMeters();

    // Visual feedback
    if (rDiff !== 0) {
        showFeedback(`${rDiff > 0 ? '+' : ''}${rDiff} Respect`, rDiff);
    }
    if (choice.feedback) {
        // Show cultural feedback toast (simplified as alert for this build, could be modal)
        console.log("Feedback:", choice.feedback);
    }

    state.currentStep = choice.next;
    renderNode();
}

function endGame() {
    els.gameUi.style.display = 'none';
    els.endScreen.classList.add('active');
    
    document.getElementById('final-respect').innerText = state.respect;
    document.getElementById('final-wallet').innerText = state.wallet;
    
    let msg = "";
    if (state.respect > 70) msg = "Excellent! You negotiated like a true Hyderabadi.";
    else if (state.respect > 40) msg = "Not bad, but you could use some more local slang.";
    else msg = "Ouch. They definitely knew you were a tourist.";
    
    document.getElementById('end-message').innerText = msg;
    
    // Gamification Integration
    if (window.parent && window.parent.unlockBadge) {
        window.parent.unlockBadge('meter_check');
    }
    // Calculate points to award
    let earnedPoints = Math.max(0, state.respect - 50); // bonus points
    // Import progress module from parent frame context
    if (window.parent) {
        import('/assets/js/progress.js').then(progModule => {
            progModule.addPoints(10 + earnedPoints); // base 10 + respect bonus
        }).catch(err => console.log("Gamification script not found", err));
    }
}

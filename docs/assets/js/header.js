// ========================================
// STATUS HEADER BAR INJECTION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Wait for the MkDocs header to exist
    const headerInner = document.querySelector('.md-header__inner');
    if (!headerInner) return;
    
    import('./progress.js').then(progModule => {
        function renderHeaderBar() {
            const rankInfo = progModule.calculateProgress();
            
            // Remove existing if any
            const existing = document.getElementById('status-header-bar');
            if (existing) existing.remove();
            
            const bar = document.createElement('div');
            bar.id = 'status-header-bar';
            bar.className = 'status-header';
            
            bar.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;" class="status-header-text" onclick="window.location.href='/profile/'" title="View Profile">
                    <span style="font-size: 1.2em;">${rankInfo.currentRank.emoji}</span>
                    <span style="font-size: 0.9em; font-weight: bold;">${rankInfo.currentRank.title}</span>
                    <span style="font-size: 0.8em; opacity: 0.8; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 12px;">
                        ${rankInfo.points} RP
                    </span>
                </div>
                <div style="width: 100px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden;" title="${rankInfo.percentToNext}% to ${rankInfo.nextRank ? rankInfo.nextRank.title : 'Max'}">
                    <div style="width: ${rankInfo.percentToNext}%; height: 100%; background: var(--brand-accent);"></div>
                </div>
            `;
            
            // Insert after the header inner to appear as a sub-header
            const headerElement = document.querySelector('.md-header');
            if (headerElement) {
                headerElement.appendChild(bar);
                // Adjust layout spacing to accommodate the new bar
                const mainContainer = document.querySelector('.md-container');
                if (mainContainer) mainContainer.style.paddingTop = '40px'; 
            }
        }
        
        renderHeaderBar();
        
        // Listen for points updates to re-render
        if (window.events) {
            window.events.subscribe('points_changed', renderHeaderBar);
        }
    });
});

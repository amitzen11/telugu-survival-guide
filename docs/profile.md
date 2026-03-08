# 🏆 My Profile

Welcome to your Telugu Survival Guide dashboard! Here you can track your progress, view your current rank in the Hyderabad ecosystem, and see the cultural achievements you've unlocked.

<div id="profile-root">
    <div style="text-align: center; padding: 40px; font-style: italic; color: var(--brand-neutral);">
        Calculating your Hyderabad survival stats...
        <br>
        <small><i>If this message persists, ensure JavaScript is enabled.</i></small>
    </div>
</div>

<div id="wotd-root" style="margin-top: 50px;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        import('../assets/js/progress.js'),
        import('../assets/js/activity.js')
    ]).then(([progModule, actModule]) => {
        // Hydrate profile UI
        const root = document.getElementById('profile-root');
        
        // Render Rank & Stats
        const rankInfo = progModule.calculateProgress();
        root.innerHTML = `
            <div class="profile-dashboard">
                <div class="rank-card">
                    <h1>${rankInfo.currentRank.emoji}</h1>
                    <h2>${rankInfo.currentRank.title}</h2>
                    <p style="font-size: 0.9em; opacity: 0.9;">${rankInfo.currentRank.desc}</p>
                    <div style="margin-top: 20px; text-align: left;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Respect Points:</span>
                            <strong>${rankInfo.points} RP</strong>
                        </div>
                        <div style="width: 100%; background: rgba(255,255,255,0.2); height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${rankInfo.percentToNext}%; background: var(--brand-gold); height: 100%;"></div>
                        </div>
                        <div style="font-size: 0.8em; margin-top: 5px; text-align: right; opacity: 0.8;">
                            ${rankInfo.pointsNeeded} RP to ${rankInfo.nextRank ? rankInfo.nextRank.title : 'Max Rank'}
                        </div>
                    </div>
                </div>
                
                <div class="glass-card" style="padding: 24px;">
                    <h3>Achieved Badges</h3>
                    <div id="badge-grid" class="badge-grid">
                        <!-- Rendered by badges.js later, but we can structure the grid container -->
                        <div style="grid-column: 1 / -1; text-align: center; color: var(--brand-neutral); font-size: 0.9sm;">
                            Loading badges...
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="glass-card" style="padding: 24px; margin-top: 24px; overflow-x: auto;">
                <h3>90-Day Survival Activity</h3>
                <div id="activity-heatmap" class="heatmap" style="min-width: 600px;"></div>
            </div>
        `;
        
        // Hydrate Badges inside Profile
        if (window.renderBadgeGrid) {
            window.renderBadgeGrid();
        }
        
        // Render Heatmap
        actModule.renderHeatmap('activity-heatmap');
    }).catch(err => {
        console.error("Failed to load profile modules:", err);
        document.getElementById('profile-root').innerHTML = "Failed to load profile stats.";
    });
});
</script>

// ========================================
// ACTIVITY ENGINE 
// ========================================

export function getActivityLog() {
    return window.swalpaStorage.load('activity_log') || {};
}

export function logActivity(points = 1) {
    const today = new Date().toLocaleDateString('en-CA');
    const log = getActivityLog();
    log[today] = (log[today] || 0) + points;
    window.swalpaStorage.save('activity_log', log);
    window.events.publish('activity_logged', { date: today, points: log[today] });
}

export function renderHeatmap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const log = getActivityLog();
    const today = new Date();
    
    // Generate last 90 days grid
    for (let i = 89; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('en-CA');
        
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        cell.title = dateStr;
        
        const count = log[dateStr] || 0;
        let level = 0;
        if (count > 10) level = 4;
        else if (count > 5) level = 3;
        else if (count > 2) level = 2;
        else if (count > 0) level = 1;
        
        cell.setAttribute('data-level', level);
        if (count > 0) {
            cell.title = `${count} interactions on ${dateStr}`;
        }
        
        container.appendChild(cell);
    }
}

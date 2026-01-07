# Cognitive Radar Chart Integration Guide

This guide provides the instructions needed to integrate the high-aptitude "Cognitive Radar Chart" into any web-based professional portfolio.

## 1. Prerequisites
The visualization uses **Chart.js**. Add the following script tag to your `<head>` or before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## 2. HTML Structure
Place the following container where you want the radar chart to appear. The `.glass-card` class is optional but recommended for the "premium" look.

```html
<div class="glass-card">
    <div class="aptitude-radar">
        <canvas id="aptitudeChart"></canvas>
    </div>
</div>
```

## 3. Required CSS
Add these styles to your stylesheet to ensure the chart is responsive and fits the "Command Center" aesthetic.

```css
:root {
    --primary: #6366f1;
    --accent: #22d3ee;
    --card-bg: rgba(17, 24, 39, 0.7);
    --glass-border: rgba(255, 255, 255, 0.1);
}

.glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 2.5rem;
}

.aptitude-radar {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
}
```

## 4. JavaScript Initialization
Use this function to render the chart. You can pass in your own aptitude data (0-100).

```javascript
function renderAptitudeChart(profileData) {
    const ctx = document.getElementById('aptitudeChart').getContext('2d');
    
    // Format keys (e.g., "foresight" -> "FORESIGHT")
    const labels = Object.keys(profileData).map(k => k.replace(/_/g, ' ').toUpperCase());
    const values = Object.values(profileData);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cognitive Profile',
                data: values,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: '#6366f1',
                pointBackgroundColor: '#22d3ee',
                pointBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: '#9ca3af',
                        font: { family: 'sans-serif', size: 10 }
                    },
                    ticks: { display: false, stepSize: 20 },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Example Usage:
const profile = {
    foresight: 80,
    number_memory: 85,
    analytical_reasoning: 70,
    structural_visualization: 60,
    graphoria: 20
};

renderAptitudeChart(profile);
```

## 5. Design Notes
- **Color Palette**: The defaults use Indigo (`#6366f1`) and Cyan (`#22d3ee`) to match the "Strategic Navigator" theme.
- **Background**: Works best on dark backgrounds (`#030712`).
- **Font**: We recommend using 'Outfit' or 'Space Grotesk' from Google Fonts for a premium feel.

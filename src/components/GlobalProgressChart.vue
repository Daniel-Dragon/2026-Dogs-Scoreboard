<template>
  <div class="chart-container retro-box">
    <div class="chart-header">
      <div class="chart-controls">
        <button 
          :class="{ active: timeRange === '30days' }" 
          @click="timeRange = '30days'"
          aria-label="Show last 30 days"
        >
          Last 30 Days
        </button>
        <button 
          :class="{ active: timeRange === 'allTime' }" 
          @click="timeRange = 'allTime'"
          aria-label="Show all time weekly history"
        >
          All Time (Weekly)
        </button>
      </div>
    </div>

    <div class="chart-wrapper">
      <Line
        v-if="chartData.datasets.length"
        :data="chartData"
        :options="chartOptions"
        aria-label="Overall Leaderboard Progression Chart"
        role="img"
      />
      <div v-else class="loading-chart" role="status" aria-live="polite">Loading Chart Data...</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  contestants: {
    type: Array,
    required: true
  }
});

const timeRange = ref('30days');

const chartData = computed(() => {
  // 1. Collect all unique dates from all contestants' history
  const allDates = new Set();
  props.contestants.forEach(c => {
    c.history.forEach(h => allDates.add(h.date));
  });

  // Sort dates chronologically
  // Assuming date strings are parseable by Date constructor
  const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

  if (sortedDates.length === 0) {
    return { labels: [], datasets: [] };
  }

  // 2. Determine which dates to display on the X-axis
  let displayedDates = [];

  if (timeRange.value === '30days') {
    // Show only the last 30 recorded dates (or fewer if not enough data)
    // We stick to the actual dates present in the data for daily view
    displayedDates = sortedDates.slice(-30).map(d => new Date(d));
  } else {
    // 'allTime' - Weekly Aggregation
    // We generate regular weekly intervals from start to end
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);
    
    let current = new Date(startDate);
    while (current <= endDate) {
      displayedDates.push(new Date(current));
      // Add 7 days
      current.setDate(current.getDate() + 7);
    }

    // Ensure the very last date is included if the weekly loop didn't land exactly on it
    const lastDisplayed = displayedDates[displayedDates.length - 1];
    if (lastDisplayed < endDate) {
      displayedDates.push(endDate);
    }
  }

  // Generate Labels
  const labels = displayedDates.map(d => {
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  // Generate distinct colors for lines
  const colors = [
    '#2e7d32', '#f44336', '#2196f3', '#ff9800', '#9c27b0',
    '#00ffff', '#39ff14', '#fff01f', '#ff1493', '#00ced1'
  ];

  const datasets = props.contestants.map((c, index) => {
    // For each displayed date, find the cumulative score of the contestant AT that time.
    // Logic: Sum of all history entries where date <= displayedDate
    
    // Optimization: The history is relatively small, so filter/reduce per point is fine.
    // If performance becomes an issue, we can optimize by iterating history linearly.
    
    const dataPoints = displayedDates.map(targetDate => {
      // Find all history items that happened on or before targetDate
      // Note: we compare timestamps
      const targetTime = targetDate.getTime();
      
      // We can use the pre-calculated history on the contestant, 
      // but we must rely on the raw dates in history vs our targetDate
      const relevantHistory = c.history.filter(h => new Date(h.date).getTime() <= targetTime);
      
      // If we are in 'allTime' mode, the targetDate might be a generated date that doesn't exist in history.
      // That's fine, we just want the state of the score at that moment.
      
      // Sum the 'totalPoints' (assuming history stores the *delta* for that day? 
      // Wait, let's check dataService. 
      // dataService: contestantsMap[name].history.push({ ..., totalPoints: totalPoints })
      // And in dataService processing loop: 
      // const totalPoints = ... (dogPoints + creativePoints + socialPoints);
      // It seems history stores the POINTS FOR THAT ENTRY, not cumulative.
      // So summing them up is correct to get cumulative.
      
      return relevantHistory.reduce((sum, h) => sum + h.totalPoints, 0);
    });

    return {
      label: c.name,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 2,
      pointRadius: timeRange.value === 'allTime' ? 2 : 3, // Smaller dots for dense weekly view
      pointHoverRadius: 6,
      data: dataPoints,
      tension: 0.2
    };
  });

  return {
    labels,
    datasets
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          family: 'Bangers',
          size: 14
        },
        color: '#000'
      }
    },
    title: {
      display: true,
      text: 'THE GREAT RACE 🏁',
      font: {
        family: 'Bangers',
        size: 24
      },
      color: '#8a2be2'
    }
  },
  scales: {
    x: {
      grid: {
        color: '#ccc',
        borderDash: [5, 5]
      },
      ticks: {
          font: {
            family: 'Bangers',
          },
          color: '#000',
          maxRotation: 45,
          minRotation: 0
      }
    },
    y: {
      grid: {
        color: '#ccc',
        borderDash: [5, 5]
      },
      ticks: {
          font: {
            family: 'Bangers',
          },
          color: '#000'
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.chart-controls {
  display: flex;
  gap: 10px;
}

.chart-controls button {
  /* Overriding global button styles slightly for this context if needed */
  font-size: 1rem;
  padding: 5px 15px;
  opacity: 0.6;
  background-color: var(--color-comic-white); /* Default inactive bg */
  color: var(--color-comic-black);
}

.chart-controls button.active {
  opacity: 1;
  background-color: var(--color-comic-yellow);
  box-shadow: 3px 3px 0 var(--color-comic-black);
  transform: translate(-1px, -1px);
}

.chart-wrapper {
  position: relative;
  flex: 1;
  min-height: 500px;
  height: 100%;
  width: 100%;
}

.loading-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Bangers', cursive;
  font-size: 2rem;
  color: var(--color-purple);
}
</style>
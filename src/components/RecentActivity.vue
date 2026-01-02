<template>
  <div class="recent-activity-container retro-box">
    <h2>🔥 Hot off the Grill (Recent Scores) 🔥</h2>
    <ul class="activity-list">
      <li v-for="(entry, index) in recentActivity" :key="index" class="activity-item">
        <span class="date">{{ formatDate(entry.date) }}</span>
        <div class="details">
          <strong>{{ entry.name }}</strong> devoured
          <span class="highlight">{{ entry.dogPoints }} hot dogs</span>
          earning <span class="points">{{ entry.totalPoints }} pts!</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { format, parse } from 'date-fns';

const props = defineProps({
  recentActivity: {
    type: Array,
    required: true
  }
});

const formatDate = (dateString) => {
  try {
    // Attempt to parse 'M/d/yyyy' or similar formats common in sheets
    // If date-fns parse fails, it might be ISO or JS date string.
    // Let's rely on new Date() for robustness or simple string check
    const date = new Date(dateString);
    if (!isNaN(date)) {
        return format(date, 'MMM do');
    }
    return dateString;
  } catch (e) {
    return dateString;
  }
};
</script>

<style scoped>
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  padding: 10px;
  border-bottom: 2px dashed var(--color-neon-cyan);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.activity-item:last-child {
  border-bottom: none;
}

.date {
  background-color: var(--color-black);
  color: var(--color-neon-green);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 15px;
}

.details {
  flex-grow: 1;
}

.highlight {
  color: #ff4500;
  text-decoration: underline;
}

.points {
  color: var(--color-purple);
  font-weight: 900;
}
</style>

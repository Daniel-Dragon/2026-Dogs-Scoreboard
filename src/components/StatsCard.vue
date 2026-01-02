<template>
  <div class="stats-card">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-content">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '🌭'
  },
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.stats-card {
  background-color: var(--color-white);
  border: 3px solid var(--color-black);
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 5px 5px 0px var(--color-neon-pink);
  transform: rotate(-2deg);
  transition: transform 0.2s;
  margin: 10px;
  min-width: 200px;
}

.stats-card:hover {
  transform: rotate(2deg) scale(1.05);
  z-index: 10;
}

.stat-icon {
  font-size: 3rem;
  margin-right: 15px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: 'Bangers', cursive;
  font-size: 2rem;
  color: var(--color-purple);
  line-height: 1;
}

.stat-label {
  font-family: 'Comic Sans MS', cursive;
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
}
</style>

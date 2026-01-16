<template>
  <div class="highlight-card">
    <div class="card-header">
      <span class="icon" aria-hidden="true">{{ icon }}</span>
      <h3>{{ title }}</h3>
    </div>
    <div class="card-body">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
  icon: String
});
</script>

<style scoped>
.highlight-card {
  background-color: var(--color-comic-white);
  border: 4px solid var(--color-comic-black);
  box-shadow: 8px 8px 0 var(--color-comic-purple);
  padding: 15px;
  transform: rotate(-1deg);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}

.highlight-card:hover {
  transform: rotate(1deg) scale(1.02);
  z-index: 5;
  box-shadow: 10px 10px 0 var(--color-comic-red);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px dashed var(--color-comic-black);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.icon {
  font-size: 2rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-comic-black);
  text-shadow: none; /* Override global h3 shadow for readability in small card */
}

.card-body p {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.3;
}
</style>

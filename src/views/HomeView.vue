<template>
  <div class="home-view">
    <header class="main-header">
      <h1>Dawgz with Dogz for Dogs 🌭</h1>
      <p class="subtitle">The Ultimate Hot Dog Eating Contest for Charity!</p>
    </header>

    <div v-if="store.loading" class="loading-state">
      Fetching Tasty Data...
    </div>

    <div v-else class="content-wrapper">
      <section class="leaderboard-section">
        <LeaderboardTable :contestants="store.contestants" />
      </section>

      <section class="chart-section">
        <GlobalProgressChart :contestants="store.contestants" />
      </section>

      <section class="activity-section">
        <RecentActivity :recentActivity="store.recentActivity" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { store } from '../store';
import { fetchData } from '../services/dataService';
import LeaderboardTable from '../components/LeaderboardTable.vue';
import RecentActivity from '../components/RecentActivity.vue';
import GlobalProgressChart from '../components/GlobalProgressChart.vue';

onMounted(async () => {
  if (store.contestants.length === 0) {
    store.loading = true;
    const { contestants, recentActivity } = await fetchData();
    store.setContestants(contestants);
    store.setRecentActivity(recentActivity);
    store.loading = false;
  }
});
</script>

<style scoped>
.home-view {
  padding: 10px;
}

.main-header {
  text-align: center;
  margin-bottom: 30px;
  background: var(--color-neon-yellow);
  padding: 20px;
  border: 5px dashed var(--color-neon-pink);
  transform: rotate(-1deg);
  box-shadow: 10px 10px 0 var(--color-purple);
}

.main-header h1 {
  font-size: 3rem;
  margin: 0;
}

.subtitle {
  font-family: 'Comic Sans MS', cursive;
  font-size: 1.2rem;
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.leaderboard-section {
  order: 1;
}

.chart-section {
  order: 2;
}

.activity-section {
  order: 3;
}

.loading-state {
  text-align: center;
  font-family: 'Bangers', cursive;
  font-size: 3rem;
  color: var(--color-white);
  text-shadow: 2px 2px 0 var(--color-black);
}
</style>

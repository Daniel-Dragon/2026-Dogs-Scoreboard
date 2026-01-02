<template>
  <div class="leaderboard-container retro-box">
    <h2>🏆 Top Dogs Leaderboard 🏆</h2>
    <div class="table-responsive">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Contestant</th>
            <th>Total Points</th>
            <th>Hot Dogs Eaten</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contestant, index) in contestants" :key="contestant.name" class="contestant-row" @click="goToProfile(contestant.name)">
            <td class="rank-cell">
              <span v-if="index === 0">👑</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>#{{ index + 1 }}</span>
            </td>
            <td class="profile-cell">
              <div class="profile-wrapper">
                <img :src="contestant.image" :alt="contestant.name" class="profile-thumb" @error="handleImageError">
                <span class="contestant-name">{{ contestant.name }}</span>
              </div>
            </td>
            <td class="points-cell">{{ contestant.totalPoints }}</td>
            <td class="dogs-cell">{{ contestant.totalDogs }} 🌭</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  contestants: {
    type: Array,
    required: true
  }
});

const router = useRouter();

const goToProfile = (name) => {
  router.push({ name: 'contestant', params: { name } });
};

const handleImageError = (e) => {
  e.target.src = '/images/placeholder.svg';
};
</script>

<style scoped>
.leaderboard-container {
  background-color: var(--color-white);
}

.table-responsive {
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Comic Sans MS', cursive;
}

th {
  background-color: var(--color-neon-pink);
  color: var(--color-white);
  padding: 15px;
  text-align: left;
  font-family: 'Bangers', cursive;
  font-size: 1.5rem;
  letter-spacing: 1px;
  border-bottom: 4px solid var(--color-black);
}

td {
  padding: 15px;
  border-bottom: 2px solid #ccc;
  vertical-align: middle;
}

.contestant-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.contestant-row:hover {
  background-color: var(--color-neon-yellow);
}

.rank-cell {
  font-size: 1.5rem;
  font-weight: bold;
}

.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-thumb {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid var(--color-neon-green);
  object-fit: cover;
}

.contestant-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.points-cell {
  font-weight: bold;
  font-size: 1.4rem;
  color: var(--color-purple);
}

.dogs-cell {
  font-size: 1.2rem;
}
</style>

import { reactive } from 'vue';

export const store = reactive({
  contestants: [],
  recentActivity: [],
  highlights: [],
  loading: false,
  error: null,

  setContestants(data) {
    this.contestants = data;
  },

  setRecentActivity(data) {
    this.recentActivity = data;
  },

  setHighlights(data) {
    this.highlights = data;
  },

  getContestantByName(name) {
    return this.contestants.find(c => c.name === name);
  }
});

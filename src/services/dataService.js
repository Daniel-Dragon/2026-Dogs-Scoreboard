import Papa from 'papaparse';
import { parse, format } from 'date-fns';

const SCORES_CSV_URL = 'https://docs.google.com/spreadsheets/d/1uQmAEAD2BIuc_eEMCKjM7ynH3p2nVqiS_5XbvlvVj-w/export?format=csv&gid=603308068';
const CONTESTANTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1uQmAEAD2BIuc_eEMCKjM7ynH3p2nVqiS_5XbvlvVj-w/export?format=csv&gid=1205107889';

export async function fetchData() {
  try {
    const [scoresResponse, contestantsResponse] = await Promise.all([
      fetch(SCORES_CSV_URL),
      fetch(CONTESTANTS_CSV_URL)
    ]);

    const scoresText = await scoresResponse.text();
    const contestantsText = await contestantsResponse.text();

    const scoresData = Papa.parse(scoresText, { header: true, skipEmptyLines: true }).data;
    const contestantsData = Papa.parse(contestantsText, { header: true, skipEmptyLines: true }).data;

    // Join datasets
    const contestantsMap = {};

    // Process contestants first
    contestantsData.forEach(c => {
      const name = c['Name'];
      if (name) {
        // Prepend /images/ if a filename is provided, otherwise use placeholder
        let imagePath = '/images/placeholder.svg';
        if (c['Profile Picture']) {
           imagePath = `/images/${c['Profile Picture']}`;
        }

        contestantsMap[name] = {
          name: name,
          image: imagePath,
          totalPoints: 0,
          totalDogs: 0,
          bonusPoints: 0,
          history: []
        };
      }
    });

    // Process scores
    scoresData.forEach(s => {
      const name = s['Contestant'];
      const dogPoints = parseFloat(s['Dog Points']) || 0;
      const bonusPoints = parseFloat(s['Bonus Points']) || 0;
      const totalPoints = parseFloat(s['Total Points']) || (dogPoints + bonusPoints);
      const date = s['Date'];

      if (contestantsMap[name]) {
        contestantsMap[name].totalPoints += totalPoints;
        contestantsMap[name].totalDogs += dogPoints;
        contestantsMap[name].bonusPoints += bonusPoints;
        contestantsMap[name].history.push({
          date: date,
          dogPoints: dogPoints,
          bonusPoints: bonusPoints,
          totalPoints: totalPoints
        });
      } else {
        // Handle case where contestant appears in scores but not in contestants list
        // Create a temporary entry or log warning?
        // For this app, we'll create a basic entry
         contestantsMap[name] = {
          name: name,
          image: '/images/placeholder.svg',
          totalPoints: totalPoints,
          totalDogs: dogPoints,
          bonusPoints: bonusPoints,
          history: [{
             date: date,
             dogPoints: dogPoints,
             bonusPoints: bonusPoints,
             totalPoints: totalPoints
          }]
        };
      }
    });

    // Calculate derived stats and format history
    const contestants = Object.values(contestantsMap).map(c => {
      // Sort history by date descending
      c.history.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Calculate funny stats
      c.calories = c.totalDogs * 300;
      c.weightLbs = (c.totalDogs * 0.1).toFixed(1);
      // Assuming distance to moon is ~238,855 miles ~ 15,137,280,000 inches
      // Average hot dog length ~ 6 inches
      // Dogs to moon = 2,522,880,000
      const dogsToMoon = 2522880000;
      c.moonPercentage = ((c.totalDogs / dogsToMoon) * 100).toFixed(10); // Tiny number!
      // Let's do something more reachable, like height of Eiffel Tower (12,960 inches = 2160 dogs)
      const dogsToEiffel = 2160;
      c.eiffelTowers = (c.totalDogs / dogsToEiffel).toFixed(2);

      return c;
    });

    // Sort contestants by total points descending
    contestants.sort((a, b) => b.totalPoints - a.totalPoints);

    // Get recent activity (flat list of all score entries)
    const recentActivity = [];
    scoresData.forEach(s => {
       recentActivity.push({
         name: s['Contestant'],
         date: s['Date'],
         dogPoints: s['Dog Points'],
         totalPoints: s['Total Points']
       });
    });
    // Sort recent activity by date descending and take top 10
    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recent10 = recentActivity.slice(0, 10);

    return {
      contestants,
      recentActivity: recent10
    };

  } catch (error) {
    console.error("Error fetching data:", error);
    return { contestants: [], recentActivity: [] };
  }
}

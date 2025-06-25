const mockPlayers = [
  {
    id: 1,
    name: "Mike Trout",
    team: "LAA",
    homeAway: "home",
    stats: {
      avg: ".307",
      obp: ".418",
      slg: ".603",
      ops: "1.021",
      sb: "5",
      so: "45"
    },
    score: 12,
    parkFactor: 1.1
  },
  {
    id: 2,
    name: "Mookie Betts",
    team: "LAD",
    homeAway: "away",
    stats: {
      avg: ".292",
      obp: ".387",
      slg: ".547",
      ops: ".934",
      sb: "10",
      so: "55"
    },
    score: 10,
    parkFactor: 0.9
  },
  {
    id: 3,
    name: "Aaron Judge",
    team: "NYY",
    homeAway: "home",
    stats: {
      avg: ".285",
      obp: ".392",
      slg: ".600",
      ops: ".992",
      sb: "2",
      so: "100"
    },
    score: 9,
    parkFactor: 1.1
  },
  {
    id: 4,
    name: "Freddie Freeman",
    team: "LAD",
    homeAway: "home",
    stats: {
      avg: ".330",
      obp: ".410",
      slg: ".520",
      ops: ".930",
      sb: "3",
      so: "60"
    },
    score: 11,
    parkFactor: 1.1
  },
  {
    id: 5,
    name: "Ronald Acuña Jr.",
    team: "ATL",
    homeAway: "away",
    stats: {
      avg: ".310",
      obp: ".390",
      slg: ".540",
      ops: ".930",
      sb: "25",
      so: "70"
    },
    score: 13,
    parkFactor: 0.9
  }
];

// DOM elements
const playersGrid = document.getElementById('players-grid');
const playersLoading = document.getElementById('players-loading');
const playersError = document.getElementById('players-error');
const bestBetsContent = document.getElementById('best-bets-content');
const teamFilter = document.getElementById('team-filter');
const minScoreFilter = document.getElementById('min-score');
const refreshBtn = document.getElementById('refresh-btn');

function init() {
    const players = mockPlayers;
    populateTeamFilter(players);
    renderPlayers(players);
    setTimeout(() => {
        playersLoading.style.display = 'none';
        playersGrid.style.display = 'grid';
    }, 1000);
}

function populateTeamFilter(players) {
    const teams = [...new Set(players.map(p => p.team))];
    teams.forEach(team => {
        const opt = document.createElement('option');
        opt.value = team;
        opt.textContent = team;
        teamFilter.appendChild(opt);
    });
}

function renderPlayers(players) {
    playersGrid.innerHTML = '';
    const filtered = players.filter(p =>
        (teamFilter.value === 'all' || p.team === teamFilter.value) &&
        p.score >= parseInt(minScoreFilter.value)
    );
    if (filtered.length === 0) {
        playersGrid.innerHTML = '<div class="player-card">No players match the selected filters</div>';
        return;
    }
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="player-name">${p.name}</div>
            <div class="player-team ${p.homeAway === 'home' ? 'home-team' : 'away-team'}">
                ${p.team} (${p.homeAway === 'home' ? 'Home' : 'Away'})
            </div>
            <div class="player-score">Score: ${p.score}</div>
            <div class="player-stats">
                AVG: ${p.stats.avg} | OBP: ${p.stats.obp}<br>
                SLG: ${p.stats.slg} | OPS: ${p.stats.ops}<br>
                SB: ${p.stats.sb} | SO: ${p.stats.so}
            </div>`;
        playersGrid.appendChild(card);
    });
    updateBestBets(players);
}

function updateBestBets(players) {
    const top = [...players].sort((a, b) => b.score - a.score).slice(0, 5);
    bestBetsContent.innerHTML = '';
    top.forEach(p => {
        const bet = document.createElement('div');
        bet.className = 'best-bet-item';
        bet.style.marginBottom = '10px';
        bet.style.padding = '10px';
        bet.style.backgroundColor = '#fff';
        bet.style.borderRadius = '5px';
        bet.innerHTML = `
            <strong>${p.name}</strong> - ${p.team} (${p.homeAway === 'home' ? 'Home' : 'Away'})
            <div style="color: #2980b9; font-weight: bold; margin-top: 5px;">Score: ${p.score}</div>`;
        bestBetsContent.appendChild(bet);
    });
}

teamFilter.addEventListener('change', () => renderPlayers(mockPlayers));
minScoreFilter.addEventListener('change', () => renderPlayers(mockPlayers));
refreshBtn.addEventListener('click', init);

init();

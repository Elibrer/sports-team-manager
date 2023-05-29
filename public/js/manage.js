
let playerFirstName;
let playerLastName;
let playerNumber;
let playerScores;
let playerFouls;
let savePlayerBtn;
let newPlayerBtn;
let playerList;
let deleteBtn;
let viewBtn;
let playerPosition;
let teamName;

if (window.location.pathname === '/') {
  playerFirstName = document.querySelector('.player-first-name');
  playerLastName = document.querySelector('.player-last-name');
  playerNumber = document.querySelector('.player-number');
  playerScores = document.querySelector('.player-scores');
  playerFouls = document.querySelector('.player-fouls');
  playerPosition = document.querySelector('#player-position');

  savePlayerBtn = document.querySelector('.save-player');
  newPlayerBtn = document.querySelector('.new-player');
  playerList = document.querySelectorAll('.list-container .list-group');
  deleteBtn = document.querySelectorAll('.delete-player');
  viewBtn = document.querySelectorAll('.view-player');
  teamName = document.querySelector('#team-name');

 
}



// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeplayer is used to keep track of the player in the textarea
let activePlayer = {};

const getPlayers = () =>
  fetch('/api/players', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
});

const savePlayer = async (player) => {
  
  let name = teamName.innerHTML;
  const teamId = await fetch(`/api/teams/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let team_id = await teamId.json();

  player.team_id = team_id.id

  await fetch('/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });
  renderPlayerList();
};


const deletePlayer = (id) =>
  fetch(`/api/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
});

const renderActivePlayer = async (playerId) => {
    hide(savePlayerBtn);
    if (playerId) {
        playerFirstName.setAttribute('readonly', true);
        playerLastName.setAttribute('readonly', true);
        playerNumber.setAttribute('readonly', true);
        playerScores.setAttribute('readonly', true);
        playerFouls.setAttribute('readonly', true);
        playerPosition.setAttribute('disabled', true);
        const playerData = await fetch(`/api/players/${playerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const player = await playerData.json();
      activePlayer = player;

      let positionName = '';
      switch (activePlayer.position_id) {
        case 1:
          positionName = "Attacker"
          break;
        case 2:
          positionName = "Defender"
          break;
          default:
            positionName = "Goalkeeper"
      }      


      console.log(activePlayer)
        playerFirstName.value = activePlayer.first_name;
        playerLastName.value = activePlayer.last_name;
        playerNumber.value = activePlayer.player_number;
        playerScores.value = activePlayer.player_scores;
        playerFouls.value = activePlayer.player_fouls;
        playerPosition.value = positionName;
      } else {
        playerFirstName.removeAttribute('readonly');
        playerLastName.removeAttribute('readonly');
        playerNumber.removeAttribute('readonly');
        playerScores.removeAttribute('readonly');
        playerFouls.removeAttribute('readonly');
        playerPosition.removeAttribute('disabled');
        playerFirstName.value = '';
        playerLastName.value = '';
        playerNumber.value = '';
        playerScores.value = '';
        playerFouls.value = '';
        playerPosition.value = 'Attacker';
    }
  };

const handlePlayerSave = async () => {
    const positionName = playerPosition.value;
    const position = await fetch(`/api/positions/${positionName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let position_id = await position.json();
      const positionId = position_id.id;

    const newPlayer = {
        first_name: playerFirstName.value,
        last_name: playerLastName.value,
        player_number: playerNumber.value,
        player_scores: playerScores.value,
        player_fouls: playerFouls.value,
        position_id: positionId,
    };
    
    await savePlayer(newPlayer);
    const playerList = await getPlayers();
    renderPlayerList(playerList);
    renderActivePlayer();
    location.reload();
  };

const handlePlayerDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
    console.log("DELETE!")

    const player = e.target;
    const playerId = JSON.parse(player.parentElement.getAttribute('data-delete')).id;
    console.log(playerId);
    if (activePlayer.id === playerId) {
      activePlayer = {};
    }

    deletePlayer(playerId).then(() => {
      getAndRenderPlayers();
      renderActivePlayer();
    });
};

const handlePlayerView = async (e, playerId) => {
    e.preventDefault();
    console.log("VIEW!")
    console.log(playerId);
    renderActivePlayer(playerId);
};

const handleNewPlayerView = (e) => {
    activePlayer = {};
    renderActivePlayer();
};

const handleRenderSaveBtn = () => {
    if (!playerFirstName.value.trim() || !playerLastName.value.trim() || !playerNumber.value.trim() || !playerScores.value.trim() || !playerFouls.value.trim()) {
      hide(savePlayerBtn);
    } else {
      show(savePlayerBtn);
    }
  };

const renderPlayerList = async (playerList) => {
  
    const editButtons = document.querySelectorAll('.edit-player');
    editButtons.forEach((button) => {

      const playerId = button.getAttribute('data-edit');
      button.addEventListener('click', (e) => handlePlayerView(e, playerId));
    });

    const deleteButtons = document.querySelectorAll('.delete-player');
    deleteButtons.forEach((button) => {

      button.addEventListener('click', handlePlayerDelete);
    });
};


const getAndRenderPlayers = async () => {
  handleRenderSaveBtn();
  await getPlayers();
  await renderPlayerList();
}

if (window.location.pathname === '/') {
    savePlayerBtn.addEventListener('click', handlePlayerSave);
    newPlayerBtn.addEventListener('click', handleNewPlayerView);
    playerFirstName.addEventListener('keyup', handleRenderSaveBtn);
    playerLastName.addEventListener('keyup', handleRenderSaveBtn);
    playerNumber.addEventListener('keyup', handleRenderSaveBtn);
    playerScores.addEventListener('keyup', handleRenderSaveBtn);
    playerFouls.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderPlayers();
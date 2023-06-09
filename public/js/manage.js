let playerFirstName;
let playerLastName;
let playerNumber;
let playerScores;
let playerFouls;
let savePlayerBtn;
let editPlayerButton;
let newPlayerBtn;
let playerList;
let deleteBtn;
let viewBtn;
let playerPosition;
let teamNameEl;
let playerTeam;
let isAdminEl;
let newPlayerMode = true;


if (window.location.pathname === '/') {
  playerFirstName = document.querySelector('.player-first-name');
  playerLastName = document.querySelector('.player-last-name');
  playerNumber = document.querySelector('.player-number');
  playerScores = document.querySelector('.player-scores');
  playerFouls = document.querySelector('.player-fouls');
  playerPosition = document.querySelector('#player-position');
  playerTeam = document.querySelector('#player-team');
  isAdminEl = document.querySelector('#is-admin');


  editPlayerButton = document.querySelector('.edit-player');
  savePlayerBtn = document.querySelector('.save-player');
  newPlayerBtn = document.querySelector('.new-player');
  playerList = document.querySelectorAll('.list-container .list-group');
  deleteBtn = document.querySelectorAll('.delete-player');
  viewBtn = document.querySelectorAll('.view-player');
  teamNameEl = document.querySelector('#team-name');
}

const isAdmin = () => {
  let is_admin = isAdminEl.innerHTML;

  if (is_admin === 'true') {
    is_admin = true;
  } else {
    is_admin = false;
  } 

  console.log("Admin: " + is_admin)
  return is_admin;
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

let activePlayer = {};

const getPlayers = () =>
  fetch('/api/players', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

const editPlayer = async (playerId, updatePlayer) => {
  console.log(updatePlayer)
  await fetch(`/api/players/${playerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatePlayer),
  });
};

const savePlayer = async (newPlayer) => {
  console.log(newPlayer)
  await fetch('/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlayer),
  });
  renderPlayerList();
};

const deletePlayer = (id) => {
  return fetch(`/api/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const renderActivePlayer = async (playerId) => {

  hide(savePlayerBtn);

  if (playerId) {
    const playerData = await fetch(`/api/players/${playerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const player = await playerData.json();
    activePlayer = player;
    console.log(activePlayer.team_id)

    let positionId = '';
    switch (activePlayer.position_id) {
      case 1:
        positionId = "1"
        break;
      case 2:
        positionId = "2"
        break;
    }

    playerFirstName.value = activePlayer.first_name;
    playerLastName.value = activePlayer.last_name;
    playerNumber.value = parseInt(activePlayer.player_number);
    playerScores.value = parseInt(activePlayer.player_scores);
    playerFouls.value = parseInt(activePlayer.player_fouls);
    playerPosition.value = parseInt(positionId);
    if (isAdmin()) {
      playerTeam.value = parseInt(activePlayer.team_id);
    }
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
    playerPosition.value = '1';
  }
};
const handlePlayerEdit = async () => {
  let playerId = activePlayer.id;
  let teamId;

  console.log(isAdmin())
  if (!isPlayerChanged) {
    // No changes were made, return from the function
    return;
  }
  if (isAdmin()) {

    teamId = playerTeam.value;
  } else {
    let name = teamNameEl.innerHTML;
    const team = await fetch(`/api/teams/${name}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    teamId = await team.json();
    teamId = parseInt(teamId.id);
  }



  const updatePlayer = {
    first_name: playerFirstName.value,
    last_name: playerLastName.value,
    player_number: parseInt(playerNumber.value),
    player_scores: parseInt(playerScores.value),
    player_fouls: parseInt(playerFouls.value),
    position_id: parseInt(playerPosition.value),
    team_id: parseInt(teamId),
  };

  await editPlayer(playerId, updatePlayer);
  location.reload();
}

const handlePlayerSave = async () => {
    const newPlayer = {
        first_name: playerFirstName.value,
        last_name: playerLastName.value,
        player_number: parseInt(playerNumber.value),
        player_scores: parseInt(playerScores.value),
        player_fouls: parseInt(playerFouls.value),
        position_id: parseInt(playerPosition.value),
      };

      if(!isAdmin()) {
        let name =  teamNameEl.innerHTML;
        const team = await fetch(`/api/teams/${name}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const teamId = await team.json();
        newPlayer.team_id = parseInt(teamId.id);
      } else {
        console.log(playerTeam.value)
        newPlayer.team_id = parseInt(playerTeam.value);
      }

    await savePlayer(newPlayer);
    location.reload();
};

const handlePlayerDelete = async (e, playerId) => {
  e.stopPropagation();
  console.log("DELETE!")
  if (activePlayer.id === playerId) {
    activePlayer = {};
  }
  modal.style.display = "block";

  modalBtn.addEventListener('click', async () => {
    modal.style.display = "none";
    try {
      const delResponse = await deletePlayer(playerId);
      if (delResponse.ok) {
        console.log("DELETED!!!!!!!!")
        getAndRenderPlayers();
        renderActivePlayer();
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const handlePlayerView = async (e, playerId) => {
  newPlayerMode = false;
  saveMode = true;
  show(editPlayerButton)
  e.preventDefault();
  console.log("VIEW!")
  renderActivePlayer(playerId);
};

const handleNewPlayerView = (e) => {
  newPlayerMode = true;
  svaeMode = false;
  hide(editPlayerButton);
  activePlayer = {};
  renderActivePlayer();
};

let isPlayerChanged = false;

const handlePlayerInputChange = () => {
  isPlayerChanged = true;
  handleRenderSaveBtn();
};

playerFirstName.addEventListener('input', handlePlayerInputChange);
playerLastName.addEventListener('input', handlePlayerInputChange);
playerNumber.addEventListener('input', handlePlayerInputChange);
playerScores.addEventListener('input', handlePlayerInputChange);
playerFouls.addEventListener('input', handlePlayerInputChange);

const handleRenderSaveBtn = () => {
  const isPlayerEmpty =
    !playerFirstName.value.trim() ||
    !playerLastName.value.trim() ||
    !playerNumber.value.trim() ||
    !playerScores.value.trim() ||
    !playerFouls.value.trim();

  if (isPlayerEmpty || (Object.keys(activePlayer).length === 0 && newPlayerMode === false)) {
    hide(savePlayerBtn);
    hide(editPlayerButton);
  } else {
    if (newPlayerMode === true) {
      show(savePlayerBtn);
      hide(editPlayerButton);
    } else {
      if (isPlayerChanged) {
        show(editPlayerButton);
      } else {
        hide(editPlayerButton);
      }
      hide(savePlayerBtn);
    }
  }
};

editPlayerButton.addEventListener('click', handlePlayerEdit);

const renderPlayerList = async () => {

  const viewButtons = document.querySelectorAll('.view-player');
  viewButtons.forEach((button) => {

    const playerId = button.getAttribute('data-view');
    button.addEventListener('click', (e) => handlePlayerView(e, playerId));
  });

  const deleteButtons = document.querySelectorAll('.delete-player');
  deleteButtons.forEach((button) => {
    const playerId = button.getAttribute('data-delete');

    button.addEventListener('click', (e) => handlePlayerDelete(e, playerId));
  });
};


const getAndRenderPlayers = async () => {
  hide(editPlayerButton)
  if (!saveMode) {
    handleRenderSaveBtn();
  }
  getPlayers();
  handleNewPlayerView()
  await renderPlayerList();
}


if (window.location.pathname === '/') {
  editPlayerButton.addEventListener('click', handlePlayerEdit);
  savePlayerBtn.addEventListener('click', handlePlayerSave);
  newPlayerBtn.addEventListener('click', handleNewPlayerView);
  playerFirstName.addEventListener('keyup', handleRenderSaveBtn);
  playerLastName.addEventListener('keyup', handleRenderSaveBtn);
  playerNumber.addEventListener('keyup', handleRenderSaveBtn);
  playerScores.addEventListener('keyup', handleRenderSaveBtn);
  playerFouls.addEventListener('keyup', handleRenderSaveBtn);
}

const modalBtn = document.getElementById("modal-close");
const modalCancel = document.getElementById("modal-cancel");

var span = document.getElementsByClassName("close")[0];

var modal = document.querySelector("#myModal");
if (modal !== null) {
  modal.style.display = "none";
}
modalCancel.onclick = function () {
  modal.style.display = "none";
  location.reload();
}
span.onclick = function () {
  modal.style.display = "none";
  location.reload();
}

let saveMode = true;
getAndRenderPlayers();
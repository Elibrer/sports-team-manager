let playerFirstName;
let playerLastName;
let playerNumber;
let playerScores;
let playerFouls;
let savePlayerBtn;
let newPlayerBtn;
let playerList;

if (window.location.pathname === '/') {
  playerFirstName = document.querySelector('.player-first-name');
  playerLastName = document.querySelector('.player-last-name');
  playerNumber = document.querySelector('.player-number');
  playerScores = document.querySelector('.player-scores');
  playerFouls = document.querySelector('.player-fouls');

  savePlayerBtn = document.querySelector('.save-player');
  newPlayerBtn = document.querySelector('.new-player');
  playerList = document.querySelectorAll('.list-container .list-group');
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

const savePlayer = (player) =>
  fetch('/api/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
});

const deletePlayer = (id) =>
  fetch(`/api/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
});

const renderActivePlayer = () => {
    hide(savePlayerBtn);
    
    if (activePlayer.id) {
        playerFirstName.setAttribute('readonly', true);
        playerLastName.setAttribute('readonly', true);
        playerNumber.setAttribute('readonly', true);
        playerScores.setAttribute('readonly', true);
        playerFouls.setAttribute('readonly', true);
        playerFirstName.value = activePlayer.title;
        playerLastName.value = activePlayer.text;
        playerNumber.value = activePlayer.number;
        playerScores.value = activePlayer.scores;
        playerFouls.value = activePlayer.fouls;
    } else {
        playerFirstName.removeAttribute('readonly');
        playerLastName.removeAttribute('readonly');
        playerNumber.removeAttribute('readonly');
        playerScores.removeAttribute('readonly');
        playerFouls.removeAttribute('readonly');
        playerFirstName.value = '';
        playerLastName.value = '';
        playerNumber.value = '';
        playerScores.value = '';
        playerFouls.value = '';
    }
  };

const handlePlayerSave = () => {
    const newPlayer = {
        first_name: playerFirstName.value,
        last_name: playerLastName.value,
        player_number: playerNumber.value,
        player_scores: playerScores.value,
        player_fouls: playerFouls.value,
    };
    savePlayer(newPlayer).then(() => {
      getAndRenderPlayers();
      renderActivePlayer();
    });
  };


const handlePlayerDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const player = e.target;
    console.log (player)
    const egg = JSON.parse(player.parentElement.getAttribute('data-player'))
    console.log(egg)
    const playerId = JSON.parse(player.parentElement.getAttribute('data-player')).id;

    if (activePlayer.id === playerId) {
      activePlayer = {};
    }

    deletePlayer(playerId).then(() => {
      getAndRenderPlayers();
      renderActivePlayer();
    });
};

const handlePlayerView = (e) => {
    e.preventDefault();
    activePlayer = JSON.parse(e.target.parentElement.getAttribute('data-player'));
    renderActivePlayer();
};

const handleNewPlayerView = (e) => {
    activePlayer = {};
    renderActivePlayer();
};

const handleRenderSaveBtn = () => {
    if (!playerTitle.value.trim() || !playerText.value.trim()) {
      hide(savePlayerBtn);
    } else {
      show(savePlayerBtn);
    }
  };

const renderPlayerList = async (players) => {
    console.log(players)
    let jsonPlayers = await players.json();
    console.log(jsonPlayers)
    if (window.location.pathname === '/') {
      playerList.forEach((el) => (el.innerHTML = ''));
    }
  
    let playerListItems = [];
  
    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
  
      const spanEl = document.createElement('span');
      spanEl.classList.add('list-item-title');
      spanEl.innerText = text;
      spanEl.addEventListener('click', handlePlayerView);
  
      liEl.append(spanEl);
  
      if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
          'fas',
          'fa-trash-alt',
          'float-right',
          'text-danger',
          'delete-players'
        );
        delBtnEl.addEventListener('click', handlePlayerDelete);
  
        liEl.append(delBtnEl);
      }
  
      return liEl;
    };
  
    if (jsonPlayers.length === 0) {
      playerListItems.push(createLi('No saved players', false));
    }
  
    jsonPlayers.forEach((players) => {
      const li = createLi(players.first_name + " " + players.last_name);
      li.dataset.players = JSON.stringify(players);
  
      playerListItems.push(li);
    });
  
    if (window.location.pathname === '/') {
      playerListItems.forEach((players) => playerList[0].append(players));
    }
};


const getAndRenderPlayers = () => getPlayers().then(renderPlayerList);

if (window.location.pathname === '/') {
    savePlayerBtn.addEventListener('click', handlePlayerSave);
    newPlayerBtn.addEventListener('click', handleNewPlayerView);
    playerFirstName.addEventListener('keyup', handleRenderSaveBtn);
    playerLastName.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderPlayers();
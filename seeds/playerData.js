const { Player } = require('../models');

const playerData = [
  {
    first_name: "Lionel",
    last_name: "Messi",
    player_number: 30,
    player_scores: 16,
    player_fouls: 2,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Cristiano",
    last_name: "Ronaldo",
    player_number: 10,
    player_scores: 18,
    player_fouls: 4,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Neymar",
    last_name: "Jr",
    player_number: 10,
    player_scores: 14,
    player_fouls: 3,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Kylian",
    last_name: "Mbappé",
    player_number: 7,
    player_scores: 21,
    player_fouls: 1,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Kevin",
    last_name: "De Bruyne",
    player_number: 17,
    player_scores: 12,
    player_fouls: 2,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Robert",
    last_name: "Lewandowski",
    player_number: 9,
    player_scores: 20,
    player_fouls: 3,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Mohamed",
    last_name: "Salah",
    player_number: 11,
    player_scores: 15,
    player_fouls: 2,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Sergio",
    last_name: "Ramos",
    player_number: 4,
    player_scores: 7,
    player_fouls: 6,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Manuel",
    last_name: "Neuer",
    player_number: 1,
    player_scores: 0,
    player_fouls: 0,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Antoine",
    last_name: "Griezmann",
    player_number: 7,
    player_scores: 10,
    player_fouls: 2,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Gareth",
    last_name: "Bale",
    player_number: 11,
    player_scores: 8,
    player_fouls: 3,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Eden",
    last_name: "Hazard",
    player_number: 10,
    player_scores: 6,
    player_fouls: 1,
    position_id: 1,
    team_id: 1
  },
  {
    first_name: "Harry",
    last_name: "Kane",
    player_number: 9,
    player_scores: 14,
    player_fouls: 2,
    position_id: 1,
    team_id: 1
  }
];

const seedPlayer = () => Player.bulkCreate(playerData);

module.exports = seedPlayer;
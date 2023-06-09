const sequelize = require('../config/connection');
const seedPlayer = require('./playerData')
const seedTeam = require('./teamData')
const seedPosition = require('./positionData')
const seedUser = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPosition();
  console.log('\n----- POSITIONS SEEDED -----\n');

  await seedTeam();
  console.log('\n----- TEAMS SEEDED -----\n');

  await seedPlayer();
  console.log('\n----- PLAYERS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();

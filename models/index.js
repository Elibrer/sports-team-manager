const User = require('./User');
const Position = require('./Position');
const Player = require('./Player');

// Player.belongsTo(Position, {   
//     foreignKey: 'player_id',
// });

// Position.hasMany(Player, {
//     foreignKey: 'position_id',
// });

// User.hasMany(Player, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// });

// Player.belongsTo(User, {
//     foreignKey: 'id',
// });

module.exports = { User, Position, Player };
const User = require('./User');
const Position = require('./Position');
const Player = require('./Player');

Player.hasOne(Position, {
    foreignKey: 'player_id',
    onDelete: 'CASCADE',
});

Position.belongsTo(Player, {
    foreignKey: 'user_id',
});

User.hasMany(Player, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Player.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Position, Player };
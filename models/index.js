const User = require('./User');
const Position = require('./Position');
const Player = require('./Player');

Position.hasOne(Player, {
    foreignKey: 'position_id',
    onDelete: 'CASCADE',
});

User.hasMany(Player, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Player.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Position, Player };
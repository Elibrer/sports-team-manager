const User = require('/app/models/User');
const Position = require('/app/models/Position');
const Player = require('/app/models/Player');
const Team = require('/app/models/Team')

Position.hasMany(Player, {
    foreignKey: 'position_id',
});

Team.hasMany(Player, {
    foreignKey: 'team_id',
});

Team.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

User.hasOne(Team, {
    foreignKey: 'user_id',
})

Player.belongsTo(Team, {
    foreignKey: 'team_id',
    onDelete: 'CASCADE',
})

Player.belongsTo(Position, {
    foreignKey: 'position_id',
    onDelete: 'SET NULL',
})

Team.hasMany(Player,{
    foreignKey: 'team_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Position, Player, Team };
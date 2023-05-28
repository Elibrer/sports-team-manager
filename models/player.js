// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Player extends Model {
//   hasScores() {
//     if (this.scores > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   hasFouls() {
//     if (this.fouls > 0) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// Player.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     player_number: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     scores: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     fouls: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'user',
//         key: 'id',
//       },
//     },
//     position_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'position',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     underscored: true,
//     modelName: 'player',
//   }
// );

// module.exports = Player;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Position extends Model { }

Position.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    position_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'player',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'position',
    tableName: 'Position',
  }
);

module.exports = Position;
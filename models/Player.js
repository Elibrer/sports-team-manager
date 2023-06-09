const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model {
  hasScores() {
    if (this.scores > 0) {
      return true;
    } else {
      return false;
    }
  };
  hasFouls() {
    if (this.fouls > 0) {
      return true;
    } else {
      return false;
    }
  }
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player_scores: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    player_fouls: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'position',
        key: 'id',
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'team',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'player',
    tableName: 'player',
  }
);

module.exports = Player;
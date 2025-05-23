const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('application', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'job',
          key: 'id'
        }
      },
      cover_letter: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      duration_estimate: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'application',
      schema: 'public',
      timestamps: true
    });
  };
  
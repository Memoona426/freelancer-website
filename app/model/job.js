const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('job', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      budget_type: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      budget: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      skill_required: {
        type: DataTypes.JSON,
        allowNull: false
      },
      deadline: {
        type: DataTypes.DATEONLY,
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
      tableName: 'job',
      schema: 'public',
      timestamps: true
    });
  };
  
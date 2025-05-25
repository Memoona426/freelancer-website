const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "paymentHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "milstone",
          key: "id",
        },
      },
      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "paymentHistory",
      schema: "public",
      timestamps: true,
    }
  );
};

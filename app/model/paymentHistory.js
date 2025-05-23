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
      milstone_id: {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
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

const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bids",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job",
          key: "id",
        },
      },
      proposal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bid_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "bids",
      schema: "public",
      timestamps: true,
    }
  );
};

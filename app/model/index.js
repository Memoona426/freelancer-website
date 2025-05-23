const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.role = require("./role")(sequelize, DataTypes);
db.userProfile = require("./userProfile")(sequelize, DataTypes);
db.job = require("./job")(sequelize, DataTypes);
db.bids = require("./bids")(sequelize, DataTypes);
db.contract = require("./contract")(sequelize, DataTypes);
db.milestone = require("./milestone")(sequelize, DataTypes);
db.paymentHistory = require("./paymentHistory")(sequelize, DataTypes);

// for user table
db.users.belongsTo(db.role, {
  foreignKey: "role_id",
  as: "role",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

db.role.hasMany(db.users, {
  foreignKey: "role_id",
  as: "users",
});

// for user profile table
db.users.hasOne(db.userProfile, {
  foreignKey: "user_id",
  as: "userProfile",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

db.userProfile.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});

// jobs
db.job.belongsTo(db.users, { foreignKey: "user_id", as: "users" });
db.users.hasMany(db.job, { foreignKey: "user_id", as: "job" });

// users → bids (One-to-Many)
db.users.hasMany(db.bids, {
  foreignKey: "user_id",
  as: "bids",
});
db.bids.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});

// job → bids (One-to-Many)
db.job.hasMany(db.bids, {
  foreignKey: "job_id",
  as: "bids",
});
db.bids.belongsTo(db.job, {
  foreignKey: "job_id",
  as: "job",
});

// users → contracts
db.users.hasMany(db.contract, {
  foreignKey: "user_id",
  as: "contract",
});
db.contract.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});

// job → contracts
db.job.hasMany(db.contract, {
  foreignKey: "job_id",
  as: "contract",
});
db.contract.belongsTo(db.job, {
  foreignKey: "job_id",
  as: "job",
});

// contract → milestones
db.contract.hasMany(db.milestone, {
  foreignKey: "contract_id",
  as: "milestones",
});
db.milestone.belongsTo(db.contract, {
  foreignKey: "contract_id",
  as: "contract",
});

// milestone → paymentHistory (One-to-Many)
db.milestone.hasMany(db.paymentHistory, {
  foreignKey: 'milestone_id',
  as: 'payments'
});
db.paymentHistory.belongsTo(db.milestone, {
  foreignKey: 'milestone_id',
  as: 'milestone'
});

module.exports = db;

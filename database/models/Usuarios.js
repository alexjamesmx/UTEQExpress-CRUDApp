const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const Usuario = sequelize.define("Usuario", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
  },
});
// Usuario.sync({force: true})

module.exports = Usuario;

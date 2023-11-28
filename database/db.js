const { Sequelize } = require("sequelize");

//conectar a la BD
const sequelize = new Sequelize('web_integral', 'root', process.env.BD_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

const open = async () => {
    await sequelize.authenticate().then(
      console.log("Conectado a la BD MySQL local.")
      ).catch((error) => {
      console.log("Error de conexión:", error)
    })
  }

  open();

module.exports = sequelize;
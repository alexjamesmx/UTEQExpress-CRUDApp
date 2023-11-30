const { Sequelize } = require("sequelize")

//conectar a la BD
const sequelize = new Sequelize(
  process.env.BD_NAME,
  process.env.USERNAME,
  process.env.BD_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
    port: process.env.PORT,
  }
)

const open = async () => {
  await sequelize
    .authenticate()
    .then(console.log("Conectado a la BD MySQL local."))
    .catch((error) => {
      console.log("Error de conexión:", error)
    })
}

open()

module.exports = sequelize

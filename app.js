const dotenv = require("dotenv")
dotenv.config({ path: ".env" })
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const jwt = require("jsonwebtoken")
const mysql = require("mysql2")

// const connection = mysql.createConnection(process.env.DATABASE_URL)

// // // simple query
// connection.query("show tables", function (err, results, fields) {
//   console.log(results) // results contains rows returned by server
//   console.log(fields) // fields contains extra metadata about results, if available
// })

const { obtenerClavePrivada } = require("./key/Clave_privada")
let clave_privada
const cookiePar = require("cookie-parser")

obtenerClavePrivada((err, res) => {
  if (err) {
    console.error("Error obteniendo la clave privada:", err)
    process.exit(1)
  }
  clave_privada = res
})

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

app.use(cookiePar())

/**
 * midelwere para verificar token
 */

let token = ""
function verificarToken(req, res, next) {
  // Obtener el token de la cookie o de donde lo estés enviando

  console.log(req)
  if (!req.cookies) {
    token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2VzYXJPcnRpekBnbWFpbC5jb20iLCJpYXQiOjE3MDA1NDA1NDMsImV4cCI6MTcwMDcxMzM0M30.TjgI19axPZm6iFsA2bXWhHhNOw-caiY29_wnx5c2kdrhTr2dTTvDr9jAxsNzQPbD7B9KwO5n_shpviXjjX-9w9gtEara8JyMYR-xryCqfo7sqiqSNNFQX4lMaPpYjTCzyiYISz9U0urmo55Yz-XQia1PQugNHklO2nLuu4WrAjrQOqo8WUXvza4lDt3_Who-7JDHnYQnh_dqqGGL2gm5Ch5HROIt40V9M4sm7IYHBRrgxiUnAiaU8pH9ZFi9yGy-w-ry8CPA87tQjhH06X6pMUEQN72jzQMPzJHEry4OLq-4DsOKA31rndtpIIotmmVtwDkr8qMqpYxKajok0NVq_A"
  } else {
    token = req.cookies["auth-token"]
    console.log(token)
  }

  // Verificar si el token existe
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado. Token no proporcionado." })
  }

  // Verificar el token
  jwt.verify(token, clave_privada, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Acceso no autorizado. Token inválido." })
    }

    // Almacenar la información del usuario en el objeto de solicitud para su uso posterior
    req.usuario = decoded.user
    next()
  })
}

const libros = require("./rutas/api/libros")
const categoriesRouter = require("./rutas/api/categories")
const usuario = require("./rutas/api/usuarios")
const login = require("./rutas/api/login")

app.use("/api/books", libros)
app.use("/api/categories", categoriesRouter)
app.use("/api/usuarios", usuario)
app.use("/api/login", login)

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Servicio iniciado correctamente en el puerto ${process.env.PORT || 3000}`
  )
})

// connection.end()

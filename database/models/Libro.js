const sequelize = require('../db')
const { DataTypes } = require('sequelize');

const Libro = sequelize.define('libros', {
  titulo_lib: {
    type: DataTypes.STRING
  },
  anio_lib: {
    type: DataTypes.INTEGER
  },
  autor_lib: {
    type: DataTypes.STRING
  },
  editorial_lib: {
    type: DataTypes.STRING
  },
  fk_cat: {
    type: DataTypes.INTEGER
  }
});

// Libro.sync({force: true})

module.exports = Libro; 
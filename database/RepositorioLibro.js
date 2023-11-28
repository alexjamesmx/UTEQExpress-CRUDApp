const Libro = require('./models/Libro')

function RepositoryLibro() {
  return {
    create: async (libro) => {
      await Libro.create(libro);
    },
    getAll: async () => {
      return await Libro.findAll();
    },
    getById: async (id) => {
      console.log("Llega al repository:", id)
      return Libro.findAll({
        where: {
          id: id
        }
      });
    },
    updateById: async (id, libro) => {
      return Libro.update(libro, {
        where: {
          id: id
        }
      });
    },
    deleteById: async (id) => {
      return Libro.destroy({
        where: {
          id: id
        }
      });
    },
  }
}

module.exports = RepositoryLibro;
const Category = require("./models/Category")

function Repository() {
  return {
    create: async (student) => {
      await Category.create(student)
    },
    getAll: async () => {
      return await Category.findAll()
    },
    getById: async (id) => {
      return Category.findByPk(id)
    },
    update: async (id, name) => {
      return await Category.update(name, {
        where: {
          category_id: id,
        },
      })
    },
    delete: async (id) => {
      return await Category.destroy({
        where: {
          category_id: id,
        },
      })
    },
  }
}

module.exports = Repository

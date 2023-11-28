const bcrypt = require("bcrypt");
function ControllerUsuario(repository) {
  return {
    obtenerUsuario: async () => {
      return await repository.getAll();
    },
    obtenerUsuarioPorId: async (id) => {
      return await repository.getById(id);
    },
    validarLoginUsuario: async (username, myPlainPassword) => {
        console.log(myPlainPassword)
      const user = await repository.getByEmail(username);
      if (!user) return false;
      const result = await bcrypt.compare(myPlainPassword, user.password);
      return result;
    },
    agregarUsuario: async (email, myPlainPassword) => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(myPlainPassword, salt, async function (err, hash) {
          await repository.create({
            email: email,
            password: hash,
          });
        });
      });
    },
    actualizarUsuario: async (params) => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(params.password, salt, async function (err, hash) {
          const response = await repository.updateById(params.id, {
            email: params.email,
            password: hash,
          });
          console.log(response);
        });
      });
    },
    eliminarUsuario: async (id) => {
      const response = await repository.deleteById(id);
      console.log(response);
    },
  };
}

module.exports = ControllerUsuario;

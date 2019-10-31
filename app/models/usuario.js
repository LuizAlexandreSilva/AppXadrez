'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  usuario.associate = function(models) {
    // associations can be defined here
  };
  return usuario;
};
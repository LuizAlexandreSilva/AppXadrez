'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: DataTypes.STRING,
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  curso.associate = function(models) {
    // associations can be defined here
  };
  return curso;
};
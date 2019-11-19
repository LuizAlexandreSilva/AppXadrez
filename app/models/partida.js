'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: DataTypes.STRING
  }, {
    underscored: true,
  });
  partida.associate = function(models) {
    partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_1' });
    partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_2' });
    partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_3' });
    partida.hasMany(models.mensagem);
  };
  return partida;
};
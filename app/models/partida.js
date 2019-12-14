'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    user_id_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    winner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
  });
  partida.associate = function(models) {
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_1', as: 'user_1' });
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_2', as: 'user_2' });
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_3', as: 'vencedor' });
    // partida.hasMany(models.mensagem);
    partida.belongsTo(models.usuario, { foreignKey: 'user_id_1', as: 'user_1' });
    partida.belongsTo(models.usuario, { foreignKey: 'user_id_2', as: 'user_2' });
  };
  return partida;
};
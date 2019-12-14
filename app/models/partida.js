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
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_1' });
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_2' });
    // partida.belongsTo(models.usuario, { foreignKey: 'partidas_ibfk_3' });
    // partida.hasMany(models.mensagem);
  };
  return partida;
};
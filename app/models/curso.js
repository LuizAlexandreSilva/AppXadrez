'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 6],
          msg: 'A sigla precisa ter entre 3 e 6 caracteres'
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 30],
          msg: 'O nome precisa ter entre 5 e 30 caracteres'
        }
      }
    },
    descricao: DataTypes.TEXT,
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Você precisa selecionar uma área'
        }
      }
    }
  }, {
    underscored: true,
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area);
    curso.hasMany(models.usuario);
  };
  return curso;
};
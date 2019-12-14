'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 40],
          msg: 'O nome precisa ter entre 5 e 100 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email inválido'
        }
      },
      unique: {
        args: true,
        msg: 'O email ja está em uso'
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Digite uma senha'
        }
      }
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Você precisa selecionar um curso'
        }
      }
    }
  }, {
    underscored: true,
  });
  usuario.associate = function(models) {
    usuario.belongsTo(models.curso);
    usuario.hasMany(models.partida, { foreignKey: 'id' })
    // usuario.belongsTo(models.partida);
  };
  return usuario;
};
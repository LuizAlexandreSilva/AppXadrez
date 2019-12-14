var models = require('../models/index');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');
const op = sequelize.Op;
var Usuario = models.usuario;
var Partida = models.partida;

const index = async (req, res) => {
  const conteudo = 'Nova partida';
  const { session } = req;
  if (session.uid) {
    const minhasPartidas = await Partida.findAll(
      { where: 
        { [op.or]: 
          [{ user_id_1: session.uid }, { user_id_2: session.uid }],
          [op.and]: 
          [{ winner: null }]
        },
        include: [
          { model: Usuario, as: 'user_1' },
          { model: Usuario, as: 'user_2' }
        ]
      }
    );
    const aguardando = await Partida.findAll(
      { where: 
        { [op.and]:
          [{ user_id_1: {[op.not]: session.uid}, user_id_2: null }] 
        },
        include: [
          { model: Usuario, as: 'user_1' },
          { model: Usuario, as: 'user_2' }
        ]
      }
    );
    res.render('main/index', {
      minhasPartidas,
      aguardando,
      sessionId: session.uid,
      layout: 'main'
    });
  } else {
    res.render('main/login', {
      conteudo: conteudo,
      csrf: req.csrfToken(),
      layout: 'main'
    });
  }
}

const partida = async (req, res) => {
  const { session } = req;
  const { id } = req.params;
  console.log('req param', id)
  if (session.uid) {
    if (id) {
      var partida = await Partida.findByPk(id, {
        include: [
          { model: Usuario, as: 'user_1' },
          { model: Usuario, as: 'user_2' }
        ]
      });

      if (partida.user_id_1 != session.uid && partida.user_id_2 == null) {
        partida = await partida.update({ user_id_2: session.uid });
      }

      const color = partida.user_id_1 == session.uid ? 'white' : 'black';
      res.render('main/partida', {
        sessionId: session.uid,
        color,
        partida: partida.id,
        user_1: partida.user_id_1,
        user_2: partida.user_id_2,
        user_name_1: partida.user_1.nome,
        user_name_2: partida.user_2 ? partida.user_2.nome : null,
        fen: partida.fen ? partida.fen : 'start',
        layout: 'main'
      });  
    } else {
      const partida = await Partida.findOrCreate(
        { 
          where: { user_id_1: session.uid, winner: null },
          raw: true,
        }
      );
      res.redirect('/partida/' + partida[0].id);
    }
  }
}

const ranking = async (req, res) => {
  const { session } = req;

  const winners = await Partida.findAll({
    where: { [op.not]: [{winner: null}] },
    group: ['winner'],
    attributes: ['winner', [sequelize.fn('COUNT', 'winner'), 'count']],
    order: [[sequelize.literal('count'), 'DESC']],
    raw: true,
    include: [
      { model: Usuario, as: 'vencedor' },
    ]
  })
  res.render('main/ranking', {
    sessionId: session.uid,
    winners,
    layout: 'main'
  });
}

const sobre = (req, res) => {
  const conteudo = 'Página sobre a aplicação';
  const { session } = req;
  res.render('main/sobre', {
    sessionId: session.uid,
    conteudo: conteudo,
    layout: 'main'
  });
}

const signup = (req, res) => {
  res.render('main/signup', {
    layout: 'main'
  });
}

const login = async function (req, res) {
  var csrf = req.csrfToken();
  if (req.route.methods.get) {
    res.render('main/login', {
      csrf
    });
  } else {
    const usuario = await Usuario.findOne({ 
      where: {
        email: req.body.email
      }
    });
  
    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, ok) => {
        if (ok) {
          req.session.uid = usuario.id;
          res.redirect('/');
        } else {
          res.render('main/login', {
            csrf,
            email: req.body.email
          });
        }
      });
    }
  }
}

const logout = (req, res) => {
  console.log(req.session)
  req.session.destroy(function (err) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
 }

const ui = (req, res) => {
  res.render('main/ui');
}

module.exports = { index, partida, ranking, sobre, login, signup, logout, ui }
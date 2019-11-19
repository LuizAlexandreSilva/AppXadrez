var models = require('../models/index');
const bcrypt = require('bcryptjs');
var Usuario = models.usuario;

const index = (req, res) => {
  const conteudo = 'Página principal da aplicação';
  const { session } = req;
  res.render('main/index', {
    conteudo: conteudo,
    sessionId: session ? session.uid : undefined,
    layout: 'main'
  });
}

const sobre = (req, res) => {
  const conteudo = 'Página sobre a aplicação';
  res.render('main/sobre', {
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
          console.log(req.session.uid)
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

module.exports = { index, sobre, login, signup, logout, ui }
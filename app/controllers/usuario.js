var models = require('../models/index');
const bcrypt = require('bcryptjs');
var Usuario = models.usuario;

const read  = (req, res) => {};
const create = async function (req, res) {
  var csrf = req.csrfToken();
  if (req.route.methods.get) {
    res.render('main/signup', {
      csrf 
    });
  } else {
    const { senha, confirmaSenha, termos } = req.body;
    console.log(req.body)
    var errors = new Array();

    if (senha && senha !== confirmaSenha) {
      var error = new Object();
      error.path = 'confirmaSenha';
      error.message = 'As senhas digitadas devem ser iguais.';
      errors.push(error);
    }

    if (!termos) {
      var error = new Object();
      error.path = 'termos';
      error.message = 'Você precisa concordar com os termos de serviço da aplicação.';
      errors.push(error);
    }

    if (errors.length > 0) {
      res.render('main/signup', {
        csrf,
        usuario: req.body,
        errors: errors
      });
      throw new Error;
    }

    bcrypt.genSalt(8, function(err, salt) {
      bcrypt.hash(req.body.senha, salt, async(err, hash) => {
        try {
          await Usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: hash,
            curso_id: req.body.curso_id
          });
          res.render('main');
        } catch (e) {
          console.log(e.errors)
          res.render('main/signup', {
            csrf,
            usuario: req.body,
            errors: e.errors
          });
        }
      });
    });
  }
}

const update = (req, res) => {};
const remove = (req, res) => {};

module.exports = { read, create, update, remove };
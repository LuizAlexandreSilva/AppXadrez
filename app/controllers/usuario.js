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
    const { senha, confirmaSenha } = req.body
    console.log(req.body)
    if (senha && senha !== confirmaSenha) {
      throw new Error('erro');
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
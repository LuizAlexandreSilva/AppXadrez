var models = require('../models/index');
const bcrypt = require('bcryptjs');
var Usuario = models.usuario;

const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
        layout: 'main'
    });
};
const read  = (req, res) => {};
const create = async function (req, res) {
  if (req.route.methods.get) {
    res.render('main/signup');
  } else {
    try {
      const { senha, confirmaSenha } = req.body
      console.log(senha, confirmaSenha)
      if (senha && senha !== confirmaSenha) {
        throw new Error('erro');
      }
      // bcrypt.genSalt(8, function(err, salt) {
      //   bcrypt.hash(req.body.senha, salt, async(err, hash) => {
      //     await Usuario.create({
      //         nome: req.body.nome,
      //         email: req.body.email,
      //         senha: hash,
      //         curso_id: req.body.curso
      //     });
      await Usuario.create(req.body)
      res.redirect('/');
        // });
      // })
    } catch (e) {
      console.log(e)
      res.render('main/signup', {
        usuario: req.body,
        errors: e.errors
      });
    }
  }
}

const update = (req, res) => {};
const remove = (req, res) => {};

module.exports = { index, read, create, update, remove };
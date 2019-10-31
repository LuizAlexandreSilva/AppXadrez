var models = require('../models/index');
var curso = models.curso;

const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
        layout: 'main'
    });
};
const read  = (req, res) => {};
const create = (req, res) => {};
const update = (req, res) => {};
const remove = (req, res) => {};

module.exports = { index, read, create, update, remove };
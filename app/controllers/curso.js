var models = require('../models/index');
var Curso = models.curso;

const index = async (req, res) => {
    const conteudo = 'Página principal da aplicação';
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        conteudo: conteudo,
        cursos,
        layout: 'main'
    });
};
const read  = (req, res) => {};
const create = (req, res) => {};
const update = (req, res) => {};
const remove = (req, res) => {};

module.exports = { index, read, create, update, remove };
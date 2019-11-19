var models = require('../models/index');
var Curso = models.curso;
var Area = models.area;
var layout = 'main';

const index = async (req, res) => {
    const csrf = req.csrfToken();
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        csrf,
        cursos,
        layout
    });
};

const read  = async (req, res) => {
    const curso = await Curso.findByPk(req.params.id, {
        include: [{
            model: Area,
            attributes: ['nome']
        }]
    });
    const areas = await Area.findAll();
    res.render('curso/read', {
        curso,
        areas,
        layout
    })
};

const create = async (req, res) => {
    const csrf = req.csrfToken();
    console.log(req)
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/create', {
            areas,
            csrf,
            layout
        });
    } else {
        try {
            await Curso.create(req.body);
            res.redirect('/curso/index')
        } catch (e) {
            res.render('curso/create', {
                curso: req.body,
                areas,
                csrf,
                errors: e.errors
            });
        }
    }
};

const update = async (req, res) => {
    const csrf = req.csrfToken();
    const curso = await Curso.findByPk(req.params.id);
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/update', {
            curso,
            areas,
            csrf,
            layout
        });
    } else {
        try {
            await curso.update(req.body);
            res.redirect('/curso/index');
        } catch (e) {
            res.render(`curso/update/${curso.id}`, {
                csrf,
                curso: req.body,
                areas,
                errors: e.errors
            });
        }
    }
};

const remove = async (req, res) => {
    const curso = await Curso.findByPk(req.params.id);
    try {
        await curso.destroy();
    } catch (e) {
        console.log(e);
    }
    res.redirect('/curso/index');
};

module.exports = { index, read, create, update, remove };
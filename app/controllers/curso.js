var models = require('../models/index');
var Curso = models.curso;
var Area = models.area;
var layout = 'main';

const index = async (req, res) => {
    const { session } = req;
    const cursos = await Curso.findAll();
    res.render('curso/index', {
        sessionId: session.uid,
        cursos,
        layout
    });
};

const read  = async (req, res) => {
    const { session } = req;
    const curso = await Curso.findByPk(req.params.id, {
        include: [{
            model: Area,
            attributes: ['nome']
        }]
    });
    const areas = await Area.findAll();
    res.render('curso/read', {
        sessionId: session.uid,
        curso,
        areas,
        layout
    })
};

const create = async (req, res) => {
    const csrf = req.csrfToken();
    const { session } = req;
    console.log(req)
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/create', {
            sessionId: session.uid,
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
                sessionId: session.uid,
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
    const { session } = req;
    const areas = await Area.findAll();
    if (req.route.methods.get) {
        res.render('curso/update', {
            sessionId: session.uid,
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
                sessionId: session.uid,
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
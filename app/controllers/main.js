const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
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
    /* bcrypt.hash(req.body.senha, 8, async(err, hash) => {
        await User.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: hash,
            id_curso: req.body.curso
        });
    }); */
    res.render('main/signup', {
        layout: 'main'
    });
}

const ui = (req, res) => {
    res.render('main/ui');
}

module.exports = { index, sobre, signup, ui }
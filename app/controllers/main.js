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

const ui = (req, res) => {
    res.render('main/ui');
}

module.exports = { index, sobre, ui }
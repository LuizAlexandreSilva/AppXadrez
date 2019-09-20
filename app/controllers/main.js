const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo: conteudo,
        layout: false
    });
}

const sobre = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/sobre', {
        conteudo: conteudo,
        layout: false
    });
}

module.exports = { index, sobre }
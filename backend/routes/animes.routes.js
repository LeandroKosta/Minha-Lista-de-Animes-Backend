const express = require('express');

const router = express.Router();

const animes = [
    {
    id: Date.now(),
    nome: 'Kimetsu no Yaiba: Mugen Ressha-hen',
    imagem: 'https://animesonline.cc/wp-content/uploads/2021/10/9hCxisL9IUO13Q0gelgqfMQ8KsP-185x278.jpg',
    genero: 'Ação, Demônios, Histórico, Shounen, Sobrenatural',
    nota: '10',
    status_anime: 'Assistindo'
    },    
    {
    id: Date.now(),
    nome: 'Boku no Hero Academia 5',
    imagem: 'https://animesorionvip.com/wsx/an/boku-no-hero-academia-5-todos-os-episodios-animes-orion.jpg',
    genero: 'Ação, Comedia, Shounen, Superporder, Vida Escolar',
    nota: '10',
    status_anime: 'Assistindo'
    },   
    {
    id: Date.now(),
    nome: 'Black Clover',
    imagem: 'https://animesorionvip.com/wsx/an/black-clover-todos-os-episodios-animes-orion.jpg',
    genero: 'Ação, Comedia, Fantasia, Magia, Shounen',
    nota: '10',
    status_anime: 'Assistindo'
    },   
    {
    id: Date.now(),
    nome: 'Tensei shitara Slime Datta Ken 2 Parte 2',
    imagem: 'https://animesorionvip.com/wsx/an/tensei-shitara-slime-datta-ken-2-parte-2-todos-os-episodios-animes-orion.jpg',
    genero: 'Sem Gênero',
    nota: '10',
    status_anime: 'Assistindo'
    },  
]

// [GET] /anime - Retornar uma lista de animes
router.get('/', (req, res) => {
    res.send(animes);
})

// [GET] /anime/{id} - Retorna um anime por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const anime = animes.find(anime => anime.id == idParam);

    // verifica se o anime foi encontrado.
    if(!anime) {
        res.status(404).send({error: 'Anime não encontrado!'});
        return;
    }
    res.send(anime);
})

// [POST] /anime/add - Cadastrar um novo anime.
router.post('/add', (req, res) => {
    
    const anime = req.body;

    if(!anime || !anime.nome || !anime.imagem || !anime.genero || !anime.nota || !anime.status_anime) {
        res.status(400).send({
            message: 'Falta preencher campos!'
        })
        return;
    }

    anime.id = Date.now();
    animes.push(anime);
    res.status(201).send({
        message: `Anime ${anime.nome} foi cadastrado com sucesso!`,
        data: anime
    });
})

// [PUT] /animes/edit/{id} - Edita um anime de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar o anime com o id recebido
    const animeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice do anime pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = animes.findIndex(anime => anime.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O anime que voce está tentando editar não foi encontrado'
        })
        return;
    }

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    animes[index] = {
        ...animes[index],
        ...animeEdit
    }

    res.send({
        message: `anime ${animes[index].nome} atualizada com sucesso`,
        data: animes[index]
    })
})

// [DELETE] /animes/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = animes.findIndex(anime => anime.id == idParam);
    const anime = animes[index];
    //excluimos a vaga da lista de acordo com o seu indice.
    animes.splice(index, 1);
    res.send({
        message: `Anime ${anime.nome} excluido com sucesso!`,
    })
})

// exporta as rotas para serem usadas no index.
module.exports = router;
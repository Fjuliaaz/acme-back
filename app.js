
/**
 * para realizar a inttegração com banco de dados precismos de uma biblioteca
 * 
 * SEQUELIZE ORM (biblioteca mais antiga)
 * PRISMA ORM (biblioteca mais atual)
 * FASTFY ORM (biblioteca mais atual)
 * 
     Instalação do prisma
     npm install prisma --save
     npm install @prisma/client --save

     após as instalações devemos roar o comando:
        npx prisma init (esse comando inicializa a utilização do prisma no projeto)

 */


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
})

//cria um objeto para definir o tipo de dados que ira chegar no body (json)
const bodyParserJSON = bodyParser.json();

/**
 **************** import dos arquivos internos do projeto************/

  const controllerFilmes = require('./controller/controller_filmes.js')

/*******************************************************************/

app.get('/v1/acme/filme/:id', cors(), async (request, response, next) => {

    let controleFilmeId = require('./controller/funcoes.js')
    let id = request.params.id

    let dadosFilme = controleFilmeId.getIdFilme(id)

    if (dadosFilme) {
        response.json(dadosFilme)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: "Não foi possivel encontrar um item" })
    }


})

app.get('/v2/acmefilmes/filmes', cors (), async function(request, response, next){

    let contentType = request.headers['content-type'];

    console.log(contentType);

    let dadosFilmes = await controllerFilmes.getListarfilmes();
    
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message:'Nenhum registro encontrado'});
        response.status(404);
    }
})

app.get('/v2/acmefilmes/filme/:id', cors(),async function(request,response,next){
    let idFilmes = request.params.id;

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilmes);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.post('/v2/acmefilmes/filmes' , cors(), bodyParserJSON, async function(request,response, next){

    contentType = request.headers['content-type']

    let dadosBody = request.body;

    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

app.listen(8080, () => {
    console.log('API funcionando')
})
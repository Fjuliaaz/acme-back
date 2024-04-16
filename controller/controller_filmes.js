/***********************************************************************
 * Objetivo: Arquivo responsável para realizar validações consistencia *
 * e a regra de negocio para os filmes                                 *
 * Data: 30/01/2024                                                    *
 * Autor: Julia Fonseca                                                *
 * Versão: 1.0                                                         *
 ***********************************************************************/


//import do arquivo DAO para manipular dados dos filmes 
const filmesDAO = require('../model/DAO/filme.js')

const message = require('../modulo/config.js')



//Função para inserir um novo filme no banco de dados
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65535 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
            ) {

                return message.ERROR_REQUIRED_FIELDS;  //400

            } else {


                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined) {


                    if (dadosFilme.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS

                    } else {
                        statusValidated = true; // vavalidação par liberar a inserção dos dados no DAO
                    }

                } else {
                    statusValidated = true; // vavalidação par liberar a inserção dos dados no DAO
                }

                // Se a variavel for verdadeira podemos encaminhar os dados para o DAO 
                if (statusValidated) {

                    let novoFilme = await filmesDAO.insertFilme(dadosFilme);

                    if (novoFilme) {

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        return novoFilmeJSON; //201

                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB;
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {

        return message.ERROR_INTERNAL_SERVER; //500 erro na camada da controller
    }
}


//Função para atualizar um filme existente
const setAtualizarFilme = async function () {

}

//Função para excluir um filme existente
const setExcluirFilme = async function (id) {


}

//Função para retormar todos os filmes do Banco de Dados
const getListarfilmes = async function () {

    let filmesJSON = {};

    let dadosFilmes = await fimesDAO.selectAllFilmes();

    //validação para criar o JSON dos dados 
    if (dadosFilmes) {
        //criar o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;

        return filmesJSON
    } else {
        return false;
    }

}

//Função para buscar um filme pelo ID
const getBuscarFilme = async function (id) {

    //receba o id encaminhado pelo app
    let idFilmes = id;

    let filmeJSON = {}

    //Validação para verificar o ID do Filme antes de encaminhar para o DAO
    if (idFilmes == '' || idFilmes == undefined || isNaN(idFilmes)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do Banco de Dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilmes)

        //Validação para verificar se o DAO retornou dados
        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                //Cria o JSON de retorno de dados
                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarfilmes
}

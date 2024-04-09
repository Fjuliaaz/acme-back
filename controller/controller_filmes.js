/***********************************************************************
 * Objetivo: Arquivo responsável para realizar validações consistencia *
 * e a regra de negocio para os filmes                                 *
 * Data: 30/01/2024                                                    *
 * Autor: Julia Fonseca                                                *
 * Versão: 1.0                                                         *
 ***********************************************************************/


//import do arquivo DAO para manipular dados dos filmes 
const fimesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme no banco de dados
const setInserirNovoFilme = async function() {

}

//Função para atualizar um filme existente
const setAtualizarFilme = async function() {

}

//Função para excluir um filme existente
const setExcluirFilme = async function(id) {


}

//Função para retormar todos os filmes do Banco de Dados
const getListarfilmes = async function() {

    let filmesJSON = {};

    let dadosFilmes = await filmesDAO.selectAllFilmes();

    //validação para criar o JSON dos dados 
    if (dadosFilmes) {
        //criar o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
    } else {
        return false;
    }

}

//Função para buscar um filme pelo ID
const getBuscarFilme = async function(id) {

}

module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarfilmes
}
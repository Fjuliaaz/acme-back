/***********************************************************************
 * Objetivo: Arquivo responsável para realizar o CRUD no banco de dados*
 * Data: 30/01/2024                                                    *
 * Autor: Julia Fonseca                                                *
 * Versão: 1.0                                                         *
 ***********************************************************************/

//import da biblioteca 
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

//Inserir um novo filme
const insertFilme = async function(){

}

//atualizar um filme existente filtrando pelo ID
const updateFilme = async function(id){

}

//Excluir um filme existente filtrando pelo ID
const deleteFilme = async function(id){

}

//Função para retornar todos os filmes do banco 
const selectAllFilmes = async function(){
    let sql = 'select * from tbl_filmes';

    /**
     * $queryRawUnsafe(sql)                     -- encaminha uma variavel
     * $queryRaw('select * from tbl_filme')     -- encaminha direto o script
     */

    // executa o script no BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //validação para retornar os dados ou retornar false
    if(rsFilmes.length > 0)
        return rsFilmes;
    else 
        return false;
}

//Buscar filme existente buscando pelo ID
const selectByIdFilme = async function(id){

}

module.exports ={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}
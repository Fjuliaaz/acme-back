/***********************************************************************
 * Objetivo: Arquivo responsável para realizar o CRUD no banco de dados*
 * Data: 30/01/2024                                                    *
 * Autor: Julia Fonseca                                                *
 * Versão: 1.0                                                         *
 ***********************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// inserir um novo filme
const insertFilme = async(dadosFilme) => {
    try {

        let sql

        if (dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == '' ||
            dadosFilme.data_relancamento == undefined) {

            sql = `insert into tbl_filme (
                                                nome, 
                                                sinopse, 
                                                duracao, 
                                                data_lancamento,
                                                data_relancamento,
                                                foto_capa,
                                                valor_unitario
                                            )values (
                                                '${dadosFilme.nome}',
                                                '${dadosFilme.sinopse}',
                                                '${dadosFilme.duracao}',
                                                '${dadosFilme.data_lancamento}',
                                                null,
                                                '${dadosFilme.foto_capa}',
                                                ${dadosFilme.valor_unitario}
                                            )`

        } else {
            sql = `insert into tbl_filme (
                                                nome, 
                                                sinopse, 
                                                duracao, 
                                                data_lancamento,
                                                data_relancamento,
                                                foto_capa,
                                                valor_unitario
                                            )values (
                                                '${dadosFilme.nome}',
                                                '${dadosFilme.sinopse}',
                                                '${dadosFilme.duracao}',
                                                '${dadosFilme.data_lancamento}',
                                                '${dadosFilme.data_relancamento}',
                                                '${dadosFilme.foto_capa}',
                                                ${dadosFilme.valor_unitario}
                                            )`
        }

        // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
        // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
        let result = await prisma.$executeRawUnsafe(sql)
            // validação para verificar se o insert funcionou no DB
        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

        return false

    }
}

// atualizar um filme existente filtrando pelo ID
const updateFilme = async(id) => {

}

// excluir um filme existente filtrando pelo ID
const deleteFilme = async(id) => {

    try {
        let sql = `DELETE FROM tbl_filme WHERE tbl_filme.id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme

    } catch (error) {
        return false
    }
}

// listar todos os filmes
const selectAllFilmes = async() => {

    try {
        let sql = 'select * from tbl_filme order by id desc'

        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdFilme = async(id) => {

    try {

        // realiza a busca do filme pelo id
        let sql = `select * from tbl_filme where id=${id}`

        // executa no DBA o script SQL
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {
        return false
    }
}

const selectByNome = async(nome) => {

    try {
        let sql = `select * from tbl_filme where nome like '%${nome}%'`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        console.log('to aqui 3')

        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectLastId = async() => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1'

        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {

        return false

    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome,
    selectLastId
}
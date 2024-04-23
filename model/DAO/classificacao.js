

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertClassificacao = async (dadosClassificacao) => {
    try {
        let sql = `insert into tbl_classificacao (nome, 
                                                    sigla, 
                                                    descricao, 
                                                    icone
                                                    ) values (
                                                              '${dadosClassificacao.nome}', 
                                                              '${dadosClassificacao.sigla}', 
                                                              '${dadosClassificacao.descricao}',
                                                              '${dadosClassificacao.icone}'
                                                              )`
        let result = await prisma.$executeRawUnsafe(sql)
        
        return result
    } catch (error) {
        return false
    }
}

// selecionar o último ID de classificação
const selectId = async () => {
    try {
        let sql = 'select CAST(id as DECIMAL) as id FROM tbl_classificacao order by id desc limit 1'
        
        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

        if (rsClassificacoes.length > 0) {
            return rsClassificacoes[0].id
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// atualizar classificação
const updateClassificacao = async (idClassificacao, dadosClassificacao) => {

    let sql

    try {
            sql = `update tbl_classificacao set 
                                                    nome = '${dadosClassificacao.nome}', 
                                                    sigla = '${dadosClassificacao.sigla}', 
                                                    descricao = '${dadosClassificacao.descricao}', 
                                                    icone = '${dadosClassificacao.icone}' 
                                                    where id = ${idClassificacao}`
        let result = await prisma.$executeRawUnsafe(sql)
        
        return result

    } catch (error) {
        return false
    }
}

// deletar classificação no Banco
const deleteClassificacao = async (id) => {

    try {

        let sql = `delete from tbl_classificacao where id = ${id}`

        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

        return rsClassificacoes

    } catch (error) {
        return false
    }
}

// selecionar classificação pelo ID
const selectByIdClassificacao = async (id) => {

    try {

        let sql = `select * from tbl_classificacao where id = ${id}`
        
        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

        return rsClassificacoes

    } catch (error) {
        return false
    }
}

// chamar todas as classificações
const selectAllClassificacoes = async () => {

    try {

        let sql = 'select * from tbl_classificacao'
        
        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

        return rsClassificacoes

    } catch (error) {
        return false
    }
}

// chamar a classificação pelo nome
const selectByNomeClassificacao = async (nome) => {

    try {

        let sql = `select * from tbl_classificacao where nome like '%${nome}%'`
        
        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)

        return rsClassificacoes

    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacao,
    selectId,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectByIdClassificacao,
    selectByNomeClassificacao
}
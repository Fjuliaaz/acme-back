

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertNacionalidade = async (dadosNacionalidade) => {

    try {
        let sql

        sql = `insert into tbl_nacionalidade(nome) values('${dadosNacionalidade.nome}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false


    } catch (error) {

        return false
    }

}

const selectId = async () => {
    try {
        let sql = 'select CAST(id as DECIMAL)as id from tbl_nacionalidade order by id desc limit 1'

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)

        if (rsNacionalidades) {
            return rsNacionalidades[0].id  
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const updateNacionalidade = async (idNacionalidade, dadosNacionalidade) => {

    let sql

    try {
        sql = `update tbl_nacionalidade set nome = '${dadosNacionalidade.nome}' where id = ${idNacionalidade}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        return result

    } catch (error) {

        return false
    }

}


const deleteNacionalidade = async (id) => {

    try {
        let sql = `delete from tbl_nacionalidade where id = ${id}`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidades

    } catch (error) {
        return false
    }

}

const selectByIdNacionalidade = async (id) => {

    try {
        let sql = `select * from tbl_nacionalidade where id = ${id}`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidades

    } catch (error) {
        return false
    }


}

const selectAllNacionalidades = async () => {

    try {
        let sql = 'select * from tbl_nacionalidade'

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidades

    } catch (error) {

        return false

    }

}


const selectByNomeNacionalidade = async (nome) => {
    try {
        let sql = `select * from tbl_nacionalidade where nome like '%${nome}%'`

        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidades

    } catch (error) {
        return false
    }
}

const selectNacionalidadeDiretor = async function(id){

    try {
        // Script sql para buscar o filme pelo id
        const sql = `select tbl_diretor.nome_artistico, tbl_diretor.data_nascimento, tbl_diretor.biografia, tbl_diretor.foto, tbl_diretor.tbl_sexo_id, tbl_nacionalidade.nome
        from tbl_diretor left join tbl_nacionalidade_diretor on tbl_diretor.id = tbl_nacionalidade_diretor.id_diretor 
            left join tbl_nacionalidade on tbl_nacionalidade.id = tbl_nacionalidade_diretor.id_nacionalidade where tbl_diretor.id = ${id};
      `
    
        // envia script sql para o banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)
    
        return rsFilme
    } catch (error) {
        return false
    }

}

module.exports = {
    insertNacionalidade,
    selectId,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidades,
    selectByIdNacionalidade,
    selectByNomeNacionalidade,
    selectNacionalidadeDiretor
}


const { PrismaClient } = require('@prisma/client')


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const insertDiretor = async function(dadosDiretor){
    let sql

     try {
        if(
        dadosDiretor.data_falecimento == '' ||
         dadosDiretor.data_falecimento   == null ||
         dadosDiretor.data_falecimento  == undefined){
            sql = `insert into tbl_diretor (
                nome, 
                nome_artistico,
                data_nascimento,
                foto,
                biografia,
                tbl_sexo_id        
                )values(
               '${dadosDiretor.nome}',
               '${dadosDiretor.nome_artistico}',
               '${dadosDiretor.data_nascimento}',
               '${dadosDiretor.foto}',
               '${dadosDiretor.biografia}',
               '${dadosDiretor.tbl_sexo_id}'                                    
                );`

        }else{
            
            sql = `insert into tbl_diretor (
                nome, 
                nome_artistico,
                data_nascimento,
                data_falecimento,
                foto,
                biografia,
                tbl_sexo_id
                )values(
               '${dadosDiretor.nome}',
               '${dadosDiretor.nome_artistico}',
               '${dadosDiretor.data_nascimento}',
               '${dadosDiretor.data_falecimento}',
               '${dadosDiretor.foto}',
               '${dadosDiretor.biografia}',
               '${dadosDiretor.tbl_sexo_id}'
                );`
        }

             //$executeRawUnsafe() -> serve para executar scripts sem retorno de dados 
               // (insert, update e delete)
            //$queryRawUnsafe() -> serve para executar scripts com retorno de dados (select)

            let result = await prisma.$executeRawUnsafe(sql)
            
            return result
        
     } catch (error) {
        return false
     }
}

const updateDiretor = async function(dadoAtualizado, idDiretor) {
    let sql
    try{
        if(dadoAtualizado.data_falecimento != '' &&
        dadoAtualizado.data_falecimento   != null &&
        dadoAtualizado.data_falecimento   != undefined){
            sql = `update tbl_diretor set 
            nome = '${dadoAtualizado.nome}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            data_falecimento = '${dadoAtualizado.data_falecimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            where
            tbl_diretor.id_diretor = ${idDiretor}`
        }else{
            sql = `update tbl_diretor set 
            nome = '${dadoAtualizado.nome}',
            data_nascimento = '${dadoAtualizado.data_nascimento}',
            biografia = '${dadoAtualizado.biografia}',
            foto = '${dadoAtualizado.foto}',
            id_sexo = '${dadoAtualizado.id_sexo}'
            where
            tbl_diretor.id_diretor = ${idDiretor}`
        }
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result){
           return true
        }else{
           return false
        }
    }catch(error){
        return false
    } 
}

const deleteDiretor = async function(id){
    try {
        const sql = `delete from tbl_diretor where id_diretor = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme

    } catch (error) {
        return false
    }
}

const deleteDiretorNacionalidade = async function(id){
    try {
        const sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme

    } catch (error) {
        return false
    }
}

const selectAllDiretor = async function(){
    try {
        let sql = 'select * from tbl_diretor'
    
        // $queryRawUnsafe(sql)
        // $queryRawUnsafe('select * from tbl_filme')
        let rsFilmes = await prisma.$queryRawUnsafe(sql) 
        return rsFilmes
    } catch (error) {
        return false
    }



}

const selectByIdDiretor = async function(id){

    try {
        // Script sql para buscar o filme pelo id
        const sql = `select * from tbl_diretor where id_diretor = ${id}`
    
        // Caminha o script sql para o banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)
    
        return rsFilme
    } catch (error) {
        return false
    }

}

const selectNameDiretor = async function(nome){
    try {
        let sql = `select * from tbl_diretor where nome like"%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

const IDDiretor = async function(){
    try {
        let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_diretor limit 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}


module.exports = {
    selectAllDiretor,
    selectByIdDiretor,
    selectNameDiretor,
    deleteDiretor,
    deleteDiretorNacionalidade,
    insertDiretor,
    updateDiretor,
    IDDiretor
}
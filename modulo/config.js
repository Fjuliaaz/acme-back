/********************************************************************
 * Objetivo: Arquivo responsavel pelas variaveis globais do projeto,
 * onde haveram mensagens,status_code e outros para o projeto
 * 
 * Data:20/02/24
 * Autor: Julia Fonseca
 * Versão: 1.0
**********************************************************************

********************* MENSAGEM DE ERRO DO PROJETO ********************/

const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é valido' }
const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Nenhum item encontrado na requisição' }
const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: 'Ocorreram Erros no processamento do Banco de Dados da API !!' }
const ERROR_REQUIRED_FIELDS = { status: false, status_code: 404, message: 'Existe campos obrigatorios que não foram preenchidos, ou ultrapassaram o limite de caracteres!' }
const ERROR_CONTENT_TYPE = { status: false, status_code: 415, message: 'O content-type de requisição não é suportado na API. Favor usar um dado de formato application/json' }
const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: 'Ocorreram erros no servidor back-end na camada de serviços, portanto não foi possivel processar a requisição. Contate o administrador da API' }

/******************** MENSAGEM DE SUCESSO ****************************/

const SUCCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'O item foi criado com sucesso no banco de dados' }


module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER
}
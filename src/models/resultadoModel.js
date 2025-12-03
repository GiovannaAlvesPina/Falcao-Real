const { preencherRanking } = require("../controllers/resultadoController");
var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function registrarResultado(certas, erradas, idUsuario) {
  console.log(
    "ACESSEI O RESULTADO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrarResultado():",
    certas,
    erradas,
    idUsuario
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO resultado (acertos, erros, fkQuiz, fkUsuarios) VALUES ('${certas}', '${erradas}', 1, '${idUsuario}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarDados(idUsuario) {
  console.log(
    "ACESSEI OS DADOS DO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idUsuario
  );
  var instrucaoSql = `
        SELECT 
        COUNT(idResultado) AS tentativas,
        MAX(acertos) AS melhorPontuacao
        FROM resultado WHERE fkUsuarios = ${idUsuario};
        `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pegarRanking() {
  console.log(
    "ACESSEI OS DADOS DO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
  );
  var instrucaoSql = `SELECT 
    u.nome,
    SUM(r.acertos) AS melhorPontuacao
    FROM resultado r
    JOIN usuarios u ON u.idUsuario = r.fkUsuarios
    GROUP BY r.fkUsuarios
    ORDER BY melhorPontuacao DESC
    LIMIT 5;`
        
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarDadosGrafico(idUsuario) {
  console.log(
    "ACESSEI OS DADOS DO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    idUsuario
  );
  var instrucaoSql = `
        SELECT acertos, erros FROM resultado WHERE fkUsuarios = ${idUsuario} ORDER BY idResultado DESC LIMIT 1;`;
        
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  registrarResultado,
  buscarDados,
  pegarRanking,
  buscarDadosGrafico
};

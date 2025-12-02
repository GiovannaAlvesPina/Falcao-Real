var resultadoModel = require("../models/resultadoModel");


function registrarResultado(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var certas = req.body.certasServer;
    var erradas = req.body.erradasServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (certas == undefined) {
        res.status(400).send("Suas respostas estão undefined!");
    } else if (erradas == undefined) {
        res.status(400).send("Suas respostas estão undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("seu id está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        resultadoModel
            .registrarResultado(certas, erradas, idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarDados(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        resultadoModel
            .buscarDados(idUsuario)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length >= 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Dados da dash inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a busca de dados! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function pegarRanking(req, res) {

    resultadoModel.pegarRanking()
        .then((resultado) => {

            if (resultado.length > 0) {
                console.log(resultado);
                res.status(200).send(resultado);
            }
            else {
                res.status(204).json([])
            }
        }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a busca de dados! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            
        });
}

function buscarDadosGrafico(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        resultadoModel
            .buscarDadosGrafico(idUsuario)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado.length >= 1) {
                    console.log(resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Dados da dash inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a busca de dados! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    registrarResultado,
    buscarDados,
    pegarRanking,
    buscarDadosGrafico
};

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
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        resultadoModel.registrarResultado(certas, erradas, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
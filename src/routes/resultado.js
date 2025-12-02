var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/registrarResultado", function (req, res) {
    resultadoController.registrarResultado(req, res);
})

router.get("/buscarDados/:idUsuario", function (req, res) {
    resultadoController.buscarDados(req, res);
})

router.get("/pegarRanking", function (req, res) {
    resultadoController.pegarRanking(req, res);
})

router.get("/buscarDadosGrafico/:idUsuario", function (req, res) {
    resultadoController.buscarDadosGrafico(req, res);
})

module.exports = router;
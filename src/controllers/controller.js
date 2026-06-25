const authService = require('../services/authService');
const axios = require('axios');

const jogosService = require('../services/jogosService');
const palpiteService = require('../services/criarPalpiteService');

// login
async function login(req, res) {
  const { email, senha } = req.body;

  const result = await authService.ServerLogin(email, senha);

  return res.status(result.status).json(result.data);
}

// Chamando a API Externa para mostrat os jogos
async function listarJogos(req, res) {
  try {

    const jogos = await jogosService.listarJogos();

    return res.status(200).json(jogos);

  } catch (error) {

    return res.status(500).json({
      mensagem: "Erro ao consultar a API (Controller)."
    });

  }

}

// Chamando a função criarPalpites
async function criarPalpite(req, res) {
  try {

    const resultado = await palpiteService.criarPalpite(
      req.body,
      req.usuario.id
    );

    return res.status(200).json(resultado);

  } catch (error) {

    return res.status(500).json({
      mensagem: "Erro ao criar Palpites."
    });

  }
}

module.exports = { login, listarJogos, criarPalpite };
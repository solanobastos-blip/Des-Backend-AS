const authService = require('../services/authService');

// login
async function login(req, res) {
  const { email, senha } = req.body;

  const result = await authService.ServerLogin(email, senha);

  return res.status(result.status).json(result.data);
}

// Rota de listagem de jogos chamando API externa
const jogosService = require('../services/jogosService');

async function listarJogos(req, res) {
  try {

    const jogos = await jogosService.listarJogos();

    return res.status(200).json(jogos);

  } catch (error) {

    return res.status(500).json({
      mensagem: "Erro ao consultar a API."
    });

  }

}

module.exports = { login, listarJogos };
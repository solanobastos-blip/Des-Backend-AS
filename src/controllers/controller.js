const authService = require('../services/authService');
const axios = require('axios');

const jogosService = require('../services/jogosService');
const palpiteService = require('../services/criarPalpiteService');
const listartPalpiteService = require('../services/listarPalpitesService');
const buscarPalpitePorId = require('../services/buscarPalpitePorId')
const atualizarGolsPalpite = require('../services/atualizarPalpiteService');
const deletarPalpiteDoBanco = require('../services/deletarPalpiteService');

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

// Listar palpites de um usuarios
async function listarMeusPalpites(req, res) {

  try {
    const usuario_id = req.usuario.id;

    const palpites = await listartPalpiteService.listaPalpitesService(usuario_id);

    return res.status(200).json(palpites);

  } catch (error) {
    console.error('Erro no Controller ao listar palpites:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar os palpites.' });
  }
}

// Atualizar os palpites daquele usuario que solicitou
async function atualizarMeusPalpites(req, res) {
  try {
    const { id } = req.params;
    const { gols_a, gols_b } = req.body;

    const usuario_id_logado = req.usuario.id;

    if (gols_a === undefined || gols_b === undefined) {
      return res.status(400).json({ error: 'Os campos gols_a e gols_b são obrigatórios.' });
    }

    const palpite = await buscarPalpitePorId.buscarPalpitePorId(id);

    if (!palpite) {
      return res.status(404).json({ error: 'Palpite não encontrado.' });
    }

    if (palpite.usuario_id !== usuario_id_logado) {

      return res.status(403).json({ error: 'Acesso negado. Você não é o dono deste palpite.' });
    }

    const palpiteAtualizado = await atualizarGolsPalpite(id, gols_a, gols_b);

    return res.status(200).json(palpiteAtualizado);

  } catch (error) {
    console.error('Erro no Controller ao atualizar palpite:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar o palpite.' });
  }
};

// Deletar palpite do usuario pelo id do palpite
async function deletarMeuPalpite(req, res) {
  try {
    // 1. Receber o id do palpite na URL (Params)
    const { id } = req.params;

    // 2. Obter o id do usuário a partir do token
    const usuario_id_logado = req.usuario.id;

    // 3. Verificar no banco se o palpite existe  
    const palpite = await buscarPalpitePorId.buscarPalpitePorId(id);

    if (!palpite) {
      return res.status(404).json({ error: 'Palpite não encontrado.' });
    }

    // 3. Verificar se o palpite pertence ao usuário logado (usando igualdade forte)
    if (Number(palpite.usuario_id) === Number(usuario_id_logado)) {

      // 5. Se pertencer, efetua o delete na tabela utilizando o Knex
      await deletarPalpiteDoBanco.deletarPalpiteDoBanco(id);

      // 6. Retornar mensagem de sucesso
      return res.status(200).json({ message: 'Palpite deletado com sucesso!' });

    } else {
      // 4. Se NÃO pertencer, cai no else e barra a exclusão
      return res.status(403).json({ error: 'Acesso negado. Você não pode deletar o palpite de outro competidor.' });
    }
  } catch (error) {
    console.error('Erro no Controller ao deletar palpite:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar o palpite.' });
  }
};

module.exports = { login, listarJogos, criarPalpite, listarMeusPalpites, atualizarMeusPalpites, deletarMeuPalpite };
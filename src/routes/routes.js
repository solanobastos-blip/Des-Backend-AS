const express = require('express');
const routes = express.Router();

const db = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = require('../controllers/controller');
const authMiddleware = require('../middleware/authMiddleware');

// Rota Pública para logar
routes.post('/login', controller.login);

// Rota de listagem de jogos
routes.get('/api/jogos', controller.listarJogos);

// Registrar novo palpite
routes.post("/api/palpites", authMiddleware, controller.criarPalpite);

// Listar meus palpites
routes.get('/api/verpalpites', authMiddleware, controller.listarMeusPalpites);

// Atualizr palpite pelo ID do palpite
routes.put('/api/palpites/:id', authMiddleware, controller.atualizarMeusPalpites);

// Deletar meu palpite pelo id do palpite
routes.delete('/api/deletarpalpite/:id', authMiddleware, controller.deletarMeuPalpite);

// Rota de teste simples para verificar se a API está no ar
routes.get('/', (req, res) => {
  return res.json({ mensagem: 'API do Bolão da Copa 2026 rodando com sucesso!' });
});

routes.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await db('usuarios').select('*');
    return res.json(usuarios);
  }
    catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

module.exports = routes;
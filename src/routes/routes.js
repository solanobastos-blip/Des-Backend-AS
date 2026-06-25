const express = require('express');
const routes = express.Router();

const db = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = require('../controllers/controller');
const jogosController = require('../controllers/controller');

// Rota Pública para logar
routes.post('/login', loginController.login);

// Rota de listagem de jogos
routes.get('/api/jogos', jogosController.listarJogos);

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
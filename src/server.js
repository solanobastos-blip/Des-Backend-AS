const express = require('express');

const app = express();

// Middleware para permitir que a API receba requisições no formato JSON
app.use(express.json());

// Rota de teste simples para verificar se a API está no ar
app.get('/', (req, res) => {
  return res.json({ mensagem: 'API do Bolão da Copa 2026 rodando com sucesso!' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta 🚀 ${PORT}`);
});
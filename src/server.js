const express = require('express');
const app = express();
const routes = require('./routes/routes');
require("dotenv").config(); 
const PORT = 3000;
// Middleware para permitir que a API receba requisições no formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura as rotas da aplicação
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta 🚀 ${PORT}`);
});
const express = require('express');
const cors = require('cors');

const app = express();

//Habilitar o browser para enviar requisições e receber JSON
app.use(cors());
app.use(express.json());

//Log das requisições
app.use((req, res, next) => {
  console.log("-------### LOG da Requisição ###-------");
  console.log("TIME: ", new Date().toLocaleString());
  console.log("METODO: ", req.method);
  console.log("ROTA: ", req.url);
  next();
});

// TODO: Membro 1 - Importar e mapear rota de alunos
const alunosRouter = require('./routes/AlunoController');
app.use('/alunos', alunosRouter); 
// TODO: Membro 2 - Importar e mapear rota de professores

// TODO: Membro 3 - Importar e mapear rota de coordenadores

const coordenadoresRouter = require('./routes/CoordenadorController');
app.use('/coordenadores', coordenadoresRouter);

// executa
app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})

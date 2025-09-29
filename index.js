const express = require('express')
const app = express()


// intermediários
const cors = require('cors')
// habilita o browser pra mandar uma requisição
app.use(cors())
// habilita receber json como corpo da requisição
app.use(express.json())
// Log
app.use((req, res, next) => {
  console.log("-------### LOG da Requisição ###-------")
  console.log("TIME: ", new Date().toLocaleString())
  console.log("METODO: ", req.method)
  console.log("ROTA: ", req.url)
  next()
})
// TODO: Membro 1 - Importar e mapear rota de alunos

// TODO: Membro 2 - Importar e mapear rota de professores
const professoresRouter = require('./routes/professores');
app.use('/professores', professoresRouter);
// TODO: Membro 3 - Importar e mapear rota de coordenadores
// Roteadores

// executa
app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})
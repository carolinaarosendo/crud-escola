// Implementa CRUD de Alunos
const express = require('express')
const router = express.Router()

// mapeamento dos endpoints e a lógica
// Lista de Alunos para simular o banco dados
let ListaAlunos = [
  {
    id: 1,
    nome: "João Pedro",
    cpf: "12312345678",
    email: "joao@pedro.com",
    dataNascimento: "01/01/2000",
    telefone: "11999999999"
  },
  {
    id: 2,
    nome: "Maria Pedro",
    cpf: "12312345690",
    email: "maria@pedro.com",
    dataNascimento: "01/01/1990",
    telefone: "11988888888"
  }
]

// Criar CRUD
// - POST /alunos
router.post('/alunos', (req, res, next) => {
  const { nome, cpf, email, dataNascimento } = req.body
  // validar se os dados vinheram
  if (!nome || !cpf || !email || !dataNascimento || !telefone) {
    return res.status(400).json({ error: "nome, cpf, email, dataNascimento e telefone são obrigatorios!!!!" })
  }
  // validar se o CPF já existe
  const aluno = ListaAlunos.find(aluno => aluno.cpf == cpf)
  if (aluno) {
    return res.status(409).json({ error: "CPF Já cadastrado!!!" })
  }
  // cadastrar a novo aluno na lista
  const novoAluno = {
    id: Date.now(),
    nome,
    cpf,
    email,
    dataNascimento,
    telefone
  }
  // inserir novo aluno montada na lista
  ListaAlunos.push(novoAluno)
  res.status(201).json({ message: "Aluno cadastrado!!!", novoAluno })
})

// Listar Todos
// - GET /alunos
router.get('/alunos', (req, res, next) => {
  res.json(ListaAlunos)
})

// Buscar um
// - GET /alunos/{id}
router.get('/alunos/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const aluno = ListaAlunos.find(a => a.id == idRecebido)
  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!!!" })
  }
  res.json(aluno)
})

// Atualizar
// - PUT /alunos/{id}
router.put('/alunos/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const { nome, email, dataNascimento, telefone } = req.body
  // validar se os dados vinheram
  if (!nome || !email || !dataNascimento || !telefone) {
    return res.status(400).json({ error: "nome, email, dataNascimento e telefone são obrigatórios!!!" })
  }
  // validar se a pessoa com aquele ID existe na lista
  const aluno = ListaAlunos.find(aluno => aluno.id == idRecebido)
  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!!!"})
  }
  // Sobrescrevo os dados do aluno para atualizar
  aluno.nome = nome
  aluno.email = email
  aluno.dataNascimento = dataNascimento
  aluno.telefone = telefone
  res.json({ message: "Aluno atualizado com sucesso!!!" })
})

// Deletar
// - DELETE /alunos/{id}
router.delete('/alunos/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const aluno = ListaAlunos.find(aluno => aluno.id == idRecebido)
  if(!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!!!"})
  }
  // sobrescreve a lista com uma nova sem o aluno do idRecebido
  ListaAlunos = ListaAlunos.filter(a => a.id != idRecebido)

  res.json({ message: "Aluno excluído com sucesso!!!"})
})

module.exports = router
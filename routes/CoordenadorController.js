//Branch da Ana Clara: routes/CoordenadorController.js

const express = require('express'); 
const router = express.Router();

//Dados dos coordenadores: 
let coordenadores = [
  { id: '1', nome: 'Luciana Prado', email: 'luciana23@gmail.com', cpf: '55566677799', setor: 'Administração', telefone: '11912345678' },
  { id: '2', nome: 'Rafael Gomes', email: 'gomesrafa55@outlook.com', cpf: '69122876305', setor: 'Pedagógico', telefone: '11987654321' },
  { id: '3', nome: 'Mariana Silva', email: 'mariana.silva96@gmail.com', cpf: '99631025877', setor: 'Financeiro', telefone: '11911223344' },
  { id: '4', nome: 'Carlos Souza', email: 'carlos8267@gmail.com', cpf: '88899900022', setor: 'Recursos Humanos', telefone: '11922334455' },
  { id: '5', nome: 'Ana Beatriz', email: 'biacardoso22@outlook.com', cpf: '99833049625', setor: 'TI', telefone: '11933445566' },
  { id: '6', nome: 'Fernando Lima', email: 'fernando33lima@outlook.com', cpf: '88533941678', setor: 'Logística', telefone: '11944556677' }
];

function generateId() { return Date.now().toString(); }

//GET /coordenadores
router.get('/', (req, res) => {
  res.json(coordenadores);
});

//GET /coordenadores/:id
router.get('/:id', (req, res) => {
  const c = coordenadores.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: '---Coordenador não encontrado---' });
  res.json(c);
});

//POST /coordenadores
router.post('/', (req, res) => {
  const { nome, email, cpf, setor, telefone } = req.body;
  if (!nome || !email || !cpf || !setor) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, cpf, setor!!!!' });
  }
  if (coordenadores.some(c => c.cpf === cpf)) {
    return res.status(400).json({ error: 'Este CPF já cadastrado!!!' });
  }
  const novo = { id: generateId(), nome, email, cpf, setor, telefone: telefone || '' };
  coordenadores.push(novo);
  res.status(201).json(novo);
});

//PUT /coordenadores/:id
router.put('/:id', (req, res) => {
  const index = coordenadores.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '---Coordenador não encontrado---' });

  const { nome, email, cpf, setor, telefone } = req.body;
  if (!nome || !email || !cpf || !setor) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, cpf, setor!!!' });
  }
  const cpfDup = coordenadores.find(c => c.cpf === cpf && c.id !== req.params.id);
  if (cpfDup) return res.status(400).json({ error: 'CPF já cadastrado para outro coordenador' });
 
  const atualizado = { id: req.params.id, nome, email, cpf, setor, telefone: telefone || '' };
  coordenadores[index] = atualizado;
  res.json(atualizado);
});

//DELETE /coordenadores/:id
router.delete('/:id', (req, res) => {
  const index = coordenadores.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Coordenador não encontrado' });
  coordenadores.splice(index, 1);
  res.json({ message: '---Coordenador removido---' });
});

module.exports = router;
const express = require('express');
const router = express.Router();

let professores = [
  { id: 1,
     nome: "Gustavo Clay", 
    departamento: "Construção de Backend", 
    email: "gustavoclay@gmail.com"
 },
  { id: 2,
     nome: "Marcelo Paiva",
     departamento: "Engenharia de Software",
      email: "marcelopaiva@gmail.com" 
    },
  { id: 3,
     nome: "Roger Rocha",
     departamento: "Estrutura de Dados" ,
      email: "rogerrocha@gmail.com" 
    },
  { id: 4, 
    nome: "Miguel Muñoz",
     departamento: "Gerenciamento de projetos",
      email: "miguel10@gmail.com" 
    },
  { id: 5, 
    nome: "Vivian Macedo", 
    departamento: "Algoritmo", 
    email: "vivian23@gmail.com" 
}
];

router.get('/', (req, res) => {
  res.json(professores);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const professor = professores.find(p => p.id === id);
  if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });
  res.json(professor);
});

router.post('/', (req, res) => {
  const { nome, departamento, email } = req.body;
  if (!nome || !email) return res.status(400).json({ error: 'nome e email são obrigatórios' });

  if (professores.some(p => p.email === email)) {
    return res.status(409).json({ error: 'email já cadastrado' });
  }

  const id = professores.length ? Math.max(...professores.map(p => p.id)) + 1 : 1;
  const novo = { id, nome, departamento, email };
  professores.push(novo);
  res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const professor = professores.find(p => p.id === id);
  if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });

  const { nome, departamento, email } = req.body;
  if (email && professores.some(p => p.email === email && p.id !== id)) {
    return res.status(409).json({ error: 'email já cadastrado' });
  }

  professor.nome = nome ?? professor.nome;
  professor.departamento = departamento ?? professor.departamento;
  professor.email = email ?? professor.email;

  res.json(professor);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = professores.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Professor não encontrado' });

  const removido = professores.splice(idx, 1)[0];
  res.json(removido);
});

module.exports = router;
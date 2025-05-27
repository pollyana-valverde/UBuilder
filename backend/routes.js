const express = require('express');
const connection = require('./db');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurando o armazenamento do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para a imagem
    },
});

const upload = multer({ storage: storage });

/////////////////////////////////////////////login///////////////////////////////////////////////////
//Rota para buscar o cfp e senha necessários no login
router.post('/login/:email/:senha', (req, res) => {
    const { email, senha } = req.params;

    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (err, results) => {
            if (err) {
                console.error('Erro ao buscar o registro do cadastro:', err);
                return res.status(500).json({ error: 'Erro ao buscar o cadastro' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Cadastro não encontrado' });
            }

            const user = results[0];

            res.json({
                idUsuario: user.idUsuario, 
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                telefone: user.telefone,
                cpf: user.cpf,
                endereco: user.endereco,
                senha: user.senha,
                tipoUser: user.tipoUser,
            });
        }
    );
});

///////////////////////////////////////////// usuários ////////////////////////////////////////////////
// Rota para listar todos os registros
router.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar os registros:', err);
            res.status(500).json({ error: 'Erro ao buscar os registros' });
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um registro específico pelo ID
router.get('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o registro:', err);
            res.status(500).json({ error: 'Erro ao buscar o registro' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Registro não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Rota para criar um novo registro
router.post('/usuarios', (req, res) => {
    const { nome, sobrenome, email, cpf, endereco, telefone, senha } = req.body;

    connection.query('INSERT INTO usuarios (nome, sobrenome, email, cpf, endereco, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, sobrenome, email, cpf, endereco, telefone, senha], (err, result) => {
            if (err) {
                console.error('Erro ao criar o registro:', err);
                res.status(500).json({ error: 'Erro ao criar o registro' });
                return;
            }
            res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
        });
});

// Rota para atualizar um registro existente pelo ID
router.put('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const { nome, sobrenome, email, cpf, endereco, telefone, senha } = req.body;

    connection.query('UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, senha = ? WHERE idUsuario = ?',
        [nome, sobrenome, email, cpf, endereco, telefone, senha, idUsuario,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para atualizar uma senha existente pelo ID
router.put('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const { senha } = req.body;

    connection.query('UPDATE usuarios SET  senha = ? WHERE idUsuario = ?',
        [senha, idUsuario,], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o registro:', err);
                res.status(500).json({ error: 'Erro ao atualizar o registro' });
                return;
            }
            res.json({ message: 'Registro atualizado com sucesso' });
        });
});

// Rota para excluir um registro pelo ID
router.delete('/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o registro:', err);
            res.status(500).json({ error: 'Erro ao excluir o registro' });
            return;
        }
        res.json({ message: 'Registro excluído com sucesso' });
    });
});

module.exports = router;
import { api } from './services/api.js';

// ===== TELA DE CADASTRO =====
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
        const serie = document.getElementById('serie').value;
        const btnSubmit = formCadastro.querySelector('button[type="submit"]');

        // 1. Estado Ocioso
        if (!nome || !email || !senha || !serie) return alert('Preencha todos os campos!');
        if (senha !== confirmarSenha) return alert('As senhas não coincidem.');

        // 2. Estado de Carregamento
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Cadastrando...';

        try {
            await api.post('/usuarios/cadastro', { nome, email, senha, serie });
            // 3. Estado de Sucesso
            alert('Cadastro realizado com sucesso! 🎉');
            window.location.href = 'index.html';

        } catch (error) {
            // 4. Estado de Erro
            alert(error.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = 'Cadastrar';
        }
    });
}

// ===== TELA DE LOGIN =====
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const btnSubmit = formLogin.querySelector('button[type="submit"]');

        // 1. Estado Ocioso
        if (!email || !senha) return alert('Preencha todos os campos!');

        // 2. Estado de Carregamento
        btnSubmit.disabled = true;
        btnSubmit.innerText = 'Entrando...';

        try {
            const usuario = await api.post('/usuarios/login', { email, senha });
            // 3. Estado de Sucesso
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert(`Bem-vindo(a), ${usuario.nome}!`);
            window.location.href = 'dashboard.html';

        } catch (error) {
            // 4. Estado de Erro
            alert(error.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = 'Entrar';
        }
    });
}
// ===== TELA DE DASHBOARD =====
const nomeUsuarioElement = document.getElementById('nomeUsuario');

// Verifica se estamos na página do Dashboard
if (nomeUsuarioElement) {
    // 1. Mostrar o nome do usuário
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'index.html';
    } else {
        // Muda o "Aluno(a)" pelo nome real
        nomeUsuarioElement.textContent = usuarioLogado.nome;
    }

    // 2. Lógica do botão Sair
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado'); // Limpa os dados de login
            window.location.href = 'index.html'; // Volta para a tela de login
        });
    }

    // 3. Lógica do botão Nova Atividade
    const btnNovaAtividade = document.getElementById('btnNovaAtividade');
    if (btnNovaAtividade) {
        btnNovaAtividade.addEventListener('click', () => {
            alert('Tela de Nova Atividade será implementada na próxima entrega! 😉');
        });
    }
}
// Botão esqueceu a senha
const btnEsqueceu = document.querySelector('.esqueceu');
if (btnEsqueceu) {
    btnEsqueceu.addEventListener('click', (e) => {
        e.preventDefault(); // Impede de recarregar a página
        alert('A recuperação de senha será implementada em uma versão futura!');
    });
}
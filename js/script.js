// ===== TELA DE LOGIN =====
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio padrão

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();

            // Validação simples
            if (email === '' || senha === '') {
                alert('Preencha todos os campos!');
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }

            // Simulação de login bem-sucedido
            alert('Login realizado com sucesso! 👋');
            // Redirecionar para o Dashboard (após criar a página)
            // window.location.href = 'dashboard.html';
        });
    }
});
// ===== TELA DE CADASTRO =====
document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('formCadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
            const serie = document.getElementById('serie').value;

            // Validações
            if (!nome || !email || !senha || !confirmarSenha || !serie) {
                alert('Preencha todos os campos!');
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            // Verifica se o e-mail já está cadastrado (simulação com localStorage)
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existe = usuarios.some(u => u.email === email);
            if (existe) {
                alert('Este e-mail já está cadastrado. Faça login.');
                return;
            }

            // Salva o novo usuário
            const novoUsuario = { nome, email, senha, serie };
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso! 🎉');
            // Redireciona para a tela de login
            window.location.href = 'index.html';
        });
    }
});
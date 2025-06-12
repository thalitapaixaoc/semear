
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('minhaconta');

    // Aplica máscaras
    Inputmask("(99) 99999-9999").mask(document.getElementById('telefone'));
    Inputmask("99999-999").mask(document.getElementById('cep'));

    // Impede mais de duas palavras no nome
    var nomeInput = document.getElementById('nome');
    nomeInput.addEventListener('input', function () {
        var palavras = nomeInput.value.trim().split(/\s+/);
        if (palavras.length > 2) {
            nomeInput.value = palavras.slice(0, 2).join(' ');
        }
    });

    // Validação manual estilo Bootstrap
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valido = true;

        // Lista de campos obrigatórios
        var campos = [
            'nome', 'ultimoNome', 'email', 'telefone',
            'cep', 'endereco', 'numero', 'cidade',
            'estado', 'password', 'password-confirmation'
        ];

        for (var i = 0; i < campos.length; i++) {
            var campo = document.getElementById(campos[i]);
            if (!campo.checkValidity() || (campo.tagName === 'SELECT' && campo.value === '')) {
                campo.classList.add('is-invalid');
                valido = false;
            } else {
                campo.classList.remove('is-invalid');
            }
        }

        // Validação específica para e-mail
        var email = document.getElementById('email');
        var emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            valido = false;
        }


        // Validação de senha e confirmação
        var senha = document.getElementById('password');
        var senhaConfirm = document.getElementById('password-confirmation');
        if (senha.value !== senhaConfirm.value || senha.value.trim() === '') {
            senhaConfirm.classList.add('is-invalid');
            valido = false;
        } else {
            senhaConfirm.classList.remove('is-invalid');
        }

        if (valido) {
            alert('Cadastro atualizado com sucesso!');
            // form.submit(); // descomente para enviar
        } else {
            alert('Por favor, corrija os campos em vermelho.');
        }
    });
});


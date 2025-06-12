document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('minhaconta');

    Inputmask("(99) 99999-9999").mask(document.getElementById('telefone'));
    Inputmask("99999-999").mask(document.getElementById('cep'));

    ///// primeiro nome
    var nomeInput = document.getElementById('nome');
    nomeInput.addEventListener('input', function () {
        var palavras = nomeInput.value.trim().split(/\s+/);
        if (palavras.length > 2) {
            nomeInput.value = palavras.slice(0, 2).join(' ');
        }
    });

    ////// letras no campo 
    var numeroInput = document.getElementById('numero');
    numeroInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    // Validação estilo Bootstrap
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valido = true;

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

        var email = document.getElementById('email');
        var emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            valido = false;
        }

        var telefone = document.getElementById('telefone');
        var telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(telefone.value)) {
            telefone.classList.add('is-invalid');
            valido = false;
        } else {
            telefone.classList.remove('is-invalid');
        }

        var cep = document.getElementById('cep');
        var cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(cep.value)) {
            cep.classList.add('is-invalid');
            valido = false;
        } else {
            cep.classList.remove('is-invalid');
        }

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
        } else {
            alert('Por favor, preencha os campos corretamente.');
        }
    });
});

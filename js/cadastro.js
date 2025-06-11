document.addEventListener('DOMContentLoaded', function () {
    let ckPai = document.querySelector('#ckTodos');
    ckPai.addEventListener('click', selecionaTodos);

    let btnAdicionar = document.querySelector('#btnAdicionar');
    btnAdicionar.addEventListener('click', adicionarItem);

    let btnExcluir = document.querySelector('#btnExcluir');
    btnExcluir.addEventListener('click', excluirSelecionados);

    aplicarMascaras();
    validarFormulario();

});


/* tabela dinamica*/
var vetClientes = [
    { id: 1, nome: 'João', ultimoNome: 'Santos', cpf: '123.456.789-00' },
    { id: 2, nome: 'Maria', ultimoNome: 'Oliveira', cpf: '987.654.321-00' },
];

var btnAdicionar = document.querySelector('#btnAdicionar');
btnAdicionar.addEventListener('click', adicionarItem);

var btnExcluir = document.querySelector('#btnExcluir');
btnExcluir.addEventListener('click', excluirSelecionados);

montarTabela(vetClientes);


function montarTabela(dados) {
    let tbody = document.querySelector('#tabelaCliente #tb-body');
    let html = '';

    for (let item of dados) {
        html += `
            <tr>
                  <td><input type="checkbox" data-id="${item.id}"></td>
                  <td>${item.nome}</td>
                  <td>${item.ultimoNome}</td>
                  <td>${item.cpf}</td>
                  <td><a class="btnExcluir" 
                                        onclick="excluirItem(${item.id})">&#9746;</a></td>
               </tr>`;
    }
    tbody.innerHTML = html;
}


function selecionaTodos() {
    let vetCheckbox = document.querySelectorAll('[data-id]');
    let ckPai = document.querySelector('#ckTodos');
    for (let ck of vetCheckbox) {
        ck.checked = ckPai.checked;
    }
}

function excluirSelecionados() {
    let vetCheckbox = document.querySelectorAll('[data-id]');
    if (vetCheckbox.length > 0) {
        for (let ck of vetCheckbox) {
            if (ck.checked == true) {
                excluirItem(ck.dataset.id);
            }
        }
    } else {
        alert('Não há itens para serem apagados...');
    }
}

function excluirItem(idDelete) {
    let vetAux = [];
    for (let i = 0; i < vetClientes.length; i++) {
        if (vetClientes[i].id != idDelete) {
            vetAux.push(vetClientes[i]);
        }
    }
    vetClientes = vetAux;
    montarTabela(vetClientes);
}
function adicionarItem(event) {
    event.preventDefault();
    const form = document.getElementById('meu');

    // Remove atributo de controle
    form.dataset.valido = "false";

    // Dispara a validação principal (do submit)
    form.dispatchEvent(new Event('submit'));

    // Checa se a validação passou
    if (form.dataset.valido !== "true") {
        return;
    }

    // Captura campos principais
    let nome = form.querySelector('#nome');
    let ultimoNome = form.querySelector('#ultimoNome');
    let cpf = form.querySelector('#cpf');

    let novoItem = {
        id: new Date().getTime(),
        nome: nome.value,
        ultimoNome: ultimoNome.value,
        cpf: cpf.value
    };

    vetClientes.push(novoItem);
    montarTabela(vetClientes);

    // Resetar campos adicionais
    let perfil = form.querySelector('#perfil');
    let date = form.querySelector('#date');
    let rg = form.querySelector('#rg');
    let cnpj = form.querySelector('#cnpj');
    let email = form.querySelector('#email');
    let telefone = form.querySelector('#telefone');
    let whats = form.querySelector('#whats');
    let cep = form.querySelector('#cep');
    let endereco = form.querySelector('#endereco');
    let numero = form.querySelector('#numero');
    let complemento = form.querySelector('#complemento');
    let cidade = form.querySelector('#cidade');
    let estado = form.querySelector('#estado');
    let password = form.querySelector('#password');
    let passwordConfirmation = form.querySelector('#password-confirmation');
    let nota = form.querySelector('#nota');
    let masc = form.querySelector('#masc');
    let fem = form.querySelector('#fem');
    let outro = form.querySelector('#outro');

    nome.value = '';
    ultimoNome.value = '';
    cpf.value = '';
    perfil.selectedIndex = 0;
    date.value = '';
    rg.value = '';
    cnpj.value = '';
    email.value = '';
    telefone.value = '';
    whats.checked = false;
    cep.value = '';
    endereco.value = '';
    numero.value = '';
    complemento.value = '';
    cidade.value = '';
    estado.selectedIndex = 0;
    password.value = '';
    passwordConfirmation.value = '';
    nota.value = 10;
    document.getElementById('valorNota').textContent = '10';
    masc.checked = false;
    fem.checked = false;
    outro.checked = false;

    alert('Cadastro realizado com sucesso!');
    nome.focus();
}

function verificarCamposPreenchidos(form) {
    let valido = true;

    // Seleciona todos inputs e selects obrigatórios dentro do form
    const camposObrigatorios = form.querySelectorAll('input[required], select[required], textarea[required]');

    // Remove erros antigos
    camposObrigatorios.forEach(campo => campo.classList.remove('is-invalid'));

    // Verifica cada campo
    camposObrigatorios.forEach(campo => {
        const valor = campo.value.trim();
        if (valor === '') {
            campo.classList.add('is-invalid'); // destaca o campo com erro
            valido = false;
        }
    });

    return valido;
}
/* */


function aplicarMascaras() {
    Inputmask("999.999.999-99").mask(document.getElementById('cpf'));
    Inputmask("99.999.999-9").mask(document.getElementById('rg'));
    Inputmask("99.999.999/9999-99").mask(document.getElementById('cnpj'));
    Inputmask("(99) 99999-9999").mask(document.getElementById('telefone'));
    Inputmask("99999-999").mask(document.getElementById('cep'));
}

var perfilSelect = document.getElementById('perfil');
ajustarCamposPorPerfil(perfilSelect.value);

perfilSelect.addEventListener('change', function () // Atualiza visibilidade quando o perfil mudar
{
    ajustarCamposPorPerfil(this.value);
});

// Função para ajustar os camposconforme perfil selecionado
function ajustarCamposPorPerfil(valorPerfil) {
    var cpfCol = document.getElementById('cpf').closest('.col-md-3');
    var rgCol = document.getElementById('rg').closest('.col-md-3');
    var cnpjCol = document.getElementById('cnpj').closest('.col-md-3');
    var dataCol = document.getElementById('date').closest('.col-md-2');
    var generoCol = document.getElementById('masc').closest('.col-md-4'); // genero pegando o masc 
    const labelPrimeiroNome = document.querySelector('#nome+label');
    const labelUltimoNome = document.querySelector('#ultimoNome+label');

    if (valorPerfil === 'Pessoa Fisica' || valorPerfil === 'Pessoa Física') {
        labelPrimeiroNome.textContent = 'Primeiro Nome';
        labelUltimoNome.textContent = 'Último Nome';
        if (cpfCol) cpfCol.style.display = '';
        if (rgCol) rgCol.style.display = '';
        if (dataCol) dataCol.style.display = '';
        if (generoCol) generoCol.style.display = '';
        if (cnpjCol) cnpjCol.style.display = 'none';
    }
    else if (valorPerfil === 'Pessoa Juridica' || valorPerfil === 'Pessoa Jurídica') {
        labelPrimeiroNome.textContent = 'Razão Social';
        labelUltimoNome.textContent = 'Nome Fantasia';
        if (cpfCol) cpfCol.style.display = 'none';
        if (rgCol) rgCol.style.display = 'none';
        if (dataCol) dataCol.style.display = 'none';
        if (generoCol) generoCol.style.display = 'none';
        if (cnpjCol) cnpjCol.style.display = '';
    }
    else {
        if (cpfCol) cpfCol.style.display = '';
        if (rgCol) rgCol.style.display = '';
        if (dataCol) dataCol.style.display = '';
        if (generoCol) generoCol.style.display = '';
        if (cnpjCol) cnpjCol.style.display = '';
    }
}

function validar(campo, condicao, mensagem) {
    if (!condicao) {
        campo.classList.add('is-invalid');
        campo.setCustomValidity(mensagem);
        return false;
    } else {
        campo.classList.remove('is-invalid');
        campo.setCustomValidity('');
        return true;
    }
}

function limparErros(inputs, erroGenero) {
    inputs.forEach(i => {
        i.classList.remove('is-invalid');
        i.setCustomValidity('');
    });
    erroGenero.style.display = 'none';
}

function confirmarCancelamento() {
    if (confirm("Tem certeza que deseja cancelar o cadastro?")) {
        window.location.href = "../index.html";
    }
}

function validarFormulario() {
    var form = document.getElementById('meu');
    var nomeInput = document.getElementById('nome');
    nomeInput.addEventListener('input', function () {
        var palavras = nomeInput.value.trim().split(/\s+/);
        if (palavras.length > 2) {
            nomeInput.value = palavras.slice(0, 2).join(' ');
        }
    });
    const numeroInput = document.getElementById('numero');
    numeroInput?.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valido = true;

        var perfil = form.querySelector('#perfil'); // Perfil
        marcarCampoInvalido(perfil, perfil.value.trim() !== '');
        if (perfil.value.trim() === '') valido = false;

        var nome = form.querySelector('#nome'); // Nome
        marcarCampoInvalido(nome, nome.value.trim() !== '');
        if (nome.value.trim() === '') valido = false;

        var ultimoNome = form.querySelector('#ultimoNome'); // Último nome
        marcarCampoInvalido(ultimoNome, ultimoNome.value.trim() !== '');
        if (ultimoNome.value.trim() === '') valido = false;

        if (perfil.value === 'Pessoa Fisica' || perfil.value === 'Pessoa Física') {
            var dataValida = validarDataNascimento(); // Data de nascimento
            if (!dataValida) valido = false;

            var cpfInput = form.querySelector('#cpf');  // CPF
            var cpfValido = validarCPF(cpfInput.value);
            marcarCampoInvalido(cpfInput, cpfValido);
            if (!cpfValido) valido = false;

            var rgInput = form.querySelector('#rg'); // RG
            var rgValido = validarRG(rgInput.value.trim());

            if (!rgValido) {
                rgInput.classList.add('is-invalid'); valido = false;
            }
            else {
                rgInput.classList.remove('is-invalid');
            }

            var generoRadio = form.querySelectorAll('input[name="genero"]');
            var generoSelecionado = false;
            generoRadio.forEach(function (r) {
                if (r.checked) generoSelecionado = true;
            });

            var erroGenero = document.getElementById('erro-genero');
            if (!generoSelecionado) {
                erroGenero.textContent = "Por favor, selecione um gênero.";
                valido = false;
            } else {
                erroGenero.textContent = "";
            }
        }


        if (perfil.value === 'Pessoa Juridica' || perfil.value === 'Pessoa Jurídica') {
            var cnpjInput = form.querySelector('#cnpj'); // CNPJ
            var cnpjValor = cnpjInput.value.trim();
            var cnpjValidoFormato = validarCNPJ(cnpjValor);
            var numeros = cnpjValor.replace(/\D/g, '');
            var cnpjNumerosRepetidos = /^(\d)\1{13}$/.test(numeros);
            if (cnpjValor === '' || !cnpjValidoFormato || cnpjNumerosRepetidos) {
                cnpjInput.classList.add('is-invalid'); valido = false;
            }
            else {
                cnpjInput.classList.remove('is-invalid');
            }
        }

        var email = form.querySelector('#email');
        var emailValido = /\S+@\S+\.\S+/.test(email.value);
        marcarCampoInvalido(email, emailValido);
        if (!emailValido) valido = false;

        var telefoneValor = telefone.value.trim();
        var telefoneValido = telefoneValor.length === 15 && !telefoneValor.includes('_');
        marcarCampoInvalido(telefone, telefoneValido);
        if (!telefoneValido) valido = false;

        var cep = form.querySelector('#cep');
        marcarCampoInvalido(cep, validarCEP(cep.value.trim()));
        if (cep.value.trim() === '') valido = false;

        var endereco = form.querySelector('#endereco');
        marcarCampoInvalido(endereco, endereco.value.trim() !== '');
        if (endereco.value.trim() === '') valido = false;

        var numero = form.querySelector('#numero');
        marcarCampoInvalido(numero, numero.value.trim() !== '');
        if (numero.value.trim() === '') valido = false;

        var cidade = form.querySelector('#cidade');
        marcarCampoInvalido(cidade, cidade.value.trim() !== '');
        if (cidade.value.trim() === '') valido = false;

        var estado = form.querySelector('#estado');
        marcarCampoInvalido(estado, estado.value.trim() !== '');
        if (estado.value.trim() === '') valido = false;

        var senha = form.querySelector('#password');
        var senhaConfirm = form.querySelector('#password-confirmation');
        var senhaValida = senha.value.trim() !== '';
        var senhaConfValida = senha.value === senhaConfirm.value && senhaConfirm.value.trim() !== '';

        marcarCampoInvalido(senha, senhaValida);
        marcarCampoInvalido(senhaConfirm, senhaConfValida);
        if (!senhaValida || !senhaConfValida) valido = false;

        if (valido) {
            form.dataset.valido = "true"; // marca como válido
            // form.submit(); // Se for enviar para backend
        } else {
            form.dataset.valido = "false"; // marca como inválido
            alert('Por favor, corrija os campos destacados.');
        }


    });
}

function marcarCampoInvalido(elemento, valido) {
    elemento.classList.remove('is-valid');
    if (valido) {
        elemento.classList.remove('is-invalid');
    }
    else {
        elemento.classList.add('is-invalid');
    }
}


function validarCNPJ(cnpj) {
    var regEx = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regEx.test(cnpj);
}

function validarDataNascimento() {
    var inputDate = document.getElementById('date');
    var valor = inputDate.value;

    if (!valor) {
        inputDate.classList.add('is-invalid');
        return false;
    }

    var hoje = new Date();
    var dataNascimento = new Date(valor);

    if (dataNascimento > hoje) {
        inputDate.classList.add('is-invalid');
        return false;
    }

    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var mes = hoje.getMonth() - dataNascimento.getMonth();
    var dia = hoje.getDate() - dataNascimento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        idade--;
    }

    if (idade < 18) {
        inputDate.classList.add('is-invalid');
        return false;
    }

    inputDate.classList.remove('is-invalid');
    return true;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    var resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarRG(rg) {
    var numeros = rg.replace(/\D/g, '');
    if (numeros.length < 7 || numeros.length > 9) return false;
    if (/^(\d)\1+$/.test(numeros)) return false;
    return true;
}

//função para validar cep
function validarCEP(cep) {
    var regEx = /^\d{5}-\d{3}$/;
    return regEx.test(cep);
}
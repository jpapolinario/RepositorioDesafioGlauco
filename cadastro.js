const inputNome = document.getElementById('nome');
const inputDataNascimento = document.getElementById('dataNascimento');
const inputIdade = document.getElementById('idade');
const inputCpf = document.getElementById('cpf');
const inputSexo = document.getElementById('sexo');
const inputEstadoCivil = document.getElementById('estadoCivil');
const inputConjuge = document.getElementById('conjuge');
const inputEndereco = document.getElementById('endereco');
const inputCep = document.getElementById('cep');
const inputCidade = document.getElementById('cidade');
const inputEstado = document.getElementById('estado');
const inputComplemento = document.getElementById('complemento');
const inputEmail = document.getElementById('email');

function validarFormulario() {
    if (inputNome.value.trim() === "") {
        alert("Nome é obrigatório.");
        return false;
    }

    if (inputDataNascimento.value === "") {
        alert("Data de nascimento é obrigatória.");
        return false;
    }

    if (inputCpf.value.trim() === "") {
        alert("CPF é obrigatório.");
        return false;
    }
    if (!validarCpf()) {
        return false;
    }

    if (inputEndereco.value.trim() === "") {
        alert("Endereço é obrigatório.");
        return false;
    }

    if (inputCep.value.trim() === "") {
        alert("CEP é obrigatório.");
        return false;
    }

    if (inputCidade.value.trim() === "") {
        alert("Cidade é obrigatória.");
        return false;
    }

    if (inputEstado.value.trim() === "") {
        alert("Estado é obrigatório.");
        return false;
    }

    return true;
}

function criarCadastro() {
    if (!validarFormulario()) {
        return;
    }

    const usuario = {
        id: ++id,
        nome: inputNome.value.trim(),
        dataNascimento: inputDataNascimento.value,
        cpf: inputCpf.value.trim(),
        sexo: inputSexo.value,
        estadoCivil: inputEstadoCivil.value,
        conjuge: inputConjuge.value.trim(),
        endereco: inputEndereco.value.trim(),
        cep: inputCep.value.trim(),
        cidade: inputCidade.value.trim(),
        estado: inputEstado.value.trim(),
        complemento: inputComplemento.value.trim(),
        email: inputEmail.value.trim()
    };

    usuarios.push(usuario);

    salvarUsuarios();
    salvarId();

    console.log(usuarios);
}

function calcularIdade() {
    const nascimento = new Date(inputDataNascimento.value);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    inputIdade.value = idade;
}

function mascaraCep() {
    let cep = inputCep.value;

    cep = cep.replace(/\D/g, "");

    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    inputCep.value = cep;
}

function mascaraCpf() {
    let cpf = inputCpf.value;

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length > 3) {
        cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
    }

    if (cpf.length > 7) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    }

    if (cpf.length > 11) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    }

    inputCpf.value = cpf;
}

function validarCpf() {
    const cpf = inputCpf.value.replace(/\D/g, "");

    if (cpf.length !== 11) {
        alert("CPF inválido.");
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        alert("CPF inválido.");
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(cpf[9])) {
        alert("CPF inválido.");
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(cpf[10])) {
        alert("CPF inválido.");
        return false;
    }

    return true;
}

carregarID();
carregarUsuarios();
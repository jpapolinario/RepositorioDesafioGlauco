const inputNome = document.getElementById('nome');
const inputDataNascimento = document.getElementById('dataNascimento');
const inputIdade = document.getElementById('idade');
const inputCpf = document.getElementById('cpf');
const inputSexo = document.getElementById('sexo');
const inputEstadoCivil = document.getElementById('estadoCivil');
const inputConjuge = document.getElementById('conjuge');
const campoConjuge = document.getElementById('campoConjuge');
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

    if (inputEstadoCivil.value === "Casado" && inputConjuge.value.trim() === "") {
        alert("Cônjuge é obrigatório para pessoas casadas.");
        return false;
    }

    if (inputCidade.value.trim() === "") {
        alert("Cidade é obrigatória.");
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

    const cep = inputCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("CEP inválido.");
        return false;
    }


    if (inputEstado.value.trim() === "") {
        alert("Estado é obrigatório.");
        return false;
    }
    if (!validarEmail()) {
        return false;
    }

    return true;
}

function criarCadastro() {
    if (!validarFormulario()) {
        return;
    }

    const idEditando = localStorage.getItem("usuarioEditando");

    if (idEditando !== null) {
        atualizarUsuario();
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
function atualizarUsuario() {
    const idEditando = localStorage.getItem("usuarioEditando");

    if (idEditando === null) {
        return;
    }

    const usuario = usuarios.find(function (usuario) {
        return usuario.id === Number(idEditando);
    });

    if (usuario === undefined) {
        return;
    }

    usuario.nome = inputNome.value.trim();
    usuario.dataNascimento = inputDataNascimento.value;
    usuario.cpf = inputCpf.value.trim();
    usuario.sexo = inputSexo.value;
    usuario.estadoCivil = inputEstadoCivil.value;
    usuario.conjuge = inputConjuge.value.trim();
    usuario.endereco = inputEndereco.value.trim();
    usuario.cep = inputCep.value.trim();
    usuario.cidade = inputCidade.value.trim();
    usuario.estado = inputEstado.value.trim();
    usuario.complemento = inputComplemento.value.trim();
    usuario.email = inputEmail.value.trim();

    salvarUsuarios();

    localStorage.removeItem("usuarioEditando");

    window.location.href = "listagem.html";
}
function mascaraData() {
    let data = inputDataNascimento.value;

    data = data.replace(/\D/g, "");

    if (data.length > 2) {
        data = data.replace(/^(\d{2})(\d)/, "$1/$2");
    }

    if (data.length > 5) {
        data = data.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }

    inputDataNascimento.value = data;

    if (data.length === 10) {
        calcularIdade();
    }
}

function calcularIdade() {
    const data = inputDataNascimento.value;

    if (data.length !== 10) {
        inputIdade.value = "";
        return;
    }

    const partes = data.split("/");

    const dia = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const ano = Number(partes[2]);

    const nascimento = new Date(ano, mes, dia);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth() - nascimento.getMonth();

    if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())
    ) {
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
function carregarUsuarioParaEditar() {
    const idEditando = localStorage.getItem("usuarioEditando");

    if (idEditando === null) {
        return;
    }

    const usuario = usuarios.find(function (usuario) {
        return usuario.id === Number(idEditando);
    });

    if (usuario === undefined) {
        return;
    }

    inputNome.value = usuario.nome;
    inputDataNascimento.value = usuario.dataNascimento;
    inputCpf.value = usuario.cpf;
    inputSexo.value = usuario.sexo;
    inputEstadoCivil.value = usuario.estadoCivil;
    inputConjuge.value = usuario.conjuge;
    inputEndereco.value = usuario.endereco;
    inputCep.value = usuario.cep;
    inputCidade.value = usuario.cidade;
    inputEstado.value = usuario.estado;
    inputComplemento.value = usuario.complemento;
    inputEmail.value = usuario.email;

    calcularIdade();
    controlarConjuge();
}
function controlarConjuge() {
    if (inputEstadoCivil.value === "Casado") {
        campoConjuge.style.display = "block";
        inputConjuge.required = true;
    } else {
        campoConjuge.style.display = "none";
        inputConjuge.required = false;
        inputConjuge.value = "";
    }
}
function validarEmail() {
    const email = inputEmail.value.trim();

    if (email === "") {
        return true;
    }

    if (!email.includes("@")) {
        alert("E-mail inválido.");
        return false;
    }

    return true;
}

carregarID();
carregarUsuarios();
carregarUsuarioParaEditar();
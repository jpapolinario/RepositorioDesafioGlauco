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
const tituloCadastro = document.getElementById('tituloCadastro');
const botaoCadastro = document.getElementById('botaoCadastro');
const botaoCancelar = document.getElementById('botaoCancelar');
const linkListagem = document.getElementById('linkListagem');

function validarFormulario() {
    const idEditando = localStorage.getItem("usuarioEditando");
    const idAtual = idEditando !== null ? Number(idEditando) : null;

    if (inputNome.value.trim() === "") {
        alert("Nome é obrigatório.");
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ ]+$/.test(inputNome.value.trim())) {
        alert("O nome deve conter apenas letras.");
        return false;
    }

    if (nomeJaExiste(inputNome.value, idAtual)) {
        alert("Este nome já está cadastrado.");
        return false;
    }

    if (inputDataNascimento.value === "") {
        alert("Data de nascimento é obrigatória.");
        return false;
    }

    if (!validarDataNascimento()) {
        const idade = obterIdade(inputDataNascimento.value);

        if (idade > 122) {
            alert("A idade máxima permitida é 122 anos.");
        } else {
            alert("Data de nascimento inválida.");
        }

        return false;
    }

    if (inputCpf.value.trim() === "") {
        alert("CPF é obrigatório.");
        return false;
    }

    if (!validarCpf()) {
        return false;
    }

    if (cpfJaExiste(inputCpf.value, idAtual)) {
        alert("Este CPF já está cadastrado.");
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

    alert("Cadastro realizado com sucesso!");

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

    const confirmarAlteracao = confirm(`Tem certeza que deseja alterar o usuário "${usuario.nome}"?`);

    if (!confirmarAlteracao) {
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

function cancelarEdicao() {
    const confirmarCancelamento = confirm("Tem certeza que deseja cancelar a edição? As alterações serão perdidas.");

    if (!confirmarCancelamento) {
        return;
    }

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

    let partes = data.split("/");

    if (partes[0] !== undefined && partes[0].length === 2) {
        let dia = Number(partes[0]);

        if (dia < 1) {
            partes[0] = "01";
        }

        if (dia > 31) {
            partes[0] = "31";
        }
    }

    if (partes[1] !== undefined && partes[1].length === 2) {
        let mes = Number(partes[1]);

        if (mes < 1) {
            partes[1] = "01";
        }

        if (mes > 12) {
            partes[1] = "12";
        }
    }

    if (partes[2] !== undefined && partes[2].length === 4) {
        let ano = Number(partes[2]);

        if (ano < 1900) {
            partes[2] = "1904";
        }

        if (ano > 2026) {
            const hoje = new Date();
            partes[2] = hoje.getFullYear();
        }
    }

    inputDataNascimento.value = partes.join("/");
}

function obterIdade(dataNascimento) { // Agora qualquer lugar do programa que precisar saber a idade pode chamar: obterIdade(inputDataNascimento.value)
    const partes = dataNascimento.split("/");

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (
        hoje.getMonth() < nascimento.getMonth() ||
        (
            hoje.getMonth() === nascimento.getMonth() &&
            hoje.getDate() < nascimento.getDate()
        )
    ) {
        idade--;
    }

    return idade;
}

function validarDataNascimento() {
    const partes = inputDataNascimento.value.split("/");

    if (partes.length !== 3) {
        return false;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    const hoje = new Date();
    const dataNascimento = new Date(ano, mes - 1, dia);

    // Verifica se a data realmente existe
    if (
        dataNascimento.getFullYear() !== ano ||
        dataNascimento.getMonth() !== mes - 1 ||
        dataNascimento.getDate() !== dia
    ) {
        return false;
    }

    // Não permite data futura
    if (dataNascimento > hoje) {
        return false;
    }

    const idade = obterIdade(inputDataNascimento.value);

    // Limite máximo de 122 anos
    if (idade > 122) {
        return false;
    }

    return true;
}

function calcularIdade() {
    const partes = inputDataNascimento.value.split("/");

    if (partes.length !== 3) {
        inputIdade.value = "";
        return;
    }

    const idade = obterIdade(inputDataNascimento.value);

    if (idade < 0 || idade > 122) {
        inputIdade.value = "";
        return;
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

function cpfJaExiste(cpf, idAtual) {
    const cpfNumeros = cpf.replace(/\D/g, "");

    return usuarios.some(function (usuario) {
        const cpfUsuario = usuario.cpf.replace(/\D/g, "");

        return cpfUsuario === cpfNumeros && usuario.id !== idAtual;
    });
}

function nomeJaExiste(nome, idAtual) {
    const nomeDigitado = nome.trim().toLowerCase();

    return usuarios.some(function (usuario) {
        const nomeUsuario = usuario.nome.trim().toLowerCase();

        return nomeUsuario === nomeDigitado && usuario.id !== idAtual;
    });
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

    tituloCadastro.innerText = "Editando";
    botaoCadastro.innerText = "Salvar";

    botaoCancelar.style.display = "inline";
    linkListagem.style.display = "none";
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

    const partes = email.split("@");

    if (partes.length !== 2) {
        alert("E-mail inválido.");
        return false;
    }

    const antesDoArroba = partes[0];
    const depoisDoArroba = partes[1];

    if (antesDoArroba === "" || depoisDoArroba === "") {
        alert("E-mail inválido.");
        return false;
    }

    if (!depoisDoArroba.includes(".")) {
        alert("E-mail inválido.");
        return false;
    }

    return true;
}

carregarID();
carregarUsuarios();
carregarUsuarioParaEditar();
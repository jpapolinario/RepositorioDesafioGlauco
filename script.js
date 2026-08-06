//Ponto central para os comportamentos JavaScript
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');

const usuarios = [];

let id = 0;

//criação
function criarUsuario() { //vulgo usuario
    return {
        id: ++id,
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value)
    }
};

//limpeza
function limparFormulario() {
    inputNome.value = "";
    inputIdade.value = "";
};

//validação
function validarNome() {
    if (inputNome.value.trim() === "") {
        alert("Digite um nome válido.");
        return false;
    }

    return true;
};
function validarIdade() {
    const idade = Number(inputIdade.value);

    if (Number.isNaN(idade) || idade < 0 || idade > 150) {
        alert("A idade deve ser um número maior ou igual a zero.");
        return false;
    }

    return true;
};
function validarFormulario() {
    if (!validarNome()) {
        return false;
    }

    return validarIdade();
};

//cadastro
function criarCadastro() {
    const usuario = criarUsuario();

    usuarios.push(usuario);


    adicionarEventos(usuario, elementos);

    limparFormulario();
    limparCadastro();
};
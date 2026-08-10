const usuarios = [];

let id = 0;

function salvarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function carregarUsuarios() {
    const dados = localStorage.getItem("usuarios");

    if (dados !== null) {
        usuarios.length = 0;
        usuarios.push(...JSON.parse(dados));
    }
}

function salvarId() {
    localStorage.setItem("id", id);
}

function carregarID() {
    const idSalvo = localStorage.getItem("id");

    if (idSalvo !== null) {
        id = Number(idSalvo);
    }
}
const listaUsuarios = document.getElementById('lista-usuarios');
const inputFiltro = document.getElementById('filtro');
const resultadoBusca = document.getElementById('resultadoBusca');
const usuarioEditando = localStorage.getItem("usuarioEditando");

if (usuarioEditando !== null) {
    window.location.href = "cadastro.html";
}

function listarUsuarios(usuariosParaListar) {
    listaUsuarios.innerHTML = "";

    for (let i = 0; i < usuariosParaListar.length; i++) {
        const usuario = usuariosParaListar[i];

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.cpf}</td>
            <td>
                <button type="button" onclick="editarUsuario(${usuario.id})">
                    Editar
                </button>
                <button type="button" onclick="excluirUsuario(${usuario.id})">
                    Excluir
                </button>
            </td>
        `;

        listaUsuarios.appendChild(linha);
    }
}
function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function filtrarUsuarios() {
    const textoBusca = inputFiltro.value.trim();

    if (textoBusca === "") {
        resultadoBusca.innerText = "Digite um nome ou CPF para realizar uma busca.";
        listarUsuarios(usuarios);
        return;
    }

    const filtro = removerAcentos(textoBusca.toLowerCase());

    const usuariosFiltrados = usuarios.filter(function (usuario) {
        const nome = removerAcentos(usuario.nome.toLowerCase());

        return nome.includes(filtro)
            || usuario.cpf.includes(filtro);
    });

    listarUsuarios(usuariosFiltrados);

    if (usuariosFiltrados.length === 0) {
        resultadoBusca.innerText =
            `Nenhum usuário encontrado para "${textoBusca}".`;
    } else {
        resultadoBusca.innerText =
            `Busca por "${textoBusca}": ${usuariosFiltrados.length} usuário(s) encontrado(s).`;
    }
}
function editarUsuario(id) {
    localStorage.setItem("usuarioEditando", id);
    window.location.href = "cadastro.html";
};
function excluirUsuario(id) {
    const querExcluir = confirm("Tem certeza que deseja excluir este usuário?");

    if (!querExcluir) {
        return;
    }

    const posicao = usuarios.findIndex(function (usuario) {
        return usuario.id === id;
    });

    if (posicao === -1) {
        return;
    }

    usuarios.splice(posicao, 1);

    salvarUsuarios();

    listarUsuarios(usuarios);
}

carregarUsuarios();
listarUsuarios(usuarios);
const listaUsuarios = document.getElementById('lista-usuarios');
const inputFiltro = document.getElementById('filtro');

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
function filtrarUsuarios() {
    const filtro = inputFiltro.value.trim().toLowerCase();

    const usuariosFiltrados = usuarios.filter(function (usuario) {
        return usuario.nome.toLowerCase().includes(filtro)
            || usuario.cpf.includes(filtro);
    });

    listarUsuarios(usuariosFiltrados);
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
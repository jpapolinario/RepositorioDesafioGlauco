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
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
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

carregarUsuarios();
listarUsuarios();
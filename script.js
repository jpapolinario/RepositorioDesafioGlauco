const botao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const lista = document.getElementById('lista-usuarios');
let usuarioEmEdicao = null;
const usuarios = [];
const edicao = {};

function zerarCampo(input) {
    input.value = "";
};

botao.addEventListener('click', function () {
    if (inputNome.value !== "" && inputIdade.value !== "") {
        if (usuarioEmEdicao === null) {
            const usuario = {
                nome: inputNome.value,
                idade: inputIdade.value
            }
            usuarios.push(usuario);
            console.log(usuarios);
            const textoSpan = document.createElement('span');
            const btnExcluir = document.createElement('button');
            const btnEditar = document.createElement('button');
            const novoLi = document.createElement('li');
            
            btnExcluir.innerText = `Excluir`;
            btnEditar.innerText = `Editar`;
            textoSpan.innerText = `${usuario.nome} - ${usuario.idade} anos`;
            novoLi.appendChild(textoSpan);
            novoLi.appendChild(btnEditar);
            novoLi.appendChild(btnExcluir);
            lista.appendChild(novoLi);
            zerarCampo(inputNome);
            zerarCampo(inputIdade);

            btnEditar.addEventListener('click', function () {
                inputNome.value = usuario.nome;
                inputIdade.value = usuario.idade;
                usuarioEmEdicao = usuario;
                edicao.nomeUsuario = usuario.nome;
                edicao.idadeUsuario = usuario.idade;
                edicao.textoSpan = textoSpan;
                console.log(edicao);
            });
            btnExcluir.addEventListener('click', function () {
                novoLi.remove();
            });
        } else {
            usuarioEmEdicao.nome = inputNome.value;
            usuarioEmEdicao.idade = inputIdade.value;
            zerarCampo(inputNome);
            zerarCampo(inputIdade);
            usuarioEmEdicao = null;
        }
    }
});
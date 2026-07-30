const botao = document.getElementById('btnCadastrar');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const lista = document.getElementById('lista-usuarios');
const usuarios = [];
const edicao = {
    usuario: null,
    textoSpan: null
};

function zerarCampo(input) {
    input.value = "";
};

botao.addEventListener('click', function () {
    if (inputNome.value !== "" && inputIdade.value !== "") {
        if (edicao.usuario === null) {
            const usuario = {
                nome: inputNome.value,
                idade: inputIdade.value
            }
            usuarios.push(usuario);

            const textoSpan = document.createElement('span');
            textoSpan.innerText = `${usuario.nome} - ${usuario.idade} anos`;

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = `Excluir`;
            
            const btnEditar = document.createElement('button');
            btnEditar.innerText = `Editar`;
            
            const novoLi = document.createElement('li');

            novoLi.appendChild(textoSpan);
            novoLi.appendChild(btnEditar);
            novoLi.appendChild(btnExcluir);
            lista.appendChild(novoLi);
            zerarCampo(inputNome);
            zerarCampo(inputIdade);

            btnEditar.addEventListener('click', function () {
                inputNome.value = usuario.nome;
                inputIdade.value = usuario.idade;
                edicao.textoSpan = textoSpan;
                edicao.usuario = usuario;
            });
            btnExcluir.addEventListener('click', function () {
                novoLi.remove();
                usuarios.pop();
            });
        } else {
            edicao.usuario.nome = inputNome.value;
            edicao.usuario.idade = inputIdade.value;

            edicao.textoSpan.innerText = `${edicao.usuario.nome} - ${edicao.usuario.idade} anos`;

            zerarCampo(inputNome);
            zerarCampo(inputIdade);

            edicao.usuario = null;
        }
    }
});
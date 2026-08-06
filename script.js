const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');

const lista = document.getElementById('lista-usuarios');

const btnCadastrar = document.getElementById('btnCadastrar');
const btnCancelar = document.getElementById("btnCancelar");

const usuarios = [];
const cadastro = {
    usuario: null,
    elementos: null
};

let id = 0;

//criação
function criarUsuario() { //vulgo usuario
    return {
        id: ++id,
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value)
    }
};
function criarElementosUsuario(usuario) { //vulgo elementos
    const textoSpan = document.createElement('span');
    const btnEditar = document.createElement('button');
    const btnExcluir = document.createElement('button');
    const novoLi = document.createElement('li');

    textoSpan.innerText = `${usuario.nome} - ${usuario.idade} anos`;
    btnEditar.innerText = `Editar`;
    btnExcluir.innerText = `Excluir`;

    novoLi.appendChild(textoSpan);
    novoLi.appendChild(btnEditar);
    novoLi.appendChild(btnExcluir);
    return {
        textoSpan,
        btnEditar,
        btnExcluir,
        novoLi
    }
}

//limpeza
function limparFormulario() {
    inputNome.value = "";
    inputIdade.value = "";
};
function limparCadastro() {
    cadastro.usuario = null;
    cadastro.elementos = null;
}

//edição
function alterarModoEdicao(editando) {
    btnCadastrar.innerText = editando ? "Salvar" : "Cadastrar";
    btnCancelar.hidden = !editando;
}
function editarUsuario(usuario, elementos) {
    inputNome.value = usuario.nome;
    inputIdade.value = usuario.idade;

    cadastro.usuario = usuario;
    cadastro.elementos = elementos;
    alterarModoEdicao(true);
}
function salvarEdicao() {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);

    cadastro.usuario.nome = nome;
    cadastro.usuario.idade = idade;

    cadastro.elementos.textoSpan.innerText = `${nome} - ${idade} anos`;

    limparFormulario();

    limparCadastro();
    alterarModoEdicao(false);
};
function cancelarEdicao() {
    limparFormulario();
    limparCadastro();
    alterarModoEdicao(false);
};

//exclusão
function posicaoArraypeloId(id) { // Em qual posição do array está o usuário cujo id é X
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            return i;
        }
    }

    return -1; //caso não exista
};
function excluirUsuario(usuario, elementos) {
    const querExcluir = confirm("Tem certeza que quer excluir este usuário?");

    if (!querExcluir) {
        return;
    } 

    elementos.novoLi.remove();

    const posicao = posicaoArraypeloId(usuario.id);
    usuarios.splice(posicao, 1);
    
    if (cadastro.usuario !== null && cadastro.usuario.id === usuario.id) {
        limparFormulario();
        limparCadastro();
        alterarModoEdicao(false);
    }
}

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

//eventos
function adicionarEventos(usuario, elementos) {
    elementos.btnEditar.addEventListener('click', function () {
        editarUsuario(usuario, elementos);
    });

    elementos.btnExcluir.addEventListener('click', function () {
        excluirUsuario(usuario, elementos);
    });
};

//cadastro
function criarCadastro() {
    const usuario = criarUsuario();

    usuarios.push(usuario);

    const elementos = criarElementosUsuario(usuario);
    lista.appendChild(elementos.novoLi);

    adicionarEventos(usuario, elementos);

    limparFormulario();
    limparCadastro();
};

btnCadastrar.addEventListener('click', function () {
    if (!validarFormulario()) {
        return;
    };

    if (cadastro.usuario === null) {
        criarCadastro();

    } else {
        salvarEdicao();
    }
});
btnCancelar.addEventListener('click', function () {
    cancelarEdicao();
});
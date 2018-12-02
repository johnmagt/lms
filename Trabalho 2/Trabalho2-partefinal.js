let mensageiro = document.querySelector(".layout");

let modalLogin = document.querySelector(".modal-login");
let botaoEntrarSair = document.querySelector(".botao");

let usuario = "john";

function carregarMensageiro() {
    mensageiro.style.display = "block";
}

function esconderMensageiro() {
    mensageiro.style.display = "none";
}

let campoUsuario = document.querySelector(".id-usuario");

function alterarBotaoEntrarSair() {
    if (String(botaoEntrarSair.innerHTML).trim() == "Entrar") {
        botaoEntrarSair.innerHTML = "Sair";
    } else {
        botaoEntrarSair.innerHTML = "Entrar";
    }
}

function login() {
    if (campoUsuario.value == usuario) {
        localStorage.idUsuario = campoUsuario.value;
        fecharModal();
        alterarBotaoEntrarSair();
        carregarMensageiro();
        campoUsuario.value = "";

    } else {
        campoUsuario.style.border = "solid 2px red";
    }
}

let botaoEnviar = document.querySelector(".botao-enviar-dados");
botaoEnviar.addEventListener("click", function (e) {
    e.preventDefault();
    login();
});

function logout() {
    localStorage.idUsuario = "null";
    alterarBotaoEntrarSair();
    esconderMensageiro();
}

function abrirModal() {
    if (String(botaoEntrarSair.innerHTML).trim() == "Sair") {
        logout();
    }
    modalLogin.style.display = "block";
};

function fecharModal() {
    modalLogin.style.display = "none";
};

botaoEntrarSair.addEventListener("click", function () {
    abrirModal();
})

if (localStorage.idUsuario == "john") {
    carregarMensageiro();
    alterarBotaoEntrarSair();
    fecharModal();
    requisicao();
}


function requisicao() {

    let listaMensagens = document.querySelector(".lista-mensagens");
    let grupoSelecionado = document.querySelector(".nome-grupo-selecionado");

//    let botaoEnviarMensagem = document.querySelector(".botao-enviar");
//    let campoMensagem = document.querySelector("digitar-mensagem");
//
//    botaoEnviarMensagem.addEventListener("click", function (e) {
//        e.preventDefault();
//
//        let msg = campoMensagem.value;
//        let body = {
//            "message": msg,
//            "usuario": localStorage.idUsuario
//        };
//
//
//        let xhttp = new XMLHttpRequest();
//        xhttp.onreadystatechange = function () {
//            if (xhttp.readyState == 4) {
//                updateMensagens();
//            }
//        }
//        xhttp.open('POST', 'http://rest.learncode.academy/api/johnmag/groups', true);
//        xhttp.setRequestHeader('content-type', 'application/json');
//        xhttp.send(JSON.stringify(body));
//        campoMensageme.value = "";
//    });
//
//    function updateMensagens() {
//        listaMensagens.innerHTML = "";
//
//        let xhttp = new XMLHttpRequest();
//        xhttp.onreadystatechange = function () {
//            if (xhttp.readyState == 4) {
//                let parsed = JSON.parse(xhttp.responseText);
//                for (let i = 0; i < parsed.length; i++) {
//                    verMensagens(parsed[i]);
//                }
//            }
//        }
//        xhttp.open("GET", "http://rest.learncode.academy/api/johnmag/groups", true);
//        xhttp.send();
//    };

    function verMensagens(grupo) {

        let nomeGrupo = grupo.nomeGrupo;
        let id = grupo.idGrupo;
        let texto = document.createTextNode(nomeGrupo);

        grupoSelecionado.innerHTML = "";
        listaMensagens.innerHTML = "";

        console.log(nomeGrupo);
        grupoSelecionado.appendChild(texto);

        let xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (xhttp2.readyState == 4) {
                let obj_parsed = JSON.parse(xhttp2.responseText);
                for (let i = 0; i < obj_parsed.length; i++) {
                    let msg = obj_parsed[i].message;
                    let usuario = obj_parsed[i].usuario;
                    console.log(msg);
                    console.log(usuario);

                    let mensagem = document.createElement("div");
                    let tituloMensagem = document.createElement("span");
                    let conteudo = document.createElement("span");
                    let textoMensagem = document.createTextNode(msg);
                    let textoUsuario = document.createTextNode(usuario);

                    conteudo.appendChild(textoMensagem);
                    tituloMensagem.appendChild(textoUsuario);
                    console.log(conteudo)
                    tituloMensagem.classList.add("titulo-mensagem");
                    mensagem.appendChild(tituloMensagem);
                    conteudo.classList.add("conteudo");
                    mensagem.appendChild(conteudo);
                    mensagem.classList.add("mensagem");
                    listaMensagens.appendChild(mensagem);
                }
            }
        }

        xhttp2.open('GET', 'http://rest.learncode.academy/api/johnmag/' + id, true);
        xhttp2.send();
//        updateMensagens();
    };


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            let obj_parsed = JSON.parse(xhttp.responseText);
            for (let i = 0; i < obj_parsed.length; i++) {
                console.log(obj_parsed);
            }
        }
    }
    xhttp.open('GET', 'http://rest.learncode.academy/api/johnmag/groups', true);
    xhttp.send();

    let btAbrirForm = document.querySelector(".botao-criar-grupo");
    let form = document.querySelector(".formulario");

    function abrirForm() {
        if (form.style.display != "block") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }

    };

    btAbrirForm.addEventListener("click", function (e) {
        e.preventDefault();
        abrirForm();
    });


    let submit = document.querySelector(".botao-criar");
    let campoNomeGrupo = document.querySelector("#nomeg");
    let campoIDGrupo = document.querySelector("#idg");

    submit.addEventListener("click", function (e) {
        e.preventDefault();

        let body = {
            nomeGrupo: campoNomeGrupo.value,
            idGrupo: campoIDGrupo.value
        }
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                updateGrupo();
            }
        };

        xhttp.open("POST", "http://rest.learncode.academy/api/johnmag/groups", true);
        xhttp.setRequestHeader("content-type", "application/json")
        xhttp.send(JSON.stringify(body));
        campoNomeGrupo.value = "";
        campoIDGrupo.value = "";
    });

    function updateGrupo() {
        listaGrupos.innerHTML = "";

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                let parsed = JSON.parse(xhttp.responseText);
                for (let i = 0; i < parsed.length; i++) {
                    inserirGrupos(parsed[i]);
                }
            }
        }
        xhttp.open("GET", "http://rest.learncode.academy/api/johnmag/groups", true);
        xhttp.send();
    };

    let listaGrupos = document.querySelector(".grupos");
    listaGrupos = listaGrupos.getElementsByTagName("ul")[0];

    function inserirGrupos(grupo) {
        let nomeGrupo = grupo.nomeGrupo;
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute("class", "linkAmigo");
        let span = document.createElement('span');
        let imagem = document.createElement("img");
        imagem.src = "icone-amigos.png";
        let nome = document.createTextNode(nomeGrupo);

        a.appendChild(imagem);
        a.appendChild(span);
        span.appendChild(nome);
        li.appendChild(a);
        listaGrupos.appendChild(li);

        li.addEventListener("click", function () {
            verMensagens(grupo);
        });
    };
    updateGrupo();
};

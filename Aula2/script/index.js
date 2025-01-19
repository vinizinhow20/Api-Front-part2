// COMANDO LIGAR O SERVIDOR ..
// $ json-server --watch Aula2/db.json

const url = "http://localhost:3000/livros";
const elementoUl = document.querySelector("#filmes");
const elementoInputTitle = document.querySelector("input[name='titulo']");
const elementoBotaoAlterar = document.querySelector(".botao-alterar");
const elementoBotaoCadastrar = document.querySelector(".botao-cadastrar");

let idSelecionado = null;
async function listarLivros() {
  const resposta = await axios.get(url);
  resposta.data.forEach((filme) => {
    criarLiFilme(filme);
  });
}

listarLivros();

function criarLiFilme(filme) {
  const li = document.createElement("li");
  const botaoExcluir = document.createElement("button");
  const spanTitulo = document.createElement("span");
  botaoExcluir.textContent = "Excluir";
  selecionarFilmeParaExcluir(botaoExcluir);
  spanTitulo.textContent = filme.titulo;
  li.appendChild(spanTitulo);
  li.appendChild(botaoExcluir);
  li.id = filme.id;
  selecionarFilme(li);
  elementoUl.appendChild(li);
}
function selecionarFilmeParaExcluir(botaoExcluir) {
  botaoExcluir.addEventListener("click", (event) => {
    event.stopPropagation();
    const idFilme = event.target.parentElement.id;
    deletarFilme(idFilme);
  });
}
function selecionarFilme(li) {
  li.addEventListener("click", (event) => {
    const elemento = event.target;

    if (elemento.nodeName == "LI") {
      const spanTitulo = liFilme.querySelector("span");
      elementoInputTitle.value = spanTitulo.textContent;
      idSelecionado = liFilme.id;
    } else if (elemento.nodeName == "SPAN") {
      elementoInputTitle.value = event.target.textContent;
      idSelecionado = elemento.parentElement.id;
    } else {
      return;
    }
    elementoBotaoAlterar.disabled = false;
    elementoBotaoCadastrar.disabled = "disabled";
  });
}

async function cadastrarFilme(event) {
  event.preventDefault();
  const resposta = await axios.post(url, {
    titulo: elementoInputTitle.value,
  });
  console.log(resposta);
}

async function alterarFilme() {
  if (!idSelecionado) return;
  const resposta = await axios.put(`${url}/${idSelecionado}`, {
    titulo: elementoInputTitle.value,
  });
  console.log(resposta);
}

async function deletarFilme(idFilme) {
  if (!idFilme) return;
  const resposta = await axios.delete(`${url}/${idFilme}`);
  console.log(resposta);
}

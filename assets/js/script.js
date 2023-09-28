const formulario = document.querySelector("form");
const inputBox = document.getElementById("input-tarefas");
const btnMarcarTodos = document.getElementById("btn-marcar");
const btnApagarTodos = document.getElementById("btn-limpar");
let lista = document.querySelector("ul");

function adcionarTarefa(evento) {
  evento.preventDefault();
  let inputTxt = inputBox.value;

  if (inputTxt.trim() == "") {
    alert("Digite alguma tarefa");
  } else {
    let div = document.createElement("div"); //cria uma div para abrigar cada tarefa
    div.classList.add("div-tarefa"); //class pra o check e o texto ficarem lado a lado

    let check = document.createElement("input"); //cria um input checkbox
    check.setAttribute("type", "checkbox");
    check.addEventListener("change", marcarTarefa);
    check.addEventListener("change", mudarTextoBotaoMarcarTodos);

    let itemLista = document.createElement("li"); //cria um li e poe o texto do input dentro
    itemLista.innerHTML = inputTxt;

    let btnApagar = document.createElement("button");
    btnApagar.addEventListener("click", apagarTarefa);
    let hr = document.createElement('hr')

    itemLista.appendChild(check);
    div.appendChild(itemLista); //coloca o li e check como filhos da div
    div.appendChild(btnApagar);
    lista.appendChild(div); // coloca a div como filha do ul
    lista.appendChild(hr)
  }
  inputBox.value = "";
}

formulario.addEventListener("submit", adcionarTarefa);

function marcarTarefa() {
  let itemLista = this.parentNode;

  if (this.checked) {
    itemLista.classList.add("checked");
  } else {
    itemLista.classList.remove("checked");
  }
}

function verificarSeTodasEstaoMarcadas() {
  let listAllCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  let todosMarcados = true;
  listAllCheckboxes.forEach((checkDaVez) => {
    if (checkDaVez.checked === false) {
      todosMarcados = false;
    }
  });
  return todosMarcados;
}

function mudarTextoBotaoMarcarTodos() {
  let todosMarcados = verificarSeTodasEstaoMarcadas();

  if (todosMarcados === true) {
    btnMarcarTodos.innerHTML = "desmarcar todos";
  } else {
    btnMarcarTodos.innerHTML = "marcar todos";
  }
}

function marcarTodasAsTarefas() {
  let listAllCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  let todosMarcados = verificarSeTodasEstaoMarcadas();

  listAllCheckboxes.forEach((checkDaVez) => {
    checkDaVez.checked = !todosMarcados;
    marcarTarefa.call(checkDaVez);
  });
}

btnMarcarTodos.addEventListener("click", marcarTodasAsTarefas);
btnMarcarTodos.addEventListener("click", mudarTextoBotaoMarcarTodos);

function apagarTarefa(evento) {
  let item = evento.target.parentElement;
  lista.removeChild(item);
}

function apagarTodasAsTarefas() {
  let allDivs = document.querySelectorAll("ul div");
  allDivs.forEach((divDaVez) => lista.removeChild(divDaVez));
}

btnApagarTodos.addEventListener("click", apagarTodasAsTarefas);

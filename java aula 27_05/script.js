let contadorTarefas = 0;

function adicionarTarefa() {
    // Constantes Elemetos HTML
    const inputElement = document.getElementById('nova_tarefa');
    const mensagemElement = document.getElementById("mensagem");
    const listatarefas = document.getElementById('lista_tarefas');
    const contadorElement = document.getElementById("contador");
    const botaoExcluir = document.createElement('button');

    // variaveis
    let tarefa = inputElement.value; //string
    let mensagem, cor;

    
    if (tarefaValida) {
        let novaTarefa = document.createElement('li');

        novaTarefa.textContent = tarefa;

        botaoExcluir.textContent = 'X';

        botaoExcluir.onclick = function() {

            novaTarefa.remove();

            contadorTarefas--;

            contadorElement.textContent = `(${contadorTarefas})`;
        };

        novaTarefa.appendChild(botaoExcluir);

        listatarefas.appendChild(novaTarefa);

        contadorTarefas++;

        contadorElement.textContent = `(${contadorTarefas})`;
        
        mensagem = "Adicionado com sucesso";
        cor = 'green';
    }else{
        mensagem = "Tarefa invalida, redigite";
        cor = 'red';
    }

    mensagemElement.textContent = mensagem;
    mensagemElement.style.color = cor;

    
    inputElement.value = '';
    inputElement.focus();
 }

 function tarefaValida() {
    return tarefa.trim().length >= 5;
 }

 const inputElement = document.getElementById('nova_tarefa');

 inputElement.addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {

        adicionarTarefa();
    }
 });
   

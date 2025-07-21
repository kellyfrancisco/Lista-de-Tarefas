import React, { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'



import { Container, TodoList, Input, Button, ListItem, Trash, Check } from './styles'


function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState('');


  function inputMudou(event) {
    setInputTask(event.target.value);
  }

  function cliqueiNoBotao() {
    if (inputTask.trim() === '') return;
    // Verifica se a tarefa já existe na lista//
    setList([...list, { id: uuidv4(), task: inputTask, finished: false }]);
    setInputTask(''); // Limpa o campo de entrada após adicionar a tarefa//
  }

  // Função para marcar a tarefa como realizada ou não //
  function teclaPrecionada(event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é 'Enter' //
      cliqueiNoBotao(); // Chama a função para adicionar a tarefa //
    }
  }

  function TarefaRealizada(id) {

    const newList = list.map(item => (
      item.id === id ? { ...item, finished: !item.finished } : item
    ));

    setList(newList);
  }

  function deletarItem(id) {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  }



  return (

    <Container>
      <TodoList>
        <Input 
        onChange={inputMudou}
        onKeyDown={teclaPrecionada} //adiciona o evento de tecla pressionada //
        placeholder="Qual a próxima Tarefa?"
        value={inputTask} // vincula o valor do input ao estado inputTask //
        />
        <Button onClick={cliqueiNoBotao}>Adicionar</Button>

        <ul>
          {
            list.length > 0 ? (
              list.map((item) => (
                <ListItem isfinished={item.finished} key={item.id}>
                  <Check onClick={() => TarefaRealizada(item.id)} />
                  <li>{item.task}</li>
                  <Trash onClick={() => deletarItem(item.id)} />
                </ListItem>
              ))
            ) : (
              <h3>Não há Tarefa na Lista</h3>
            )
          }
        </ul>
      </TodoList>
    </Container>
  )
}


export default App

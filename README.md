# Documentação

__1 -__ No GitBash, é criada a pasta do projeto e instalada a biblioteca do React.
```
$ npx create-react-app lista-interativa
```
__2 -__ Acessar a pasta criada.
```
$ cd lista-interativa
```
__3 -__ Abrir o VSCode.
```
$ code .
```
__4 -__ Iniciar o React, abrindo no navegador.
```
$ npm start
```
__5 -__ Deletar os arquivos desnecessários ("App.test.js", "logo.svg", "reportWebVitals.js" e "setupTest.js") e as linhas que os referenciam nos arquivos "App.js" e "index.js".

__6 -__ Em seguida, é criada a pasta "components" dentro da pasta "src".

__7 -__ Criar o componente "ItemLista.jsx" dentro da pasta "components" e adicionar o seguinte código:
```
import React from 'react';

const ItemLista = ({ onChange, onDelete, value }) => {
  return (
    <div className="item">
      <input
        className="item-input"
        value={value}
        onChange={onChange}
      />
      <button className='botao-excluir' onClick={onDelete}>Excluir</button>
    </div>
  );
};

export default ItemLista;
```
Esse componente irá permitir que os itens sejam editados e excluídos no objeto pai. Para isso, são criados dois props "onChange" e "onDelete", assim como uma prop para receber o nome da presente tarefa: "value".

__8 -__ Criar o componente "NovoItemLista.jsx", também dentro da pasta "components", e adicionar o seguinte código:
```
import React, { useState } from 'react';
const NovoItem = ({ onSubmit }) => {

  const [newItem, setNewItem] = useState('');

  function setNewTask({target}) {
    setNewItem(target.value);
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(newItem);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          className="novo-item-input"
          placeholder="Digite uma nova atividade..."
          onChange={setNewTask}
        />
        <button type="submit" className='botao-adicionar'>
          Adicionar
        </button>
      </form>
    </div>
  )
};

export default NovoItem;
```
Esse componente pega um valor com o input, o armazena no useState e o passa para o objeto pai. O "preventDefault" é utilizado para previnir que a página recarregue após o formulário ser enviado.

__9 -__ Alterar o "App.js", ou seja, o objeto pai:
```
import React, { useState } from 'react';
import './App.css';
import NovoItem from './components/NovoItemLista';
import ItemLista from './components/ItemLista';

const App = () => {
  const [tasks, setTasks] = useState([]);

  function addNewTask(task) {
    const itensCopy = Array.from(tasks);
    itensCopy.push({ id: tasks.length, value: task });
    setTasks(itensCopy);
  }

  function updateTask({ target }, index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1, { id: index, value: target.value });
    setTasks(itensCopy);
  }

  function deleteTask(index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1);
    setTasks(itensCopy);
  }

  return (
    <div className="App">
      <div className="lista">
      <h1>Lista de Atividades de Lazer</h1>
        <NovoItem onSubmit={addNewTask} />
        {tasks.map(({ id, value }, index) => (
          <ItemLista 
            key={id}
            value={value}
            onChange={(event) => updateTask(event, index)}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
```
São declaradas três novas funções: addNewTask, updateTask e deleteTask. Em cada uma das funções, o Array.from() cria uma cópia dos valores do state e, através do push ou splice os altera, para depois atualizar o state diretamente com a cópia alterada. Isso é feito para evitar que o React não detecte a mudança corretamente por conta da alteração diretamente no state.

* __Adicionar item__: É recebido o valor através do onSubmit do componente NovoItemLista e então criado um Array cópia das atividades já na lista. Em seguida, é usado o push (adiciona um ou mais elementos ao fim de um array) e utilizado o valor do comprimento do Array cópia para criar o id do novo item.
* __Editar item__: Utilizando o index como parâmetro de qual elemento editar, é usado o splice (altera o conteúdo de um Array através da remoção ou substituição de elementos existentes e/ou adicionando novos elementos em suas posições).
* __Deletar item__: Similar ao processo de edição, é utilizado o splice. Porém, é omitido o último parâmetro, deletando o conteúdo ao invés de o substituir por outro valor.

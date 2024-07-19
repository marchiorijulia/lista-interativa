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
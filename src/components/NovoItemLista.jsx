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
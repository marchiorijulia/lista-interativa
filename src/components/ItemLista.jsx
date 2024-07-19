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
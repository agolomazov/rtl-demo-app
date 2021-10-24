import React, { useState } from 'react';
import { useGetGoodsQuery, useAddProductMutation, useRemoveProductMutation } from './store/goodsApi';

export function App() {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');

  const { data: goods = [], isLoading, error } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [removeProduct] = useRemoveProductMutation();


  const handleChangeCount = (e) => {
    setCount(e.target.value)
  }

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handleRemoveProduct = async (productId) => {
    // eslint-disable-next-line
    if (confirm('Вы уверены что хотите удалить продукт?')) {
      removeProduct(productId);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(ev) => setNewProduct(ev.target.value)}
        />
        <button onClick={handleAddProduct} disabled={!newProduct}>
          Add product
        </button>
      </div>
      <div>
        <select value={count} onChange={handleChangeCount}>
          <option value="">Выберите количество</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      {isLoading && <p>Загрузка данных...</p>}
      {!isLoading && error && <p>{error.status}</p>}
      {!isLoading &&
        goods.map((good) => (
          <p key={good.id} onClick={() => handleRemoveProduct(good.id)}>
            {good.name}
          </p>
        ))}
    </div>
  );
}

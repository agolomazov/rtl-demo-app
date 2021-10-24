import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';

import { fetchTodos } from '../store/_todoSlice';

const TodoList = () => {
  const { todos, isLoading, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(10));
  }, []);

  return (
    <ul>
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && error}
      {!isLoading && todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;

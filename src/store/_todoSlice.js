import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function(limit = 10, thunkApi) {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
        {
          params: {
            _limit: limit
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.request);
      return thunkApi.rejectWithValue('Произошла ошибка загрузки списка дел');
    }
  }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
      todos: [],
      isLoading: false,
      error: ''
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
              id: new Date().toISOString(),
              text: action.payload.text,
              completed: false,
            });
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
      [fetchTodos.pending]: (state) => {
        state.isLoading = true;
        state.error = '';
      },
      [fetchTodos.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      },
      [fetchTodos.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    }
});

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;

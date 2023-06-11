import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddToDo from './components/AddToDo';
import apiCall from './api/apiCall';
import { ToDo } from './types/todoType';

function App() {
  const [todos, setTodos] = useState<[ToDo] | []>([]);
  const [error, setError] = useState<boolean>(false);

  const loadTodo = async () => {
    try {
      let res: any = await apiCall.get("/todos");
      // console.log(res.data);
      let data = res.data
      let sortData = []
      
      for(let i=data.length-1;i>=0;i--){
        sortData.push(data[i])
        
      }
      setTodos(sortData as [ToDo]);
    } catch (err: any) {
      setError(true);
    }
  };

  

  useEffect(() => {
    loadTodo();
  }, []);
  return (
    <div className="App">
      <AddToDo loadTodo={loadTodo}/>
      <TodoList todos={todos} error={error} loadTodo={loadTodo}/>
    </div>
  );
}

export default App;

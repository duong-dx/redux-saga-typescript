import React from 'react';
import TodoContext, {ITodo} from "./TodoContext";

const TodoProvide:React.FC = ({ children }) => {
  const dateNow = new Date()
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      name: 'Ẩn danh',
      title: "post 1",
      description: "this is my first description",
      status: false,
      time: dateNow
    },
    {
      id: 2,
      name: 'Ẩn danh',
      title: "post 2",
      description: "this is my second description",
      status: true,
      time: dateNow
    }
  ]);
  
  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.floor((Math.random() * 10000)), // not really unique - but fine for this example
      name: todo ? todo.name : 'Ẩn danh' ,
      title: todo ? todo.title : 'Bạn đã không nhập trường này' ,
      description: todo ? todo.description : 'Bạn đã không nhập trường này',
      time: dateNow,
      status: false
    }
    
    setTodos([...todos, newTodo])
  }
  console.log(todos);
  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = true
        setTodos([...todos])
      }
    })
  }
  
  // @ts-ignore
  return (
    <TodoContext.Provider value={{todos, saveTodo, updateTodo}}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvide;

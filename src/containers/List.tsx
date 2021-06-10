import React from 'react';
import AddTodo from '../features/contexts';
import TodoProvide from "../features/contexts/TodoProvide";
import Todos from "../features/contexts/Todos";

const List:React.FC = () => {
  
  return <TodoProvide>
    <AddTodo />
    <Todos />
  </TodoProvide>
}

export default List;

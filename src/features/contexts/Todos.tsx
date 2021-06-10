import React from 'react';
import Card from "./Card";
import TodoContext, {ContextType, ITodo} from "./TodoContext";

const Todos: React.FC = () => {
  const { todos, updateTodo } = React.useContext(TodoContext) as ContextType
  console.log(todos);
  const renderCard = () => {
    return todos.map((todo:ITodo, index:number) =>
       <Card key={index} todo={todo} updateTodo={updateTodo} />
    )
  }
  return <div>
    {renderCard()}
  </div>
}

export default Todos;

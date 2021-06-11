import React from 'react';
import Card from "./Card";
import TodoContext, {ContextType, ITodo} from "./TodoContext";
import './scss/card.scss'

const Todos: React.FC = () => {
  const { todos } = React.useContext(TodoContext) as ContextType
  const renderCard = () => {
    return todos.sort((a, b) => b.time - a.time).map((todo:ITodo, index:number) =>
       <Card key={index} todo={todo} />
    )
  }
  return <div className='group-card'>
    {renderCard()}
  </div>
}

export default Todos;

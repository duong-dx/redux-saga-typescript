import React, {useCallback} from 'react';
import Card from "./Card";
import TodoContext, {ContextType, ITodo} from "./TodoContext";
import './scss/card.scss'

const Todos: React.FC = () => {
  const { todos } = React.useContext(TodoContext) as ContextType
  
  const renderCard = useCallback(() => {
    return todos.sort((a, b) => b.time - a.time).map((todo:ITodo, index:number) =>
       <Card key={index} todo={todo} />
    )
  }, [todos])
  return <div className='group-card'>
    {renderCard()}
  </div>
}

export default React.memo(Todos);

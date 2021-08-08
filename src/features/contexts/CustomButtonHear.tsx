import React from 'react';
import './scss/custom-button-heart.scss'
import {ITodo} from "./TodoContext";

type Props = {
  todo: ITodo
  updateTodo: (id: number) => void
}

const CustomButtonHear: React.FC<Props> = ({todo, updateTodo}) => {
  return (
    <label className="like">
      <input
        className={'input-hidden'}
        type="checkbox"
        checked={todo.status}
        onClick={() => updateTodo(todo.id)}
        onChange={e => {}}
      />
      <div className="hearth"/>
    </label>
  );
}

export default React.memo(CustomButtonHear);

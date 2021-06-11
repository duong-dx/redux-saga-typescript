import React from "react";

export interface ITodo {
  id: number
  name: string
  title: string
  description: string
  status: boolean
  time: any
  image: any
  color: string
}

export type ContextType = {
  todos: ITodo[]
  saveTodo: (todo: ITodo) => void
  updateTodo: (id: number) => void
}

const TodoContext = React.createContext<ContextType | {}>({} as ContextType);
export default TodoContext;


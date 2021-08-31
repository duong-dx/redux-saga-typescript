import React, {useCallback} from 'react';
import TodoContext, {ITodo} from "./TodoContext";
import Anh1 from './images/45397717_770116720001183_4599763792030494306_n-960x640.jpeg'
import Anh2 from './images/anh1.jpeg'
import Anh3 from './images/anh2.jpeg'
import Anh4 from './images/anh3.jpeg'
import Anh5 from './images/anh4.jpeg'
import Anh6 from './images/anh5.jpeg'
import Anh7 from './images/anh6.jpeg'
import Anh8 from './images/anh8.jpeg'
import Anh9 from './images/anh9.jpeg'
import Anh10 from './images/anh10.jpeg'
import Anh11 from './images/anh11.jpeg'
import Anh12 from './images/anh12.jpeg'
import Anh13 from './images/anh14.jpeg'
import Anh14 from './images/anh15.jpeg'
import Anh15 from './images/anh17.jpeg'
import Anh16 from './images/anh18.jpeg'
import Anh17 from './images/anh19.jpeg'
import Anh18 from './images/anh20.jpeg'
import NY from './images/ny.jpg'
import PushNotification from 'api/push-notification';
import { getAccessToken } from '../../hooks/index';

const images: Array<any> =
    [Anh1, Anh2, Anh3, Anh4, Anh5, Anh6, Anh7, Anh8, Anh9, Anh10, Anh11, Anh12, Anh13, Anh14 , Anh15, Anh16, Anh17, Anh18]

const dateNow = new Date()

const randomImage = () => {
  const index:number = Math.floor(Math.random() * (images.length))
  return images[index]
}


const randomBackgroundColor = ():string => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const TodoProvide:React.FC = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      name: 'Xuân Dương',
      title: "Love you to the moon come back",
      description: "Love you to the moon come back",
      status: true,
      time: dateNow,
      image: NY,
      color: randomBackgroundColor()
    },
    {
      id: 2,
      name: 'Ẩn danh',
      title: "Hoa cúc họa mi là hoa gì",
      description: "Cứ mỗi độ Đông về, hình ảnh những bông hoa cúc họa mi nhỏ bé, mộc mạc, xinh xắn lại tràn ngập khắp các phố phường Hà Nội. Đi dọc các con đường, bạn có thể dễ dàng bắt gặp bóng dáng những chiếc xe đạp chở đầy những cành hoa tươi, cánh hoa trắng muốt làm nền cho màu vàng của nhụy hoa nổi bật lên, vừa duyên dáng lại vừa giản dị, chân chất. \n",
      status: false,
      time: dateNow,
      image: Anh12,
      color: randomBackgroundColor()
    },
    {
      id: 3,
      name: 'Ẩn danh',
      title: "Hoa cúc họa mi",
      description: "Hoa cúc họa mi là loài hoa nhỏ thuộc họ Cúc, có tên gọi tiếng Anh là Daisy. Cúc họa mi được biết đến là loài hoa mọc hoang dã, sống bền bỉ và mạnh mẽ dù thân cây nhỏ bé, tán lá mỏng manh và yếu ớt.",
      status: true,
      time: dateNow,
      image: Anh14,
      color: randomBackgroundColor()
    },
  ]);
  
  const saveTodo = useCallback((todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.floor((Math.random() * 10000)), // not really unique - but fine for this example
      name: todo ? todo.name : 'Ẩn danh' ,
      title: todo ? todo.title : 'Bạn đã không nhập trường này' ,
      description: todo ? todo.description : 'Bạn đã không nhập trường này',
      time: new Date(),
      status: false,
      image: randomImage(),
      color: randomBackgroundColor()
    }

    PushNotification.sendNotification(newTodo.title, newTodo.description, getAccessToken())
    .then(response => {
      setTodos([...todos, newTodo])
    })
    
  }, [todos])

  const updateTodo = useCallback((id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = !todo.status
        setTodos([...todos])
      }
    })
  }, [todos])
  
  return (
    <TodoContext.Provider value={{todos, saveTodo, updateTodo}}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvide;

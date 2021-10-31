import React, { useContext, useState } from 'react';
// import { SocketContext } from '../../app/context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { chatActions, chatSlice, ChatState } from './chatSlide';

// interface conversationInterface {id: number, title: string}
const Index: React.FC = () => {
  const dispatch = useDispatch();
  const chat: ChatState = useSelector((state: RootState) => state.chat)
  // const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('')

  const sendData = () => {
    dispatch(chatActions.sendMessage({ message, room: 'room1' }))
    setMessage('')
  }

  return (
    <div>
      {
        chat.messages && chat.messages.map((message, index) => <p key={index}>{message.message}</p>)
      }
      <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendData}>
        { chat.sending ? 'Sending.........' : 'Send'}
      </button>
    </div>
  )
}

export default React.memo(Index)
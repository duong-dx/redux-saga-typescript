import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../app/context';

const Index: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('')
  useEffect(() => {
    socket.on('message-received', (message) => {
      console.log(message);
    })

    return () => {
      socket.off('message-received')
    }
  }, [socket])

  const sendData = () => {
    socket.emit('messages', { message })
  }
  return (
    <div>
      <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendData}>Send</button>
    </div>
  )
}

export default React.memo(Index)
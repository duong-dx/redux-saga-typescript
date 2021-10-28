import io, { Socket } from 'socket.io-client';
import {createContext} from 'react';
import { getAccessToken } from '../hooks';

interface Context {
  socket: Socket;
}
const token = getAccessToken();

export const socket = io('http://localhost:3006', {
  query: { token }
})

export const SocketContext = createContext<Context>({
  socket
});
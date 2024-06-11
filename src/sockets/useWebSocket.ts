// useWebSocket.ts
import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import User from '../models/User';
import Message from '../models/Message';

const useWebSocket = (backendUrl: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(backendUrl);

    console.log("Attempting to connect to server...");

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server');
      setSocketConnected(true);
      socket.emit('newUser');
    });

    socket.on('users', (data: User[]) => {
      console.log("Users data received:", data);
      setUsers(data);
    });

    socket.on('newUser', (data: User) => {
      console.log('New user event received:', data);
      setUsers(prevUsers => [...prevUsers, data]);
    });

    socket.on('userDisconnected', (data: { clientId: string }) => {
      console.log('User disconnected:', data);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== data.clientId));
    });

    socket.on('disconnect', () => {
      console.log("Disconnected from server");
      setSocketConnected(false);
    });

    socket.on('connect_error', () => {
      console.error("Connection error");
      setSocketConnected(false);
    });

    socket.on('reconnect', () => {
      console.log("Reconnected to server");
      socket.emit('newUser');
    });

    socket.on('message', (data: Message) => {
      console.log(`Message "${data.text}" received form ${data.senderId}`);
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [backendUrl]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketConnected) {
      // Emit the message to the server
      socketRef.current.emit('sendMessage', { message });
    } else {
      console.error('Socket is not connected. Message not sent.');
    }
  };

  return { users, socketConnected, message, setMessage, sendMessage };
};

export default useWebSocket;

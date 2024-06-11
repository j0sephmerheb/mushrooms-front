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
  const [username, setUsername] = useState<string>('');

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
      console.log(`Message "${data.text}" received from ${data.senderId}`);
      setMessage(data);
    });

    // Only set the username once when the component mounts
    if (!username) {
      socket.on('userConnected', (data: { user: User }) => {
        setUsername(data.user.username);
      });
    };

    return () => {
      socket.disconnect();
    };
  }, [backendUrl, username]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketConnected) {
      socketRef.current.emit('sendMessage', { message });
    } else {
      console.error('Socket is not connected. Message not sent.');
    }
  };

  return { users, socketConnected, message, setMessage, sendMessage, username };
};

export default useWebSocket;

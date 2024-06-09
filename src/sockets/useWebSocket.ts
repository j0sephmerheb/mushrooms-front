import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import User from '../models/User';

const useWebSocket = (backendUrl: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(backendUrl);

    console.log("Attempting to connect to server...");

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

    return () => {
      socket.disconnect();
    };
  }, [backendUrl]);

  return { users, socketConnected };
};

export default useWebSocket;

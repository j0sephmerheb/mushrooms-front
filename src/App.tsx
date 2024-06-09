// src/App.tsx
import React from 'react';
import './App.scss';
import ThreeScene from './components/ThreeScene';
import useWebSocket from './sockets/useWebSocket';

const App: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL!;
  const { users, socketConnected } = useWebSocket(backendUrl);

  return (
    <div className="app">
      {socketConnected ? (
        <ThreeScene users={users} />
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default App;

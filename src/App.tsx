// App.tsc
import React from 'react';
import './App.scss';
import UserList from './components/UserList';
import useWebSocket from './sockets/useWebSocket';

const App: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL!;
  const { users, socketConnected } = useWebSocket(backendUrl);

  return (
    <div className="app">
      {socketConnected ? (
        <UserList users={users} />
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default App;


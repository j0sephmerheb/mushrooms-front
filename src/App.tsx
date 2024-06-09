// App.tsc
import React, { useEffect, useState } from 'react';
import './App.scss';
import UserList from './components/UserList';
import useWebSocket from './sockets/useWebSocket';

const App: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL!;
  const { users, socketConnected, message, sendMessage } = useWebSocket(backendUrl);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputMessage.trim() !== '') {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  useEffect(() => {
    if (message) {
      // Handle message received from the server if needed
    }
  }, [message]);

  return (
    <div className="app">
      {socketConnected ? (
        <div>
          <UserList users={users} message={message} />
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputMessage} onChange={handleChange} placeholder="Type your message" />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default App;


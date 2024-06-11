// App.tsc
import React, { useEffect, useState } from 'react';
import './App.scss';
import UserList from './components/UserList';
import useWebSocket from './sockets/useWebSocket';

const App: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL!;
  const { users, socketConnected, message, sendMessage, username } = useWebSocket(backendUrl);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [displayMessage, setDisplayMessage] = useState<{ [key: string]: string | null }>({});

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
      const senderId = message.senderId as string;
      const messageText = message.text;
  
      setDisplayMessage(prevState => {
        const newState = { ...prevState };
        if (messageText !== undefined && messageText !== null) {
          newState[senderId] = messageText;
        }
        return newState;
      });
  
      // Clear the message after 1 second
      setTimeout(() => {
        setDisplayMessage(prevState => {
          const newState = { ...prevState };
          delete newState[senderId];
          return newState;
        });
      }, 5000);
    }
  }, [message]);
  

  return (
    <div className="app">
      {socketConnected ? (
        <div>
          <UserList users={users} displayMessage={displayMessage} />

          <div className='form'>
            <form onSubmit={handleSubmit}>
              <div className='input-holder '>
                <input type="text" value={inputMessage} onChange={handleChange} placeholder="Type your message" />
                <button type="submit">Send</button>
              </div>
            </form>
          </div>

          <div className='user-count'>
            Users: {users.length}
          </div>

          <div className='connected-user'>
            Connected as: {username}
          </div>
        </div>
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default App;

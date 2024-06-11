// UserList.tsx
import React from 'react';
import Avatar from './Avatar';
import User from '../models/User';
import Message from '../models/Message';

interface UserListProps {
  users: User[];
  message: Message;
}

const UserList: React.FC<UserListProps> = ({ users, message }) => {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user, index) => (
          <Avatar
            key={index}
            username={user.username}
            position={user.position}
            senderId={user.id} 
            message={message}
          />
        ))
      ) : (
        <div>No users connected</div>
      )}
    </div>
  );
};

export default UserList;
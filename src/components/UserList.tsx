// UserList.tsx
import React from 'react';
import Avatar from './Avatar';
import User from '../models/User';

interface UserListProps {
  users: User[];
  displayMessage: { [key: string]: string | null };
}

const UserList: React.FC<UserListProps> = ({ users, displayMessage }) => {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user, index) => (
          <Avatar
            key={index}
            user={user}
            message={displayMessage[user.id]}
          />
        ))
      ) : (
        <div>No users connected</div>
      )}
    </div>
  );
};

export default UserList;

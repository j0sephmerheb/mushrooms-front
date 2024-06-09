// UserList.tsx
import React from 'react';
import Avatar from './Avatar';
import User from '../models/User';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user, index) => (
          <Avatar key={index} position={user.position} />
        ))
      ) : (
        <div>No users connected</div>
      )}
    </div>
  );
};

export default UserList;

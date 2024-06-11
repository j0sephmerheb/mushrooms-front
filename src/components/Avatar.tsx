// Avatar.tsx
import React from 'react';
import Message from '../models/Message';
import User from '../models/User';

interface AvatarProps {
  user: User;
  message: string | null; // Update the type of the message prop
}

const Avatar: React.FC<AvatarProps> = ({ user, message }) => {
  return (
    <div className="avatar" style={{ top: `${user.position.y}px`, left: `${user.position.x}px`, position: 'absolute' }}>
      <img src="/assets/stickman.png" alt="Stickman Avatar" />
      <span className='username'>{user.username}</span>
      {message && <span className='message'>{message}</span>} {/* Use message directly */}
    </div>
  );
};

export default Avatar;

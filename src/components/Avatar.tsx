// Avatar.tsx
import React from 'react';
import Message from '../models/Message';

interface AvatarProps {
  username: string;
  position: { x: number; y: number; z: number };
  senderId: string;
  message: Message;
}

const Avatar: React.FC<AvatarProps> = ({ position, username, message }) => {
  return (
    <div className="avatar" style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}>
      <img src="/assets/stickman.png" alt="Stickman Avatar" />
      <span className='username'>{username}</span>
      <span>{message.text}</span>
    </div>
  );
};

export default Avatar;
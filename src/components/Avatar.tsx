// Avatar.tsx
import React from 'react';

interface AvatarProps {
  username: string,
  position: { x: number; y: number; z: number };
}

const Avatar: React.FC<AvatarProps> = ({ position, username }) => {
  return (
    <div
      className="avatar"
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}
    >
      <img src="/assets/stickman.png" alt="Stickman Avatar" />
      <span className='username'>{ username }</span>
      <span>{ position.x } , { position.y } , { position.z } </span>
    </div>
  );
};

export default Avatar;

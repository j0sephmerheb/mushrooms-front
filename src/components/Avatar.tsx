// Avatar.tsx
import React from 'react';

interface AvatarProps {
  position: { x: number; y: number };
}

const Avatar: React.FC<AvatarProps> = ({ position }) => {
  return (
    <div
      className="avatar"
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}
    >
      <img src="/assets/stickman.png" alt="Stickman Avatar" />
    </div>
  );
};

export default Avatar;


// ThreeScene.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import User from '../models/User';
import generateCityGeometry from '../functions/generateCityGeometry';

interface ThreeSceneProps {
  users: User[];
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ users }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd8e7ff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x404040, 1);
    scene.add(light);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshBasicMaterial({ color: 0x101018 }));
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Create city geometry
    const cityGeometry = generateCityGeometry();
    const cityMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 });
    const cityMesh = new THREE.Mesh(cityGeometry, cityMaterial);
    scene.add(cityMesh);


    // Create spheres and labels for each user
    const createSphere = (user: User) => {
      const geometry = new THREE.SphereGeometry(5, 100, 100); // Adjust size as needed
      const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(Math.random() * 0xffffff) });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(user.position.x, user.position.y, user.position.z);
      renderer.shadowMap.enabled = true;
      sphere.castShadow = true;
      scene.add(sphere);

      // Add text label for user's name
      const label = createTextLabel(user.username);
      if (label) {
        label.position.set(user.position.x, user.position.y + 2, user.position.z);
        scene.add(label);
      } else {
        console.error('Failed to create label for user:', user.username);
      }
    };

    const createTextLabel = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        console.error('Failed to get 2D context');
        return null;
      }

      const fontSize = 12;
      context.font = `${fontSize}px Arial`;
      const textWidth = context.measureText(text).width;
      canvas.width = textWidth;
      canvas.height = fontSize;
      context.font = `${fontSize}px Arial`;
      context.fillStyle = 'rgba(255, 255, 255, 0.9)';
      context.fillText(text, 0, fontSize);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(textWidth / 10, fontSize / 10); // Adjust size as needed
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    };

    users.forEach(createSphere);

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowLeft':
            // Turn left
            camera.rotation.y += 0.1;
            break;
          case 'ArrowRight':
            // Turn right
            camera.rotation.y -= 0.1;
            break;
          case 'ArrowUp':
            // Move up
            camera.position.y += 1;
            break;
          case 'ArrowDown':
            // Move down
            camera.position.y -= 1;
            break;
          case 'z':
            // Move forward
            camera.position.x -= Math.sin(camera.rotation.y) * 10;
            camera.position.z -= Math.cos(camera.rotation.y) * 10;
            break;
          case 's':
            // Move backward
            camera.position.x += Math.sin(camera.rotation.y) * 10;
            camera.position.z += Math.cos(camera.rotation.y) * 10;
            break;
          case 'q':
            // Strafe left
            camera.position.x -= Math.cos(camera.rotation.y) * 10;
            camera.position.z += Math.sin(camera.rotation.y) * 10;
            break;
          case 'd':
            // Strafe right
            camera.position.x += Math.cos(camera.rotation.y) * 10;
            camera.position.z -= Math.sin(camera.rotation.y) * 10;
            break;
          default:
            break;
        }
    };

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
        mountRef.current?.removeChild(renderer.domElement);
    };
}, [users]);


  return <div ref={mountRef} />;
};

export default ThreeScene;

// src/functions/generateCityGeometry.ts
import * as THREE from 'three';

const generateCityGeometry = () => {
    const cityGeometry = new THREE.BufferGeometry();

    // Define vertices for the ground plane
    const vertices = [
        -1000, 0, -1000,
        1000, 0, -1000,
        1000, 0, 1000,
        -1000, 0, 1000,
    ];

    // Define faces
    const indices = [
        0, 2, 1, // Triangle 1
        0, 3, 2, // Triangle 2
    ];

    // Apply a color for the ground
    const groundColor = new THREE.Color(0xaaaaaa);

    // Create an array to hold colors for each vertex
    const colors: number[] = [];
    for (let i = 0; i < vertices.length / 3; i++) {
        colors.push(groundColor.r, groundColor.g, groundColor.b);
    }

    // Set attributes for city geometry
    cityGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    cityGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    cityGeometry.setIndex(indices);

    return cityGeometry;
};

export default generateCityGeometry;
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { createHDRSelector, hdrOptions } from './components/HDRSelector.js';

// "Spectar"
const header = document.createElement('div');
header.textContent = 'Spectar';
header.style.position = 'absolute';
header.style.top = '30px';
header.style.left = '30px';
header.style.letterSpacing = '-2px';
header.style.fontFamily = "'Albert Sans', sans-serif";
header.style.fontSize = '52px';
header.style.fontWeight = '600';
header.style.color = '#000000';
header.style.zIndex = '1000'; // Ensure it appears above the Three.js canvas
document.body.appendChild(header);

// Description in bottom right
const description = document.createElement('div');
description.textContent = 'Utilizing RayBans newest Meta AI glasses to reinvent accessibility standards for our seniors.';
description.style.position = 'absolute';
description.style.bottom = '20px';
description.style.right = '20px';
description.style.fontFamily = "'Albert Sans', sans-serif";
description.style.fontSize = '16px';
description.style.fontWeight = '400';
description.style.color = '#000000';
description.style.maxWidth = '400px';
description.style.textAlign = 'right';
description.style.lineHeight = '1.5';
description.style.zIndex = '1000'; // Ensure it appears above the Three.js canvas
document.body.appendChild(description);

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf5f5f5); // Light gray background
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

// Enable physically correct lighting
renderer.physicallyCorrectLights = true;

// Important for glass material
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
// Configure shadow properties
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Add additional fill light from the front
const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
frontLight.position.set(0, 0, 5);
scene.add(frontLight);

// Create a white cube for the sunglasses to rest on
const cubeGeometry = new THREE.BoxGeometry(7, 3, 8);
const cubeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.1
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, -2.75, -2.5); // Position the cube below the glasses
cube.receiveShadow = true; // Allow the cube to receive shadows
scene.add(cube);

// Position camera
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Create glass material
const glassMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.0,           // Completely smooth
    transmission: 0.4,        // Reduced transmission for darker appearance
    thickness: 0.2,          // Thin glass
    ior: 1.8,               // Higher index of refraction for more reflection
    clearcoat: 1.0,         // Maximum clearcoat
    clearcoatRoughness: 0.0, // Smooth clearcoat
    envMapIntensity: 2.0,    // Increased environment map intensity
    transparent: true,
    opacity: 0.9,           // High opacity
    reflectivity: 0.9,      // Maximum reflectivity
    metalness: 0.2,         // Keep non-metallic
    color: new THREE.Color(0x1a1a1a),  // Dark tint
    attenuationColor: new THREE.Color(0x000000), // Dark attenuation
    attenuationDistance: 0.5           // Short attenuation distance
});

// Create GLTF loader
const loader = new GLTFLoader();

// Variable to store the model
let model;

let currentHdrIndex = 0;

// Function to load HDR environment map
function loadHDRMap(index) {
    const hdrPath = hdrOptions[index].path;
    
    new RGBELoader()
        .load(hdrPath, function(texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
            scene.backgroundRotation = new THREE.Euler(0, Math.PI / 0.6, 0, 'YXZ'); // Rotate by 90 degrees around the Y-axis
            scene.environmentRotation = scene.backgroundRotation; // Apply the same rotation to the environment
        });
}

// Load initial HDR map
loadHDRMap(currentHdrIndex);

// Create and add the HDR selector to the page
const hdrSelector = createHDRSelector((index) => {
    currentHdrIndex = index;
    loadHDRMap(currentHdrIndex);
});
document.body.appendChild(hdrSelector);

// Load the GLTF model
loader.load(
    '/sunglasses-spectar.gltf',
    function(gltf) {
        model = gltf.scene;
        
        // Modify materials while keeping their textures
        model.traverse((node) => {
            if (node.name === 'glasses-glass') {
                node.material = glassMaterial;
            }
            // Enhance shininess of frame parts
            if (node.name === 'glasses-right' || 
                node.name === 'glasses-left' ){
                
                // Keep the existing material but modify its properties
                const material = node.material;
                                // Keep existing material properties
                                material.metalness = 0.9;
                                material.roughness = 0.1;
                                material.envMapIntensity = 2.5;
                                material.clearcoat = 1.0;
                                material.clearcoatRoughness = 0.1;
                                
                                // Reduce bump map intensity
                                if (material.bumpMap) {
                    // Improve bump map appearance
                    material.bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
                    material.bumpMap.magFilter = THREE.LinearFilter;
                    material.bumpMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
                    material.bumpScale = 0.3; // Adjust this value if needed
                    material.bumpMap.needsUpdate = true;
                }
                                
                                // If using normal map, you can also adjust its intensity
                                if (material.normalMap) {
                                    material.normalScale.set(0.3, 0.3); // Reduce normal map intensity
                                }
                                
                                material.needsUpdate = true;
                            
                    
            }
            if (node.name === 'glasses-rim') {
                const material_rim = node.material;
                // Keep existing material properties
                material_rim.metalness = 0.5;
                material_rim.roughness = 0.2;
                material_rim.envMapIntensity = 2;
                
                // Reduce bump map intensity
                if (material_rim.bumpMap) {
                    material_rim.bumpScale = 0.5; // Reduce this value to decrease bump intensity (default is usually 1.0)
                }
                
                // If using normal map, you can also adjust its intensity
                if (material_rim.normalMap) {
                    material_rim.normalScale.set(0.4, 0.4); // Reduce normal map intensity
                }
                
                material_rim.needsUpdate = true;

                }
                
            // Enable shadows for all meshes in the model
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
        
        const scale = 0.2;
        model.scale.set(scale, scale, scale);
        //model.rotation.y = Math.PI / 2;
        model.position.y = 0.1; // Position slightly above the cube
        
        scene.add(model);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error('An error occurred loading the model:', error);
    }
);

// Update the animation loop to use the renderer directly
function animate() {
    requestAnimationFrame(animate);
    
    if (model) {
        //model.rotation.y += 0.005;
        
    }
    
    renderer.render(scene, camera);
}

// Update resize handler to use renderer directly
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(newWidth, newHeight);
});

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
/*controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI;*/

// Start the animation
animate();
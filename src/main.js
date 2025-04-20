import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { hdrOptions } from './components/HDRSelector.js';
import { createHeader, createDescription } from './components/UI.js';
import { createLoadingBar } from './components/LoadingBar.js';
import { createControlsGuide } from './components/ControlsGuide.js';
import { createHamburgerMenu } from './components/HamburgerMenu.js';


const loadingBar = createLoadingBar();
document.body.appendChild(loadingBar.element);

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    powerPreference: 'high-performance' // Optimize for performance
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf5f5f5); // Light gray background
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
renderer.shadowMap.softness = 1.0; // Added for softer shadows

renderer.physicallyCorrectLights = true;

// Important for glass material
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 

document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // Increased intensity from 1.0 to 2.0
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height =2048; 
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.bias = -0.0001; // Added shadow bias to reduce shadow acne
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
cube.position.set(0, -2.75, -2.5);
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

// Track loading progress
let loadingComplete = false;
let modelLoaded = false;
let hdrLoaded = false;
let modelProgress = 0;
let hdrProgress = 0;
let backgroundEnabled = false; // Track if background is enabled, disabled by default

// Function to update overall loading progress
function updateLoadingProgress() {
    // Calculate overall progress (model and HDR each contribute 50%)
    // Ensure we don't divide by zero or get NaN/Infinity values
    const modelProgressSafe = isNaN(modelProgress) || !isFinite(modelProgress) ? 0 : modelProgress;
    const hdrProgressSafe = isNaN(hdrProgress) || !isFinite(hdrProgress) ? 0 : hdrProgress;
    const overallProgress = (modelProgressSafe + hdrProgressSafe) / 2;
    loadingBar.updateProgress(overallProgress);
}

// Function to check if everything is loaded
function checkLoadingComplete() {
    if (modelLoaded && hdrLoaded && !loadingComplete) {
        loadingComplete = true;
        
        // Hide loading bar with a slight delay
        setTimeout(() => {
            loadingBar.hide();
            
            // Add UI elements only after loading bar is hidden
            const header = createHeader();
            document.body.appendChild(header);
            
            const description = createDescription();
            document.body.appendChild(description);
            
            // Add controls guide
            const controlsGuide = createControlsGuide();
            document.body.appendChild(controlsGuide);
            
            // Create and add the hamburger menu
            const hamburgerMenu = createHamburgerMenu(
                // Background toggle callback
                (isEnabled) => {
                    backgroundEnabled = isEnabled;
                    if (isEnabled) {
                        if(currentHdrIndex === 2) { scene.background = null; } else{scene.background = scene.environment;}
                    } else {
                        scene.background = null;
                    }
                },
                // HDR selector callback
                (index) => {
                    currentHdrIndex = index;
                    loadHDRMap(currentHdrIndex);
                }
            );
            
            // Set the HDR options
            hamburgerMenu.setHdrOptions(hdrOptions);
             
            // Add the hamburger menu to the page
            document.body.appendChild(hamburgerMenu.element);
            
            console.log("All content loaded, UI elements added");
        }, 500);
    }
}

// Function to load HDR environment map
function loadHDRMap(index) {
    const hdrPath = hdrOptions[index].path;
    
    new RGBELoader()
        .load(hdrPath, 
            function(texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
                scene.backgroundRotation = new THREE.Euler(0, Math.PI / 0.6, 0, 'YXZ'); // Rotate by 90 degrees around the Y-axis
                scene.environmentRotation = scene.backgroundRotation; // Apply the same rotation to the environment
                
                // Set background based on toggle state
                if (backgroundEnabled) {
                    scene.background = texture;
                } else {
                    scene.background = null;
                }
                
                
                hdrProgress = 100;
                updateLoadingProgress();
                hdrLoaded = true;
                checkLoadingComplete();
            },
            
            function(xhr) {
                // Prevent division by zero
                hdrProgress = xhr.total > 0 ? (xhr.loaded / xhr.total) * 100 : 0;
                updateLoadingProgress();
            },
            // Error callback
            function(error) {
                console.error('An error occurred loading the HDR:', error);
                hdrProgress = 100; // Still mark as complete to prevent UI from never appearing
                updateLoadingProgress();
                hdrLoaded = true;
                checkLoadingComplete();
            }
        );
}

// Load initial HDR map
loadHDRMap(currentHdrIndex);

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

                    material.bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
                    material.bumpMap.magFilter = THREE.LinearFilter;
                    material.bumpMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
                    material.bumpScale = 0.3; 
                    material.bumpMap.needsUpdate = true;
                }
                
                if (material.normalMap) {
                    material.normalScale.set(0.3, 0.3); 
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
                    material_rim.bumpScale = 0.5; 
                }
                
                if (material_rim.normalMap) {
                    material_rim.normalScale.set(0.4, 0.4); 
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
        model.position.y = 0.1; // Position slightly above the cube
        
        scene.add(model);
        
        // Mark model as loaded
        modelProgress = 100;
        updateLoadingProgress();
        modelLoaded = true;
        checkLoadingComplete();
    },
    function(xhr) {
        // Update model loading progress
        // Prevent division by zero
        modelProgress = xhr.total > 0 ? (xhr.loaded / xhr.total) * 100 : 0;
        updateLoadingProgress();
    },
    function(error) {
        console.error('An error occurred loading the model:', error);
        // Still mark as loaded to prevent UI from never appearing
        modelProgress = 100;
        updateLoadingProgress();
        modelLoaded = true;
        checkLoadingComplete();
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
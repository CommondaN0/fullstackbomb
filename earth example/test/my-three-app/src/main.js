import * as THREE from 'three';

// Сцена и камера
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загрузка текстуры Земли
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
  './src/unnamed.jpg'
);

// Создание сферы с текстурой Земли
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Добавим освещение для лучшего отображения сферы
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

let isDragging = false;

renderer.domElement.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    isDragging = true;
  }
});

renderer.domElement.addEventListener('mouseup', (event) => {
  if (event.button === 0) {
    isDragging = false;
  }
});

renderer.domElement.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const rotationSpeed = 0.005;
  earth.rotation.y += event.movementX * rotationSpeed;
  earth.rotation.x += event.movementY * rotationSpeed;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

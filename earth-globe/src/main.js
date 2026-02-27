import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000022);
document.body.appendChild(renderer.domElement);

const commonRadius = 0.8;
const earthSpeed = 0.008;
const planetData = [
  { name: 'Земля', texture: '/textures/earth.jpg', radius: commonRadius, rotationSpeed: earthSpeed },
  { name: 'Венера', texture: '/textures/venus.jpg', radius: commonRadius, rotationSpeed: earthSpeed * 1.1 },
  { name: 'Марс', texture: '/textures/mars.jpg', radius: commonRadius, rotationSpeed: earthSpeed * 0.9 },
  { name: 'Юпитер', texture: '/textures/jupiter.jpg', radius: commonRadius, rotationSpeed: earthSpeed * 1.05 },
  { name: 'Нептун', texture: '/textures/neptune.jpg', radius: commonRadius, rotationSpeed: earthSpeed * 0.95 }
];

const planets = [];

// HTML для названия и кнопки
const nameDisplay = document.createElement('div');
nameDisplay.style.position = 'absolute';
nameDisplay.style.padding = '10px 20px';
nameDisplay.style.background = 'rgba(0,0,0,0.8)';
nameDisplay.style.color = 'white';
nameDisplay.style.fontSize = '20px';
nameDisplay.style.borderRadius = '8px';
nameDisplay.style.textAlign = 'center';
nameDisplay.style.opacity = '0';
nameDisplay.style.pointerEvents = 'none';
nameDisplay.style.transition = 'opacity 0.5s ease';
document.body.appendChild(nameDisplay);

const backButton = document.createElement('button');
backButton.textContent = 'Вернуться назад';
backButton.style.position = 'absolute';
backButton.style.bottom = '20px';
backButton.style.left = '50%';
backButton.style.transform = 'translateX(-50%)';
backButton.style.padding = '12px 24px';
backButton.style.fontSize = '16px';
backButton.style.border = 'none';
backButton.style.borderRadius = '6px';
backButton.style.background = '#4a90e2';
backButton.style.color = 'white';
backButton.style.cursor = 'pointer';
backButton.style.display = 'none';
document.body.appendChild(backButton);

backButton.addEventListener('click', resetCameraView);

const defaultCameraPos = new THREE.Vector3(0, 1, 5.5);
const defaultCameraLookAt = new THREE.Vector3(0, 0, 0);
camera.position.copy(defaultCameraPos);
camera.lookAt(defaultCameraLookAt);

// Анимация камеры: два этапа приближения и обратная анимация возврата
let cameraAnimating = false;
let zoomedIn = false;
let zoomedPlanet = null;

let animStartTime = 0;
const stage1Duration = 700; // параллельное движение (вперёд/назад)
const stage2Duration = 700; // приближение/отдаление
const totalDuration = stage1Duration + stage2Duration;

let fromPos = new THREE.Vector3();
let fromLookAt = new THREE.Vector3();
let stage1Pos = new THREE.Vector3();
let stage1LookAt = new THREE.Vector3();
let toPos = new THREE.Vector3();
let toLookAt = new THREE.Vector3();

let animationDirection = 1; // 1 - приближение, -1 - возврат
let currentStage = 0;

let showNameTimeout = null;

function createPlanet(data, xPosition) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    data.texture,
    (texture) => {
      const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.9 - data.radius * 0.07,
        metalness: 0.05
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = xPosition;
      planet.userData = {
        name: data.name,
        autoRotationSpeed: -data.rotationSpeed
      };
      scene.add(planet);
      planets.push(planet);
    },
    undefined,
    () => {
      const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
      const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = xPosition;
      planet.userData = {
        name: data.name,
        autoRotationSpeed: -earthSpeed
      };
      scene.add(planet);
      planets.push(planet);
    }
  );
}

const baseSpacing = 3.2;
for (let i = 0; i < 5; i++) {
  createPlanet(planetData[i], (i - 2) * baseSpacing);
}

scene.add(new THREE.AmbientLight(0x303050, 0.4));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(8, 6, 8);
scene.add(directionalLight);

let currentlyDraggedPlanet = null;
let isMouseDown = false;
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
const rotationSpeed = 0.008;

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('mousedown', (event) => {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    currentlyDraggedPlanet = intersects[0].object;
    isMouseDown = true;
    isDragging = false;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
    canvas.style.cursor = 'grabbing';
  }
});

canvas.addEventListener('mousemove', (event) => {
  if (!isMouseDown || !currentlyDraggedPlanet) return;
  const deltaX = event.clientX - previousMouseX;
  const deltaY = event.clientY - previousMouseY;

  if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
    isDragging = true;
  }

  currentlyDraggedPlanet.rotation.y += deltaX * rotationSpeed;
  currentlyDraggedPlanet.rotation.x += deltaY * rotationSpeed;

  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
});

canvas.addEventListener('mouseup', () => {
  if (isMouseDown) {
    isMouseDown = false;
    canvas.style.cursor = 'grab';

    if (currentlyDraggedPlanet && !isDragging && !cameraAnimating) {
      startZoomIn(currentlyDraggedPlanet);
    }

    currentlyDraggedPlanet = null;
    isDragging = false;
  }
});

canvas.addEventListener('mouseleave', () => {
  isMouseDown = false;
  currentlyDraggedPlanet = null;
  isDragging = false;
  canvas.style.cursor = 'default';
});

canvas.style.cursor = 'grab';

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function updateNameDisplayPosition() {
  if (!zoomedPlanet) return;

  const pos = zoomedPlanet.position.clone();
  pos.y += zoomedPlanet.geometry.parameters.radius + 0.3;

  pos.project(camera);
  const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-pos.y * 0.5 + 0.5) * window.innerHeight;

  nameDisplay.style.left = `${x}px`;
  nameDisplay.style.top = `${y}px`;
}

// Запускает анимацию приближения к планете
function startZoomIn(planet) {
  if (cameraAnimating) return;

  zoomedPlanet = planet;
  cameraAnimating = true;
  animStartTime = performance.now();
  currentStage = 0;
  animationDirection = 1;

  fromPos.copy(camera.position);
  fromLookAt.copy(getCurrentLookAt());

  // Этап 1: переместиться по горизонтали (X ось) к планете, сохранить текущий Z и Y
  stage1Pos.set(planet.position.x, 1.2, fromPos.z);
  stage1LookAt.copy(planet.position);

  // Этап 2: приблизиться по оси Z ближе к планете
  toPos.set(planet.position.x, 1.2, planet.position.z + 1.4);
  toLookAt.copy(planet.position);

  nameDisplay.style.opacity = '0';
  backButton.style.display = 'none';
  if (showNameTimeout) clearTimeout(showNameTimeout);
}

// Запускает обратную анимацию (возврат)
function resetCameraView() {
  if (cameraAnimating || !zoomedPlanet) return;

  cameraAnimating = true;
  animStartTime = performance.now();
  currentStage = 0;
  animationDirection = -1;

  fromPos.copy(camera.position);
  fromLookAt.copy(getCurrentLookAt());

  // Этап 1 (обратный второй этап приближения): удалиться от планеты по оси Z (от toPos к stage1Pos)
  stage1Pos.set(zoomedPlanet.position.x, 1.2, zoomedPlanet.position.z + 1.4);
  stage1LookAt.copy(zoomedPlanet.position);

  // Этап 2 (обратный первому этапу приближения): сдвинуться горизонтально к дефолтной позиции
  toPos.copy(defaultCameraPos);
  toLookAt.copy(defaultCameraLookAt);

  nameDisplay.style.opacity = '0';
  backButton.style.display = 'none';

  zoomedPlanet = null;
}

let lastLookAt = defaultCameraLookAt.clone();
const originalLookAt = camera.lookAt.bind(camera);
camera.lookAt = function(target) {
  lastLookAt.copy(target);
  originalLookAt(target);
};
function getCurrentLookAt() {
  return lastLookAt.clone();
}

backButton.onclick = resetCameraView;

function animate() {
  requestAnimationFrame(animate);

  planets.forEach(p => {
    if (p.userData.autoRotationSpeed) {
      p.rotation.y += p.userData.autoRotationSpeed;
    }
  });

  if (cameraAnimating) {
    const elapsed = performance.now() - animStartTime;
    const totalDuration = stage1Duration + stage2Duration;
    let t = Math.min(elapsed / totalDuration, 1);
    const split = stage1Duration / totalDuration;

    if (animationDirection === 1) { // Приближение: этап 1 затем этап 2
      if (t < split) {
        const kt = t / split;
        camera.position.lerpVectors(fromPos, stage1Pos, kt);
        const look = fromLookAt.clone().lerp(stage1LookAt, kt);
        camera.lookAt(look);
      } else {
        const kt = (t - split) / (1 - split);
        camera.position.lerpVectors(stage1Pos, toPos, kt);
        const look = stage1LookAt.clone().lerp(toLookAt, kt);
        camera.lookAt(look);
      }

      if (t >= 1) {
        cameraAnimating = false;
        zoomedIn = true;

        if (zoomedPlanet) {
          nameDisplay.textContent = zoomedPlanet.userData.name;
          nameDisplay.style.opacity = '1';
          updateNameDisplayPosition();

          showNameTimeout = setTimeout(() => {
            nameDisplay.style.opacity = '0';
            backButton.style.display = 'block';
          }, 3000);
        }
      }
    } else { // Возврат: этап 1 (отдаление), этап 2 (горизонтальное возвращение)
      if (t < split) {
        const kt = t / split;
        camera.position.lerpVectors(fromPos, stage1Pos, kt);
        const look = fromLookAt.clone().lerp(stage1LookAt, kt);
        camera.lookAt(look);
      } else {
        const kt = (t - split) / (1 - split);
        camera.position.lerpVectors(stage1Pos, toPos, kt);
        const look = stage1LookAt.clone().lerp(toLookAt, kt);
        camera.lookAt(look);
      }

      if (t >= 1) {
        cameraAnimating = false;
        zoomedIn = false;
        backButton.style.display = 'none';
      }
    }
  }

  if (zoomedIn && zoomedPlanet && nameDisplay.style.opacity === '1') {
    updateNameDisplayPosition();
  }

  renderer.render(scene, camera);
}

animate();

console.log('Анимация приближения/возврата с обратным порядком и корректным lookAt готова.');

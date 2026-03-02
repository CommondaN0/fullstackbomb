import * as THREE from 'three';
import { TechnicolorShader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Инициализация сцены, камеры и рендера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загрузка текстуры для шара
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');

// Создание шара (внутренний)
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Загрузка модели додекаэдра (GLTF)
const loader = new GLTFLoader();
loader.load(
    'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf', // Замените на свою модель додекаэдра
    (gltf) => {
        const dodecahedron = gltf.scene;
        dodecahedron.scale.set(7, 7, 7);
        scene.add(dodecahedron);

        // Обработка кликов и подсветки граней
        const faces = dodecahedron.children;
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

        faces.forEach((face, i) => {
            face.userData.originalColor = 0xffffff;
            face.userData.highlightColor = colors[i % colors.length];
            face.material = new THREE.MeshBasicMaterial({ color: face.userData.originalColor, transparent: true, opacity: 0.5 });
        });

        // Обработка наведения и клика
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(faces);
            faces.forEach(face => {
                face.material.color.setHex(face.userData.originalColor);
            });
            if (intersects.length > 0) {
                const face = intersects[0].object;
                face.material.color.setHex(face.userData.highlightColor);
            }
        }

        function onMouseClick(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(faces);
            if (intersects.length > 0) {
                const face = intersects[0].object;
                const infoDiv = document.createElement('div');
                infoDiv.style.position = 'fixed';
                infoDiv.style.top = '20px';
                infoDiv.style.left = '20px';
                infoDiv.style.padding = '10px';
                infoDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
                infoDiv.style.color = 'white';
                infoDiv.style.borderRadius = '5px';
                infoDiv.style.zIndex = '1000';
                infoDiv.style.display = 'block';
                infoDiv.innerText = `Цвет грани: #${face.userData.highlightColor.toString(16).padStart(6, '0')}`;
                setTimeout(() => {
                    infoDiv.style.display = 'none';
                }, 500);
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseClick);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% загружено');
    },
    (error) => {
        console.error('Ошибка загрузки модели', error);
    }
);

// Настройка камеры
camera.position.z = 15;

// Добавляем OrbitControls для вращения
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Анимация
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.005; // Вращение шара
    controls.update();
    renderer.render(scene, camera);
}
animate();

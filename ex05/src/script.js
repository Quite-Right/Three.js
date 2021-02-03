import "./style.css";
import * as THREE from "three";
import { Mesh } from "three";

const sizes = {
  width: 800,
  height: 600,
};
const canvas = document.querySelector(".canvas");

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// POSITION
cube.position.x = 1.5;
cube.position.y = 0.5;
cube.position.z = 0.3;
// cube.position.set(1.5, 0.5, 0.3)

// SCALE
cube.scale.x = 0.5;
// cube.scale.set(0.5, 1, 1)

// ROTATION
// CHANGE ORDER OF ROTATION
cube.rotation.reorder("ZXY");
cube.rotation.y = 0.3;
cube.rotation.x = 0.5;
cube.rotation.z = Math.PI / 3;
// QUATERNION - other way of making rotation - more mathematical way (in next lessons/docs)

// расстояние от центра, до куба
console.log(cube.position.length());

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 5);

// расстояние от куба до камеры
console.log(cube.position.distanceTo(camera.position));

// camera.lookAt(new THREE.Vector3(1, 1, 1))
camera.lookAt(cube.position);

scene.add(camera);

// объект для вывода направлений на экран
const axesHelper = new THREE.AxesHelper();

scene.add(axesHelper);

const group = new THREE.Group();

const arrayOfCubes = [
  new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 3),
    new THREE.MeshBasicMaterial({ color: "#fff" })
  ),
  new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 3),
    new THREE.MeshBasicMaterial({ color: "#f0f" })
  ),
];

arrayOfCubes[0].position.set(2, 2, -1);
arrayOfCubes[1].position.set(-1, -1, 2);

group.add(arrayOfCubes[0]);
group.add(arrayOfCubes[1]);
group.rotation.y = 1;
scene.add(group);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animations
// количество тиков в секунду без привязки ко времени зависит от fps (hz)
// для адаптации используется время
// время предыдущего тика
// let time = Date.now();

// const tick = () => {
//   console.log("tick");

//   // время текущего тика
//   const currentTime = Date.now();
//   // дельта (разница между текущим и предыдущим)
//   const deltaTime = currentTime - time;
//   // обновляем время
//   time = currentTime;

//   mesh.rotation.x += 0.0002 * deltaTime;
//   mesh.rotation.y += 0.0002 * deltaTime;
//   mesh.rotation.z += 0.0002 * deltaTime;

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// в качестве альтернативы можно использовать параметр в колбеке в который сложить time
// const time = Date.now();

// const tick = (time) => {
//   console.log("tick");

//   // время текущего тика
//   const currentTime = Date.now();
//   // дельта (разница между текущим и предыдущим)
//   const deltaTime = currentTime - time;

//   mesh.rotation.x += 0.0002 * deltaTime;
//   mesh.rotation.y += 0.0002 * deltaTime;
//   mesh.rotation.z += 0.0002 * deltaTime;

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(() => tick(currentTime));
// };

// tick(time);

// const clock = new THREE.Clock();

// const tick = () => {
//   console.log("tick");
//   // Clock
//   const elapsedTime = clock.getElapsedTime();

//   mesh.rotation.x = elapsedTime;
//   mesh.rotation.y = elapsedTime;
//   mesh.rotation.z = elapsedTime;

//   mesh.position.z = Math.sin(elapsedTime)
//   mesh.position.x = Math.sin(elapsedTime)
//   mesh.position.y = Math.cos(elapsedTime)

//   // camera.position.z = 2;
//   // camera.position.x = Math.sin(elapsedTime)
//   // camera.position.y = Math.cos(elapsedTime)

//   camera.lookAt(mesh.position)

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();

gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 });

const tick = () => {
  console.log("tick");

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

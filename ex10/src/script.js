import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from "dat.gui"

/**
 * Debug
 */
// to hide gui use H / gui.hide()
// can pass an obj as param to create gui {closed: true, width: 400}
const gui = new dat.GUI()

const debugObject = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10})
  }
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Debug
 */
// name no more than 15 symbols
// x y z
gui.add(mesh.position, "x", -3, 3, 0.01).name("X coordinate of Cube")
gui.add(mesh.position, "y", -3, 3, 0.01).name("Y coordinate of Cube")
gui.add(mesh.position, "z", -3, 3, 0.01).name("Z coordinate of Cube")
// visible
gui.add(mesh, "visible").name("Box visible:")
// закрашивать ли стороны фигуры
gui.add(material, "wireframe")
// цвета
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color)
})
// функция
gui.add(debugObject, "spin")


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';


// // Canvas
const canvas = document.querySelector('canvas.webgl')

// // Scene
const scene = new THREE.Scene() 


//Texture Loader
const loader = new THREE.TextureLoader();
// const cross = new loader.load('/static/images/circle_texture.png');
const cross = new loader.load('circle_texture.png');

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.TorusKnotGeometry(.7, .9, 100, 150);
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5

}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.PointsMaterial({
    size: 0.005
})

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: cross,
    transparent: true,

})

// Mesh
const sphere = new THREE.Points(geometry, material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere, particlesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#0F0F0F'), 1)

// Mouse

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .1 * elapsedTime
    particlesMesh.rotation.y = -.1 * elapsedTime

    if (mouseX > 0) {
        particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.000008)
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.000009)

    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



//Code Example
// //Canvas
// const canvas = document.querySelector('canvas.webgl')


// // Scene
// const scene = new THREE.Scene()

// //Texture Loader
// const textureLoader = new THREE.TextureLoader()
// const myTexture = textureLoader.load('coolTex.jpg')

// // Object
// const geometry = new THREE.BoxGeometry(1,1,1)
// const geometry2 = new THREE.DodecahedronGeometry(0.5,3)
// const material = new THREE.MeshBasicMaterial({
//     map: myTexture
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// const sphereMesh = new THREE.Mesh(geometry2,material)
// scene.add(boxMesh)
// // scene.add(sphereMesh)
// boxMesh.position.x = 0
// boxMesh.position.y = 0.8
// sphereMesh.position.x = -1.6
// sphereMesh.position.y = 0.5
// geometry.center()
// // Sizes
// const sizes = {
//     width:window.innerWidth,
//     height:window.innerHeight
// }

// // Renderer gets updated each time window is resized
// window.addEventListener('resize',()=>{
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     camera.aspect = sizes.width/sizes.height
//     camera.updateProjectionMatrix()

//     renderer.setSize(sizes.width,sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
// })

// // Camera
// const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
// camera.position.z = 3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)

// controls.enableZoom = false;
// controls.enableDamping = true

// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     alpha: true,
// })
// renderer.setSize(sizes.width,sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// const clock = new THREE.Clock()

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     boxMesh.rotateX(30*0.0003)
//     boxMesh.rotateY(30*0.0003)
//     sphereMesh.rotateY(30*0.0003)
//     // mesh.position.y = Math.sin(elapsedTime) *0.1
//     boxMesh.position.z = Math.sin(elapsedTime) * 1

//     controls.update()
//     controls.enableDamping = true
//     renderer.render(scene,camera)
//     window.requestAnimationFrame(tick)
// };

// tick()




















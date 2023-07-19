import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import ThreeGlobe from 'three-globe';
import countries from "./files/custom.geo.json";
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const blackTexture = new THREE.TextureLoader().load('black.png');
scene.background = blackTexture;

// Avatar

const AnishTexture = new THREE.TextureLoader().load('IMG_1167 - Copy.jpg');

const Anish = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: AnishTexture }));

scene.add(Anish);


// //skeleton design

// const bones = [];

// const shoulder = new THREE.Bone();
// const elbow = new THREE.Bone();
// const hand = new THREE.Bone();

// shoulder.add( elbow );
// elbow.add( hand );

// bones.push( shoulder );
// bones.push( elbow );
// bones.push( hand );

// shoulder.position.y = -5;
// elbow.position.y = 0;
// hand.position.y = 5;

// const armSkeleton = new THREE.Skeleton( bones );
// scene.add(bones);
////////////////////////////////////////////////////




// sun

const sunTexture = new THREE.TextureLoader().load('thesun.png');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);

scene.add(sun);

sun.position.z = 40;
sun.position.setX(-10);

// planet 1

const planetTexture = new THREE.TextureLoader().load('theplanet.jpg');
const planetnormalTexture = new THREE.TextureLoader().load('normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: planetnormalTexture,
  })
);

scene.add(planet);






planet.position.z = 20;
planet.position.setX(-15);
planet.position.setY(-5);

Anish.position.z = -5;
Anish.position.x = 1.8;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  Anish.rotation.y += 0.01;
  Anish.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sun.rotation.x += 0.005;
  planet.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

function Loop(){

}
const t = gsap.timeline({ defaults: { duration: 2 } })
t.fromTo(torus.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 })
t.fromTo(star.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 })
t.fromTo(Anish.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 })
t.fromTo(sun.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 })
t.fromTo("nav", { y: "-100%" }, { y: "0%" })
t.fromTo(".title", { opacity: "0" }, { opacity: "1" })
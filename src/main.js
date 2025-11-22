import './style.css';
import { SceneManager } from './three/SceneManager.js';
import { World } from './three/World.js';
import { Overlay } from './components/Overlay.js';

const container = document.getElementById('canvas-container');
const sceneManager = new SceneManager(container);
const overlay = new Overlay();
const world = new World(sceneManager, overlay);

function animate(time) {
  requestAnimationFrame(animate);

  // Convert time to seconds
  const t = time * 0.001;

  world.update(t);
  sceneManager.update();
}

animate(0);

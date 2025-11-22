import * as THREE from 'three';
import { Project } from './Project.js';
import { Particles } from './Particles.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import gsap from 'gsap';

export class World {
    constructor(sceneManager, overlay) {
        this.sceneManager = sceneManager;
        this.scene = sceneManager.scene;
        this.overlay = overlay;
        this.projects = [];
        this.particles = null;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredProject = null;

        this.init();
    }

    init() {
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Particles
        this.particles = new Particles(this.scene);

        // Dummy Project Data
        const projectData = [
            { title: "Project Alpha", color: 0xff5555 },
            { title: "Project Beta", color: 0x55ff55 },
            { title: "Project Gamma", color: 0x5555ff },
            { title: "Project Delta", color: 0xffff55 }
        ];

        // Load Font
        const loader = new FontLoader();
        const textureLoader = new THREE.TextureLoader();

        // Initial Camera Position for Intro
        this.sceneManager.camera.position.z = 20;

        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {

            // Load Textures
            const textures = [
                textureLoader.load('/textures/project_alpha.png'),
                textureLoader.load('/textures/project_beta.png'),
                textureLoader.load('/textures/project_gamma.png'),
                textureLoader.load('/textures/project_delta.png')
            ];

            // Update Project Data with Textures
            projectData.forEach((data, i) => {
                data.texture = textures[i];
            });

            // Create Projects after font is loaded
            projectData.forEach((data, index) => {
                const project = new Project(this.scene, data, index, font);
                // Initial Scale 0 for Intro
                project.group.scale.set(0, 0, 0);
                this.projects.push(project);
            });

            this.animateIntro();
        });

        // Center camera on the first project initially (or offset slightly)
        this.sceneManager.camera.position.x = 0;

        // Scroll navigation
        this.scrollY = 0;
        this.targetScrollY = 0;

        window.addEventListener('wheel', (e) => {
            this.targetScrollY += e.deltaY * 0.01;
            // Clamp scroll
            this.targetScrollY = Math.max(0, Math.min(this.targetScrollY, (this.projects.length - 1) * 4));
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animateIntro() {
        // Animate Camera
        gsap.to(this.sceneManager.camera.position, {
            z: 5,
            duration: 2.5,
            ease: "power3.out"
        });

        // Animate Projects
        this.projects.forEach((project, index) => {
            gsap.to(project.group.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.5,
                delay: 0.5 + (index * 0.2),
                ease: "back.out(1.7)"
            });
        });

        // Trigger Overlay Fade In
        if (this.overlay) {
            setTimeout(() => {
                this.overlay.show();
            }, 2000);
        }
    }

    update(time) {
        this.projects.forEach(project => project.update(time));
        if (this.particles) this.particles.update(time);

        // Raycasting
        this.raycaster.setFromCamera(this.mouse, this.sceneManager.camera);
        const intersects = this.raycaster.intersectObjects(this.projects.map(p => p.mesh));

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const project = this.projects.find(p => p.mesh === object);

            if (this.hoveredProject !== project) {
                if (this.hoveredProject) this.hoveredProject.onHoverOut();
                this.hoveredProject = project;
                this.hoveredProject.onHover();
            }
        } else {
            if (this.hoveredProject) {
                this.hoveredProject.onHoverOut();
                this.hoveredProject = null;
            }
        }

        // Smooth scroll
        this.scrollY += (this.targetScrollY - this.scrollY) * 0.1;

        // Update camera position
        this.sceneManager.camera.position.x = this.scrollY;

        // Update Overlay
        const index = Math.round(this.scrollY / 4);
        if (index >= 0 && index < this.projects.length) {
            this.overlay.updateProject(index, this.projects[index].data);
        }
    }
}

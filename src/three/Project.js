import * as THREE from 'three';

export class Project {
    constructor(scene, data, index) {
        this.scene = scene;
        this.data = data;
        this.index = index;

        this.mesh = null;
        this.group = new THREE.Group();

        this.init();
    }

    init() {
        // Create a card-like geometry
        const geometry = new THREE.BoxGeometry(3, 2, 0.2);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff, // White to show texture colors correctly
            map: this.data.texture || null,
            roughness: 0.2,
            metalness: 0.1,
            emissive: 0xffffff,
            emissiveMap: this.data.texture || null,
            emissiveIntensity: 0.2
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.group.add(this.mesh);

        // Position based on index
        this.group.position.x = this.index * 4; // Spacing of 4 units

        this.scene.add(this.group);
    }

    update(time) {
        // Subtle floating animation
        this.group.position.y = Math.sin(time + this.index) * 0.1;
    }

    onHover() {
        document.body.style.cursor = 'pointer';
        // Scale up
        this.mesh.scale.setScalar(1.1);
        // Brighten color or add emissive
        this.mesh.material.emissive.setHex(0x222222);
    }

    onHoverOut() {
        document.body.style.cursor = 'default';
        // Scale down
        this.mesh.scale.setScalar(1.0);
        // Remove emissive
        this.mesh.material.emissive.setHex(0x000000);
    }
}

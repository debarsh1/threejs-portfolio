export class Overlay {
    constructor() {
        this.container = document.getElementById('ui-layer');
        this.currentProjectIndex = -1;

        this.init();
    }

    init() {
        this.projectTitle = document.createElement('h1');
        this.projectTitle.style.position = 'absolute';
        this.projectTitle.style.bottom = '10%';
        this.projectTitle.style.left = '10%';
        this.projectTitle.style.color = 'white';
        this.projectTitle.style.fontSize = '3rem';
        this.projectTitle.style.fontFamily = 'sans-serif';
        this.projectTitle.style.transition = 'opacity 0.5s';
        this.projectTitle.style.opacity = '0'; // Start hidden
        this.container.appendChild(this.projectTitle);

        this.projectDescription = document.createElement('p');
        this.projectDescription.style.position = 'absolute';
        this.projectDescription.style.bottom = '5%';
        this.projectDescription.style.left = '10%';
        this.projectDescription.style.color = '#ccc';
        this.projectDescription.style.fontSize = '1.2rem';
        this.projectDescription.style.fontFamily = 'sans-serif';
        this.projectDescription.style.opacity = '0'; // Start hidden
        this.projectDescription.style.transition = 'opacity 0.5s';
        this.container.appendChild(this.projectDescription);
    }

    show() {
        this.projectTitle.style.opacity = '1';
        this.projectDescription.style.opacity = '1';
    }

    updateProject(index, data) {
        if (this.currentProjectIndex !== index) {
            this.currentProjectIndex = index;

            // Fade out
            this.projectTitle.style.opacity = '0';
            this.projectDescription.style.opacity = '0';

            setTimeout(() => {
                this.projectTitle.textContent = data.title;
                this.projectDescription.textContent = `Description for ${data.title}`;

                // Fade in
                this.projectTitle.style.opacity = '1';
                this.projectDescription.style.opacity = '1';
            }, 500);
        }
    }
}

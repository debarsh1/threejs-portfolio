# Three.js Portfolio

An interactive 3D portfolio website built with Three.js featuring animated project showcases, particle effects, and smooth scroll-based navigation. Projects are displayed as textured 3D objects in a dynamic scene with hover interactions and GSAP-powered animations.

![Three.js](https://img.shields.io/badge/Three.js-0.181.2-black?style=flat-square&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)

## ✨ Features

- **3D Project Gallery**: Interactive 3D cards displaying project information with custom textures
- **Smooth Scroll Navigation**: Horizontal scroll-based navigation through projects
- **Particle System**: Ambient particle effects that rotate and add depth to the scene
- **Hover Interactions**: Projects scale and glow on hover with cursor feedback
- **Animated Intro**: GSAP-powered camera and project entrance animations
- **Dynamic Overlay**: Project titles and descriptions that fade in/out as you navigate
- **Responsive Design**: Adapts to different screen sizes and devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/debarsh1/threejs-portfolio.git
cd threejs-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
threejs-portfolio/
├── src/
│   ├── components/
│   │   └── Overlay.js          # UI overlay for project info
│   ├── three/
│   │   ├── SceneManager.js     # Three.js scene, camera, renderer setup
│   │   ├── World.js            # Main world logic, lighting, interactions
│   │   ├── Project.js          # Individual 3D project cards
│   │   └── Particles.js        # Particle system
│   ├── main.js                 # Application entry point
│   └── style.css               # Global styles
├── public/
│   └── textures/               # Project textures (add your images here)
├── index.html                  # HTML entry point
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Adding Your Projects

1. **Add Project Textures**: Place your project images in the `public/textures/` folder:
   - `project_alpha.png`
   - `project_beta.png`
   - `project_gamma.png`
   - `project_delta.png`

2. **Update Project Data**: Edit the `projectData` array in `src/three/World.js`:

```javascript
const projectData = [
    { title: "Your Project Name", color: 0xff5555 },
    // Add more projects...
];
```

3. **Customize Descriptions**: Modify the overlay update logic in `src/components/Overlay.js` to show custom descriptions.

### Styling

- **Colors**: Adjust project colors in `World.js` and material properties in `Project.js`
- **Fonts**: Change the font family in `style.css` or load custom fonts
- **Animations**: Modify GSAP animations in `World.js` for different intro effects
- **Particle Count**: Adjust `this.count` in `Particles.js` for more/fewer particles

## 🛠️ Technologies Used

- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[GSAP](https://greensock.com/gsap/)** - Animation library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **Vanilla JavaScript** - No framework dependencies

## 🎮 Controls

- **Mouse Wheel**: Scroll horizontally through projects
- **Mouse Move**: Hover over projects to see interactive effects
- **Raycasting**: Automatic detection of hovered projects

## 📝 Key Components

### SceneManager
Manages the Three.js scene, camera, renderer, and window resizing.

### World
Contains the main application logic including:
- Lighting setup
- Project creation and positioning
- Scroll navigation
- Raycasting for hover detection
- Animation loop coordination

### Project
Individual 3D project cards with:
- Custom textures and materials
- Hover effects (scale, emissive glow)
- Floating animation
- Positioned in 3D space

### Particles
Ambient particle system that:
- Creates 1000 floating particles
- Rotates slowly for dynamic background
- Adds depth to the scene

### Overlay
UI layer that displays:
- Project titles
- Project descriptions
- Smooth fade transitions

## 🐛 Troubleshooting

### Textures Not Loading
- Ensure texture files are in `public/textures/`
- Check file names match those in `World.js`
- Verify file extensions (.png, .jpg, etc.)

### Black Screen
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Verify all dependencies are installed

### Performance Issues
- Reduce particle count in `Particles.js`
- Lower texture resolution
- Disable shadows if enabled

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Three.js community for excellent documentation
- GSAP for powerful animation capabilities
- Vite for blazing fast development experience

---

Made with ❤️ and Three.js

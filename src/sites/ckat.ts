import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { html, Html } from '@elysiajs/html'

function appCkat(app: Elysia) {
app.use(html())
.get('/wallpaper1', () => (
    `<html lang="en">
        <head>
            <title>Animdustry Wallpaper Renderer: CKAT</title>
        </head>
        <body>
            <script src="https://cdn.jsdelivr.net/npm/pixi.js@7.x/dist/pixi.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/pixi-filters@5.x/dist/browser/pixi-filters.min.js"></script>
            <script>
                {
window.onload = function() {
(async () => {
// Create Pixi application
const app = new PIXI.Application({
resizeTo: window,
background: '#130d24' // Matching the original background color
});
document.body.appendChild(app.view);

try {
const texture = await PIXI.Assets.load('https://raw.githubusercontent.com/WilloIzCitron/animdustry/refs/heads/master/skat.png');

function gradient(from, to) {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const grd = ctx.createLinearGradient(0,150,0,0);
    grd.addColorStop(0, from);
    grd.addColorStop(1, to);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,app.renderer.screen.width,app.renderer.screen.height);
    const texture = PIXI.Texture.from(c);
    return texture;
  }

// Skat Particles class
class SkatParticles extends PIXI.Container {
    constructor() {
    super();
    this.particles = [];
    this.time = 0;
    
    const amount = 100;
    const partRange = 500;
    const move = new PIXI.Point(-0.5, 0.5);
    
    for (let i = 0; i < amount; i++) {
        const particle = new PIXI.Sprite(texture);
        particle.anchor.set(0.5);
        
        const speed = Math.random() + 1;
        const rotSpeed = 0;
        const scale = Math.random() * 1 + 1;
        
        particle.pos = new PIXI.Point(
        Math.random() * partRange * 3 - partRange,
        Math.random() * partRange * 3 - partRange
        );
        
        particle.initialData = {
        speed: speed,
        rotSpeed: rotSpeed,
        scale: scale,
        move: move.clone(),
        baseRotation: -135 * Math.PI / 180
        };
        
        this.particles.push(particle);
        this.addChild(particle);
    }
    }

    update(delta) {
    const deltaTime = delta / 60;
    this.time += deltaTime;

    const viewportWidth = app.renderer.screen.width;
    const viewportHeight = app.renderer.screen.height;

    this.particles.forEach(particle => {
        const data = particle.initialData;
        
        particle.pos.x += data.move.x * data.speed * deltaTime * 50;
        particle.pos.y += data.move.y * data.speed * deltaTime * -50;
        
        const margin = 2;
        if (particle.pos.x < -margin) particle.pos.x += viewportWidth + margin * 3;
        if (particle.pos.y < -margin) particle.pos.y += viewportHeight + margin * 3;
        if (particle.pos.x > viewportWidth + margin) particle.pos.x -= viewportWidth + margin * 3;
        if (particle.pos.y > viewportHeight + margin) particle.pos.y -= viewportHeight + margin * 3;
        
        particle.rotation = data.baseRotation + this.time * data.rotSpeed;
        particle.scale.set(data.scale);
        particle.position.copyFrom(particle.pos);
    });
    }
}

const obj = new PIXI.Graphics();
obj.beginFill('#332d4f');
//make a stripes pattern
const stripeRotation = 45;
const stripeWidth = 75;
const stripeHeight = app.renderer.screen.height * 4;
const stripeSpacing = 75;
const numStripes = Math.ceil((app.renderer.screen.width > app.renderer.screen.height) ? app.renderer.screen.width : app.renderer.screen.height / (stripeWidth + stripeSpacing));

for (let i = -10; i < numStripes; i++) {
    obj.drawRect(i * (stripeWidth + stripeSpacing), 0, stripeWidth, stripeHeight);
    obj.rotation = stripeRotation * (Math.PI / 180);
}

obj.endFill();
obj.position.set(app.renderer.screen.width, 0);
app.stage.addChild(obj);

obj2 = new PIXI.Sprite(gradient('#130d24', '#00000000'));
obj2.width = app.renderer.screen.width;
obj2.height = app.renderer.screen.height;
obj2.anchor.set(0, 0);
app.stage.addChild(obj2);


const skatParticles = new SkatParticles();
app.stage.addChild(skatParticles);

app.ticker.add((delta) => {
    skatParticles.update(delta);
});

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
console.log('🎨🖌️ PIXI.js has been loaded!');

} catch (error) {
console.error('Error loading resources:', error);
document.body.innerHTML = '<h2 style="color: white">Failed to load particles. Check console for details.</h2>';
}
})();
}           }
            </script>
            <style>
                html, body {
                    margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background-color: #aaa;
}

                .container {
                    display: flex;
                justify-content: center;
                height: 100%;
}
                canvas {
                    height: 100%;
}
            </style>
        </body>
    </html>`
))
}

export default appCkat
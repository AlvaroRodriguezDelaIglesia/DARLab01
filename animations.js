/* =====================================================
   Animaciones visuales del blog Big Data & IA
   ===================================================== */

// === 1. Flujo de datos (entrada1.html) ===
function initDataFlow() {
    const canvas = document.getElementById('dataFlow');
    if (!canvas) return; // solo si está en la página
    const ctx = canvas.getContext('2d');
    const dots = Array.from({length: 70}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: Math.random() * 1.5 + 0.5,
        dy: (Math.random() - 0.5) * 0.5
    }));
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00aaff';
        dots.forEach(d => {
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
            ctx.fill();
            d.x += d.dx;
            d.y += d.dy;
            if (d.x > canvas.width) d.x = 0;
            if (d.y > canvas.height || d.y < 0) d.dy *= -1;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// === 2. Red neuronal animada (entrada2.html) ===
function initNeuralNetwork() {
    const c = document.getElementById('neuralCanvas');
    if (!c) return;
    const cx = c.getContext('2d');
    const neurons = [];
    for (let i = 0; i < 20; i++) {
        neurons.push({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2
        });
    }
    function drawNetwork() {
        cx.clearRect(0,0,c.width,c.height);
        for (let i=0;i<neurons.length;i++) {
            const n = neurons[i];
            cx.beginPath();
            cx.arc(n.x, n.y, 4, 0, Math.PI*2);
            cx.fillStyle = "#00aaff";
            cx.fill();
            for (let j=i+1;j<neurons.length;j++) {
                const n2 = neurons[j];
                const dist = Math.hypot(n.x-n2.x, n.y-n2.y);
                if (dist < 120) {
                    cx.strokeStyle = "rgba(0,170,255,"+(1 - dist/120)+")";
                    cx.beginPath();
                    cx.moveTo(n.x, n.y);
                    cx.lineTo(n2.x, n2.y);
                    cx.stroke();
                }
            }
            n.x += n.dx; n.y += n.dy;
            if(n.x<0||n.x>c.width) n.dx*=-1;
            if(n.y<0||n.y>c.height) n.dy*=-1;
        }
        requestAnimationFrame(drawNetwork);
    }
    drawNetwork();
}

// === 3. Inicializar según la página ===
window.addEventListener('DOMContentLoaded', () => {
    initDataFlow();
    initNeuralNetwork();
});

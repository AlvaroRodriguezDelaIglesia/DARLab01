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
function initDataCounter() {
    const counter = document.getElementById("data-counter");
    let value = 0;
    const target = 25000;
    const duration = 10000;
    const increment = target / (duration / 16);

    function updateCounter() {
        value += increment;
        if (value < target) {
            counter.textContent = Math.floor(value).toLocaleString() + " TB";
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString() + " TB";
        }
    }

    setTimeout(updateCounter, 500);
}

function initNeuralInteractions() {
    const fadeEls = document.querySelectorAll(".fade-element");
    const fadeObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.opacity = 1;
        });
    }, { threshold: 0.3 });

    fadeEls.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = "opacity 1s ease";
        fadeObs.observe(el);
    });


    const network = document.getElementById("network");
    for (let i = 0; i < 15; i++) {
        const neuron = document.createElement("div");
        neuron.style.width = "40px";
        neuron.style.height = "40px";
        neuron.style.borderRadius = "50%";
        neuron.style.background = "#181c25";
        neuron.style.border = "2px solid #00aaff";
        neuron.style.transition = "transform 0.3s ease, background 0.3s ease";
        neuron.addEventListener("click", () => {
            neuron.style.background = "#00aaff";
            neuron.style.transform = "scale(1.3)";
            setTimeout(() => {
                neuron.style.transform = "scale(1)";
                neuron.style.background = "#181c25";
            }, 600);
        });
        network.appendChild(neuron);
    }

}

function initReflexiones() {
    const reflexiones = [
        "El mayor riesgo de la IA no es que se vuelva malvada, sino que haga exactamente lo que le pedimos.",
        "La ética digital no es opcional: es la base de una sociedad conectada y justa.",
        "Los algoritmos no tienen valores, pero quienes los diseñan sí.",
        "La inteligencia artificial no tiene conciencia, pero puede amplificar la nuestra.",
        "Una IA responsable es aquella que protege la dignidad humana, no solo los datos."
    ];

    const reflexBtn = document.getElementById("reflex-btn");
    const reflexOut = document.getElementById("reflex-output");

    reflexBtn.addEventListener("click", () => {
        const frase = reflexiones[Math.floor(Math.random() * reflexiones.length)];
        reflexOut.textContent = `"${frase}"`;
        reflexOut.style.opacity = 0;
        reflexOut.style.transition = "opacity 0.6s ease";
        setTimeout(() => (reflexOut.style.opacity = 1), 50);
    });
}

// === 3. Inicializar según la página ===
window.addEventListener('DOMContentLoaded', () => {
    initDataFlow();
    initNeuralNetwork();
    initDataCounter();
    initNeuralInteractions();
    initReflexiones();
});

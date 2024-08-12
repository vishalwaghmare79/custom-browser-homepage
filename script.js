// Get the body element to append particles
const body = document.body;

// Function to create a particle
function createParticle(event) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    body.appendChild(particle);

    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const x = event.clientX;
    const y = event.clientY;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const direction = Math.random() > 0.5 ? 1 : -1;
    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;

    const animation = particle.animate(
        [
            { transform: `translate(0, 0)` },
            { transform: `translate(${destinationX * direction}px, ${destinationY * direction}px)` }
        ],
        {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            iterations: 1,
            fill: 'forwards'
        }
    );

    animation.onfinish = () => particle.remove();
}

// Add event listener for mousemove
document.addEventListener('mousemove', createParticle);

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

// Function to create a fiery shooting star
function createFieryShootingStar() {
    const container = document.createElement('div');
    container.classList.add('shooting-star-container');

    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    const tail = document.createElement('div');
    tail.classList.add('shooting-star-tail');

    container.appendChild(shootingStar);
    container.appendChild(tail);
    body.appendChild(container);

    // Randomize starting point near the top of the viewport
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.3; // Starts within the top 30% of the height

    container.style.left = `${startX}px`;
    container.style.top = `${startY}px`;

    // Randomize the direction and distance of the shooting star
    const destinationX = (Math.random() - 0.5) * 200;
    const destinationY = (Math.random() - 0.5) * 200;

    // Apply animation to move in random direction
    container.style.animation = `shootingStarAnimation ${Math.random() * 1 + 1.5}s linear forwards`;

    // Remove the container after the animation ends
    container.addEventListener('animationend', () => {
        container.remove();
    });
}

// Create fiery shooting stars continuously
setInterval(createFieryShootingStar, 3000); // Adjust interval time for more or fewer shooting stars

// Function to create a blinking star
function createBlinkingStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomly assign size class
    const sizeClass = Math.random();
    if (sizeClass < 0.6) {
        star.classList.add('small');
    } else if (sizeClass < 0.9) {
        star.classList.add('medium');
    } else {
        star.classList.add('large');
    }

    // Randomly assign color
    const colors = ['#ffffff', '#ffd700', '#ff6347', '#87cefa', '#dda0dd'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.backgroundColor = color;

    // Position the star randomly on the screen
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;

    // Randomize the blinking delay to avoid synchronized blinking
    const delay = Math.random() * 5; // Random delay between 0 and 5 seconds
    star.style.animationDelay = `${delay}s`;

    body.appendChild(star);
}

// Create multiple blinking stars
for (let i = 0; i < 100; i++) { // Adjust number of stars as needed
    createBlinkingStar();
}

// Function to show the form
function showForm() {
    document.getElementById('linkForm').style.display = 'block';
}

// Function to hide the form
function closeForm() {
    document.getElementById('linkForm').style.display = 'none';
}

 // Function to add new link to local storage and display it
 function addNewLink() {
    var name = document.getElementById('name').value;
    var url = document.getElementById('url').value;

    if (name && url) {
        // Get favicon URL
        var faviconUrl = new URL('/favicon.ico', url).href;

        // Save to local storage
        var links = JSON.parse(localStorage.getItem('links')) || [];
        links.push({ name: name, url: url, favicon: faviconUrl });
        localStorage.setItem('links', JSON.stringify(links));

        // Clear input fields
        document.getElementById('name').value = '';
        document.getElementById('url').value = '';

        // Hide the form
        closeForm();

        // Display the updated list
        displayLinks();
    } else {
        alert('Please fill in both fields.');
    }
}

function displayLinks() {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    var linkList = document.querySelector('.container'); // Reference the container element
    var addNewLinkIcon = document.querySelector('.container .icon-box:last-child'); // Reference the "Add new link" icon

    // Iterate over each link stored in local storage and create the corresponding HTML elements
    links.forEach(function(link) {
        // Create a new icon-box element for each link
        var iconBox = document.createElement('div');
        iconBox.className = 'icon-box';  // Adding 'icon-box' class to each item
        iconBox.onclick = function() { window.open(link.url, '_blank'); };

        // Create the image element for the favicon
        var img = document.createElement('img');
        img.src = link.favicon;
        img.alt = link.name + ' Favicon';
        img.onerror = function() {
            // Fallback in case favicon is not found
            img.src = 'https://via.placeholder.com/32?text=F';
        };

        // Create the paragraph element for the link name
        var p = document.createElement('p');
        p.textContent = link.name;

        // Create the remove button
        var removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '×';
        removeBtn.onclick = function(event) {
            event.stopPropagation(); // Prevent the click event from bubbling up to the icon-box
            removeLink(link.url); // Call the function to remove the link from local storage and DOM
        };

        // Append the image, paragraph, and remove button to the icon-box div
        iconBox.appendChild(removeBtn);
        iconBox.appendChild(img);
        iconBox.appendChild(p);

        // Insert the icon-box div before the "Add new link" icon
        linkList.insertBefore(iconBox, addNewLinkIcon);
    });
}

// Function to remove link from local storage and DOM
function removeLink(url) {
    var links = JSON.parse(localStorage.getItem('links')) || [];
    // Filter out the link with the given URL
    links = links.filter(link => link.url !== url);
    localStorage.setItem('links', JSON.stringify(links));

    // Refresh the page
    window.location.reload();
}


// Load and display links on page load
window.onload = function() {
    displayLinks();
}

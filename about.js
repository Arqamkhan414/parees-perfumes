document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Handle form submission
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for contacting us!');
        contactForm.reset();
    });

    // Handle image change on hover
    const imageBanner = document.querySelector('.image-banner img');
    imageBanner.addEventListener('mouseover', function() {
        imageBanner.src = 'https://png.pngtree.com/background/20230427/original/pngtree-luxury-perfume-bottle-on-a-black-background-with-red-flowers-picture-image_2496703.jpg';
    });
    imageBanner.addEventListener('mouseout', function() {
        imageBanner.src = 'https://static.vecteezy.com/system/resources/previews/036/800/644/non_2x/ai-generated-luxury-perfume-bottle-reflects-elegance-and-femininity-in-nature-generated-by-ai-free-photo.jpg';
    });

    // Handle text reveal functionality
    const philosophyCircle = document.querySelector('.philosophy-circle');
    philosophyCircle.addEventListener('click', togglePhilosophyText);
});

function togglePhilosophyText(id) {
    const text = document.getElementById('philosophyText' + id);
    const circle = text.previousElementSibling; // Get the circle element
    
    if (text.style.display === 'block') {
        text.style.display = 'none';
        circle.innerHTML = '+';
    } else {
        text.style.display = 'block';
        circle.innerHTML = '×';
    }
}

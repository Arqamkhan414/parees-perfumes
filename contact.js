document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message, ' + name + '! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });

    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.classList.remove('active');
            }
        });
    });
});

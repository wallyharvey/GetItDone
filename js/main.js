/* ============================================
   FILE: main.js
   PURPOSE: Landing page interactions
   USED ON: index.html, features.html, contact.html,
            login.html, register.html, privacy.html, 404.html
   ============================================ */


// -------------------- MOBILE NAV TOGGLE --------------------
// Opens/closes the navigation menu on small screens

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');

        // Swap the icon between menu and close
        const icon = navToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = navLinks.classList.contains('open') ? 'close' : 'menu';
        }
    });
}


// -------------------- CONTACT FORM SUBMISSION --------------------
// Sends the contact form data to our back end email route

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the form values
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        // Get the submit button so we can show a loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send the data to our API
            const response = await fetch('/api/mail/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showToast('Failed to send message. Please try again.', 'error');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            showToast('Something went wrong. Please try again.', 'error');
        }

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}


// -------------------- TOAST NOTIFICATIONS --------------------
// Shows a small notification that slides in from the right

function showToast(message, type = 'success') {
    // Create the container if it doesn't exist yet
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Build the toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Pick the right icon
    const icon = type === 'success' ? 'check_circle' : 'error';

    toast.innerHTML = `
        <span class="material-symbols-outlined">${icon}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// -------------------- SCROLL REVEAL --------------------
// Fades in elements as they scroll into view

const revealElements = document.querySelectorAll('.card, .auth-card, section > .container > *');

if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

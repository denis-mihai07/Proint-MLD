document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const contactForm = document.querySelector('#contact-form');

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    revealObserver.observe(element);
  });

  const updateScrollState = () => {
    const passedThreshold = window.scrollY > 60;

    if (navbar) {
      navbar.classList.toggle('scrolled', passedThreshold);
    }

    if (backToTop) {

        backToTop.classList.toggle('show', window.scrollY < 200);
    }
  };

  window.addEventListener('scroll', updateScrollState);
  updateScrollState();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');

      let isValid = true;

      if (!name || name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        clearError(name);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        showError(email, 'Enter a valid email address');
        isValid = false;
      } else {
        clearError(email);
      }

      if (!message || message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      } else {
        clearError(message);
      }

      if (!isValid) {
        event.preventDefault();
        return;
      }

      const action = contactForm.getAttribute('action') || '';
      if (!action.includes('formspree.io')) {
        event.preventDefault();
        alert('Validation passed. Connect Formspree on Day 6 for real submissions.');
        contactForm.reset();
      }
    });
  }
});

function showError(input, message) {
  if (!input) return;
  input.classList.add('is-invalid');

  let error = input.parentElement.querySelector('.error-msg');
  if (!error) {
    error = document.createElement('small');
    error.className = 'error-msg';
    input.parentElement.appendChild(error);
  }

  error.textContent = message;
}

function clearError(input) {
  if (!input) return;
  input.classList.remove('is-invalid');

  const error = input.parentElement.querySelector('.error-msg');
  if (error) {
    error.remove();
  }
}
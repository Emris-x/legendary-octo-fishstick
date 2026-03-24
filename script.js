// Production PWA App - Responsive, Installable, Optimized
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth internal anchor scroll
  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      
      // Close others
      document.querySelectorAll('.faq-answer').forEach(a => {
        if (a !== answer) a.classList.remove('open');
      });
      
      answer.classList.toggle('open');
    });
  });

  // Form Validation & Loading States (for inline forms)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type=\"submit\"]');
      btn.classList.add('loading');
      
      // Simulate submission
      setTimeout(() => {
        btn.classList.remove('loading');
        showNotification('Form submitted successfully!');
      }, 1500);
    });
  });

  // Lazy Load Images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.onload = () => img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // PWA Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
  });
}

function showInstallButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Install Campus Pay App';
  btn.className = 'btn-primary install-btn';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.zIndex = '10000';
  
  btn.addEventListener('click', installApp);
  document.body.appendChild(btn);
}

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      document.querySelector('.install-btn')?.remove();
    }
  }
}

// Utility Functions
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: white;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    background: ${type === 'success' ? 'var(--gradient-primary)' : '#ef4444'};
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => notification.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// WhatsApp Prefill (enhanced)
function sendWhatsApp(name = '', service = '', courses = '', amount = '') {
  const phone = '2348169502325';
  const message = `Hi Campus Pay!%0A%0AName: ${name}%0AService: ${service}%0ACourses: ${courses || 'N/A'}%0AAmount: ₦${amount}%0A%0A[Attach Payment Proof]%0AThank you!`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

// Page Transition Effect
window.addEventListener('pageshow', () => {
  document.body.classList.add('page-loaded');
});

window.addEventListener('load', () => {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.log('SW registration failed', err));
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.step-card, .problem-card, section').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});


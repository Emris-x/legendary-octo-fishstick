// Smooth scroll for anchor links
function scrollToSection(sectionId) {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const answer = element.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Add smooth scrolling to nav links (internal anchors)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });

    // FAQ icons rotation prep
    const faqIcons = document.querySelectorAll('.faq-item i');
    faqIcons.forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
    });
});

// Optional: Simple amount calculator for course registration (demo)
// If needed, can integrate with form data via localStorage, but since Google Form, placeholder
function calculateCourseFee(numCourses) {
    return 500 * numCourses;
}

// WhatsApp prefill enhancement (can be called with form data)
// Example usage: sendWhatsApp('John Doe', 'School Fee', '', 2000);
function sendWhatsApp(name, service, courses, amount) {
    const phone = '2348169502325';
    const message = `Hi Campus Pay,%0A%0AName: ${name}%0AService: ${service}%0ACourses: ${courses}%0AAmount Paid: ₦${amount}%0A%0ATransaction ID: [Attach Proof]%0A%0AThank you!`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}


// Initialize current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileIcon = document.querySelector('.mobile-toggle i');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between list and x
    if (navLinks.classList.contains('active')) {
        mobileIcon.classList.remove('ph-list');
        mobileIcon.classList.add('ph-x');
    } else {
        mobileIcon.classList.remove('ph-x');
        mobileIcon.classList.add('ph-list');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileIcon.classList.remove('ph-x');
        mobileIcon.classList.add('ph-list');
    });
});

// Sticky Navbar Logic
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Optional: stop observing once shown
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Active Nav Link Highlighting based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset for the fixed header
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Typewriter Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Problem Solver", "Data-Driven Thinker", "Turning Data into Insights", "Analytics Enthusiast"];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan || !cursorSpan) return;
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan || !cursorSpan) return;
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);

  // Force download for all download buttons
  const downloadButtons = document.querySelectorAll('a[download]');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('href');
      const fileName = this.getAttribute('download') || 'download';
      
      // Use fetch to get the file as a blob and force the browser to download it
      fetch(url)
        .then(response => {
           if (!response.ok) throw new Error('Network response was not ok');
           return response.blob();
        })
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Download failed via blob, falling back to default behavior:', error);
          // Fallback if fetch fails (e.g. CORS or file:// protocol)
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileName;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    });
  });
});

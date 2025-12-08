/**
 * Portfolio JavaScript with Fixed EmailJS Integration
 * Make sure to replace the credentials with your actual EmailJS details
 */

'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
  // CRITICAL: Replace these with your ACTUAL EmailJS credentials
  // Get them from: https://dashboard.emailjs.com/
  emailJS: {
    serviceID: 'service_vygu1xn',      // Example: 'service_abc1234' 
    templateID: 'template_6qjtsbw',    // Example: 'template_xyz5678'
    publicKey: '8dZprM1pfQTb9kxKB'       // Example: 'abcDEF123xyz456'
  },
  
  typing: {
    roles: ['BSIT Student', 'Web Developer', 'Frontend Developer', 'UI/UX Enthusiast'],
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000
  }
};

// ===== EMAILJS INITIALIZATION =====
(function initEmailJS() {
  // Check if EmailJS is loaded
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS library not loaded. Please check your internet connection.');
    return;
  }
  
  // Initialize EmailJS with your public key
  try {
    emailjs.init(CONFIG.emailJS.publicKey);
    console.log('✅ EmailJS initialized successfully');
  } catch (error) {
    console.error('❌ EmailJS initialization failed:', error);
  }
})();

// ===== LOADER =====
const Loader = {
  init() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 500);
        }
      }, 1000);
    });
  }
};

// ===== NAVIGATION =====
const Navigation = {
  init() {
    this.header = document.querySelector('.header');
    this.nav = document.querySelector('.nav-list');
    this.links = document.querySelectorAll('.nav-link');
    this.hamburger = document.querySelector('.hamburger');
    this.progressBar = document.querySelector('.progress-bar');

    this.setupListeners();
    this.updateProgress();
  },

  setupListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const section = document.querySelector(target);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
          });
          this.closeMenu();
        }
      });
    });

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => {
        this.nav.classList.toggle('active');
        this.hamburger.classList.toggle('active');
      });
    }

    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.highlightActive();
      this.updateProgress();
    });
  },

  closeMenu() {
    this.nav?.classList.remove('active');
    this.hamburger?.classList.remove('active');
  },

  handleScroll() {
    if (window.scrollY > 100) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
  },

  highlightActive() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  },

  updateProgress() {
    if (!this.progressBar) return;
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    this.progressBar.style.width = scrolled + '%';
  }
};

// ===== TYPING EFFECT =====
const TypingEffect = {
  init() {
    this.element = document.getElementById('typing');
    if (!this.element) return;

    this.roles = CONFIG.typing.roles;
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    setTimeout(() => this.type(), 1000);
  },

  type() {
    const currentRole = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? CONFIG.typing.deleteSpeed : CONFIG.typing.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      speed = CONFIG.typing.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }
};

// ===== ANIMATIONS =====
const Animations = {
  init() {
    this.observeElements();
    this.animateSkills();
    this.animateCounters();
    this.createParticles();
  },

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.info-card, .service-card, .project-card, .skill-category, .content-box');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  },

  animateSkills() {
    const fills = document.querySelectorAll('.fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    fills.forEach(fill => observer.observe(fill));
  },

  animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const count = (el) => {
      const target = +el.getAttribute('data-target');
      const current = +el.innerText;
      const increment = target / speed;

      if (current < target) {
        el.innerText = Math.ceil(current + increment);
        setTimeout(() => count(el), 1);
      } else {
        el.innerText = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          count(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counter.innerText = '0';
      observer.observe(counter);
    });
  },

  createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      container.appendChild(particle);
    }
  }
};

// ===== EMAIL FORM WITH EMAILJS (FIXED) =====
const EmailForm = {
  init() {
    this.form = document.getElementById('contactForm');
    this.status = document.getElementById('formStatus');
    
    if (!this.form) return;
    
    // Check if EmailJS credentials are configured
    this.checkConfig();
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  checkConfig() {
    const hasConfig = 
      CONFIG.emailJS.serviceID !== 'YOUR_SERVICE_ID' &&
      CONFIG.emailJS.templateID !== 'YOUR_TEMPLATE_ID' &&
      CONFIG.emailJS.publicKey !== 'YOUR_PUBLIC_KEY';
    
    if (!hasConfig) {
      console.warn('⚠️ EmailJS not configured. Please add your credentials in script.js');
    }
    
    return hasConfig;
  },

  async handleSubmit(e) {
    e.preventDefault();

    // Check if EmailJS is configured
    if (!this.checkConfig()) {
      this.showStatus('error', '⚠️ Email service not configured. Please contact me directly at dannyjanapon@sjp2cd.edu.ph');
      return;
    }

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      this.showStatus('error', '❌ Email service unavailable. Please email me directly at dannyjanapon@sjp2cd.edu.ph');
      return;
    }

    const btn = document.getElementById('submitBtn');
    const btnText = btn.querySelector('span');
    const originalText = btnText.textContent;

    // Get form data - IMPORTANT: Use exact field names
    const templateParams = {
      from_name: document.getElementById('from_name').value.trim(),
      from_email: document.getElementById('from_email').value.trim(),
      message: document.getElementById('message').value.trim(),
      to_email: 'dannyjanapon@sjp2cd.edu.ph',
      // Add formatted date/time
      sent_date: new Date().toLocaleString('en-US', { 
        dateStyle: 'full', 
        timeStyle: 'short',
        timeZone: 'Asia/Manila'
      })
    };

    // Validate
    if (!this.validate(templateParams)) return;

    // Show loading
    btn.disabled = true;
    btnText.textContent = 'Sending...';
    this.showStatus('info', '📤 Sending your message...');

    try {
      // Send email using EmailJS with exact parameters
      const response = await emailjs.send(
        CONFIG.emailJS.serviceID,
        CONFIG.emailJS.templateID,
        templateParams,
        CONFIG.emailJS.publicKey
      );

      console.log('✅ Email sent successfully:', response);
      console.log('Message content:', templateParams.message);
      
      this.showStatus('success', `✓ Thank you, ${templateParams.from_name}! Your message has been sent successfully. I'll respond to ${templateParams.from_email} as soon as possible!`);
      this.form.reset();
      
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      console.error('Error details:', error.text || error.message);
      
      // Detailed error message
      let errorMsg = '❌ Failed to send message. ';
      
      if (error.text) {
        errorMsg += error.text + ' ';
      }
      
      if (error.status === 400) {
        errorMsg = '❌ Invalid email configuration. Please check your EmailJS settings in script.js';
      } else if (error.status === 401) {
        errorMsg = '❌ Unauthorized. Please verify your EmailJS Public Key is correct.';
      } else if (error.status === 404) {
        errorMsg = '❌ Service or Template not found. Please check your Service ID and Template ID.';
      } else if (error.status === 412) {
        errorMsg = '❌ Template variables mismatch. Make sure template uses: {{from_name}}, {{from_email}}, {{message}}';
      }
      
      errorMsg += ' Please email me directly at dannyjanapon@sjp2cd.edu.ph';
      
      this.showStatus('error', errorMsg);
      
    } finally {
      btn.disabled = false;
      btnText.textContent = originalText;
    }
  },

  validate(data) {
    if (!data.from_name || data.from_name.length < 2) {
      this.showStatus('error', '❌ Please enter your name (at least 2 characters)');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.from_email || !emailRegex.test(data.from_email)) {
      this.showStatus('error', '❌ Please enter a valid email address');
      return false;
    }

    if (!data.message || data.message.length < 10) {
      this.showStatus('error', '❌ Please enter a message (at least 10 characters)');
      return false;
    }

    return true;
  },

  showStatus(type, message) {
    if (!this.status) return;
    
    this.status.className = type;
    this.status.textContent = message;
    this.status.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        this.status.style.display = 'none';
      }, 8000);
    }
  }
};

// ===== PROJECT CARDS 3D =====
const ProjectCards = {
  init() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
};

// ===== BACK TO TOP =====
const BackToTop = {
  init() {
    this.button = document.querySelector('.back-top');
    if (!this.button) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });

    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ===== CONSOLE BRANDING =====
const Console = {
  init() {
    console.log('%c 🚀 Danny Janapon Portfolio ', 'background: linear-gradient(135deg, #0066cc, #10b981); color: white; font-size: 20px; font-weight: bold; padding: 12px 24px; border-radius: 8px;');
    console.log('%c 💼 Looking for a developer? Let\'s connect! ', 'color: #0066cc; font-size: 14px; font-weight: bold;');
    console.log('%c 📧 dannyjanapon@sjp2cd.edu.ph ', 'color: #10b981; font-size: 12px;');
  }
};

// ===== APP INITIALIZATION =====
class Portfolio {
  constructor() {
    this.modules = [
      Loader,
      Navigation,
      TypingEffect,
      Animations,
      EmailForm,
      ProjectCards,
      BackToTop,
      Console
    ];
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    try {
      this.modules.forEach(module => {
        if (typeof module.init === 'function') {
          module.init();
        }
      });
      console.log('✅ Portfolio initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing portfolio:', error);
    }
  }
}

// ===== START APP =====
const app = new Portfolio();
app.init();

/* 
═══════════════════════════════════════════════════════════════
📧 EMAILJS SETUP INSTRUCTIONS - FOLLOW THESE STEPS:
═══════════════════════════════════════════════════════════════

1️⃣ CREATE EMAILJS ACCOUNT
   → Go to https://www.emailjs.com/
   → Click "Sign Up" and create account

2️⃣ ADD EMAIL SERVICE
   → Go to "Email Services" tab
   → Click "Add New Service"
   → Choose "Gmail"
   → Click "Connect Account" and sign in
   → Copy your SERVICE ID (looks like: service_abc1234)

3️⃣ CREATE EMAIL TEMPLATE
   → Go to "Email Templates" tab
   → Click "Create New Template"
   → Fill in:
      To Email: dannyjanapon@sjp2cd.edu.ph
      From Name: {{from_name}}
      Reply To: {{from_email}}
      Subject: New Contact from Portfolio - {{from_name}}
      
      Content:
      New message from portfolio contact form:
      
      Name: {{from_name}}
      Email: {{from_email}}
      
      Message:
      {{message}}
   
   → Save and copy TEMPLATE ID (looks like: template_xyz5678)

4️⃣ GET PUBLIC KEY
   → Go to "Account" → "General"
   → Copy your PUBLIC KEY (looks like: abcDEF123xyz)

5️⃣ UPDATE THIS FILE
   → Replace these values at the top:
      serviceID: 'YOUR_SERVICE_ID'     → Your actual Service ID
      templateID: 'YOUR_TEMPLATE_ID'   → Your actual Template ID
      publicKey: 'YOUR_PUBLIC_KEY'     → Your actual Public Key

6️⃣ TEST
   → Save file
   → Refresh your website
   → Try sending a test message
   → Check your Gmail inbox!

═══════════════════════════════════════════════════════════════
*/
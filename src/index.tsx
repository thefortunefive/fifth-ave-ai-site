import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// Serve static files
app.use('/images/*', serveStatic({ root: './' }))
app.use('/static/*', serveStatic())

// Image URLs - served from /images/ static folder
const IMAGES = {
  logo: '/images/logo.png',
  hero: '/images/hero.jpg',
  aiMarketing: '/images/ai-marketing.jpg',
  consultation: '/images/consultation.jpg',
  aboutTeam: '/images/about-team.jpg',
  teamTraining: '/images/team-training.jpg',
}

// Site metadata
const SITE_URL = 'https://fifthaveai.com'
const SITE_NAME = 'Fifth Ave AI'
const SITE_DESCRIPTION = 'Transform your business with AI-powered solutions. Fifth Ave AI provides expert AI consulting, marketing automation, and workflow optimization for businesses in Seattle, Atlanta, New York, and Philadelphia.'

// Common HTML head with styles, SEO, and Open Graph
const htmlHead = (title: string, description?: string, image?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${SITE_NAME}</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="${description || SITE_DESCRIPTION}">
  <meta name="keywords" content="AI consulting, AI marketing, business automation, workflow optimization, AI solutions, small business AI, Fifth Ave AI">
  <meta name="author" content="Fifth Ave AI">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}">
  <meta property="og:title" content="${title} | ${SITE_NAME}">
  <meta property="og:description" content="${description || SITE_DESCRIPTION}">
  <meta property="og:image" content="${image || SITE_URL + '/images/hero.jpg'}">
  <meta property="og:site_name" content="${SITE_NAME}">
  
  <!-- Twitter / LinkedIn -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${SITE_URL}">
  <meta name="twitter:title" content="${title} | ${SITE_NAME}">
  <meta name="twitter:description" content="${description || SITE_DESCRIPTION}">
  <meta name="twitter:image" content="${image || SITE_URL + '/images/hero.jpg'}">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link rel="apple-touch-icon" href="/images/logo.png">
  
  <!-- Fonts & Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gold: {
              50: '#fffbeb',
              100: '#fef3c7',
              200: '#fde68a',
              300: '#fcd34d',
              400: '#fbbf24',
              500: '#D4AF37',
              600: '#b8960c',
              700: '#92750a',
              800: '#78610d',
              900: '#654f12',
            },
            platinum: {
              100: '#f5f5f5',
              200: '#e8e8e8',
              300: '#d4d4d4',
              400: '#a3a3a3',
              500: '#E5E4E2',
            }
          },
          fontFamily: {
            'display': ['Playfair Display', 'serif'],
            'body': ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
    .font-display { font-family: 'Playfair Display', serif; }
    .gradient-gold { background: linear-gradient(135deg, #D4AF37 0%, #E5E4E2 50%, #D4AF37 100%); }
    .text-gradient { background: linear-gradient(135deg, #D4AF37, #E5E4E2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15); }
    .nav-link { position: relative; }
    .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: #D4AF37; transition: width 0.3s; }
    .nav-link:hover::after { width: 100%; }
    .hero-overlay { background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%); }
    
    /* Scroll Animations */
    .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    .fade-in-left { opacity: 0; transform: translateX(-30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-in-left.visible { opacity: 1; transform: translateX(0); }
    .fade-in-right { opacity: 0; transform: translateX(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-in-right.visible { opacity: 1; transform: translateX(0); }
    .scale-in { opacity: 0; transform: scale(0.95); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .scale-in.visible { opacity: 1; transform: scale(1); }
    
    /* Stagger children animations */
    .stagger-children > * { opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease-out, transform 0.4s ease-out; }
    .stagger-children.visible > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
    .stagger-children.visible > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
    .stagger-children.visible > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
    .stagger-children.visible > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
    
    /* Back to top button */
    #back-to-top { opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
    #back-to-top.visible { opacity: 1; visibility: visible; }
    
    /* Mobile menu animation */
    .mobile-menu { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
    .mobile-menu.open { max-height: 300px; }
  </style>
</head>
`

// Navigation component
const navigation = (currentPage: string) => `
<nav class="fixed w-full z-50 bg-black/95 backdrop-blur-md border-b border-gold-500/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <a href="/" class="flex items-center space-x-3">
        <img src="${IMAGES.logo}" alt="Fifth Ave AI" class="h-12 w-12 object-contain">
        <span class="text-xl font-display font-bold text-white">Fifth Ave <span class="text-gold-500">AI</span></span>
      </a>
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="nav-link text-sm font-medium ${currentPage === 'home' ? 'text-gold-500' : 'text-platinum-300 hover:text-gold-500'} transition-colors">Home</a>
        <a href="/services" class="nav-link text-sm font-medium ${currentPage === 'services' ? 'text-gold-500' : 'text-platinum-300 hover:text-gold-500'} transition-colors">Services</a>
        <a href="/about" class="nav-link text-sm font-medium ${currentPage === 'about' ? 'text-gold-500' : 'text-platinum-300 hover:text-gold-500'} transition-colors">About</a>
        <a href="/contact" class="nav-link text-sm font-medium ${currentPage === 'contact' ? 'text-gold-500' : 'text-platinum-300 hover:text-gold-500'} transition-colors">Contact</a>
        <a href="/contact" class="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25">
          Get Started
        </a>
      </div>
      <button id="mobile-menu-btn" class="md:hidden text-platinum-300" onclick="toggleMobileMenu()">
        <i id="menu-icon" class="fas fa-bars text-xl"></i>
      </button>
    </div>
    <div id="mobile-menu" class="mobile-menu md:hidden">
      <div class="pb-4 pt-2 space-y-1">
        <a href="/" class="block py-3 px-2 text-platinum-300 hover:text-gold-500 hover:bg-zinc-800/50 rounded-lg transition-all">Home</a>
        <a href="/services" class="block py-3 px-2 text-platinum-300 hover:text-gold-500 hover:bg-zinc-800/50 rounded-lg transition-all">Services</a>
        <a href="/about" class="block py-3 px-2 text-platinum-300 hover:text-gold-500 hover:bg-zinc-800/50 rounded-lg transition-all">About</a>
        <a href="/contact" class="block py-3 px-2 text-platinum-300 hover:text-gold-500 hover:bg-zinc-800/50 rounded-lg transition-all">Contact</a>
        <a href="/contact" class="block py-3 px-4 mt-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full text-center">Get Started</a>
      </div>
    </div>
  </div>
</nav>

<!-- Back to Top Button -->
<button id="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="fixed bottom-8 right-8 w-12 h-12 bg-gold-500 text-black rounded-full shadow-lg shadow-gold-500/25 flex items-center justify-center hover:bg-gold-400 transition-all z-40">
  <i class="fas fa-arrow-up"></i>
</button>
`

// Footer component
const footer = `
<footer class="bg-black border-t border-gold-500/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-1 md:col-span-2">
        <div class="flex items-center space-x-3 mb-6">
          <img src="${IMAGES.logo}" alt="Fifth Ave AI" class="h-12 w-12 object-contain">
          <span class="text-xl font-display font-bold text-white">Fifth Ave <span class="text-gold-500">AI</span></span>
        </div>
        <p class="text-platinum-400 mb-6 max-w-md">Empowering businesses through innovative AI solutions. Transform your operations and unlock new possibilities with cutting-edge technology.</p>
        <div class="flex space-x-4">
          <a href="#" class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-3">
          <li><a href="/" class="text-platinum-400 hover:text-gold-500 transition-colors">Home</a></li>
          <li><a href="/services" class="text-platinum-400 hover:text-gold-500 transition-colors">Services</a></li>
          <li><a href="/about" class="text-platinum-400 hover:text-gold-500 transition-colors">About Us</a></li>
          <li><a href="/contact" class="text-platinum-400 hover:text-gold-500 transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4">Locations</h4>
        <ul class="space-y-3 text-platinum-400">
          <li class="flex items-center"><i class="fas fa-map-marker-alt text-gold-500 mr-2"></i>Seattle, WA</li>
          <li class="flex items-center"><i class="fas fa-map-marker-alt text-gold-500 mr-2"></i>Atlanta, GA</li>
          <li class="flex items-center"><i class="fas fa-map-marker-alt text-gold-500 mr-2"></i>New York, NY</li>
          <li class="flex items-center"><i class="fas fa-map-marker-alt text-gold-500 mr-2"></i>Philadelphia, PA</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-zinc-800 mt-12 pt-8 text-center">
      <p class="text-platinum-500 text-sm">&copy; 2026 Fifth Ave AI. All rights reserved.</p>
    </div>
  </div>
</footer>

<!-- JavaScript for animations and interactions -->
<script>
  // Mobile menu toggle
  function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
  
  // Back to top button visibility
  window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children').forEach(el => {
      observer.observe(el);
    });
  });
</script>
</body>
</html>
`

// ==================== HOME PAGE ====================
app.get('/', (c) => {
  const html = `
${htmlHead('Transform Your Business with AI')}
<body class="bg-black text-white">
${navigation('home')}

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center">
  <div class="absolute inset-0">
    <img src="${IMAGES.hero}" alt="The Future of Business" class="w-full h-full object-cover">
    <div class="hero-overlay absolute inset-0"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
    <div class="max-w-2xl">
      <div class="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
        <span class="w-2 h-2 bg-gold-500 rounded-full mr-2 animate-pulse"></span>
        <span class="text-gold-500 text-sm font-medium">The Future Has Arrived</span>
      </div>
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
        Transform Your Business with <span class="text-gradient">AI Solutions</span>
      </h1>
      <p class="text-xl text-platinum-300 mb-8 leading-relaxed">
        Empowering businesses through innovative AI marketing strategies tailored for your success. Step into the future today.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/contact" class="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 text-center">
          Get Started <i class="fas fa-arrow-right ml-2"></i>
        </a>
        <a href="/services" class="px-8 py-4 border border-platinum-500 text-platinum-300 font-semibold rounded-full hover:bg-platinum-500/10 transition-all text-center">
          View Services
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-zinc-900/50 border-y border-gold-500/10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center stagger-children">
      <div>
        <div class="text-4xl font-display font-bold text-gold-500 mb-2">500+</div>
        <div class="text-platinum-400">Clients Served</div>
      </div>
      <div>
        <div class="text-4xl font-display font-bold text-gold-500 mb-2">98%</div>
        <div class="text-platinum-400">Client Satisfaction</div>
      </div>
      <div>
        <div class="text-4xl font-display font-bold text-gold-500 mb-2">4</div>
        <div class="text-platinum-400">Major Cities</div>
      </div>
      <div>
        <div class="text-4xl font-display font-bold text-gold-500 mb-2">24/7</div>
        <div class="text-platinum-400">AI Support</div>
      </div>
    </div>
  </div>
</section>

<!-- Trusted By Section -->
<section class="py-16 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10 fade-in">
      <p class="text-platinum-500 text-sm font-medium uppercase tracking-wider">Trusted by Industry Leaders</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 stagger-children">
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-building text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Real Estate</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-gavel text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Law Firms</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-heartbeat text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Healthcare</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-store text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Retail</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-utensils text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Restaurants</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <i class="fas fa-briefcase text-3xl text-platinum-400"></i>
        <span class="text-platinum-500 text-xs">Consulting</span>
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16 fade-in">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Process</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">How It Works</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto text-lg">A simple, proven process to transform your business with AI</p>
    </div>
    
    <div class="grid md:grid-cols-4 gap-8 relative">
      <!-- Connection line -->
      <div class="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/50 to-gold-500/0"></div>
      
      <!-- Step 1 -->
      <div class="text-center fade-in">
        <div class="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold relative z-10">1</div>
        <h3 class="text-xl font-semibold mb-3">Discovery Call</h3>
        <p class="text-platinum-400 text-sm">We learn about your business, goals, and current challenges in a free 30-minute call.</p>
      </div>
      
      <!-- Step 2 -->
      <div class="text-center fade-in">
        <div class="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold relative z-10">2</div>
        <h3 class="text-xl font-semibold mb-3">Strategy Session</h3>
        <p class="text-platinum-400 text-sm">Our experts analyze your workflow and create a custom AI integration roadmap.</p>
      </div>
      
      <!-- Step 3 -->
      <div class="text-center fade-in">
        <div class="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold relative z-10">3</div>
        <h3 class="text-xl font-semibold mb-3">Implementation</h3>
        <p class="text-platinum-400 text-sm">We set up and configure AI tools, train your team, and ensure smooth adoption.</p>
      </div>
      
      <!-- Step 4 -->
      <div class="text-center fade-in">
        <div class="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold relative z-10">4</div>
        <h3 class="text-xl font-semibold mb-3">Results & Growth</h3>
        <p class="text-platinum-400 text-sm">Watch your efficiency soar as AI handles repetitive tasks and drives growth.</p>
      </div>
    </div>
    
    <div class="text-center mt-12 fade-in">
      <a href="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25">
        Start Your Journey <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </div>
</section>

<!-- Services Overview -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">AI Marketing Solutions</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto text-lg">Transform your small business with our innovative AI-driven marketing strategies tailored for your success.</p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-gold-500/50">
        <div class="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6">
          <i class="fas fa-chart-line text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3">AI Marketing Solutions</h3>
        <p class="text-platinum-400 mb-4">Boost your brand visibility with AI-driven strategies. Tailored marketing plans for small businesses using AI.</p>
        <a href="/services" class="text-gold-500 font-medium hover:text-gold-400 transition-colors">
          Learn more <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
      
      <!-- Card 2 -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-gold-500/50">
        <div class="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6">
          <i class="fas fa-users text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3">Expert Consultation</h3>
        <p class="text-platinum-400 mb-4">Get personalized guidance from AI experts who understand your business needs and growth objectives.</p>
        <a href="/services" class="text-gold-500 font-medium hover:text-gold-400 transition-colors">
          Learn more <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
      
      <!-- Card 3 -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-gold-500/50">
        <div class="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6">
          <i class="fas fa-bullseye text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3">Strategic Planning</h3>
        <p class="text-platinum-400 mb-4">Maximize your outreach with data-driven insights and comprehensive strategic planning for growth.</p>
        <a href="/services" class="text-gold-500 font-medium hover:text-gold-400 transition-colors">
          Learn more <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- About Section with Image -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">About Fifth Ave AI</span>
        <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Empowering Small Businesses with AI Solutions</h2>
        <p class="text-platinum-400 text-lg mb-6 leading-relaxed">
          At Fifth Ave AI, we specialize in innovative AI marketing solutions tailored for small businesses in Seattle, Atlanta, New York, and Philadelphia. Let us help you grow and thrive in the digital landscape.
        </p>
        <p class="text-platinum-400 text-lg mb-8 leading-relaxed">
          Our team of experts combines cutting-edge AI technology with deep marketing expertise to deliver transformative results for your business.
        </p>
        <div class="flex items-center space-x-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center mr-3">
              <i class="fas fa-check text-gold-500"></i>
            </div>
            <span class="text-platinum-300">Proven Results</span>
          </div>
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center mr-3">
              <i class="fas fa-check text-gold-500"></i>
            </div>
            <span class="text-platinum-300">Expert Team</span>
          </div>
        </div>
      </div>
      <div class="relative">
        <img src="${IMAGES.aboutTeam}" alt="Fifth Ave AI Team Training" class="rounded-2xl shadow-2xl shadow-gold-500/10">
        <div class="absolute -bottom-6 -left-6 bg-gold-500 text-black p-6 rounded-xl">
          <div class="text-3xl font-display font-bold">10+</div>
          <div class="text-sm font-medium">Years Experience</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Tools Section -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Capabilities</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">AI-Powered Tools</h2>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div class="card-hover bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700">
        <div class="flex items-start space-x-4">
          <div class="w-16 h-16 bg-gold-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fas fa-database text-3xl text-gold-500"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Data Analysis Tools</h3>
            <p class="text-platinum-400">Leverage advanced analytics to understand your market better and make informed business decisions effectively.</p>
          </div>
        </div>
      </div>
      
      <div class="card-hover bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700">
        <div class="flex items-start space-x-4">
          <div class="w-16 h-16 bg-gold-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fas fa-share-alt text-3xl text-gold-500"></i>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Social Media Boost</h3>
            <p class="text-platinum-400">Enhance your online presence with targeted AI solutions that engage your audience and drive growth.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonial -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-6xl text-gold-500/30 mb-6">"</div>
    <blockquote class="text-2xl md:text-3xl font-display text-platinum-200 mb-8 leading-relaxed">
      Fifth Ave AI transformed our marketing strategy with innovative AI solutions. Their expertise helped our small business thrive in a competitive market. Highly recommend their services!
    </blockquote>
    <div class="flex items-center justify-center">
      <div class="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
        VC
      </div>
      <div class="text-left">
        <div class="font-semibold text-white">Vance C.</div>
        <div class="text-platinum-400">CEO of QCS Renovations</div>
      </div>
    </div>
  </div>
</section>

<!-- Executive 1-on-1 Consulting Section -->
<section class="py-24 bg-black relative overflow-hidden">
  <!-- Background decoration -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-0 left-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <!-- Exclusivity Banner -->
    <div class="text-center mb-8 fade-in">
      <div class="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
        <i class="fas fa-fire text-red-500 mr-2 animate-pulse"></i>
        <span class="text-red-400 text-sm font-semibold">Limited to 3 Clients Per Quarter · 2 Spots Remaining</span>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl border border-gold-500/30 overflow-hidden shadow-2xl shadow-gold-500/10 scale-in">
      <div class="grid lg:grid-cols-2 gap-0">
        <!-- Left Content -->
        <div class="p-10 md:p-16">
          <div class="flex flex-wrap gap-3 mb-6">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/50">
              <i class="fas fa-crown text-gold-500 mr-2"></i>
              <span class="text-gold-500 text-sm font-semibold uppercase tracking-wider">Executive Program</span>
            </div>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700">
              <i class="fas fa-shield-alt text-platinum-400 mr-2"></i>
              <span class="text-platinum-400 text-sm font-medium">By Application Only</span>
            </div>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">
            Exclusive <span class="text-gradient">1-on-1</span> AI Consulting
          </h2>
          
          <p class="text-platinum-300 text-lg mb-4 leading-relaxed">
            For business leaders ready to make a transformational investment. Our elite consulting program provides hands-on, personalized AI integration strategies designed to revolutionize your entire operation.
          </p>
          
          <p class="text-platinum-400 text-sm mb-8 italic border-l-2 border-gold-500 pl-4">
            "We intentionally limit our executive partnerships to ensure every client receives our complete attention and the results they deserve."
          </p>
          
          <div class="space-y-5 mb-10">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <i class="fas fa-user-tie text-gold-500"></i>
              </div>
              <div>
                <h4 class="font-semibold text-white mb-1">Dedicated AI Strategist</h4>
                <p class="text-platinum-400 text-sm">Work directly with a senior consultant who becomes an extension of your leadership team.</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <i class="fas fa-building text-gold-500"></i>
              </div>
              <div>
                <h4 class="font-semibold text-white mb-1">Full Business Transformation</h4>
                <p class="text-platinum-400 text-sm">Comprehensive workflow overhaul, custom AI solutions, and implementation support across your organization.</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <i class="fas fa-chart-line text-gold-500"></i>
              </div>
              <div>
                <h4 class="font-semibold text-white mb-1">Measurable ROI</h4>
                <p class="text-platinum-400 text-sm">Strategic improvements designed to deliver exponential returns on your investment.</p>
              </div>
            </div>
          </div>
          
          <a href="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 text-lg">
            <i class="fas fa-envelope mr-3"></i>
            Inquire About Availability
          </a>
          
          <p class="text-platinum-500 text-sm mt-4">
            <i class="fas fa-lock mr-1"></i> Limited availability · By application only
          </p>
        </div>
        
        <!-- Right Side - Visual -->
        <div class="bg-gradient-to-br from-gold-500/10 to-zinc-900 p-10 md:p-16 flex flex-col justify-center items-center text-center border-l border-gold-500/20">
          <div class="w-24 h-24 bg-gradient-to-br from-gold-500/30 to-gold-600/20 rounded-full flex items-center justify-center mb-8 border-2 border-gold-500/50">
            <i class="fas fa-gem text-5xl text-gold-500"></i>
          </div>
          
          <h3 class="text-2xl font-display font-bold mb-4">Premium Partnership</h3>
          
          <p class="text-platinum-400 mb-8 max-w-sm">
            This is not a course or a template. It's a high-touch, white-glove engagement for serious business owners ready to invest in transformational growth.
          </p>
          
          <div class="w-full max-w-xs space-y-4 text-left">
            <div class="flex items-center space-x-3 text-platinum-300">
              <i class="fas fa-check-circle text-gold-500"></i>
              <span>Complete workflow audit & redesign</span>
            </div>
            <div class="flex items-center space-x-3 text-platinum-300">
              <i class="fas fa-check-circle text-gold-500"></i>
              <span>Custom AI tool development</span>
            </div>
            <div class="flex items-center space-x-3 text-platinum-300">
              <i class="fas fa-check-circle text-gold-500"></i>
              <span>Team training & onboarding</span>
            </div>
            <div class="flex items-center space-x-3 text-platinum-300">
              <i class="fas fa-check-circle text-gold-500"></i>
              <span>Ongoing strategic support</span>
            </div>
            <div class="flex items-center space-x-3 text-platinum-300">
              <i class="fas fa-check-circle text-gold-500"></i>
              <span>Direct access to leadership</span>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-gold-500/20 w-full max-w-xs">
            <p class="text-platinum-500 text-xs uppercase tracking-wider mb-2">Investment Starting At</p>
            <p class="text-3xl font-display font-bold text-gold-500">$25,000+</p>
            <p class="text-platinum-500 text-sm mt-1">Tailored to your business scope</p>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gold-500/20 w-full max-w-xs">
            <div class="flex items-center justify-center space-x-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-gold-500">47%</p>
                <p class="text-platinum-500 text-xs">Avg Revenue Increase</p>
              </div>
              <div class="h-12 w-px bg-gold-500/30"></div>
              <div class="text-center">
                <p class="text-2xl font-bold text-gold-500">3x</p>
                <p class="text-platinum-500 text-xs">Avg ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Qualification Notice -->
    <div class="text-center mt-8 fade-in">
      <p class="text-platinum-500 text-sm">
        <i class="fas fa-info-circle mr-2 text-gold-500"></i>
        Qualified candidates typically have annual revenues exceeding $5M and are committed to long-term AI transformation.
      </p>
    </div>
  </div>
</section>

<!-- Solutions Grid -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Complete Solutions</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">AI Solutions</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto">Innovative marketing strategies for small businesses using AI.</p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card-hover bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div class="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-brain text-2xl text-gold-500"></i>
        </div>
        <h3 class="font-semibold mb-2">Smart Marketing</h3>
        <p class="text-platinum-400 text-sm">Transforming businesses through AI-driven marketing solutions.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div class="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-chart-pie text-2xl text-gold-500"></i>
        </div>
        <h3 class="font-semibold mb-2">Data Insights</h3>
        <p class="text-platinum-400 text-sm">Leveraging data analytics to enhance business performance effectively.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div class="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-lightbulb text-2xl text-gold-500"></i>
        </div>
        <h3 class="font-semibold mb-2">Creative Campaigns</h3>
        <p class="text-platinum-400 text-sm">Crafting unique marketing campaigns tailored for small businesses.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
        <div class="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trophy text-2xl text-gold-500"></i>
        </div>
        <h3 class="font-semibold mb-2">Client Success</h3>
        <p class="text-platinum-400 text-sm">Showcasing successful projects that demonstrate our expertise.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Transform Your Business?</h2>
    <p class="text-platinum-400 text-lg mb-8">Let's discuss how AI can revolutionize your marketing strategy and drive growth.</p>
    <a href="/contact" class="inline-block px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 text-lg">
      Schedule a Consultation <i class="fas fa-arrow-right ml-2"></i>
    </a>
  </div>
</section>

${footer}
`
  return c.html(html)
})

// ==================== SERVICES PAGE ====================
app.get('/services', (c) => {
  const html = `
${htmlHead('Our Services')}
<body class="bg-black text-white">
${navigation('services')}

<!-- Hero -->
<section class="pt-32 pb-20 bg-gradient-to-b from-zinc-900 to-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
    <h1 class="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">Our Services</h1>
    <p class="text-platinum-400 max-w-2xl mx-auto text-lg">Comprehensive AI-powered solutions designed to transform your business and accelerate growth.</p>
  </div>
</section>

<!-- Team Training Image Section -->
<section class="py-16 bg-black">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 border border-gold-500/20">
      <img src="/images/team-training.jpg" alt="AI Workflow Team Learning Session" class="w-full h-auto object-cover">
    </div>
    <p class="text-center text-platinum-500 mt-4 text-sm">Our team training sessions help your employees master AI-powered workflows</p>
  </div>
</section>

<!-- Main Services -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12">
      
      <!-- AI Email Assistant -->
      <div class="card-hover bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <div class="h-48 bg-gradient-to-br from-gold-500/20 to-zinc-900 flex items-center justify-center">
          <i class="fas fa-envelope-open-text text-6xl text-gold-500"></i>
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-semibold mb-4">AI Email Assistant</h3>
          <p class="text-platinum-400 mb-6">24/7 automated email responses that sound completely human. Never miss another inquiry. 2-5 minute response time.</p>
          <ul class="space-y-3 text-platinum-300">
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>24/7 Automated Responses</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Human-like Communication</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>2-5 Minute Response Time</li>
          </ul>
        </div>
      </div>
      
      <!-- AI Avatar Video Ads -->
      <div class="card-hover bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <div class="h-48 bg-gradient-to-br from-gold-500/20 to-zinc-900 flex items-center justify-center">
          <i class="fas fa-video text-6xl text-gold-500"></i>
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-semibold mb-4">AI Avatar Video Ads</h3>
          <p class="text-platinum-400 mb-6">Scroll-stopping video ads with hyper-realistic AI avatars. Perfect for social media, landing pages, and campaigns. 24-48 hour turnaround.</p>
          <ul class="space-y-3 text-platinum-300">
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Hyper-realistic AI Avatars</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Social Media Optimized</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>24-48 Hour Turnaround</li>
          </ul>
        </div>
      </div>
      
      <!-- AI-Powered Website Services -->
      <div class="card-hover bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <div class="h-48 bg-gradient-to-br from-gold-500/20 to-zinc-900 flex items-center justify-center">
          <i class="fas fa-globe text-6xl text-gold-500"></i>
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-semibold mb-4">AI-Powered Website Services</h3>
          <p class="text-platinum-400 mb-6">Professional website design with AI chatbot integration, mobile-responsive, and SEO-optimized. Get your business online with intelligent features built in.</p>
          <ul class="space-y-3 text-platinum-300">
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>AI Chatbot Integration</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Mobile Responsive Design</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>SEO Optimized</li>
          </ul>
        </div>
      </div>
      
      <!-- Social Media Management -->
      <div class="card-hover bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        <div class="h-48 bg-gradient-to-br from-gold-500/20 to-zinc-900 flex items-center justify-center">
          <i class="fas fa-hashtag text-6xl text-gold-500"></i>
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-semibold mb-4">Social Media Management</h3>
          <p class="text-platinum-400 mb-6">Consistent content across 7 platforms with zero manual effort. AI creates, schedules, and posts automatically with performance reports.</p>
          <ul class="space-y-3 text-platinum-300">
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>7 Platform Coverage</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>AI Content Creation</li>
            <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Performance Reports</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Pricing Section -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Investment</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Pricing Plans</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto">Choose the package that fits your business needs. All plans include setup and ongoing AI automation.</p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Starter -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <h3 class="text-xl font-semibold mb-2">Starter Package</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-gold-500">$497</span>
          <span class="text-platinum-400">/month</span>
        </div>
        <p class="text-platinum-400 mb-6">Setup: $3,000</p>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>2 AI Avatar Videos/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>200 Emails/month automated</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>2 Social Platforms</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>10 Posts/week total</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>30 Lead Callbacks/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Email support</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Monthly reports</li>
        </ul>
        <a href="/contact" class="block w-full py-3 border border-gold-500 text-gold-500 font-semibold rounded-full text-center hover:bg-gold-500 hover:text-black transition-all">
          Get Started
        </a>
      </div>
      
      <!-- Professional -->
      <div class="card-hover bg-gradient-to-b from-gold-500/10 to-zinc-900 rounded-2xl p-8 border-2 border-gold-500 relative">
        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gold-500 text-black text-sm font-semibold rounded-full">
          Most Popular
        </div>
        <h3 class="text-xl font-semibold mb-2">Professional Package</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-gold-500">$997</span>
          <span class="text-platinum-400">/month</span>
        </div>
        <p class="text-platinum-400 mb-6">Setup: $5,000</p>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>5 AI Avatar Videos/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>500 Emails/month automated</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>4 Social Platforms</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>20 Posts/week total</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>100 Lead Callbacks/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>24/7 Priority Support</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Advanced Analytics</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Bi-weekly reports</li>
        </ul>
        <a href="/contact" class="block w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full text-center hover:from-gold-400 hover:to-gold-500 transition-all">
          Get Started
        </a>
      </div>
      
      <!-- Enterprise -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <h3 class="text-xl font-semibold mb-2">Enterprise Package</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-gold-500">$1,997</span>
          <span class="text-platinum-400">/month</span>
        </div>
        <p class="text-platinum-400 mb-6">Setup: $10,000</p>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>10 AI Avatar Videos/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>1,500 Emails/month automated</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>All 7 Social Platforms</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>35 Posts/week total</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>300 Lead Callbacks/month</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Dedicated Manager</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Custom Integrations</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Weekly reviews</li>
        </ul>
        <a href="/contact" class="block w-full py-3 border border-gold-500 text-gold-500 font-semibold rounded-full text-center hover:bg-gold-500 hover:text-black transition-all">
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Website Pricing -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Website Solutions</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">AI-Powered Website Services</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto">Professional website design with AI chatbot integration, mobile-responsive, and SEO-optimized.</p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Gold -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-medal text-3xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Gold Website</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-gold-500">$2,500</span>
        </div>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>5-7 pages</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Mobile-responsive</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>AI chatbot integration</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Contact forms</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>SEO optimization</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>1 year hosting included</li>
        </ul>
        <a href="/contact" class="block w-full py-3 border border-gold-500 text-gold-500 font-semibold rounded-full text-center hover:bg-gold-500 hover:text-black transition-all">
          Get Quote
        </a>
      </div>
      
      <!-- Platinum -->
      <div class="card-hover bg-gradient-to-b from-platinum-500/10 to-zinc-900 rounded-2xl p-8 border border-platinum-500">
        <div class="w-16 h-16 bg-platinum-500/20 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-gem text-3xl text-platinum-300"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Platinum Website</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-platinum-300">$5,000</span>
        </div>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>8-12 pages</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>Custom design</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>AI chatbot integration</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>Blog integration</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>Advanced features</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>Analytics setup</li>
          <li class="flex items-center"><i class="fas fa-check text-platinum-400 mr-3"></i>1 year hosting included</li>
        </ul>
        <a href="/contact" class="block w-full py-3 bg-platinum-500 text-black font-semibold rounded-full text-center hover:bg-platinum-300 transition-all">
          Get Quote
        </a>
      </div>
      
      <!-- Diamond -->
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-crown text-3xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Diamond Website</h3>
        <div class="mb-6">
          <span class="text-4xl font-display font-bold text-gold-500">$10,000</span>
        </div>
        <ul class="space-y-3 text-platinum-300 mb-8">
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Up to 50 products</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Shopping cart</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Payment processing</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>AI chatbot support</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Product management</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>Order tracking</li>
          <li class="flex items-center"><i class="fas fa-check text-gold-500 mr-3"></i>1 year hosting included</li>
        </ul>
        <a href="/contact" class="block w-full py-3 border border-gold-500 text-gold-500 font-semibold rounded-full text-center hover:bg-gold-500 hover:text-black transition-all">
          Get Quote
        </a>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Common Questions</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Frequently Asked Questions</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto">Find answers to common questions about our AI services and how we can help your business.</p>
    </div>
    
    <div class="space-y-4">
      <!-- FAQ Item 1 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">How quickly can I expect results from AI marketing?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">Most clients see measurable improvements within 30-60 days. Our AI systems begin learning your audience immediately, and optimization accelerates over time. Email response automation starts working from day one, while social media engagement typically shows improvement within the first 2 weeks.</p>
        </div>
      </div>
      
      <!-- FAQ Item 2 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">What makes your AI Avatar Videos different?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">Our AI avatars are hyper-realistic and can be customized to match your brand voice and style. Unlike generic stock videos, these are personalized for your business with your messaging, delivered in 24-48 hours, and designed to stop the scroll on social media platforms.</p>
        </div>
      </div>
      
      <!-- FAQ Item 3 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">Do I need technical knowledge to use your services?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">Absolutely not. We handle all the technical complexity. You simply review results, approve content, and watch your business grow. Our team manages the AI systems, integrations, and optimizations so you can focus on running your business.</p>
        </div>
      </div>
      
      <!-- FAQ Item 4 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">What's included in the setup fee?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">The setup fee covers initial AI model training on your business data, integration with your existing platforms (CRM, email, social media), custom workflow configuration, brand voice development, and a comprehensive onboarding session with your dedicated account manager.</p>
        </div>
      </div>
      
      <!-- FAQ Item 5 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">Can I upgrade or downgrade my package later?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">Yes! We offer flexible scaling. You can upgrade anytime to access more features, and we'll prorate your billing. Downgrades take effect at the start of your next billing cycle. Many clients start with our Starter package and scale up as they see results.</p>
        </div>
      </div>
      
      <!-- FAQ Item 6 -->
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <button class="faq-toggle w-full px-6 py-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors" onclick="this.parentElement.classList.toggle('active')">
          <span class="font-semibold text-lg">What kind of support do you provide?</span>
          <i class="fas fa-chevron-down text-gold-500 transition-transform faq-icon"></i>
        </button>
        <div class="faq-content px-6 pb-5 hidden">
          <p class="text-platinum-400">All packages include 24/7 AI-powered support with escalation to human experts when needed. Professional and Enterprise clients get priority support with faster response times, dedicated account managers, and regular strategy sessions.</p>
        </div>
      </div>
    </div>
    
    <div class="text-center mt-12">
      <p class="text-platinum-400 mb-4">Still have questions?</p>
      <a href="/contact" class="inline-flex items-center text-gold-500 hover:text-gold-400 font-semibold">
        Contact our team <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </div>
</section>

<style>
  .faq-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
  .active .faq-content { display: block; max-height: 500px; }
  .active .faq-icon { transform: rotate(180deg); }
</style>

<!-- CTA -->
<section class="py-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Get Started?</h2>
    <p class="text-platinum-400 text-lg mb-8">Contact us today for a free consultation and custom quote.</p>
    <a href="/contact" class="inline-block px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 text-lg">
      Schedule a Consultation <i class="fas fa-arrow-right ml-2"></i>
    </a>
  </div>
</section>

${footer}
`
  return c.html(html)
})

// ==================== ABOUT PAGE ====================
app.get('/about', (c) => {
  const html = `
${htmlHead('About Us')}
<body class="bg-black text-white">
${navigation('about')}

<!-- Hero -->
<section class="pt-32 pb-20 bg-gradient-to-b from-zinc-900 to-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">About Fifth Ave AI</span>
        <h1 class="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">Empowering Businesses Through Innovation</h1>
        <p class="text-platinum-400 text-lg leading-relaxed">
          At Fifth Ave AI, we specialize in innovative AI marketing solutions tailored for small businesses. Our mission is to make cutting-edge technology accessible to businesses of all sizes.
        </p>
      </div>
      <div class="relative">
        <img src="${IMAGES.consultation}" alt="About Fifth Ave AI" class="rounded-2xl shadow-2xl shadow-gold-500/10">
      </div>
    </div>
  </div>
</section>

<!-- Our Story -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Our Story</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-8">Building the Future of Marketing</h2>
      <p class="text-platinum-400 text-lg leading-relaxed mb-6">
        Founded with a vision to democratize AI technology, Fifth Ave AI has grown from a small consultancy to a leading AI marketing solutions provider serving businesses across Seattle, Atlanta, New York, and Philadelphia.
      </p>
      <p class="text-platinum-400 text-lg leading-relaxed">
        We believe that every business deserves access to the same powerful AI tools that enterprise companies use. Our team of experts works tirelessly to develop solutions that are not only powerful but also accessible and easy to implement.
      </p>
    </div>
  </div>
</section>

<!-- Values -->
<section class="py-24 bg-zinc-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">What Drives Us</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Our Core Values</h2>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <div class="text-center p-8">
        <div class="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-lightbulb text-3xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-4">Innovation</h3>
        <p class="text-platinum-400">We constantly push boundaries to deliver cutting-edge AI solutions that keep our clients ahead of the curve.</p>
      </div>
      
      <div class="text-center p-8">
        <div class="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-handshake text-3xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-4">Partnership</h3>
        <p class="text-platinum-400">We work alongside our clients as true partners, invested in their success and growth at every step.</p>
      </div>
      
      <div class="text-center p-8">
        <div class="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-award text-3xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-4">Excellence</h3>
        <p class="text-platinum-400">We are committed to delivering exceptional quality in everything we do, from strategy to execution.</p>
      </div>
    </div>
  </div>
</section>

<!-- Locations -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Where We Operate</span>
      <h2 class="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Our Locations</h2>
      <p class="text-platinum-400 max-w-2xl mx-auto">Serving businesses across the Pacific Northwest, Southeast, and East Coast with local expertise and global perspective.</p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-mountain text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Seattle, WA</h3>
        <p class="text-platinum-400">Bringing AI innovation to the Pacific Northwest tech hub.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-peach text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Atlanta, GA</h3>
        <p class="text-platinum-400">Serving the booming business capital of the Southeast.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-city text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">New York, NY</h3>
        <p class="text-platinum-400">Our flagship location in the heart of the business world.</p>
      </div>
      
      <div class="card-hover bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center">
        <div class="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-landmark text-2xl text-gold-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Philadelphia, PA</h3>
        <p class="text-platinum-400">Serving the thriving business community of the Delaware Valley.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Let's Work Together</h2>
    <p class="text-platinum-400 text-lg mb-8">Ready to transform your business with AI? We'd love to hear from you.</p>
    <a href="/contact" class="inline-block px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-full hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25 text-lg">
      Get in Touch <i class="fas fa-arrow-right ml-2"></i>
    </a>
  </div>
</section>

${footer}
`
  return c.html(html)
})

// ==================== CONTACT PAGE ====================
app.get('/contact', (c) => {
  const html = `
${htmlHead('Contact Us')}
<body class="bg-black text-white">
${navigation('contact')}

<!-- Hero -->
<section class="pt-32 pb-20 bg-gradient-to-b from-zinc-900 to-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-gold-500 text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
    <h1 class="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">Contact Us</h1>
    <p class="text-platinum-400 max-w-2xl mx-auto text-lg">Ready to transform your business? We'd love to hear from you. Reach out and let's start a conversation.</p>
  </div>
</section>

<!-- Contact Section -->
<section class="py-24 bg-black">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16">
      
      <!-- Contact Form -->
      <div class="bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-800">
        <h2 class="text-2xl font-semibold mb-6">Send Us a Message</h2>
        <form action="https://api.web3forms.com/submit" method="POST" class="space-y-6" id="contact-form">
          <input type="hidden" name="access_key" value="c24f829f-9c1f-4f19-8925-31e56d3f03da">
          <input type="hidden" name="redirect" value="https://fifthaveai.pages.dev/contact?success=true">
          <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
          
          <div>
            <label class="block text-sm font-medium text-platinum-300 mb-2">Name</label>
            <input type="text" name="name" required class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-platinum-500 focus:outline-none focus:border-gold-500 transition-colors" placeholder="Your Name">
          </div>
          <div>
            <label class="block text-sm font-medium text-platinum-300 mb-2">Email</label>
            <input type="email" name="email" required class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-platinum-500 focus:outline-none focus:border-gold-500 transition-colors" placeholder="john@example.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-platinum-300 mb-2">Message</label>
            <textarea name="message" rows="4" required class="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-platinum-500 focus:outline-none focus:border-gold-500 transition-colors" placeholder="Tell us about your project..."></textarea>
          </div>
          <button type="submit" class="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/25">
            Send Message <i class="fas fa-paper-plane ml-2"></i>
          </button>
        </form>
        
        <!-- Success Message -->
        <div id="success-message" class="hidden mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div class="flex items-center space-x-3">
            <i class="fas fa-check-circle text-green-500 text-xl"></i>
            <div>
              <h3 class="font-semibold text-green-400">Message Sent!</h3>
              <p class="text-platinum-400 text-sm mt-1">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div>
        <h2 class="text-2xl font-semibold mb-8">Get in Touch</h2>
        
        <div class="space-y-8">
          <div class="flex items-start space-x-4">
            <div class="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-phone text-xl text-gold-500"></i>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Call Us</h3>
              <p class="text-platinum-400">(425) 316-7268</p>
              <p class="text-platinum-500 text-sm">Mon-Fri, 9am-6pm PST</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-map-marker-alt text-xl text-gold-500"></i>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Headquarters</h3>
              <p class="text-platinum-400">11335 NE 122nd Way, Suite 105</p>
              <p class="text-platinum-400">Kirkland, Washington 98034</p>
              <p class="text-platinum-500 text-sm mt-2">Also serving: Seattle, Atlanta, New York, Philadelphia</p>
            </div>
          </div>
        </div>
        
        <div class="mt-12 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
          <h3 class="font-semibold mb-4">Schedule a Free Consultation</h3>
          <p class="text-platinum-400 mb-6">Book a 30-minute call to discuss how AI can transform your business operations.</p>
          <a href="#" class="inline-flex items-center text-gold-500 font-medium hover:text-gold-400 transition-colors">
            <i class="fas fa-calendar-alt mr-2"></i> Book a Time Slot
          </a>
        </div>
        
        <div class="mt-8">
          <h3 class="font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
              <i class="fab fa-linkedin-in text-lg"></i>
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
              <i class="fab fa-twitter text-lg"></i>
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
              <i class="fab fa-instagram text-lg"></i>
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-platinum-400 hover:bg-gold-500 hover:text-black transition-all">
              <i class="fab fa-facebook-f text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  // Show success message if redirected back from Web3Forms
  if (window.location.search.includes('success=true')) {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-message');
    if (form) form.style.display = 'none';
    if (successMsg) successMsg.classList.remove('hidden');
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
</script>

${footer}
`
  return c.html(html)
})

export default app

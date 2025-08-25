// SEO and Performance Optimization Utilities

// Lazy loading for images
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    'https://res.cloudinary.com/dtkjjaxwn/image/upload/v1743262128/gcldnxjn7naqohten61y.png'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Add structured data for projects
export const addProjectStructuredData = (projects) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kush Goel's Projects",
    "description": "Portfolio of web development projects by Kush Goel",
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": project.liveUrl || project.githubUrl,
      "author": {
        "@type": "Person",
        "name": "Kush Goel"
      },
      "programmingLanguage": project.technologies
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

// Generate breadcrumb structured data
export const addBreadcrumbStructuredData = (currentSection) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kush-portfolio-virid.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentSection,
        "item": `https://kush-portfolio-virid.vercel.app/#${currentSection.toLowerCase()}`
      }
    ]
  };

  // Remove existing breadcrumb data
  const existingBreadcrumb = document.querySelector('script[data-breadcrumb]');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-breadcrumb', 'true');
  script.textContent = JSON.stringify(breadcrumbData);
  document.head.appendChild(script);
};

// Optimize Core Web Vitals
export const optimizeWebVitals = () => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://res.cloudinary.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Add dns-prefetch for external resources
  const dnsPrefetchDomains = [
    'https://github.com',
    'https://linkedin.com',
    'https://leetcode.com',
    'https://codechef.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

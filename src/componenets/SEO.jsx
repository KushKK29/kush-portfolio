import { useEffect } from 'react';

const SEO = ({ 
  title = "Kush Goel - Full Stack Developer | React.js & Node.js Portfolio",
  description = "Full Stack Developer specializing in React.js, Node.js, and modern web technologies. View my projects, skills, and experience in software development.",
  keywords = "Kush Goel, Full Stack Developer, React.js, Node.js, JavaScript, Web Developer, Software Engineer, Portfolio, Frontend, Backend",
  image = "https://res.cloudinary.com/dtkjjaxwn/image/upload/v1743262128/gcldnxjn7naqohten61y.png",
  url = "https://kush-portfolio-virid.vercel.app/"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', url);
      document.head.appendChild(canonicalLink);
    }
  }, [title, description, keywords, image, url]);

  return null; // This component doesn't render anything
};

export default SEO;

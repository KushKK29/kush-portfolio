const portfolioSections = [
  {
    id: "intro",
    title: "Intro",
    anchor: "#intro",
    summary:
      "Kush Goel is a full-stack developer and B.Tech ECE student at IIIT Una (CGPA: 9.03), focused on building systems, not just features. He cares about speed, scale, and impact. He ships production-ready features fast, measures metrics, and iterates.",
    keywords: [
      "kush",
      "kush goel",
      "full stack",
      "react",
      "node",
      "aws",
      "iiit una",
      "ece",
      "developer",
      "system",
      "scale",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    anchor: "#projects",
    summary:
      "Projects include Trade-Shala (trading platform for 66K+ stocks, 82% ML prediction accuracy, 10% engagement increase) and MHope (healthcare system with AI chatbot and disease prediction at 85% precision, processed 500+ X-rays). He focuses on taking ideas through architecture to deployment.",
    keywords: [
      "project",
      "portfolio",
      "trade-shala",
      "mhope",
      "trading",
      "healthcare",
      "react",
      "node",
      "ml",
      "ai",
      "prediction",
    ],
  },
  {
    id: "skills",
    title: "Skills",
    anchor: "#skills",
    summary:
      "Core skills: React.js, Next.js, Node.js, TypeScript, JavaScript, Python, AWS, MongoDB.\n\n**Problem Solving** → Solved 500+ DSA problems to ensure every system I build handles data efficiently.\n\n**LeetCode** → Maintained a 1575 rating while focusing on high-performance algorithms. [LeetCode](https://leetcode.com/u/Kush30/)\n\n**CodeChef** → Earned a 3 Star rating by optimizing code under strict time and memory constraints. [CodeChef](https://www.codechef.com/users/kush279)\n\n**GeeksforGeeks** → Applied logic successfully. [GeeksforGeeks](https://www.geeksforgeeks.org/profile/kush28fguw?tab=activity)\n\n**Codolio** → Tracking performance metrics. [Codolio](https://codolio.com/profile/kush_goel)\n\nI also ranked in the top 10% of contributors for GSSoC '25. Want to see how I apply this logic to my trading (Trade-Shala) or healthcare (MHope) projects?",
    keywords: [
      "skills",
      "stack",
      "javascript",
      "typescript",
      "react",
      "next",
      "node",
      "aws",
      "mongodb",
      "python",
      "c++",
      "dsa",
      "leetcode",
      "codechef",
      "problem solving",
      "codolio",
      "geeksforgeeks",
      "gfg",
      "competitive programming"
    ],
  },
  {
    id: "experience",
    title: "Experience",
    anchor: "#experience",
    summary:
      "Experience includes Software Engineering Intern at Humantic AI (architected onboarding across 5+ modules, automated KPIs for 10+ metrics using AWS) and Software Development Intern at GeeksforGeeks (migrated dashboards to Next.js cutting load time by 60%, improved data efficiency by 40%, 25% click-through increase).",
    keywords: [
      "experience",
      "intern",
      "humantic ai",
      "geeksforgeeks",
      "gfg",
      "work",
      "job",
      "aws",
      "next.js",
      "dashboard",
    ],
  },
  {
    id: "education",
    title: "Education",
    anchor: "#education",
    summary:
      "Education includes B.Tech in ECE at IIIT Una (Nov 2022 - May 2026, 9.03 CGPA), 12th with 95.6% (PCM), and 10th with 87% from R.R.K. Sen. Sec. School, Chandausi.",
    keywords: ["education", "study", "college", "iiit una", "school", "degree", "b.tech", "ece", "cgpa"],
  },
  {
    id: "contact",
    title: "Contact",
    anchor: "#contact",
    summary:
      "Contact channels include +91-8279379218, kushgoel279@gmail.com, LinkedIn, Github, and Portfolio.",
    keywords: ["contact", "email", "github", "linkedin", "phone", "reach", "hire"],
  },
];

const projects = [
  {
    name: "Trade-Shala",
    description: "Live trading platform for 66,784 stocks with ML predictions.",
    tech: ["TypeScript", "Node.js", "MongoDB", "Express.js"],
    metrics: ["66,784 stocks", "~82% accuracy", "10% engagement increase"],
    github: "https://github.com/KushKK29/Trade_Shala",
    live: "https://trade-shala-inky.vercel.app/"
  },
  {
    name: "MHope - Patient's AI Friend",
    description: "AI-based healthcare platform with smart dashboards and diagnostic tools.",
    tech: ["React.js", "Node.js", "MongoDB", "Socket.io", "AI/ML"],
    metrics: ["85% precision", "processed 500+ X-rays"],
    github: "https://github.com/KushKK29/Mhope",
    live: "https://m-hope.vercel.app/"
  },
  {
    name: "My-Chat-App",
    description: "Real-time communication app built with Socket.io for immediate messaging.",
    tech: ["React.js", "Socket.io"],
    metrics: ["real-time messaging"],
    github: "https://github.com/KushKK29/My-Chat-App",
    live: "https://my-chat-app-uhe2.onrender.com/"
  },
  {
    name: "Sorting-Visualizer",
    description: "Interactive visualizer for various sorting algorithms.",
    tech: ["React.js", "Vite"],
    metrics: ["algorithm visualization"],
    github: "https://github.com/KushKK29/Sorting-Visualiser",
    live: "https://sorting-visualiser-eosin.vercel.app/"
  },
  {
    name: "RBAC System",
    description: "Role-based access control system distributing roles via an admin panel.",
    tech: ["React.js", "Node.js"],
    metrics: ["admin role permissions"],
    github: "https://github.com/KushKK29/Rbac-Website",
    live: "https://rbac-website.vercel.app/"
  },
  {
    name: "AI Image Generator",
    description: "Generates images from prompts using a machine learning model.",
    tech: ["React.js", "Machine Learning"],
    metrics: ["image generation"],
    github: "https://github.com/KushKK29/react-peoject-2/tree/main/vite-project",
    live: "https://kushkk29.github.io/AI-Image-Generator/"
  },
  {
    name: "E-commerce Website",
    description: "Foundational React.js e-commerce shopping platform.",
    tech: ["React.js"],
    metrics: ["frontend shopping cart"],
    github: "https://github.com/KushKK29/E-Commerce_Website",
    live: "https://kushkk29.github.io/E-Commerce_Website/"
  }
];

const projectDetails = projects.map(p => 
  `**${p.name}** → ${p.description} Tech: ${p.tech.join(", ")}. Impact: ${p.metrics.join(", ")}. [Live](${p.live}) | [GitHub](${p.github})`
).join("\n\n");

export function tokenize(text) {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

// Simple Levenshtein distance for fuzzy matching (Typo Tolerance)
function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function searchPortfolio(query, limit = 3) {
  const queryTokens = tokenize(query);
  const scored = portfolioSections.map((section) => {
    const haystack = `${section.title} ${section.summary} ${section.keywords.join(" ")} ${section.id === "projects" ? projectDetails : ""}`.toLowerCase();
    const haystackTokens = tokenize(haystack);
    
    let score = 0;

    for (const token of queryTokens) {
      if (token.length <= 2) continue; // Skip very short words like "is", "a", "it"
      
      // Exact Match
      if (haystack.includes(token)) {
        score += token.length > 4 ? 2 : 1;
        if (section.title.toLowerCase().includes(token)) score += 3;
        continue;
      }
      
      // Fuzzy Match (Typo Tolerance)
      for (const hToken of haystackTokens) {
        if (Math.abs(hToken.length - token.length) > 2) continue;
        const distance = getEditDistance(token, hToken);
        if (distance === 1 && token.length > 4) {
          score += 1; // Slight boost for a highly similar word
          break; // Stop checking this query token against other haystack tokens
        }
      }
    }

    // Semantic/Intent-Based Dynamic Weighting
    const qLower = query.toLowerCase();
    if (section.id === "projects" && /trade|shala|mhope|chat|sorting|image|e-commerce|project|build|built|create|app|platform/.test(qLower)) {
      score += 8;
    }

    if (section.id === "experience" && /intern|work|company|job|humantic|geeksforgeeks|gfg/.test(qLower)) {
      score += 8;
    }

    if (section.id === "skills" && /tech|stack|language|framework|react|node|aws|c\+\+|python|leetcode|codechef|codolio|geeksforgeeks|gfg|problem solving|dsa/.test(qLower)) {
      score += 8;
    }

    if (section.id === "intro" && /who are you|about you|tell me about yourself|intro|profile/.test(qLower)) {
      score += 10;
    }

    if (section.id === "contact" && /contact|email|phone|reach|github|linkedin|social|hire/.test(qLower)) {
      score += 8;
    }

    return { ...section, score };
  });

  const results = scored
    .filter((section) => section.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const maxScore = results.length > 0 ? results[0].score : 0;
  let confidence = "high";
  if (maxScore === 0) confidence = "none";
  else if (maxScore <= 3) confidence = "low";

  return { results, confidence };
}

export function formatContext(sections) {
  return sections
    .map((section, index) => {
      const summary = section.id === "projects" 
        ? `${section.summary}\n\nSpecific Project Details:\n${projectDetails}`
        : section.summary;

      return [
        `--- Source ${index + 1}: ${section.title} ---`,
        `Section anchor: ${section.anchor}`,
        `Summary: ${summary}`,
      ].join("\n");
    })
    .join("\n\n");
}

export function sectionsToSources(sections) {
  return sections.map((section) => ({
    id: section.id,
    label: section.title,
    anchor: section.anchor,
  }));
}

export function detectMentionedSources(responseText) {
  const lower = responseText.toLowerCase();
  return portfolioSections
    .filter((section) => section.keywords.some((keyword) => lower.includes(keyword)))
    .map((section) => ({
      id: section.id,
      label: section.title,
      anchor: section.anchor,
    }));
}

export function filterSourcesByResponse(sources, responseText) {
  if (!responseText || !sources.length) return sources;
  const lower = responseText.toLowerCase();

  return sources.filter((source) => {
    const section = portfolioSections.find((item) => item.id === source.id);
    if (!section) return true;
    return section.keywords.some((keyword) => lower.includes(keyword));
  });
}

export function buildFallbackAnswer(query) {
  const lower = query.toLowerCase();

  if (/hello|hi|hey|hola|yo/.test(lower)) {
    return { text: "Hey, I’m Kush’s portfolio assistant. Ask me about projects, skills, education, experience, or how to reach him.", sources: [portfolioSections[0]] };
  }

  if (/trade|shala/.test(lower)) {
    return { text: "Trade-Shala is a paper-trading and stock-market simulation project with integrated ML sentiment analysis.", sources: [portfolioSections[1]] };
  }

  if (/mhope/.test(lower)) {
    return { text: "MHope is an AI-based healthcare platform with smart dashboards and diagnostic tools for users.", sources: [portfolioSections[1]] };
  }

  if (/chat app|my-chat-app|socket/.test(lower)) {
    return { text: "My-Chat-App is a React and Socket.IO chat application built for a real-time messaging experience.", sources: [portfolioSections[1]] };
  }

  if (/sorting/.test(lower)) {
    return { text: "Sorting-Visualizer shows how sorting algorithms work through interactive visualizations.", sources: [portfolioSections[1]] };
  }

  if (/rbac/.test(lower)) {
    return { text: "RBAC System is a role-based access control project focused on admin-led role distribution and permissions.", sources: [portfolioSections[1]] };
  }

  if (/image generator/.test(lower)) {
    return { text: "The AI Image Generator creates images from prompts using a machine learning workflow.", sources: [portfolioSections[1]] };
  }

  if (/e-commerce|ecommerce/.test(lower)) {
    return { text: "The E-commerce Website is one of my earlier React projects and shows the foundation of my frontend work.", sources: [portfolioSections[1]] };
  }

  if (/skill|stack|tech|technology|language|frontend|backend/.test(lower)) {
    return { text: "My core stack includes HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, Python, C, C++, DSA, and GitHub. I also use Tailwind, React Slick, EmailJS, and other frontend tools in this portfolio.", sources: [portfolioSections[2]] };
  }

  if (/experience|intern|job|work/.test(lower)) {
    return { text: "My experience includes Software Engineer Intern at Humantic AI, SDE Intern at GeeksforGeeks, Full Stack Web Developer at Slotin Solutions, and Question Analyst at Demlo AI.", sources: [portfolioSections[3]] };
  }

  if (/education|study|college|degree|school|iiit/.test(lower)) {
    return { text: "I’m pursuing B.Tech in ECE at IIIT Una. My education also includes 12th with 95.6% and 10th with 87% from RRK Sen. Sec. School, Chandausi.", sources: [portfolioSections[4]] };
  }

  if (/contact|email|phone|reach|connect|linkedin|github|leetcode|codechef/.test(lower)) {
    return { text: "The fastest way to reach me is by email at kushgoel279@gmail.com. You can also connect through GitHub, LinkedIn, LeetCode, and CodeChef from the About section.", sources: [portfolioSections[5]] };
  }

  return {
    text: "I can help with Kush’s projects, skills, education, experience, and contact details. Try asking: 'What projects have you built?' or 'How can I contact you?'.",
    sources: [portfolioSections[0], portfolioSections[1], portfolioSections[5]],
  };
}

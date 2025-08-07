const helmet = require('helmet');

// Génère une config CSP personnalisée selon l'environnement ou domaine.

function getHelmetForHost(hostname) {
  const baseDirectives = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-hashes'", "https://www.google.com", "https://www.gstatic.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://aucoeurdeslilas.com", "https://www.google.com", "https://www.gstatic.com", "https://staging.aucoeurdeslilas.com"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
    frameSrc: ["https://www.google.com", "https://www.gstatic.com"],
  };

  return helmet({
    contentSecurityPolicy: {
      directives: baseDirectives
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Politique de référence stricte
    frameguard: { action: 'deny' }, // Empêche l'encadrement du site dans un iframe
    xssFilter: true, // Active le filtre XSS
    scriptSrcAttr: ["'unsafe-hashes'"]
  });
}

module.exports = getHelmetForHost;

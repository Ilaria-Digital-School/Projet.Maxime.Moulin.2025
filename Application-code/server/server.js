require('dotenv').config();
const helmet = require('helmet');
const getHelmetForHost = require('./utils/helmetConfig'); // Import de la config CSP personnalisée
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter global (les routes publiques sont limitées dans les routes dédiées)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 200,
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use(limiter);

// Middlewares

// CORS pour autoriser les requêtes depuis n'importe quelle origine
const allowedOrigins = [
    'http://localhost:4200', // Angular en développement
    'http://localhost:3000', // Serveur Node.js en développement
    'https://staging.aucoeurdeslilas.com', // Staging
    'https://www.aucoeurdeslilas.com', // Production
    'https://aucoeurdeslilas.com', // Production sans www
]

app.use(cors(
    {
        origin: function (origin, callback) {
            // Si l'origine est dans la liste des autorisées, on l'autorise
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                // Sinon, on bloque l'accès
                callback(new Error('CORS non autorisé pour cette origine'));
            }
        },
        credentials: false, // Pas de cookies ou d'authentification
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
        allowedHeaders: ['Content-Type', 'Authorization'] // En-têtes autorisés
    }
));

// Middleware pour parser les données JSON et les formulaires
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Middleware Helmet pour la sécurité
app.use(helmet()); 
app.use((req, res, next) => {
    const hostname = req.hostname || '';
    const helmetConfig = getHelmetForHost(hostname);
    helmetConfig(req, res, next);
});

// Import des routes d'administration
const authRoute = require('./routes/auth');
const reviewsRoute = require('./routes/admin/reviews');
const massagesRoute = require('./routes/admin/massages');
const programsRoute = require('./routes/admin/programs');

app.use('/api', authRoute); // Route d'authentification
app.use('/api/content', reviewsRoute); // Route des avis
app.use('/api/content', massagesRoute); // Route des massages
app.use('/api/content', programsRoute); // Route des programmes

// Routes publiques
const contactRoute = require('./routes/public/contactRoute');
const giftCardRoute = require('./routes/public/giftCardRoute');
const massagesRoutePublic = require('./routes/public/massages');
const reviewsRoutePublic = require('./routes/public/reviews');
const programsRoutePublic = require('./routes/public/programs');

app.use('/api', contactRoute); // Route du formulaure de contact
app.use('/api', giftCardRoute); // Route du formulaire de la carte cadeau
app.use('/api/public', massagesRoutePublic); // Route des massages
app.use('/api/public', reviewsRoutePublic); // Route des avis clients
app.use('/api/public', programsRoutePublic); // Route des programmes

// // Route vers Angular
app.use(express.static(path.join(__dirname, '../client/dist/browser')));

// // Route pour toutes les autres requêtes (Angular)
app.all('/{*any}', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/dist/browser/index.html'), (err) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du fichier index.html:', err);
            res.status(500).send('Erreur interne du serveur');
        }
    });
});

module.exports = app; // Export de l'application Express pour les tests

// NE RIEN METTRE EN DESSOUS DE LA ROUTE POUR TOUTES LES REQUETES

// Ecoute du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
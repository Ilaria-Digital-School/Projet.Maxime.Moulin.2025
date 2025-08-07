/* Pour un meilleur fonctionnement dans les routes, j'ai créé un fichier db.js pour configurer 
la base de données puis je l'exporte comme module */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la base de données pour l'administration et la gestion de contenu
const content_db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
});

// Configuration de la base de données pour la lecture publique
const public_db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_PUBLIC_USER,
    password: process.env.DB_PUBLIC_PASSWORD
});

module.exports = {content_db, public_db};
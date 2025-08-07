const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./admin/db').content_db; // Connexion à la base de données
const { body, validationResult } = require('express-validator');
const verifyToken = require('../middlewares/authToken');
require('dotenv').config();

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5, // max 5 requêtes par IP
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
});

router.post(
    '/login', // Route pour la connexion des utilisateurs
    limiter, // Limiteur de taux pour éviter les attaques par force brute    
    [ 
        body('email')
            .trim()
            .notEmpty().withMessage('Email requis')
            .isEmail().withMessage('Email invalide'),
        body('password')
            .notEmpty().withMessage('Mot de passe requis')
            .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
            .matches(/[a-z]/i).withMessage('Le mot de passe doit contenir au moins une lettre')
            .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
            .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    ], // Middleware de validation des données d'entrée
    async (req, res) => {

        try {
            // Validation des données d'entrée
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Extraction des données du corps de la requête
            const { email, password } = req.body;
            const upperEmail = email.toUpperCase(); // Normalisation de l'email

            // Vérification de l'existence de l'utilisateur
            const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND role = "1"', [upperEmail]);
            const user = rows[0];
            if (!user) {
                return res.status(401).json({message: 'Email inconnnu'});
            }

            // Comparaison du mot de passe avec le hash
            const isValid = await bcrypt.compare(password, user.password_hash);
            if (!isValid) {
                return res.status(401).json({message: 'Mot de passe incorrect'});
            }

            // Génération du token JWT
            const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '2h'});
            res.json({token});

        } catch (err) {
            return res.status(500).json({message: 'Erreur lors de la connexion', error: err.message});        
        }
    }
);

router.post(
    '/login/refresh',
    verifyToken,
    async (req, res) => {

        const oldUser = req.user;
        const newToken = jwt.sign({ email: oldUser.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        try {
            res.json({ token: newToken });
        }  catch (err) {
            console.log(err);
            return res.status(500).json({message: 'Erreur lors de la génération du token', error: err.message});
        }
    }
);

module.exports = router;
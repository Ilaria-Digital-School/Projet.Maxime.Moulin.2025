const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/authToken');
const { body, validationResult } = require('express-validator');
const db = require('../admin/db').content_db; // Connexion à la base de données

const textRegex = /^[a-zA-ZÀ-ÿ0-9œ&\s.,;:!?'’"()-/\r\n\t]+$/;

// Lire la liste des avis (Base de données)
router.get('/reviews', verifyToken, async (req, res) => {

    try {
        // Requête pour récupérer les avis actifs avec les informations des massages
        const getRequest = 'SELECT * FROM reviews LEFT JOIN massages ON reviews.massageID = massages.massageID WHERE reviews.isActive = "true"';

        // Exécution de la requête
        const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({error: 'Aucun avis trouvé'});
        }

        // Envoi des résultats
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la récupération des avis'});
    }
});

// Lire un avis par son ID (Base de données)
router.get('/reviews/:id', verifyToken, async (req, res) => {
    const reviewID = req.params.id;

    try {
    const getRequest = 'SELECT * FROM reviews WHERE reviewID = ?';
    const [results] = await db.query(getRequest, reviewID);
        if (results.length === 0) {
            return res.status(404).json({error: 'Avis non trouvé'});
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la récupération de l\'avis'});
    }
});

// Modifier un avis par son ID (Base de données)
router.put(
    '/reviews/:id',
    verifyToken,
    [
        body('massageID')
            .notEmpty().withMessage('L\'ID du massage est requis')
            .isInt().withMessage('L\'ID du massage doit être un entier'),
        body('reviewText')
            .notEmpty().withMessage('Le texte de l\'avis est requis')
            .isLength({ min: 10, max: 1000 }).withMessage('Le texte de l\'avis doit contenir entre 10 et 1000 caractères')
            .matches(textRegex).withMessage('Le texte de l\'avis ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('reviewAuthor')
            .notEmpty().withMessage('L\'auteur de l\'avis est requis')
            .isLength({ min: 2, max: 20 }).withMessage('L\'auteur de l\'avis doit contenir entre 2 et 20 caractères')
            .matches(textRegex).withMessage('L\'auteur de l\'avis ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets')
    ], 
    async (req, res) => {
        // Validation des données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        // Extraction des données du corps de la requête
        const reviewID = req.params.id;
        const { massageID, reviewText, reviewAuthor } = req.body;

        try {
        const updateRequest = 'UPDATE reviews SET massageID = ?, reviewText = ?, reviewAuthor = ?, creationDate = CURRENT_TIMESTAMP WHERE reviewID = ? ';
        const [results] = await db.query(updateRequest, [massageID, reviewText, reviewAuthor, reviewID]);
            if (results.affectedRows === 0) {
                return res.status(404).json({error: 'Avis non trouvé'});
            }
            res.json({message: 'Avis mis à jour avec succès'});
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'Erreur lors de la mise à jour de l\'avis'});
        }
});

// Ajouter un nouvel avis (Base de données)
router.post(
    '/reviews',
    verifyToken,
    [
        body('massageID')
            .notEmpty().withMessage('L\'ID du massage est requis')
            .isInt().withMessage('L\'ID du massage doit être un entier'),
        body('reviewText')
            .notEmpty().withMessage('Le texte de l\'avis est requis')
            .isLength({ min: 10, max: 1000 }).withMessage('Le texte de l\'avis doit contenir entre 10 et 1000 caractères')
            .matches(textRegex).withMessage('Le texte de l\'avis ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('reviewAuthor')
            .notEmpty().withMessage('L\'auteur de l\'avis est requis')
            .isLength({ min: 2, max: 20 }).withMessage('L\'auteur de l\'avis doit contenir entre 2 et 20 caractères')
            .matches(textRegex).withMessage('L\'auteur de l\'avis ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets')
    ],
    async (req, res) => {
        // Validation des données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        // Extraction des données du corps de la requête
        const { massageID, reviewText, reviewAuthor } = req.body;

        try {
        const insertRequest = 'INSERT INTO reviews (massageID, reviewText, reviewAuthor, creationDate) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
        const [results] = await db.query(insertRequest, [massageID, reviewText, reviewAuthor]);
            res.status(201).json({message: 'Avis ajouté avec succès', reviewID: results.insertId});
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'Erreur lors de l\'ajout de l\'avis'});
        }
});

// Désactiver un avis par son ID (Base de données)
router.delete('/reviews/:id', verifyToken, async (req, res) => {
    const reviewID = req.params.id;

    try {
    const disableRequest = 'UPDATE reviews SET isActive = "false" WHERE reviewID = ?';
    const [results] = await db.query(disableRequest, reviewID);
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Avis non trouvé'});
        }
        res.json({message: 'Avis désactivé avec succès'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la désactivation de l\'avis'});
    }
});

module.exports = router;
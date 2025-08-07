const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../../middlewares/authToken');
const { body, validationResult } = require('express-validator');
const db = require('../admin/db').content_db; // Connexion à la base de données

const textRegex = /^[a-zA-ZÀ-ÿ0-9œ&\s.,;:!?'’"()-/\r\n\t]+$/;

// Configuration de multer pour le téléchargement d'images
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../client/dist/browser/images/pageMassages'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Lire la liste des massages et soins (Base de données)
router.get('/massages', verifyToken, async (req, res) => {
    try {
    const getRequest = 'SELECT * FROM massages WHERE isActive = "true" ORDER BY massageID';
    const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({error: 'Aucun massage trouvé'});
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la récupération de la liste des massages'});
    }
});

// Lire un avis par son ID (Base de données)
router.get('/massages/:id', verifyToken, async (req, res) => {
    const massageID = req.params.id;

    try {
    const getRequest = 'SELECT * FROM massages WHERE massageID = ?';
    const [results] = await db.query(getRequest, massageID);
        if (results.length === 0) {
            return res.status(404).json({error: 'Massage non trouvé'});
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la récupération du massage'});
    }
});

// Modifier un massage ou soin par son ID (Base de données)
router.put(
    '/massages/:id',
    verifyToken,    
    upload.single('image'),
    [
        body('category')
            .notEmpty().withMessage('La catégorie est requise')
            .isIn(['massage', 'soin']).withMessage('Catégorie invalide'),
        body('massageName')
            .notEmpty().withMessage('Le nom du massage est requis')
            .isLength({ min: 5, max: 50 }).withMessage('Le nom du massage doit contenir entre 5 et 50 caractères')
            .matches(textRegex).withMessage('Le nom du massage ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('tags')
            .notEmpty().withMessage('Les tags sont requis')
            .isLength({ min: 2, max: 100 }).withMessage('Les tags doivent contenir entre 2 et 100 caractères')
            .matches(textRegex).withMessage('Les tags ne doivent contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('target') 
            .optional()           
            .isLength({ max: 30 }).withMessage('La cible doit contenir au maximum 30 caractères')
            .matches(textRegex).withMessage('La cible ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('description')
            .notEmpty().withMessage('La description est requise')
            .isLength({ min: 10, max: 1000 }).withMessage('La description doit contenir entre 10 et 1000 caractères')
            .matches(textRegex).withMessage('La description ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('content')
            .notEmpty().withMessage('Le contenu est requis')
            .isLength({ min: 10, max: 3000 }).withMessage('Le contenu doit contenir entre 10 et 3000 caractères')
            .matches(textRegex).withMessage('Le contenu ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
    ],
    
    async (req, res) => {
        // Validation des données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Erreur de validation des données' });
        }
        
        // Extraction des données du corps de la requête        
        const massageID = req.params.id;
        const { category, massageName, tags, target, description, content, imageUrl } = req.body;

        try {
        const updateRequest = 'UPDATE massages SET category = ?, massageName = ?, tags = ?, target = ?, description = ?, content = ?, imageUrl = ? WHERE massageID = ?';
        const [results] = await db.query(updateRequest, [category, massageName, tags, target, description, content, imageUrl, massageID]);
            if (results.affectedRows === 0) {
                return res.status(404).json({error: 'Massage non trouvé'});
            }
            res.json({message: 'Massage mis à jour avec succès'});
        } catch (err) {
            return res.status(500).json({message: 'Erreur lors de la mise à jour du massage', error: err.message});
        }
    }
);

// Ajouter un massage ou soin (Base de données)
router.post(
    '/massages',
    verifyToken,
    upload.single('image'),
    [
        body('category')
            .notEmpty().withMessage('La catégorie est requise')
            .isIn(['massage', 'soin']).withMessage('Catégorie invalide'),
        body('massageName')
            .notEmpty().withMessage('Le nom du massage est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le nom du massage doit contenir entre 2 et 50 caractères')
            .matches(textRegex).withMessage('Le nom du massage ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('tags')
            .notEmpty().withMessage('Les tags sont requis')
            .isLength({ min: 2, max: 100 }).withMessage('Les tags doivent contenir entre 2 et 100 caractères')
            .matches(textRegex).withMessage('Les tags ne doivent contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('target')
            .isLength({ min: 0, max: 100 }).withMessage('La cible doit contenir entre 2 et 100 caractères')
            .matches(textRegex).withMessage('La cible ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('description')
            .notEmpty().withMessage('La description est requise')
            .isLength({ min: 10, max: 500 }).withMessage('La description doit contenir entre 10 et 500 caractères')
            .matches(textRegex).withMessage('La description ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('content')
            .notEmpty().withMessage('Le contenu est requis')
            .isLength({ min: 10, max: 1000 }).withMessage('Le contenu doit contenir entre 10 et 1000 caractères')
            .matches(textRegex).withMessage('Le contenu ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
    ],
    async (req, res) => {
        // Validation des données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Extraction des données du corps de la requête
        const { category, massageName, tags, target, description, content, imageUrl } = req.body;

        try {
        const insertRequest = 'INSERT INTO massages (category, massageName, tags, target, description, content, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [results] = await db.query(insertRequest, [category, massageName, tags, target, description, content, imageUrl]);
            res.status(201).json({message: 'Massage ajouté avec succès', massageID: results.insertId});
        } catch (err) {
            return res.status(500).json({message: 'Erreur lors de l\'ajout du massage', error: err.message});
        }
});

// Désactiver un massage ou soin par son ID (Base de données)
router.delete('/massages/:id', verifyToken, async (req, res) => {
    const massageID = req.params.id;

    try {
    const disableRequest = 'UPDATE massages SET isActive = "false" WHERE massageID = ?';
    const [results] = await db.query(disableRequest, massageID);
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Massage non trouvé'});
        }
        res.json({message: 'Massage désactivé avec succès'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la désactivation du massage'});
    }
});

module.exports = router;
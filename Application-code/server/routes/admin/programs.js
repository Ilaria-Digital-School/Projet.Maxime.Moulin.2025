const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/authToken');
const { body, validationResult } = require('express-validator');
const e = require('express');
const db = require('../admin/db').content_db; // Connexion à la base de données

const textRegex = /^[a-zA-ZÀ-ÿ0-9œ&\s.,;:!?'’"()-/\r\n\t]+$/;

// Lire la liste des programmes (Base de données)
router.get('/programs', verifyToken, async (req, res) => {

    try {
        const getRequest = 'SELECT pm.programID, pm.massageID, pm.altMassage, pm.massageOrder, pm.quantity, p.programName, m.massageName, p.newPrice FROM programs_massage pm LEFT JOIN massages m ON pm.massageID = m.massageID LEFT JOIN programs p ON pm.programID = p.programID  WHERE p.isActive = "true" ORDER BY programID';
        const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({error: 'Aucun programme trouvé'});
        }

        res.json(results);

        } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'Erreur lors de la récupération des programmes'});
        }
});

// Lire un programme par son ID (Base de données)
router.get('/programs/:id', verifyToken, async (req, res) => {
    const programID = req.params.id;
    try {
        const getRequest = 'SELECT pm.programID, pm.massageID, pm.altMassage, pm.massageOrder, pm.quantity, p.programName, m.massageName, p.newPrice FROM programs_massage pm LEFT JOIN massages m ON pm.massageID = m.massageID LEFT JOIN programs p ON pm.programID = p.programID WHERE p.isActive = "true" AND pm.programID = ?';
        const [results] = await db.query(getRequest, programID);
        if (results.length === 0) {
            return res.status(404).json({error: 'Programme non trouvé'});
        }
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la récupération du programme'});
    }
});

// Ajouter un nouveau programme (Base de données)
router.post(
    '/programs',
    verifyToken,
    [
        body('programName')
            .notEmpty().withMessage('Le nom du programme est requis.')
            .isLength({ min: 3, max: 30 }).withMessage('Le nom du programme doit contenir entre 3 et 30 caractères.')
            .matches(textRegex).withMessage('Le nom du programme ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux.'),

        body('newPrice')
            .optional()
            .isFloat({ min: 0, max: 2000 }).withMessage('Le prix doit être un nombre entre 0 et 2000 euros.'),

        body('massages')
            .isArray().withMessage('Les massages doivent être un tableau')
            .notEmpty().withMessage('Le tableau de massages ne peut pas être vide'),

        // Validation de chaque élément du tableau
        body('massages.*.massageID')
            .notEmpty().withMessage('L\'ID du massage est requis')
            .custom((value) => {
                if (value === 'init') {
                    throw new Error('Une option doit être sélectionnée dans la liste');
                }
                return true;
            }),

        body('massages.*.altMassage')
            .optional()
            .isLength({ min: 3, max: 1000 }).withMessage('Le nom alternatif du massage doit contenir entre 3 et 1000 caractères')
            .matches(textRegex).withMessage('Le nom alternatif du massage ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),

        body('massages.*.quantity')
            .isInt({ min: 1, max: 10 }).withMessage('La quantité doit être un nombre entier entre 1 et 10'),
        
        // Validation conditionnelle : si massageID = "perso", altMassage est requis
        body('massages')
            .custom((massages) => {
                for (const massage of massages) {
                    if (massage.massageID === "perso" && (!massage.altMassage || massage.altMassage.trim() === '')) {
                        throw new Error(`Massage ${i + 1}: Un nom alternatif est requis pour un massage personnalisé`);
                    }
                }
                return true;
            }),

        // Validation pour éviter les doublons dans le tableau de massages
        body('massages')
            .custom((massages) => {
                const massageIds = massages.map(m => m.massageID).filter(id => id !== 'perso');
                const duplicates = massageIds.filter((id, index) => massageIds.indexOf(id) !== index);
                if (duplicates.length > 0) {
                    throw new Error(`Massages en double détectés: ${duplicates.join(', ')}`);
                }
                return true;
        })
    ],
    
    async (req, res) => {

        // Vérification des erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({errors: errors.array()});
        }

        // Récupération des données du programme
        const { programName, newPrice, massages } = req.body;

        // Vérification des données reçues
        if (!programName || !Array.isArray(massages) || massages.length === 0) {
            return res.status(400).json({error: 'Données du programme invalides'});
        }

        // Connexion à la base de données
        const conn = await db.getConnection();

        try {

            await conn.beginTransaction();

            // Insertion du programme
            const insertProgramRequest = 'INSERT INTO programs (programName, newPrice, isActive) VALUES (?, ?, "true")';
            const [programResult] = await conn.query(insertProgramRequest, [programName, newPrice]);
            const programID = programResult.insertId;

            // Insertion des massages associés au programme
            for (let i = 0; i < massages.length; i++) {
                const { massageID, altMassage, quantity } = massages[i];
                const insertMassageRequest = 'INSERT INTO programs_massage (programID, massageID, altMassage, massageOrder, quantity) VALUES (?, ?, ?, ?, ?)';
                // Si massageID vaut "perso", on insère null et altMassage, sinon on insère massageID et altMassage
                if (massageID === "perso") {
                    await conn.query(insertMassageRequest, [programID, null, altMassage, i + 1, quantity]);
                } else {
                    await conn.query(insertMassageRequest, [programID, massageID, null, i + 1, quantity]);
                }
            }

            await conn.commit();
            res.status(201).json({message: 'Programme ajouté avec succès', programID});
        } catch (error) {
            await conn.rollback();
            console.error(error);
            res.status(500).json({error: 'Erreur lors de l\'ajout du programme'});
        } finally {
            conn.release();
        }
    }
);

// Mettre à jour un programme par son ID (Base de données)
router.put(
    '/programs/:id',
    verifyToken,
    [
        body('programName')
            .notEmpty().withMessage('Le nom du programme est requis.')
            .isLength({ min: 3, max: 30 }).withMessage('Le nom du programme doit contenir entre 3 et 30 caractères.')
            .matches(textRegex).withMessage('Le nom du programme ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux.'),

        body('newPrice')
            .optional()
            .isFloat({ min: 0, max: 2000 }).withMessage('Le prix doit être un nombre entre 0 et 2000 euros.'),

        body('massages')
            .isArray().withMessage('Les massages doivent être un tableau')
            .notEmpty().withMessage('Le tableau de massages ne peut pas être vide'),

        // Validation de chaque élément du tableau
        body('massages.*.massageID')
            .notEmpty().withMessage('L\'ID du massage est requis')
            .custom((value) => {
                if (value === 'init') {
                    throw new Error('Une option doit être sélectionnée dans la liste');
                }
                return true;
            }),

        body('massages.*.altMassage')
            .optional()
            .isLength({ min: 3, max: 1000 }).withMessage('Le nom alternatif du massage doit contenir entre 3 et 1000 caractères')
            .matches(textRegex).withMessage('Le nom alternatif du massage ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),

        body('massages.*.quantity')
            .isInt({ min: 1, max: 10 }).withMessage('La quantité doit être un nombre entier entre 1 et 10'),
        
        // Validation conditionnelle : si massageID = "perso", altMassage est requis
        body('massages')
            .custom((massages) => {
                for (const massage of massages) {
                    if (massage.massageID === "perso" && (!massage.altMassage || massage.altMassage.trim() === '')) {
                        throw new Error(`Massage ${i + 1}: Un nom alternatif est requis pour un massage personnalisé`);
                    }
                }
                return true;
            }),

        // Validation pour éviter les doublons dans le tableau de massages
        body('massages')
            .custom((massages) => {
                const massageIds = massages.map(m => m.massageID).filter(id => id !== 'perso');
                const duplicates = massageIds.filter((id, index) => massageIds.indexOf(id) !== index);
                if (duplicates.length > 0) {
                    throw new Error(`Massages en double détectés: ${duplicates.join(', ')}`);
                }
                return true;
        })
    ],
    async (req, res) => {

        // Vérification des erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({errors: errors.array()});
        }

        // Récupération des données du programme
        const programID = req.params.id;
        const { programName, newPrice, massages } = req.body;

        // Vérification des données reçues
        if (!programName || !Array.isArray(massages) || massages.length === 0) {
            return res.status(400).json({error: 'Données du programme invalides'});
        }

        // Connexion à la base de données
        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            // Mise à jour du programme
            const updateProgramRequest = 'UPDATE programs SET programName = ?, newPrice = ? WHERE programID = ?';
            const [updateResult] = await conn.query(updateProgramRequest, [programName, newPrice, programID]);
            if (updateResult.affectedRows === 0) {
                return res.status(404).json({error: 'Programme non trouvé'});
            }

            // Suppression des massages existants pour ce programme
            const deleteMassagesRequest = 'DELETE FROM programs_massage WHERE programID = ?';
            await conn.query(deleteMassagesRequest, [programID]);

            // Insertion des nouveaux massages associés au programme
            for (let i = 0; i < massages.length; i++) {
                const { massageID, altMassage, quantity } = massages[i];
                const insertMassageRequest = 'INSERT INTO programs_massage (programID, massageID, altMassage, massageOrder, quantity) VALUES (?, ?, ?, ?, ?)';
                // Si massageID vaut "perso", on insère null et altMassage, sinon on insère massageID et altMassage
                if (massageID === "perso") {
                    await conn.query(insertMassageRequest, [programID, null, altMassage, i + 1, quantity]);
                } else {
                    await conn.query(insertMassageRequest, [programID, massageID, null, i + 1, quantity]);
                }
            }

            await conn.commit();
            res.json({message: 'Programme mis à jour avec succès'});
        } catch (error) {
            await conn.rollback();
            res.status(500).json({error: 'Erreur lors de la mise à jour du programme'});
        } finally {
            conn.release();
        }
    }
);

// Désactiver un programme par son ID (Base de données)
router.delete('/programs/:id', verifyToken, async (req, res) => {
    const programID = req.params.id;

    try {
    const disableRequest = 'UPDATE programs SET isActive = "false" WHERE programID = ?';
    const [results] = await db.query(disableRequest, programID);
    if (results.affectedRows === 0) {
        return res.status(404).json({error: 'Programme non trouvé'});
    }

    res.json({message: 'Programme désactivé avec succès'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Erreur lors de la désactivation du programme'});
    }
});

module.exports = router;
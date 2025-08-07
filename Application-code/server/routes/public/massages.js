const express = require('express');
const router = express.Router();
const db = require('../admin/db').public_db; // Connexion à la base de données avec la configuration publique

// Lire la liste des massages (Base de données)
router.get('/massages', async (req, res) => {
    try {
        // Requête pour récupérer les massages actifs
        const getRequest = 'SELECT * FROM massages WHERE isActive = "true" ORDER BY massageID';

        // Exécution de la requête
        const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucun massage trouvé' });
        }

        // Envoi des résultats
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des massages' });
    }
});

// Désactivation des méthodes non autorisées
router.post('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.put('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.delete('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));

module.exports = router;
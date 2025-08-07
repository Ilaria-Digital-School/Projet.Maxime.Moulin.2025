const express = require('express');
const router = express.Router();
const db = require('../admin/db').public_db; // Connexion à la base de données avec la configuration publique

// Lire la liste des avis (Base de données)
router.get('/reviews', async (req, res) => {

    try {
        // Requête pour récupérer les avis actifs avec les informations des massages
        const getRequest = 'SELECT * FROM reviews LEFT JOIN massages ON reviews.massageID = massages.massageID WHERE reviews.isActive = "true" ORDER BY reviewID';

        // Exécution de la requête
        const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucun avis trouvé' });
        }

        // Envoi des résultats
        res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des avis' });
    }
});

// Désactivation des méthodes non autorisées
router.post('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.put('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.delete('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));

module.exports = router;
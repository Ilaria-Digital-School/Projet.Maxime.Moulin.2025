const express = require('express');
const router = express.Router();
const db = require('../admin/db').public_db; // Connexion à la base de données avec la configuration publique

// Lire la liste des programmes (Base de données)
router.get('/programs', async (req, res) => {

    try {
        const getRequest = 
            'SELECT pm.programID, pm.massageID, pm.altMassage, pm.massageOrder, pm.quantity, p.programName, m.massageName, p.newPrice FROM programs_massage pm LEFT JOIN massages m ON pm.massageID = m.massageID LEFT JOIN programs p ON pm.programID = p.programID WHERE p.isActive = "true" ORDER BY programID';

        // Exécution de la requête
        const [results] = await db.query(getRequest);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucun programme trouvé' });
        }
        
        // Envoi des résultats
        res.json(results);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des programmes' });
    }
});

// Désactivation des méthodes non autorisées
router.post('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.put('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));
router.delete('/{*any}', async (_, res) => res.status(405).send('Méthode non autorisée'));

module.exports = router;
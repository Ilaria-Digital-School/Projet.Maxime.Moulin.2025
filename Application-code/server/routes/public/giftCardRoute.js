const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const generateGiftCardPDF = require('../../utils/generateGiftCardPDF');
const { body, validationResult } = require('express-validator');

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5, // max 5 requêtes par IP
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
});

router.post(
    '/gift-card',
    limiter,
    [
        body('captcha')
            .notEmpty().withMessage('Token reCAPTCHA requis'),
        body('giftCardType')
            .notEmpty().withMessage('Le type de carte cadeau est requis')
            .isIn(['papier', 'numérique']).withMessage('Type de carte cadeau invalide'),
        body('duration')
            .notEmpty().withMessage('La durée de la carte cadeau est requise')
            .isIn(['1H', '1H30', '2H']).withMessage('Durée invalide'),
        body('toName')
            .notEmpty().withMessage('Le nom du destinataire est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le nom du destinataire doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le nom du destinataire ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('fromName')
            .notEmpty().withMessage('Le nom de l\'expéditeur est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le nom de l\'expéditeur doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le nom de l\'expéditeur ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('lastName')
            .notEmpty().withMessage('Le nom de famille est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le nom de famille doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le nom de famille ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('firstName')
            .notEmpty().withMessage('Le prénom est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le prénom ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('email')
            .notEmpty().withMessage('L\'email est requis')
            .isEmail().withMessage('Email invalide'),
        body('phone')
            .notEmpty().withMessage('Le téléphone est requis')
            .matches(/^[0-9]{10}$|^[ 0-9]{14}$/).withMessage('Téléphone invalide'), // Format français
        body('adress')
            .notEmpty().withMessage('L\'adresse est requise')
            .isLength({ min: 5, max: 100 }).withMessage('L\'adresse doit contenir entre 5 et 100 caractères')
            .matches(/^[a-zA-ZÀ-ÿ0-9.,;:!?'"()-\s]+$/).withMessage('L\'adresse ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux'),
        body('postalCode')
            .notEmpty().withMessage('Le code postal est requis')
            .matches(/^[0-9]{5}$/).withMessage('Code postal invalide'), // Format français
        body('city')
            .notEmpty().withMessage('La ville est requise')
            .isLength({ min: 2, max: 50 }).withMessage('La ville doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ0-9 '-]+$/).withMessage('La ville ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes ou des tirets')
    ], // Middleware de validation des données d'entrée
    async (req, res) => {

        // Validation des données d'entrée
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        // Extraction des données du corps de la requête
        const {
            captcha,
            giftCardType,
            duration,
            toName,
            fromName,
            lastName,
            firstName,
            email,
            phone,
            adress,
            postalCode,
            city,
        } = req.body;
        
        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {rejectUnauthorized: false}
        });

        // Génération du PDF de la carte cadeau
        const pdfBuffer = await generateGiftCardPDF({ duration, fromName, toName, lastName });

        // Options de l'email vers l'administrateur
        const adminGiftMailOptions = {
            from: {
                name: 'Au coeur des lilas',
                address: process.env.SMTP_FROM
            },
            to: process.env.RECIPIENT_EMAIL, // Adresse de destination
            subject: `Demande de carte cadeau - Format ${giftCardType}`,
            text: `Format : ${giftCardType}\nDurée : ${duration}\nPour: ${toName}\nDe la part de : ${fromName}\nNom : ${lastName}\nPrénom : ${firstName}\nEmail : ${email}\nTéléphone : ${phone}\nAdresse : ${adress}, ${postalCode} ${city}`,
            html: `<div style="text-align: center;"><img src="https://aucoeurdeslilas.com/images/Logo-mail.webp" alt="Logo" style="width:200px"></div><div><h3 style="text-align: center">Un.e client.e vous a envoyé une demande de carte cadeau</h3></div><div style="padding: 20px"><p><strong>Format de la carte cadeau :</strong> ${giftCardType}</p><p><strong>De la part de :</strong> ${fromName}</p><p><strong>Pour :</strong> ${toName}</p><p><strong>Nom - Prénom : </strong><span style="text-transform: uppercase">${lastName}</span>&nbsp;<span style="text-transform: capitalize">${firstName}</span></p><p><strong>Email : </strong><a href="mailto:${email}">${email}</a></p><p><strong>Téléphone : </strong><a href="tel:${phone}">${phone}</a></p><p><strong>Adresse :</strong>${adress}, ${postalCode} ${city}</div>`,
            attachments: [
                {
                    filename: `Carte-cadeau-${lastName}-${new Date().toISOString().split('T')[0]}.pdf`, // Nom du fichier
                    content: pdfBuffer, // Contenu du PDF
                    contentType: 'application/pdf', // Type MIME
                },
            ], 
        };

        // Options de l'email vers le client
        const clientGiftMailOptions = {
            from: {
                name: 'Au coeur des lilas',
                address: process.env.SMTP_FROM
            },
            to: email, // Adresse de destination
            subject: `Au coeur des lilas - Votre demande de carte cadeau en format ${giftCardType}`,       
            text: `Bonjour ${firstName} ${lastName},\n\nMerci pour votre message. Votre demande m'a correctement été transmise et je vous répondrai dans les plus brefs délais.\n\nCordialement,\nMarie Perrin - Au coeur des Lilas`,
            html: `<div style="text-align: center;"><img src="https://aucoeurdeslilas.com/images/Logo-mail.webp" alt="Logo" style="width:200px"></div><div><h3 style="text-align: center">Bonjour ${firstName} ${lastName},</h3></div><div style="padding: 20px"><p>Merci pour votre message. Je reprendrai contact avec vous dans les plus brefs délais pour finaliser votre demande de carte cadeau.</p><p>Cordialement,</p><p>Marie Perrin - Au coeur des Lilas</p></div>`,
        };

        // Envoi de la requête de vérification du captcha
        try {        
            const secretKey = process.env.RECAPTCHA_SECRET_KEY;
            const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;

            const response = await axios.post(verifyURL, null, {
                params: {
                    secret: secretKey,
                    response: captcha
                }
            });

            // Vérification de la réponse du captcha
            const { success, score, action } = response.data;
            if (!success || score < 0.5) {
                return res.status(400).json({ error: 'Échec de la vérification du reCAPTCHA' });
            }        

            // Envoi des emails à l'administrateur et au client
            await transporter.sendMail(adminGiftMailOptions);
            await transporter.sendMail(clientGiftMailOptions);
            return res.status(200).json({
                message: 'Demande de carte cadeau reçue avec succès !'
            });
        } catch (error) {
            console.error('Erreur lors du traitement de la demande de carte cadeau :', error);
            return res.status(500).json({
                error: 'Erreur lors du traitement de la demande de carte cadeau.'
            });
        }
    }
);

module.exports = router;
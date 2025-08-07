const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 5, // max 5 requêtes par IP
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
});

router.post(
    '/contact',
    limiter,
    [
        body('captcha')
            .notEmpty().withMessage('Token reCAPTCHA requis'),
        body('subject')
            .notEmpty().withMessage('Le sujet est requis'),
        body('lastname')
            .notEmpty().withMessage('Le nom est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le nom ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('firstname')
            .notEmpty().withMessage('Le prénom est requis')
            .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
            .matches(/^[a-zA-ZÀ-ÿ '-]+$/).withMessage('Le prénom ne doit contenir que des lettres, des espaces, des apostrophes ou des tirets'),
        body('email')
            .notEmpty().withMessage('L\'email est requis')
            .isEmail().withMessage('Email invalide'),
        body('phone')
            .notEmpty().withMessage('Le téléphone est requis')
            .matches(/^[0-9]{10}$|^[ 0-9]{14}$/).withMessage('Téléphone invalide'),
        body('message')
            .notEmpty().withMessage('Le message est requis')
            .isLength({ min: 10, max: 500 }).withMessage('Le message doit contenir entre 10 et 500 caractères')
            .matches(/^[a-zA-ZÀ-ÿ0-9.,;:!?'"()-\s]+$/).withMessage('Le message ne doit contenir que des lettres, des chiffres, des espaces et certains caractères spéciaux')
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
            subject,
            lastname,
            firstname,
            email,
            phone,
            message
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

        // Options de l'email vers l'administrateur
        const adminContactMailOptions = {
            from: {
                name: 'Au coeur des lilas',
                address: process.env.SMTP_FROM
            },
            to: process.env.RECIPIENT_EMAIL,
            subject: `Demande de contact - ${subject}`,
            text: `Nom : ${lastname}\nPrénom : ${firstname}\nEmail : ${email}\nTéléphone : ${phone}\nMessage : ${message}`,
            html: `<div style="text-align: center;"><img src="https://aucoeurdeslilas.com/images/Logo-mail.webp" alt="Logo" style="width:200px"></div><div><h3 style="text-align: center">Un.e client.e vous a envoyé une demande de contact depuis le site.</h3></div><div style="padding: 20px"><p><strong>Motif de la demande :</strong> ${subject}</p><p><strong>Nom - Prénom : </strong><span style="text-transform: uppercase">${lastname}</span>&nbsp;<span style="text-transform: capitalize">${firstname}</span></p><p><strong>Email : </strong><a href="mailto:${email}">${email}</a></p><p><strong>Téléphone : </strong><a href="tel:${phone}">${phone}</a></p><p><strong>Message :</strong><br>${message}</p></div>`,
        };

        // Options de l'email vers le client
        const clientContactMailOptions = {
            from: {
                name: 'Au coeur des lilas',
                address: process.env.SMTP_FROM
            },
            to: email,
            subject: `Votre demande de contact - ${subject}`,
            text: `Bonjour ${firstname} ${lastname},\n\nMerci pour votre message. Votre demande m'a correctement été transmise et je vous répondrai dans les plus brefs délais.\n\nCordialement,\nMarie Perrin - Au coeur des Lilas`,
            html: `<div style="text-align: center;"><img src="https://aucoeurdeslilas.com/images/Logo-mail.webp" alt="Logo" style="width:200px"></div><div><h3 style="text-align: center">Bonjour ${firstname} ${lastname},</h3></div><div style="padding: 20px"><p>Merci pour votre message. Votre demande m'a correctement été transmise et je vous répondrai dans les plus brefs délais.</p><p>Cordialement,</p><p>Marie Perrin - Au coeur des Lilas</p></div>`,
        };

        try {
            // Envoi de la requête de vérification du captcha
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
            await transporter.sendMail(adminContactMailOptions);
            await transporter.sendMail(clientContactMailOptions);
            return res.status(200).json({
                message: 'Emails envoyés avec succès !'
            });
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi des emails :', error);
            return res.status(500).json({
                error: 'Erreur lors de l\'envoi des emails.'
            });
        }
    }
);

module.exports = router;
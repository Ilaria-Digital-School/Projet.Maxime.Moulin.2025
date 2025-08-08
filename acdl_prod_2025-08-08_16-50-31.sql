/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: acdl_prod
-- ------------------------------------------------------
-- Server version	10.11.13-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `massages`
--

DROP TABLE IF EXISTS `massages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `massages` (
  `massageID` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `massageName` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `description` mediumtext NOT NULL,
  `content` mediumtext NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `isActive` enum('true','false') DEFAULT 'true',
  PRIMARY KEY (`massageID`),
  UNIQUE KEY `imageUrl` (`imageUrl`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `massages`
--

LOCK TABLES `massages` WRITE;
/*!40000 ALTER TABLE `massages` DISABLE KEYS */;
INSERT INTO `massages` VALUES
(1,'massage','Massage Californien','Relaxation & enveloppement','null','Le massage californien allie des manœuvres longues, fluides, englobantes et réconfortantes pour favoriser le lâcher-prise. Il s’effectue sur l\'ensemble du corps et amène vers une relaxation profonde qui permet de relâcher les tensions.','Les techniques incluent des pétrissages, du drainage, des pressions glissées aidant à soulager le stress et améliorer la circulation sanguine et lymphatique.\r\n\r\nParfaitement adapté pour un premier massage.\r\n\r\nTechnique complémentaire à combiner : pierres chaudes.','/images/pageMassages/massage-californien.png','true'),
(2,'massage','Massage Balinais','Drainage & détente musculaire',NULL,'Le massage balinais est un massage du corps entier : les manœuvres réalisées sont un mélange de différentes techniques de lissages, de vibrations, de percussions, de digito-pressions, d’enveloppements glissés et de pétrissages.','Les techniques d’acupressions et de lissages du visage et du cuir chevelu à la fin du massage amènent de l\'oxygénation aux racines, une détente profonde de l’ensemble du visage, et aident à soulager les maux de tête et rétablissent un sommeil réparateur.\r\nLes différents systèmes internes sont traités : système digestif, nerveux, lymphatique, musculaire et articulaire. Les techniques de drainage utilisées procurent d’agréables sensations de légèreté ainsi que l’évacuation directe des toxines.\r\nCe massage permet également de relancer la vitalité en éliminant la fatigue du corps.','/images/pageMassages/massage-balinais.png','true'),
(3,'massage','Massage Thaïlandais','Dynamique & musculaire',NULL,'Technique traditionnelle et ancestrale pratiquée et transmise de générations en générations, le massage Thaïlandais est réalisé sur le corps entier. C’est un massage dynamique et puissant.\r\nManoeuvres réalisées : pétrissages, drainages appuyés, foulages, percussions, acupressions, mobilisations, étirements...','Certaines manoeuvres peuvent être un peu douloureuses à recevoir mais amènent à un niveau de détente sans pareille !\r\nCe massage assure une élimination des tensions et des blocages sur tout le corps.\r\nLa puissance des gestes va mener vers une fatigue importante, un sommeil profond et réparateur, puis dès le lendemain une énergie nouvelle et ramener la vitalité. C’est un massage parfait pour se requinquer en profondeur.\r\nIl est vivement conseillé au printemps. Le protocole débute par des pressions appuyées et calées sur votre respiration, réalisées directement en étant sur la table : mollets, cuisses, dos et omoplates. Le protocole se déroule ensuite de la même manière qu’un massage classique, avec un travail sur le dos puis sur les jambes.\r\nAprès vous être retourné, je réalise à nouveau des pressions sur vos jambes en étant assise sur la table, puis après les avoir massé, je procède à des étirements. Je continue avec un massage du ventre, des bras, puis pour terminer de la nuque et du visage.\r\nBienfaits : Détente musculaire , Libère le haut du corps pour redonner de l’amplitude au système respiratoire, Active le transit intestinal, Elimine la fatigue profonde, Relance la vitalité, Redynamise le corps et l’esprit.','/images/pageMassages/massage-thaïlandais.png','true'),
(4,'massage','Massage Abhyanga','Energétique & apaisement',NULL,'L’Abhyanga est une pratique traditionnelle de massage thérapeutique originaire de l’Ayurvéda (Inde). C’est un massage complet du corps, utilisant des mouvements fluides, rythmés et répétitifs, en insistant sur les points de pression et des zones spécifiques du corps.\r\nTechniques utilisées : pétrissages, lissages, étirements doux, frictions, tapotements, percussions.','Egalement connu sous le nom de médecine ayurvédique, l’Ayurvéda est un système de santé et de bien-être qui trouve ses origines dans la culture ancienne de l’Inde. Ayurvéda signifie littéralement “science de la vie” en sanskrit. L’Ayurvéda cherche à équilibrer les éléments fondamentaux qui composent le corps humain, l’esprit et l’âme.\r\nSelon cette tradition, l’équilibre harmonieux de ces éléments est essentiel pour maintenir la santé et prévenir les maladies. Le traitement des maladies se concentre sur l’identification et la correction des déséquilibres spécifiques chez chaque personne. Cela peut impliquer des changements dans l’alimentation, l’utilisation de plantes médicinales, des techniques de respiration, des massages, des exercices physiques et d’autres pratiques holistiques.\r\nL’Ayurvéda considère également l’importance de l’équilibre entre l’individu et son environnement. Il met l’accent sur l’adoption de modes de vie sains, des habitudes de sommeil régulières, une alimentation nutritive et équilibrée, l’exercice physique, la méditation et le maintien de relations sociales positives.\r\nL’Ayurvéda promeut un état de bien-être global en équilibrant le corps, l’esprit et l’âme. Il est un système de santé holistique ancien : il cherche à aider chaque individu à atteindre un état optimal de santé physique, mentale et émotionnelle. Le massage Abhyanga est considéré comme l’un des piliers fondamentaux de l’Ayurvéda, en raison de ses nombreux bienfaits pour le corps et l’esprit. Pratiquées sur l’ensemble du corps, les techniques utilisées agissent sur les 7 centres énergétiques en mouvement, les chakras, pour retrouver bien-être physique et émotionnel.\r\n\r\nPrincipes des manoeuvres : rééquilibrage des énergies , nettoyage en profondeur , décharges et recharges énergétiques en partant du chakra sacré (sacrum sur la face arrière et bas ventre sur la face avant), travail globalisant.\r\n\r\nBienfaits Spirituels : harmonie retrouvée, accroissement de l’énergie des chakras, ouverture à la méditation\r\nBienfaits physiques : rééquilibrage, amélioration de la clarté mentale, stimulation de la circulation sanguine, renforcement du système immunitaire, détente des muscles, assouplissement des articulations, élimination des impuretés du corps, accroissement de l’énergie vitale, renforcement de la vitalité, amélioration de la qualité du sommeil, réduction du stress.\r\nBienfaits psychologiques : émotions plus positives, apaisement, relaxation, amélioration de l’harmonie intellectuelle et de la concentration, meilleure gestion du stress, de l’anxiété et des émotions.','/images/pageMassages/massage-abhyanga.png','true'),
(5,'massage','Massage Lomi-Lomi','Vitalité & stimulation',NULL,'Massage du corps entier, la philosophie du Lomi-Lomi provient de l’île d’Hawaï.\\nCe massage permet de relancer la vitalité, atténue les maux de dos, améliore la circulation du liquide lymphatique et sanguin, stimule le système respiratoire et le transit intestinal, amène détente musculaire et recharge le corps en énergie.','Lomi-Lomi est le mot Hawaïen pour « massage » signifiant « pousser, tirer, pétrir ». Selon les croyances polynésiennes, c’est une approche de la guérison qui apporte l’équilibre, la restauration et la paix du corps et de l’esprit.\r\nLe style gracieux du massage hawaïen inclut de longues rythmiques fluides sur le corps entier. Cela crée une danse, qui avec la respiration profonde, laisse le praticien dans un état méditatif clair et le massé dans un état de paix.\r\nLe Lomi-Lomi est exécuté dans la danse comme les mouvements de l’Art martial hawaïen de Lua, en utilisant les deux avant-bras et en glissant longuement le long du corps, avec fluidité et rythme continu. Le glissement combiné à la pression, aussi doux que profond, encouragent le corps et l’esprit au lâcher-prise.','/images/pageMassages/massage-lomi-lomi.png','true'),
(6,'massage','Massage Suédois / Deep Tissue','Détente musculaire & assouplissement des tissus',NULL,'Un massage du corps entier adapté à la récupération musculaire après l’effort, mais également conseillé dans le cadre de surmenage, stress intense, difficulté à se détendre...\r\nLes manœuvres principales utilisées sont des pressions glissées profondes, des gestes de drainage appuyés, des étirements, des pressions en poing, des pétrissages appuyés, des foulages avec les pouces, des frictions, des pressions en coude et des percussions.','Les objectifs de ce massage sont de soulager les douleurs musculaires, réduire les tensions, travailler les muscles en profondeur, calmer, stimuler et décongestionner.\r\nCôté psychique, il permet de régénérer le système nerveux, améliorer la qualité du sommeil, calmer l’anxiété et favoriser la capacité respiratoire des poumons.\r\nCôté physique, il permet de stimuler l’oxygénation des muscles, d’activer les échanges de fluides dans les chairs et les muscles pour optimiser leur fonctionnement, et d’améliorer la souplesse des tendons et des ligaments.','/images/pageMassages/massage-suédois.png','true'),
(7,'soin','Massage Shirotchampi','Apaisement & Réconfortant','Haut du corps (dos, crâne, visage)','Ses objectifs sont multiples : soulager les tensions dans le haut du corps, favoriser le lâcher-prise et le sommeil par des gestes doux et apaisants sur le crâne en ajoutant quelques gestes toniques pour stimuler la pousse des cheveux, réduire la chute des cheveux en les rendant plus brillants et vigoureux, réduire les migraines, lutter contre les insomnies, favoriser la concentration, apaiser l’esprit, calmer la cogitation excessive, favoriser la clarté de l’esprit et l’harmonie.','Massage provenant d’Inde, le terme « shiro » signifie « tête » et « champi » signifie « massage » dans le sanskrit ancien.\r\nC\'est une parfaite première approche du massage pour les personnes pudiques, stressées, indécises sur leurs attentes dans le massage qu’ils/elles recherchent. Il est parfaitement adapté pour les personnes dont la charge mentale est très forte, et cherchant une détente profonde.\r\nLes manœuvres utilisées sont glissées, des frictions, des pétrissages, des percussions procurant instantanément une sensation de bien-être. La partie allongée à la fin du massage achève d’amener la détente la plus totale.\r\nDifférent des autres massages dans sa pratique, on reçoit le Shirotchampi en étant, pour la première partie, assis sur une chaise et en restant habillé pour la partie basse du corps. Le buste quant à lui est enroulé dans une serviette. La deuxième partie du massage se pratique en étant couché sur la table.\r\nImportant à savoir : je verse de l’huile directement sur le crâne lors de certaines manœuvres. Vox cheveux seront alors très huilés. Bien que très bénéfique pour le cuir chevelu, l’huile donne un aspect gras. Ne prévoyez pas de rendez-vous juste après la séance.','/images/pageMassages/massage-shirotchampi.png','true'),
(8,'soin','Massage Foot Thaï','Rééquilibrage & autorégulation','Pieds et demi-jambes, réflexologie plantaire','Du talon aux orteils, différents points sont traités avec soin, en effectuant des pressions appuyées d’environ 5 secondes à l’aide d’un stylet en bois. (introduction à la reflexologie plantaire - environ 15 min).\r\nLe massage Thaï des pieds se pratique jusqu’aux genoux : une succession de pressions et de drainages sont effectués dans la maîtrise de l’art du massage thaï. Toutes les faces du pied et de la demi-jambe sont traitées, même sous et entre les orteils.','Le Foot massage (massage des pieds) est une pratique Thaïlandaise traditionnelle. Technique située au croisement du Shiatsu, du Tui Na, de la réflexologie plantaire et du yoga, c’est un massage clé en Thaïlande car il procure des bienfaits sur l’ensemble des fonctions internes.\r\nGrâce à son subtil mélange entre différentes méthodes (massage et réflexologie plantaire), cette dernière est accessible à tous type de profils. Elle offre une relaxation immédiate et durable à tous ceux qui en bénéficient. Le pied est considéré comme le “tableau de bord” du corps : chacune de ses zones réflexes correspond au point stratégique d’une partie de l’anatomie (organe, glande).\r\nPendant le “foot massage”, la jambe est enveloppée dans une serviette pour garder la sensation de chaleur qui apporte décontraction des muscles et profonde détente.\r\n\r\nBienfaits : Stimulation active des muscles, de la lymphe et des points d’énergie du corps, Soin antistress, bienfaisant pour l’ensemble de l’organisme, il aide à soulager les troubles de la circulation sanguine , les problèmes digestifs, les troubles du système nerveux, les gènes des articulations...\r\nPour terminer, je souhaite vous partager un proverbe asiatique très parlant : “lorsque l’on touche aux pieds, on touche à l’âme” : cela donne une indication quant aux bienfaits procurés par ce massage ainsi que l’harmonisation corps et esprit vers laquelle nous tendons.','/images/pageMassages/massage-foot-thai.png','true'),
(9,'soin','Massage Pré-Natal','Connexion & apaisement',NULL,'Le massage de la femme enceinte est un massage très doux avec pour but de relaxer la future maman et lui permettre de se réapproprier son corps.\r\nUne expérience réconfortante spécialement conçue pour accompagner la grossesse et dans le but de procurer un véritable moment de sérénité.','Lors de ce massage je vous invite à prendre du temps pour vous et vous aide à retrouver une harmonie corps et esprit.\r\nAttention, lors du dernier mois de grossesse (à partir du 8ème mois) le massage est déconseillé.\r\nIl est important de m’indiquer lors de chaque rendez-vous l’état dans lequel vous vous trouvez pour prendre les précautions nécessaires. Ce massage se réalise dans une position différente de celle habituelle.\r\nJe vous invite à vous positionner en PLS et mets à disposition un coussin d’allaitement pour trouver une position confortable. Par la suite, je vous inviterai à vous retourner et je placerai le coussin sous vos genoux pour plus de confort.\r\n\r\nBienfaits :\r\n- Soulager les tensions et les douleurs musculaires\r\n- Renforcer les muscles et les articulations\r\n- Favoriser le sommeil et la récupération\r\n- Diminuer les douleurs sciatiques\r\nSoulager les crampes des mollets et l’effet “jambes lourdes” en effectuant différentes manœuvres de drainage\r\n- Soulager les maux de tête\r\n- Diminuer les nausées\r\n- Combattre le stress et les angoisses\r\n- Réguler le système nerveux\r\n- Aider au maintien de la posture\r\n- Favoriser la connexion de la future maman et de son bébé\r\n- Assouplir la peau\r\n- Prévenir les vergetures\r\n- Favoriser la circulation','/images/pageMassages/massage-pre-natal.png','true'),
(10,'soin','Soin Shiatsu Bien-Etre','Rééquilibrage physique & émotionnel',NULL,'Issu de la Médecine Traditionnelle Chinoise, il s’effectue par pression des pouces, des paumes, des avant-bras et des coudes sur l’ensemble du corps. Son objectif est de faire un travail sur les zones réflexes situées sur tout le corps, le long des canaux d’énergie appelés les méridiens.\r\nPar les pressions exercées, des étirements et le déblocage des zones en excès d’énergie, ce soin apporte une détente profonde du corps et de l’esprit et améliore le bon fonctionnement de l’organisme.','Art traditionnel ancestral, ce soin provient tout droit de Chine. Soin énergétique profond, ses effets sont immédiats et se font ressentir encore plusieurs jours après le soin.\r\nLe but de chaque méridien est d’alimenter les organes en énergie afin d’assurer leur bon fonctionnement.\r\nSelon la théorie du Yin-Yang (harmonie), il y a 6 organes YIN et 6 organes YANG. Les organes YIN stockent l’énergie et les organes YANG évacuent l’énergie. Nous avons tous en nous un côté YIN et un côté YANG. Le symbole du yin-yang représente l’harmonie.\r\nLorsque nous déconnectons notre corps de notre esprit, nous créons une disharmonie et avons tendance à ne plus écouter nos besoins fondamentaux.\r\nLe YIN est associé au corps, à la nuit, au féminin, au froid, à la lune, à l’hiver, au Nord, à la terre, à l’eau, au noir, à l’intériorisation, à la créativité, à l’intuition. Le YANG est associé à l’esprit, au jour, au masculin, à la chaleur, au soleil, à l’été, au ciel, au feu, au sud, au blanc, à l’extériorisation, à l’action, à l’élan.\r\nCette technique permet de dénouer les nœuds et tensions provoqués par le stress, la fatigue ou les habitudes néfastes.\r\nLes bienfaits sont multiples : ré-harmonisation du corps et de l’esprit, diminution du stress et de la fatigue, détente profonde, regain de vitalité, libération d’émotions refoulées et meilleure gestion des émotions, aide à la prise de recul, aide au lâcher-prise.\r\n\r\nDéroulement d’une séance : On démarre sur la face antérieure (ventre) : bilan : 10 min + décontraction : 10 min (pressions exercées sur les zones réflexes des méridiens de chaque organe (partie ventrale) puis pose de pierres chaudes sur le ventre pour soulager. Acupressions sur le visage, pressions et étirements des bras, des mains puis des jambes.\r\nSur la face postérieure : pressions et étirements du dos et de la nuque puis, du fessier, des jambes et des pieds.\r\n\r\nGlobalement, c’est un soin très relaxant, si l’on accepte de lâcher-prise. Seule la partie ventrale peut être légèrement douloureuse car l’on vient stimuler les zones réflexes des organes qui contiennent une problématique, liée à une émotion. Pratiqué avec régularité, on peut chasser un grand nombre de maux.','/images/pageMassages/soin-shiatsu.png','true'),
(11,'soin','Soin Tui Na','Stimulation & régulation','Ventre','Technique ancestrale utilisée en médecine traditionnelle chinoise, le Tuina permet une incroyable détox sur tout le corps.\r\nLe Tui Na est issu des verbes \"Tui\" : pousser et \"Na\" : saisir, vise à décongestionner, tonifier et éliminer les toxines.','Lorsqu’il est correctement réalisé, avec la bonne pression, et une bonne respiration, il permet de chasser grande quantité de maux intérieurs. Dans la Médecine Traditionnelle Chinoise, on part du principe que les maux proviennent d’un déséquilibre intérieur du Yin (associé à la matière) et du Yang (associé au mouvement).\r\n\r\nSi le flux de notre énergie vitale est soumis à des blocages et déséquilibres dus au mode de vie que nous menons (alimentation, stress, trauma...) alors les troubles s’installent. Le Tui Na agit sur différentes parties du corps : il élimine les blocages et stimule les capacités d’auto-guérison de l’organisme.\r\n\r\nIl favorise la circulation sanguine et lymphatique et contribue à diminuer la douleur. Ce massage possède un effet drainant, il aide à une bonne élimination des toxines et à tonifier les tissus.\r\nLes manoeuvres utilisées sont calées sur votre respiration: on démarre par des points d’acu-pression en rotation circulaire sur les zones reflexes du corps liées aux organes pour réactiver le transit intestinal, souvent bloqué (poignet, sternum, genou, zone de l’orteil...). On continue avec des manoeuvres de drainages, lissages, vagues, vibrations, percussions, balancement des hanches, pressions... (toujours réalisées dans le sens de la digestion).\r\n\r\nFaire des séances de Tui Na régulièrement permettra d’atteindre des objectifs quant à la réduction des maux rencontrés quotidiennement : ballonnements, constipation, douleurs gastriques et abdominales, douleurs liées aux règles, à l’endométriose.\r\n\r\nDe plus, il est bien évidemment important d’adopter une hygiène de vie adaptée : alimentation anti-inflammatoire, sommeil régénérateur, mobilité du corps, pensées positives...','/images/pageMassages/soin-tuina.png','true'),
(12,'soin','Soin Kobido','Régulation & énergisant','Visage','Technique de massage facial japonaise, le terme Kobido signifie littéralement « voie ancienne de la beauté ».\r\nVéritable soin, le Kobido vise à combattre le vieillissement du visage en diminuant les effets du stress sur les rides d’expressions et en luttant contre le relâchement cutané. La peau est stimulée grâce à des mouvements de pétrissage et des pressions sur différents points d’acupuncture.','Anciennement, cette technique était réservée à l’aristocratie japonaise. Elle a été transmise de génération en génération pour ensuite devenir un art traditionnel de rajeunissement.\r\nLes points d’acupuncture sont reliés aux organes et c’est en les stimulant que la magie opère.\r\nCette technique de massage utilise des manœuvres de digitopuncture, de drainage lymphatique et de stimulation musculaire pour favoriser la circulation des liquides, détendre les muscles du visage et améliorer l’état de la peau.\r\nL’ensemble de la circulation énergétique du visage, du cou et du buste est stimulé. Avec une pratique régulière, le Kobido permet de prolonger ou de retrouver la jeunesse du visage en assouplissant et en tonifiant les muscles, en purifiant la peau et en lui rendant son éclat.\r\nAnti-rides ancestral, le Kobido est aujourd’hui une des techniques naturelles les plus efficaces ! Ce soin est complet : en plus d’avoir une efficacité sur la peau, celui-ci va également apporter détente et relaxation. Une fois les muscles libérés de toute forme de tension ou de crispation, la peau retrouve un aspect plus jeune et plus lumineux. Suite à une séance, le visage s’en trouve nettoyé, hydraté, détendu et énergisé.\r\n\r\nDéroulement de la séance : Pétrissage des muscles de chaque moitié du visage, puis torsades (tonification des muscles). Tapotements pour l’éveil de la microcirculation pour une meilleure oxygénation de l’épiderme. Au total, 50 manœuvres différentes dont des tapotements, pincements, frottements, pétrissages, effleurages, palper rouler, étirements...\r\n\r\nLe décollement des adhérences des fascias apporte plus de souplesse. Les cellules sont stimulées, ceci permettant de réactiver la synthèse des fibres de collagène et d’élastine. L’oxygénation des tissus est instantanée, laissant le teint lumineux. Bien que tonique, la régularité des gestes assure une profonde sensation de relaxation.\r\n\r\nPour des résultats visibles, il est préconisé de réaliser des séances de Kobido sous forme de cure : des séances rapprochées au début à raison de 2 par semaine puis une tous les 15 jours et ensuite 1 par mois en entretien.','/images/pageMassages/soin-kobido.png','true');
/*!40000 ALTER TABLE `massages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `programID` int(11) NOT NULL AUTO_INCREMENT,
  `programName` varchar(255) NOT NULL,
  `newPrice` int(11) DEFAULT NULL,
  `isActive` enum('true','false') DEFAULT 'true',
  PRIMARY KEY (`programID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES
(1,'Détox / Spécial Endométriose',NULL,'true'),
(2,'Sportif',NULL,'true'),
(3,'Cocooning',NULL,'true'),
(4,'Femme Enceinte',500,'true');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs_massage`
--

DROP TABLE IF EXISTS `programs_massage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs_massage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `programID` int(11) NOT NULL,
  `massageID` int(11) DEFAULT NULL,
  `altMassage` varchar(255) DEFAULT NULL,
  `massageOrder` int(11) DEFAULT 1,
  `quantity` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `massageID` (`massageID`),
  KEY `programID` (`programID`),
  CONSTRAINT `programs_massage_ibfk_1` FOREIGN KEY (`massageID`) REFERENCES `massages` (`massageID`),
  CONSTRAINT `programs_massage_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `programs` (`programID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs_massage`
--

LOCK TABLES `programs_massage` WRITE;
/*!40000 ALTER TABLE `programs_massage` DISABLE KEYS */;
INSERT INTO `programs_massage` VALUES
(1,1,NULL,'Combinaison d\'un massage au choix et de Tui Na',1,6),
(2,3,1,NULL,1,1),
(3,3,4,NULL,2,1),
(4,3,7,NULL,3,1),
(5,3,5,NULL,4,1),
(6,3,2,NULL,5,1),
(7,3,12,NULL,6,1),
(9,2,10,NULL,1,1),
(10,2,2,NULL,2,1),
(11,2,3,NULL,3,2),
(12,2,6,NULL,4,2),
(13,4,NULL,'Massage spécial \"Femme Enceinte\"',1,10);
/*!40000 ALTER TABLE `programs_massage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT,
  `massageID` int(11) NOT NULL,
  `reviewText` mediumtext NOT NULL,
  `reviewAuthor` varchar(25) NOT NULL,
  `creationDate` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isActive` enum('true','false') DEFAULT 'true',
  PRIMARY KEY (`reviewID`),
  KEY `massageID` (`massageID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`massageID`) REFERENCES `massages` (`massageID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES
(1,4,'Marie propose un véritable service sur mesure, elle est à l\'écoute et apporte conseils et propositions. Passionnée, très professionnelle, elle maîtrise parfaitement son sujet et elle se met en 4 pour que l\'on vive l\'expérience la plus agréable possible.\nEncore merci Marie pour ce moment de détente et à la prochaine fois.','Amélie D.','2025-07-16 19:23:29','true'),
(2,6,'Marie est une excellente masseuse, j’ai passé un moment hors du temps. Surtout après un bon running, Marie a su adapter le massage selon mon ressenti.\n\nFoncez ! Vous ne serez pas déçu de ce moment magique.','Anne K.','2025-07-16 19:34:36','true'),
(3,12,'Merci à Marie pour son accueil et son professionnalisme. Marie sait s\'adapter aux besoins de chacun et vous guider afin de définir le massage dont vous avez besoin. Pour ma part, j\'ai testé le Kobido, un massage crânien + visage dynamisant. On en ressort revigoré et l\'huile utilisée est très agréable.','Noëlle','2025-07-16 15:28:06','false'),
(4,12,'Quel bonheur d’avoir été massée par Marie ! J’en suis ressortie profondément apaisée. Son massage a apporté un véritable réconfort à mon corps et à mon esprit. Le Kobido, quant à lui, a révélé toute sa magie : dès le lendemain, mon visage était plus lumineux. Marie a cette présence bienveillante et cette délicatesse qui mettent immédiatement à l’aise. Je recommande son savoir-faire les yeux fermés et attends déjà avec impatience notre prochain rendez-vous.','Emma D.','2025-07-16 15:28:10','false'),
(5,2,'Un moment de détente exceptionnel avec une personne souriante, à l’écoute et véritablement passionnée par son métier. Le massage balinais offrait un équilibre parfait entre douceur et tonicité, procurant une sensation de bien-être profond. Idéal pour évacuer les douleurs musculaires et retrouver une pleine sérénité. Je recommande vivement.','Chloé E.','2025-07-16 15:28:12','false'),
(6,7,'Ce n’est pas la première fois que Marie me masse et ce ne sera pas la dernière non plus ! Elle est très professionnelle et s’adapte réellement à mes besoins. \nAyant reçu un bon cadeau pour Noël, Marie m’a proposé de combiner deux massages en un, et le résultat a été incroyable. \nTout d’abord, le massage Shirotchampi en position assise, avec un travail sur le dos, le crâne et la tête pour soulager les tensions du haut du corps, suivi d’un massage balinais pour le reste du corps, qui m’a permis une relaxation profonde.\nAimant les massages appuyés, Marie a su adapter ses gestes pour correspondre à mes préférences. Je n’avais plus envie que le massage s’arrête, tant la bulle dans laquelle j’ai été plongée était agréable !','Emilie I.','2025-07-16 19:34:52','true'),
(7,2,'Incroyable moment de douceur ! \nMarie a des mains de fée ,elle est très professionnelle, transmet sa passion et ses connaissances pour une véritable invitation au voyage de la détente ! \nElle utilise des produits sains et adaptés, analyse nos besoins afin de nous assurer un massage complet et correspondant à nos attentes physiques et psychologiques. \nTrès rapidement mise à l’aise et relaxée j’ai pu totalement savourer cet instant (je me suis presque endormie) \nJe la recommande évidement les yeux fermés !!\nJ’ai hâte d’y retourner afin de pouvoir essayer tous les autres soins qu’elle propose.','Marion D','2025-07-16 20:10:05','true'),
(8,12,'J\'ai fais un soin du visage Kobido  et balinais du corps par Marie  : un pur bonheur. 2h de détente, suivis d\'une tisane tellement ressourçante et drainante. Moi qui ai de gros problèmes de circulation, je fais appel à Marie une fois par mois maintenant pour drainer mon corps et mon visage. Le rendu est immédiat, une peau éclatante et des jambes légères ! Je la conseille fortement, une confiance totale.','Leslie D','2025-07-16 20:14:12','true');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `role` enum('1','2') DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_hash` (`password_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'ADMIN@AUCOEURDESLILAS.COM','$2a$10$d4uQHYmC60uZU2C8Y9utR.GxboFAwdIRF93E.UnkhoVIAKy3WWo/O','2025-06-16 11:34:13','1'),
(2,'ADMIN.DEV@AUCOEURDESLILAS.COM','$2a$10$MiHfkkkcBIj0tf0hj/mLoeYPspIiAqGShpOSgCFec0MWDWQ66dje6','2025-06-20 09:16:17','1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'acdl_prod'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-08 14:50:48

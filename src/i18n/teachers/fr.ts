// src/i18n/teachers/fr.ts
//
// French (fr) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// La page « Pour les enseignants ».
//
// **Address: formal "vous", and only here.** The glossary fixes "tu" for the
// whole site and flags it for review; its argument is about a 14-year-old
// player reading "Stuck? Press the lightbulb". This page has no teenage
// reader — it is written for the adult deciding whether to use the site in
// class — so "vous" is the register, and the departure is confined to this
// namespace. Flagged for a native reviewer.
//
// Terms: enseignant (glossary), électron célibataire and doublet non liant
// (the formal terms, correct for explaining prose rather than the game word
// *solitaire*), astuce and never *indice* for a hint. The year band is
// **3e/2de**, never *lycée*, which names ages 16–19.

import type { TeachersCopy } from './en';

export const fr = {
  heading: 'Pour les enseignants',
  intro:
    'Ce qu’est ChemGames, ce qu’on y trouve et comment vous pouvez contribuer à le façonner. Toutes les autres pages sont écrites pour les élèves qui jouent ; celle-ci est écrite pour vous.',

  betaHeading: 'Le site est en bêta',
  betaBody:
    'ChemGames est encore en construction. Les jeux changent, d’autres arrivent, et la formulation d’une astuce ou d’une antisèche peut être différente le mois prochain. Tout fonctionne et tout est gratuit – mais faites vous-même une partie avant de proposer un jeu à une classe.',

  whatHeading: 'De quoi il s’agit',
  whatBody1:
    'Un ensemble de mini-jeux de chimie gratuits qui tournent dans un navigateur. Rien à installer et aucun compte à créer : un élève ouvre un jeu et commence.',
  whatBody2:
    'Ils visent la 3e et la 2de, soit 14 à 16 ans. Chaque jeu travaille une seule compétence, en parties courtes, et une réponse fausse explique ce qui n’allait pas et quoi essayer ensuite, au lieu de se contenter de la sanctionner.',
  whatBody3:
    'Le compte est facultatif. Il enregistre les scores et la progression et affiche un alias dans les classements ; les jeux eux-mêmes ne changent en rien.',

  onSiteHeading: 'Ce qu’il y a sur le site',
  gamesIntro: 'Cinq jeux sont terminés. Chacun travaille une seule chose :',
  gameAcid: 'Classer un composé en acide, base ou neutre à partir de sa seule formule.',
  gameBlaster:
    'Lire des formules à vive allure et distinguer celles qui se ressemblent presque.',
  gameNeutralise:
    'Choisir H⁺ ou OH⁻ pour neutraliser ce qui fonce sur le laboratoire.',
  gameBalancer:
    'Équilibrer une équation coefficient par coefficient, avec le nombre d’atomes de chaque côté sous les yeux.',
  gameLewis:
    'Apparier les électrons célibataires en liaisons et en doublets non liants pour construire une structure de Lewis.',
  sheetsIntro:
    'Douze antisèches rassemblent les références sur lesquelles les jeux s’appuient. Chacune tient sur une page, lisible au vidéoprojecteur et imprimable :',

  languagesHeading: 'Langues',
  languagesBody1:
    'Le site existe en six langues : anglais, allemand, français, espagnol, italien et russe. Le sélecteur est dans la barre de navigation, et le choix est mémorisé sur ce navigateur.',
  languagesBody2:
    'Tout ce que lit un élève est traduit – l’interface, l’accompagnement et les astuces dans les jeux, et les antisèches. Les formules chimiques, les symboles d’éléments et les équations ne sont jamais traduits : une équation s’écrit de la même façon dans toutes les langues.',
  languagesBody3:
    'Deux choses ne changent pas avec la langue : les liens externes des antisèches renvoient tous vers des sites en anglais, et chaque antisèche cite le Victorian Curriculum, un programme australien. À savoir si vous enseignez selon un autre programme.',

  privacyHeading: 'Vie privée des élèves',
  privacyBody1:
    'Il n’y a sur ce site aucune mesure d’audience, aucune publicité et aucun traceur tiers. Ce qu’un élève y fait n’est mesuré pour personne d’autre.',
  privacyBody2:
    'Jouer ne demande aucun compte. Qui joue sans compte ne laisse rien derrière soi, hormis les préférences de son et de thème que son propre navigateur conserve pour lui.',
  privacyBody3:
    'Un élève qui se connecte fournit une adresse e-mail et reçoit un alias généré – jamais un vrai nom –, et à partir de là le site conserve ses scores, les niveaux atteints, les champs de profil facultatifs qu’il choisit de remplir et ses réglages de visibilité. Ce qui, dans tout cela, est public, et comment supprimer un compte et tout ce qu’il contient, est expliqué sur la page {link}.',
  privacyLinkLabel: 'Confidentialité',

  accessibilityHeading: 'Accessibilité',
  accessibilityBody1:
    'L’objectif est le niveau AA des WCAG 2.2. C’est un objectif et non une garantie : le site n’a pas été audité, et certaines parties n’atteignent pas encore ce niveau.',
  accessibilityBody2:
    'Ce qui tient aujourd’hui : la couleur n’est jamais le seul porteur de sens, les boutons réduits à une icône ont un nom textuel pour les lecteurs d’écran, les pages se réagencent sur un écran de téléphone et à 200 % de zoom sans défilement horizontal, le focus est visible partout, et la plupart des animations s’arrêtent d’elles-mêmes quand le système demande moins de mouvement.',
  accessibilityBody3:
    'Ce qui ne tient pas, et qu’il vaut mieux savoir avant de préparer un cours : {blaster} exige la souris ou le doigt, car ses bulles en mouvement sont totalement hors d’atteinte au clavier. Les comptes à rebours de {blaster} et de {neutralise} ne peuvent pas encore être ralentis ni désactivés. Les changements de score, d’astuce ou de message d’erreur ne sont pas annoncés aux lecteurs d’écran. L’usage du clavier dans les trois jeux d’arcade n’a pas été vérifié jeu par jeu : considérez-le comme non vérifié plutôt que comme pris en charge.',
  accessibilityBody4:
    '{balancer} et {lewis} sont les deux jeux conçus d’emblée pour le clavier et testés ainsi. Si un élève de votre classe travaille au clavier, commencez par là.',

  collaborateHeading: 'Enseignants collaborateurs',
  collaborateWhat:
    'Je cherche quelques enseignants pour aider à façonner ce projet. Cela veut dire l’une de ces deux choses, ou les deux : me raconter comment un jeu s’est réellement passé avec une classe – ce qui a embrouillé les élèves, quelle formulation est tombée à côté, ce qui était trop facile – et proposer des jeux qui manquent et qui vaudraient la peine.',
  collaborateCommitment:
    'Il n’y a ni engagement minimum ni calendrier. Un message par trimestre est utile. Un seul message, une seule fois, est utile aussi.',
  collaborateThanks:
    'En remerciement, les collaborateurs reçoivent un accès gratuit à la version 1.0 et à la version 2.0 des jeux, dès que ces versions existeront.',
  collaborateFreeNow:
    'Pour que la valeur de cette offre soit claire : aujourd’hui tout est gratuit sur le site, et le restera pendant toute la bêta. L’offre porte sur les versions payantes qui viendront après, pas sur quoi que ce soit que vous payeriez aujourd’hui.',
  collaborateHow:
    'Pour vous manifester, utilisez le bouton d’avis en bas à droite de n’importe quelle page, choisissez la catégorie « {category} » et dites que vous enseignez et que vous aimeriez aider. C’est toute la démarche – il n’y a pas de second formulaire, et rien n’est collecté au-delà de ce que ce bouton collecte déjà.',
  collaborateReply:
    'Je lis tout et je réponds, mais il s’agit d’une seule personne qui fait cela à côté d’un métier : comptez quelques semaines plutôt que quelques jours, et ne lisez pas le silence comme un refus.',
  collaborateRecords:
    'Une réserve pratique, dite maintenant plutôt que découverte plus tard : les avis arrivent dans une boîte de réception, pas dans une liste de collaborateurs. Je vous répondrai en demandant une adresse à conserver, car sans un endroit durable où la garder, la promesse des versions 1.0 et 2.0 ne serait pas tenable.',

  feedbackHeading: 'Signaler une erreur',
  feedbackBody1:
    'Le bouton d’avis se trouve en bas à droite de chaque page et fonctionne sans compte. Il propose trois catégories : un problème, une erreur de chimie ou de données, ou une idée.',
  feedbackBody2:
    'Il envoie la page où vous étiez en même temps que votre message ; vous n’avez donc pas à décrire l’endroit. Ce sont les erreurs de chimie que je veux le plus connaître : une valence fausse devant une classe est la pire chose que ce site puisse faire.',

  supportHeading: 'Soutenir ce projet',
  supportBody:
    'J’espère que les jeux vous ont été utiles et qu’un peu de chimie est resté en chemin. Beaucoup de soin passe dans ce projet et aucun financement : pas de subvention, pas d’institution, pas de publicité. Si vous voulez aider à le garder gratuit et sans publicité, vous pouvez contribuer du montant qui vous convient sur {link}. C’est le projet d’une seule personne et non une association reconnue : rien n’est déductible des impôts et rien n’est attendu – les jeux resteront gratuits dans tous les cas.',
  supportLinkLabel: 'la page de soutien',
} satisfies TeachersCopy;

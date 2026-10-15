# Journal de bord 

Journal de bord compilé au fur et à mesure de la production du portfolio.

## PRÉPRODUCTION

### GITHUB :
- *29/08/2026* : Initialisation du GitHub 
- *29/08/2026* : Planification du site web; rédaction du document de planification
- Commits

### DESIGN (FIGMA) :
- *29/08/2026* : Création du moodboard et recherche de projets
- *02/09/2026* : Création d'idées avec l'aide de l'IA  de Figma
- *02/09/2026* : Design du site Desktop avec les résultats des idées générées
- *09/09/2026* : Design du site Mobile en utilisant les assets du site Desktop
- *11/09/2026* : Design du overlay des projets quand on ouvre un porjet en particulier

### DIFFICULTÉS :
- Trouver une DA cohérente. Je voulais faire plusieurs styles en même temps, et trouver LE choix artistique était très difficile. 

### NOUVEAUX APPRENTISSAGES :
- J'ai appris comment utiliser l'IA de Figma, et comment exporter les résultats dans un projet.

### UTILISATION D'IA : 

Prompts utilisés lors de la création du design Figma :
1. "Salut! J'aimerais que tu me crée une page index d'un site inspirée par le moodboard que je t'ai fourni. Si tu peux, tu dois te fier aux détails et au texte inscrit dans le moodboard. Le style esthétiques est du Acid design, avec des formes géométriques 3D simples en grilles. Ma palette de couleur est aussi présente, donc te fier à elle le plus possible."
2. "Serais-tu capable d'ajouter cette image à un endroit dans la page d'accueil avec un style bitmap monochrome? Le monochrome peut être une couleur de ma palette."
3. "J'aime beaucoup ce que tu me propose, Est-ce que l'image que tu viens d'ajouter peut être un background? J'aimerais que mes cartes de travaux soient placées à moitié par dessus l'image, à moitié par dessus le background noir."
4. "J'aime beaucoup ce que tu me propose! Par contre, je trouve que l'image est un peu trop coupée. Est-ce possible de monter un peu plus de la voiture? Tu n'as pas besoin de changer quoi que ce soit d'autre par rapport à la position.
Aussi, le texte de "projets sélectionnés - TRAVAUX" est en noir. J'aimerais qu'il soit blanc, on n'arrive pas à le lire.
De plus, j'aimerais que les formes géométriques des cartes des travaux aient des animations de plus que juste une augmentation de l'opacité au survol."
5. "Super! J'aime beaucoup le résultat. 
Par contre, j'ai remarqué que la bannière infinie ne fonctionne pas correctement. Le texte apparaît en plein milieu instantanément, mais j'aimerais que le texte glisse de droite à gauche de l'écran. Peux-tu fixer ce problème?
Aussi, j'aimerais que mes boutons "voir le travail" et "contact" en dessous de mon titre aient une animation simple au survol."
6. "Est-ce possible de changer le header? J'aimerais que mes 3 sections "work", "info" et "contact" soient placées à droite du header. 
Est-ce que ça serait possible d'ajouter 3 nouvelles cartes en bas des anciennes? Je veux voir à quoi ça ressemblerait si j'ajoute plus de projets."

### PROCHAINE ÉTAPE :
- Programmation du site (production).

## PRODUCTION Bloc 2 : intégration et données

### ACCOMPLISSEMENTS :
- Création du site. 
- Ajout du header et de ses animations.
- Ajout du hero (texte, image, boutons, overlay, layout).
- Ajout d'une bannière infinie.
- Ajout de la section projets (tirée directement du API Airtable).
- Ajout des détails de la section projets (image de background, titre, details).
- Ajout de la section à propos (titre, texte, vidéo, table avec forces et logiciels, details).
- Ajout de la section contact (image de background, titre, liens externes).
- Ajout d'animations.

### DIFFICULTÉS : 
- Faire fonctionner la bannière infinie était plus dûr que je le pensais.

### NOUVEAUX APPRENTISSAGES : 
- Utilisation du API Airtable et le connecter à un projet.
- Utilisation de l'IA pour faire mes placeholders.

### UTILISATION D'IA :
- J'ai utilisé l'IA pour faire ma structure de site et mes placeholders. Je voulais tester à quel point l'IA était efficace dans sa manière d'écrire du code. 

### PROCHAINE ÉTAPE : 
- Ajout d'animations.

## POST-PRODUCTION 

### ACCOMPLISSEMENTS :
- PROBLEM FIXING :
- Fix : retravail de la taille de mes textes en format mobile (non-responsive à responsive)
- Fix : ajustements de détails en mode mobile (liste des projets en colonne, ajustements des tags dans les cartes et dans la section about, ajustement de la section contact - responsive)
- Fix : retravail des contrastes (passages de couleurs sombres à claires)
- Fix : Enlèvement des placeholders et remplacement par des textes complets
- Fix : réorganisation des fichers et dossiers
- Fix : retravail du bouton modal (enlèvement du focus on exit)

### DIFFICULTÉS :
- Gestion de temps : plusieurs problèmes m'ont pris plus de temps à régler que je ne le croyait.

### NOUVEAUX APPRENTISSAGES :
- Conversion au format webp : je ne savais pas que la conversion était aussi facile et utile.

### UTILISATION D'IA : 
---
Date : *27/09/2026*

Prompt : \
"Inside my infinite scrolling banner section, I want an infinite side-scrolling banner that goes from left to right and repeats infinitely. I want this banner to have my primary background color, and my text should be my third text color. There should be 8 placeholders for text later, divided by the same ✦ symbol. "

Réponse : \
"Implemented the infinite banner in index.html and styled it in styles.css.\
It now:
- Scrolls infinitely from left to right\
- Uses the primary background and third text color\
- Includes 8 placeholder items separated by ✦\
- Pauses for users who prefer reduced motion\
- Diagnostics report no errors."

---

Date : *29/09/2026*

Prompt : \
 "Let's create my project section. First, for my background, I want my projects_banner_img to be the first background element, at the top of my projects section, with a small gradient at the bottom of it to create a smooth fade to black to the bottom of my project section. Next, I want the projects section to be tall, so it will accomodate for my projects being dynamically put there."

Réponse : \
"
The section is currently only a wrapper around the dynamic list, so the banner belongs on .projects itself rather than in the project-item markup. I’m checking the existing responsive rules and image dimensions now; the key validation will be that the section’s computed height still grows with inserted content while the banner remains pinned to the top.

The focused stylesheet check passes with no errors. I’m doing one browser-level check next to confirm the rendered section shows the banner at the top and that the section is not accidentally constrained by the new background layer.
"

---

Date : *30/09/2026*

Prompt : "I would like to modify my project cards. I want everything in the project item content on the left instead of the right. I also want a background image in the back of the project card, cut off by a gradient going from transparent to black, so the user can see the title and the small text inside the card."

Réponse : \
"
Updated the project cards:
- Content is now aligned to the left.
- Added background images with a transparent-to-black gradient overlay.
- Added support for Airtable image fields with a local fallback image.
- Kept titles and descriptions readable above the overlay.
- Changed files: script.js, styles.css\
Validation passed with no JavaScript or CSS errors.
"

---

Date : *01/10/2026*

Prompt : \
"Can you move the contact eyebrow on the left? I only want the contact eyebrow to move. Not the rest of the text in contact."

Réponse : \
"Contact eyebrow moved to the top-left\
I updated the contact layout in styles.css:838-876 so the section is left-aligned instead of centered. The root cause was the .contact and .contact-main rules using centered flex alignment.

If you want, I can also move the contact links slightly further down or tighten the spacing to match the rest of the layout more closely."

---

Date : *05/10/2026*

Prompt : \
"Hello! I want to work on the popup modal for the project section. I want the modal to be bigger. "

Réponse : \
"The project modal is now larger on desktop:

- Width increased from 48rem to 64rem
- Maximum height increased from 80vh to 85vh
- Mobile sizing remains responsive
- Updated styles.css. No stylesheet errors found."

---

Date : *12/10/2026*

Prompt : \
"I want to work on my hero in mobile form. My hero-copy-line--eyebrow is a bit too high. On mobile, we cannot read it. Can you lower it? Or shrink the whitespace between the hero eyebrow and the hero title"

Réponse : \
"Lowered the mobile/tablet eyebrow spacing from 4rem to 1rem in styles.css. This keeps the eyebrow closer to the title and brings it lower within the vertically centered hero.

Validation: no stylesheet errors found."

---

Date : *13/10/2026*

Prompt : \
"I want to work on my modal popups. I want my modal body to have a scroll bar just like my modal media. I want both to be inside the modal, so the user can scroll through the text or the media gallery. Do not change anything in the structure, just add a scroll bar for the modal body."

Réponse : \
"Added an independent vertical scrollbar to .project-modal-body, matching the existing modal media behavior without changing the HTML structure.

Updated styles.css:732. Validation passed with no CSS errors."

---

Date : *14/10/2026*

Prompt : \
"Hello. I wanr ro work on my mobile form of the website. I see there are some small errors I want you to fix. 

First, the hero-copy-line--name element Is poking out when in mobile form. Could you shrink it down so it fits inside the hero without leaving it? The pasted image 1 attached shows how it looks like right now.

Second, the same thing happens in the footer. The pasted image 2 is how it looks like right now. Could you shrink the text down so it fits inside the mobile form? 

I want both elements to be responsive. Only touch those elements, I want the rest of the website to be as is"

Réponse : \
"Updated only styles.css:

- Made .hero-copy-line--name responsive down to very narrow mobile widths.
- Made .contact-title fit within the mobile viewport.
- Preserved desktop styling.

Validated at 390px and 320px viewport widths. Both elements now fit without horizontal overflow, and CSS reports no errors."

### AVEC UNE SEMAINE DE PLUS, QU'EST-CE QUE JE CHANGERAIS?
- J'ajouterais des animations idle sur mon site. En ce moment, il n'y a que des animations au hover et au scroll. 
- J'ajouterais plus de projets dans ma page projets. Je n'ai pas eu assez de temps pour insérer plus que 4 projets.
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/tzO_JqWG)

- URL site WEB : https://sae-303-andrea-mestre-nicolas-thai.netlify.app/
- URL Notebook Observable :https://observablehq.com/d/fccb74fe2865f952
- URL Réutilisation Data.gouv : https://www.data.gouv.fr/reuses/comparaison-des-offres-culturelles-mis-en-place-par-bordeaux-et-montpellier/
- Nom : THAI
- Prénom : Nicolas
- Nom binome : MESTRE
- Prénom binome : Andréa

## Explication des fonctionnalités et des intéractions

### Global dans le site

- Responsive : Le site est adapté aux formats mobiles, tablettes et desktop
- Mise en place de lazy loading pour les performances
- Mise en place d'animations au scroll avec CSS
- Personnalisation d'un curseur de souris circulaire

### Les Graphiques

- **Graphique à barres interactif (Bar Chart)** : Basculement physique/numérique via radio buttons avec mise à jour dynamique du graphique et du sous-titre, et tooltips informatifs pour afficher les valeurs exactes ([index.astro](src/pages/index.astro#L245-L255))

- **Double système de cartes side-by-side (4 Cartes au total)** : Deux cartes pour chaque ville (Bordeaux et Montpellier) avec un Switch Button pour changer de vue entre LeaftLet.JS et Plot Geo. Systèmes de filtrages des types d'equipements et des offres culturelles, points sur la carte, zoom/dezoom, tooltips sur les points de la carte, couleurs différentes en fonction du de l'offre culturelle physique/numérique

- **ButterFly Chart** : Comparaison symétrique entre Bordeaux et Montpellier concernant le nombre de types d'offres culturelles, valeurs affichées, tri par total en ordre décroissant, création d'un composant du côté serveur car graphique statique pour le réutiliser facilement

- **Radar Chart** : Visualisation sur 6 dimensions culturels, tooltips (non fonctionnel sur le site mais sur le Notebook Observable), valeur affichées

### La Navigation

- Deux types de Header, un pour la page d'accueil et un autre pour les pages secondaires
- Deux types de Layout, un pour la page d'accueil et un autre pour les pages secondaires
- Un footer
- Un snap scroll vertical pour le storytelling, avec une progression affiché à droite où l'on peut naviguer dans l'explication

### Les Pages et la structure du site

- Accueil : On retrouve le storytelling avec l'exploration des graphiques et les explications de l'analyse (intro, graphiques, conclusions)
- Mentions Légales : Obligatoire pour les normes RGPD (hébergement, propriété intellectuelle...)
- Page Contexte : Explicite le cadre de la réalisation du projet et les objectifs(en SAÉ, pour un defi avec Latitudes, en groupe de 2)
- Page Sources de données : contient toutes les données utilisées pour la réalisation de l'analyse
- Page Graphiques : Regroupe tous les graphiques réalisés sans analyse détaillée pour les analyser rapidement

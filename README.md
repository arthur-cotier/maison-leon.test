# Maison Léon — site exemple (portfolio)

Mini-site one-page pour un client fictif : **Maison Léon**, café-restaurant de quartier à la Croix-Rousse à Lyon.

> Cas d'usage : exemple de portfolio. Le client n'existe pas, le contenu est inventé pour rester crédible. Tout est ouvert et réutilisable comme structure de départ pour un vrai client.

---

## Pile technique

- **HTML5 sémantique** (skip-link, hiérarchie de titres, ARIA)
- **CSS3 vanilla** — variables CSS pour la palette, mobile-first, grid + flex
- **JavaScript vanilla** — IntersectionObserver pour les fade-in, menu mobile, soumission factice du formulaire
- **Polices Google Fonts** : `Fraunces` (serif optical, caractère artisanal) + `Inter` (sans-serif neutre)
- **Photos** : Unsplash (URLs directes `images.unsplash.com/photo-…`)

Aucun framework, aucun build, ouvre directement dans le navigateur.

---

## Structure

```
maison-leon/
├── index.html         # one-page complète
├── css/
│   └── styles.css     # variables CSS, sections, responsive
├── js/
│   └── script.js      # fade-in scroll, mobile nav, form factice
├── images/            # vide — photos en CDN Unsplash
└── README.md
```

---

## Sections (par ordre de scroll)

1. **Header** sticky — logo + nav ancres + CTA Réserver
2. **Hero** — accroche serif italique en deux temps + photo + tampon "Maison depuis 2022"
3. **L'esprit de la maison** — 3 piliers (cuisine du marché / quartier / pas de chichis) + bloc citation fondateurs
4. **La carte du jour** — 3 colonnes (4 entrées · 4 plats · 3 desserts), prix en terracotta, encart "semaine du… formule midi 22 €"
5. **Brunch dominical** — image + composition à 28 € + CTA réserver
6. **Producteurs** — 6 cartes (boucher, maraîchère, fromager, vigneron, boulanger, apiculteur)
7. **Infos pratiques + Réservation** — 4 cartes infos + formulaire factice (validation HTML5, soumission simulée en JS)
8. **Footer** — adresse, contact, réseaux

---

## Personnalisation rapide

### Couleurs

Toutes les couleurs sont des variables CSS dans `:root` au début de `css/styles.css` :

```css
--terracotta:      #c2533a;   /* CTA, accents, prix */
--terracotta-dark: #9c3e2b;
--terracotta-soft: #e8b8a8;
--cream:           #f6efe4;   /* fond clair */
--paper:           #fdfaf3;   /* fond le plus clair */
--sage:            #9aa893;   /* fond brunch */
--ink:             #1a1a1a;   /* texte / fond sombre */
```

### Polices

Chargées dans `<head>` via Google Fonts (Fraunces + Inter). Pour changer :
1. mettre à jour le `<link href="https://fonts.googleapis.com/css2?…">`
2. ajuster `--serif` / `--sans` dans `:root`.

### Photos

Les `src` pointent vers `https://images.unsplash.com/photo-{id}?w=…&q=80&auto=format&fit=crop`. Pour utiliser ses propres photos :
1. les déposer dans `/images/`
2. remplacer chaque `src` correspondant
3. on conserve les `alt` et le `loading="lazy"` (sauf hero en `eager`).

### Contenu

Tout le contenu (carte, producteurs, infos) est dans `index.html`, pas dans des données séparées — édition directe par recherche-remplacement.

---

## Comportements JS

| Élément                         | Comportement                                               |
|---------------------------------|------------------------------------------------------------|
| `.menu-toggle` (mobile)         | Ouvre / ferme `.mobile-menu`, bloque le scroll body         |
| `.reveal`                       | Fade-in léger au scroll (IntersectionObserver, désactivé via `prefers-reduced-motion`) |
| `#reservation-date`             | Min = aujourd'hui                                            |
| `#reservation-form` (submit)    | Soumission factice : message de confirmation, scroll vers le statut, formulaire reset |
| `#current-year`                 | Année dynamique en footer                                   |

Pour brancher un vrai backend, remplacer le handler de `#reservation-form` par un POST vers Formspree / Resend / API custom.

---

## Lancer en local

```bash
cd maison-leon
python3 -m http.server 8080
```

Puis ouvrir <http://localhost:8080>.

(Ou ouvrir directement `index.html` dans un navigateur — tout fonctionne en `file://`.)

---

## Pourquoi cette structure est réutilisable

- **Variables CSS** centralisées → rebrand en 2 minutes
- **Sections autonomes** → on supprime/remplace une section sans casser les autres
- **Pas de build** → pas de pipeline à maintenir, parfait pour un site vitrine d'artisan / commerçant
- **Form factice isolé** → un seul handler à remplacer pour brancher un vrai service
- **Mobile-first + reduced-motion + ARIA** → bases d'accessibilité déjà posées

---

## Notes

- Site **fictif** : adresse, téléphone, email, fondateurs, producteurs sont inventés.
- Les images Unsplash sont des photos libres (licence Unsplash) ; pour un client réel, prévoir un shooting dédié.
- SEO local de base posé (JSON-LD `Restaurant`, OG, lang fr) — à compléter avec sitemap, fiche Google Business et photos métiers pour aller plus loin.

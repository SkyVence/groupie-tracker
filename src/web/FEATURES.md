# ✨ Fonctionnalités de Groupie Tracker

## 🎯 Vue d'ensemble

Groupie Tracker est une application web moderne qui permet de découvrir des artistes musicaux avec un design élégant et une expérience utilisateur fluide.

---

## 🎨 Fonctionnalités Principales

### 1. 🏠 Page d'Accueil

**Design moderne avec header animé**
- Titre avec emoji animé (🎸)
- Gradient violet/rose sur le titre
- Animation de pulsation en arrière-plan
- Sous-titre descriptif

```
┌─────────────────────────────────────────┐
│         🎸 Groupie Tracker             │
│   Découvrez vos artistes préférés      │
└─────────────────────────────────────────┘
```

---

### 2. 🔍 Barre de Recherche

**Recherche intelligente et réactive**
- Recherche en temps réel (pas besoin de cliquer sur "Rechercher")
- Cherche dans le nom ET la biographie des artistes
- Design avec icône de loupe
- Effet de focus avec glow bleu

```
┌──────────────────────────────────────┐
│  🔍  Rechercher un artiste...        │
└──────────────────────────────────────┘
```

**Exemples de recherche :**
- "Queen" → Trouve Queen
- "metal" → Trouve tous les groupes de metal
- "1970" → Trouve les groupes des années 70

---

### 3. 🎭 Filtre par Genre

**Dropdown élégant pour filtrer**
- Liste de tous les genres disponibles
- Filtre instantané au changement
- Design cohérent avec la recherche

```
┌─────────────────────────┐
│ Tous les genres      ▼ │
├─────────────────────────┤
│ Tous les genres         │
│ Alternative Rock        │
│ Art Rock               │
│ Blues Rock             │
│ Classic Rock           │
│ Electronic             │
│ ... etc                │
└─────────────────────────┘
```

---

### 4. 🎴 Cartes d'Artistes

**Design moderne en grille responsive**

Chaque carte affiche :
- ✅ Photo de l'artiste (grande image)
- ✅ Badge de classement (#1, #2, etc.)
- ✅ Nom de l'artiste
- ✅ 2 premiers genres (badges colorés)
- ✅ Extrait de biographie (100 caractères)
- ✅ Date du 1er album
- ✅ Date du dernier album
- ✅ Nombre de followers (icône)
- ✅ Nombre de concerts à venir (icône calendrier)

```
┌──────────────────────────────┐
│  [   Photo de l'artiste  ]  │
│           Badge #1           │
├──────────────────────────────┤
│  QUEEN                       │
│  [Rock] [Classic Rock]       │
│                              │
│  Queen est un groupe de...   │
│                              │
│  Premier album: 1973         │
│  Dernier album: 1995         │
│                              │
│  👥 45,000,000 followers     │
│  📅 3 concerts à venir       │
└──────────────────────────────┘
```

**Effets visuels :**
- Hover : la carte monte légèrement (translateY)
- Hover : l'image zoome doucement
- Gradient en arrière-plan (noir vers gris)
- Border-radius arrondis (20px)
- Ombre portée qui s'intensifie au hover

---

### 5. 💫 Modal de Détails

**Popup complet avec toutes les informations**

Quand on clique sur une carte, un modal s'ouvre avec :

**Header du Modal :**
- Grande photo de l'artiste (200x200px)
- Badge de classement
- Nom de l'artiste (grande typographie)
- Tous les genres (badges)
- Nombre de followers

**Section Biographie :**
- Texte complet de la bio
- Typographie lisible et aérée

**Section Discographie :**
- Premier album avec icône 🎵
- Dernier album avec icône 🎸
- Cartes avec hover effect

**Section Concerts :**
- Liste de tous les concerts à
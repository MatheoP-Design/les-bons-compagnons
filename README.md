# Les Bons Compagnons

Plateforme de mise en relation entre particuliers et artisans Compagnons du Devoir pour des projets de rénovation du patrimoine.

## 🎯 À propos

Les Bons Compagnons est une application web permettant de connecter les particuliers avec des artisans qualifiés issus des Compagnons du Devoir. La plateforme facilite la publication d'annonces de rénovation, la gestion des devis, le suivi de projets et l'interaction au sein d'une communauté dédiée.

## ✨ Fonctionnalités

### Pour les particuliers
- 📝 Publication d'annonces de rénovation
- 💰 Réception et gestion de devis
- 📊 Suivi de projets en temps réel
- 💬 Messagerie avec les artisans
- ⭐ Système d'avis et de notation
- 🎁 Système de points de fidélité

### Pour les cadres (artisans)
- 👀 Consultation des demandes disponibles
- 📤 Envoi de devis personnalisés
- 📸 Gestion de projets avec photos (avant, pendant, après)
- 💬 Communication avec les clients
- 🏆 Finalisation et archivage de projets

### Communauté
- 💬 Forum de discussion
- 🔍 Recherche de sujets
- 📝 Publication et réponse aux posts
- 🖼️ Partage d'images

## 🚀 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

## 🏃 Démarrage

### Mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173` (ou le port indiqué dans la console)

## 🔐 Comptes de test

### Particuliers
- **Email** : `sophie@example.com` | **Mot de passe** : `123456`
- **Email** : `pierre@example.com` | **Mot de passe** : `123456`
- **Email** : `marie@example.com` | **Mot de passe** : `123456`
- **Email** : `lucas@example.com` | **Mot de passe** : `123456`

### Cadres (Artisans)
- **Email** : `jean@compagnons.fr` | **Mot de passe** : `123456`
- **Email** : `paul@compagnons.fr` | **Mot de passe** : `123456`
- **Email** : `michel@compagnons.fr` | **Mot de passe** : `123456`

> 💡 **Note** : Vous pouvez réinitialiser les comptes de test depuis la page de connexion si nécessaire.

## 🛠️ Technologies utilisées

- **React** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Composants UI
- **Lucide React** - Icônes
- **Sonner** - Notifications toast
- **LocalStorage** - Persistance des données

## 📁 Structure du projet

```
src/
├── components/        # Composants réutilisables
│   ├── ui/           # Composants UI (shadcn)
│   ├── Header.tsx    # En-tête de navigation
│   └── Footer.tsx    # Pied de page
├── contexts/         # Contextes React (Auth, Data)
├── pages/            # Pages de l'application
├── types/            # Définitions TypeScript
└── styles/           # Styles globaux
```

## 🎨 Design

Le design utilise une palette de couleurs avec un dégradé orange (#FE734A → #FC473F) pour les éléments principaux et une couleur bleue (#2C5F8D) en complément.

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualise le build de production

## 💾 Persistance des données

Les données sont actuellement stockées dans le `localStorage` du navigateur. Cela permet de :
- Conserver la session utilisateur
- Sauvegarder les annonces, devis, projets
- Persister les posts de la communauté
- Maintenir les points de fidélité

> ⚠️ **Important** : Les données sont locales au navigateur. Vider le cache supprimera toutes les données.

## 🤝 Contribution

Ce projet est développé dans le cadre d'un partenariat entre Leboncoin et Les Compagnons du Devoir.

## 👥 Auteurs

- **Mike Candeago**
- **Matheo Poulain**

## 📄 Licence

Projet privé - Tous droits réservés

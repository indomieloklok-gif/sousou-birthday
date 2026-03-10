# Instructions de Déploiement 🚀

## 📋 Étape 1: Créer un dépôt GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Nommez votre dépôt (ex: `sousou-birthday`)
4. **NE COCHEZ PAS** "Initialize with README"
5. Cliquez sur **"Create repository"**

## 📤 Étape 2: Pousser le code sur GitHub

Dans votre terminal, exécutez ces commandes (remplacez `YOUR_USERNAME` et `YOUR_REPO_NAME`):

```bash
cd C:\Users\indomieG\sousou-birthday

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

**Note:** Si GitHub vous demande de vous authentifier, utilisez un Personal Access Token au lieu du mot de passe.

## 🌐 Étape 3: Déployer sur Vercel

### Option A: Via l'interface Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Log In"** (connectez-vous avec GitHub)
3. Cliquez sur **"Add New..."** → **"Project"**
4. Importez votre dépôt GitHub (il devrait apparaître dans la liste)
5. Cliquez sur **"Import"**
6. Vercel détectera automatiquement Next.js
7. Cliquez sur **"Deploy"**
8. Attendez quelques minutes... et c'est fait! 🎉

### Option B: Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Dans le dossier du projet
cd C:\Users\indomieG\sousou-birthday

# Déployer
vercel

# Suivez les instructions à l'écran
```

## 🔄 Mettre à jour le site

Quand vous modifiez le code:

```bash
# Ajouter les changements
git add .

# Créer un commit
git commit -m "Description des changements"

# Pousser sur GitHub
git push
```

Vercel redéploiera automatiquement votre site! ✨

## 🔗 Obtenir l'URL de votre site

Après le déploiement sur Vercel:
- Vercel vous donnera une URL comme: `https://sousou-birthday.vercel.app`
- Vous pouvez aussi ajouter votre propre domaine personnalisé dans les paramètres Vercel

## ❓ Problèmes courants

### Erreur d'authentification GitHub
- Utilisez un Personal Access Token au lieu du mot de passe
- Créez-en un: GitHub → Settings → Developer settings → Personal access tokens

### Erreur de build sur Vercel
- Vérifiez que tous les fichiers sont bien poussés sur GitHub
- Vérifiez les logs de build sur Vercel pour voir l'erreur exacte

### Le site ne se met pas à jour
- Attendez 1-2 minutes (Vercel met à jour automatiquement)
- Vérifiez que vous avez bien fait `git push`

## 🎉 C'est tout!

Votre site est maintenant en ligne et accessible partout dans le monde!

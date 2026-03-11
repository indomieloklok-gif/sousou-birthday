# Instructions pour pousser le code sur GitHub

## Problème d'authentification

Git utilise les identifiants Windows d'un autre compte. Voici comment résoudre:

## Solution 1: Utiliser un Personal Access Token (Recommandé)

### Étape 1: Créer un token GitHub

1. Allez sur: https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez un nom: `sousou-birthday`
4. Cochez la permission **`repo`** (accès complet)
5. Cliquez sur **"Generate token"**
6. **COPIEZ LE TOKEN** (vous ne le reverrez plus!)

### Étape 2: Pousser avec le token

Dans PowerShell, exécutez:

```bash
cd C:\Users\indomieG\sousou-birthday

# Utiliser le token dans l'URL
git remote set-url origin https://VOTRE_TOKEN@github.com/indomieloklok-gif/sousou-birthday.git

# Pousser
git push -u origin main
```

**Remplacez `VOTRE_TOKEN` par le token que vous avez copié**

## Solution 2: Utiliser GitHub Desktop

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Connectez-vous avec le compte `indomieloklok-gif`
3. Ouvrez le dossier `C:\Users\indomieG\sousou-birthday`
4. Cliquez sur "Publish repository"

## Solution 3: Utiliser SSH (Avancé)

Si vous avez configuré SSH avec GitHub:

```bash
git remote set-url origin git@github.com:indomieloklok-gif/sousou-birthday.git
git push -u origin main
```

## Après avoir poussé

Une fois le code sur GitHub, vous pouvez déployer sur Vercel:

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Importez le dépôt `indomieloklok-gif/sousou-birthday`
4. Cliquez sur "Deploy"

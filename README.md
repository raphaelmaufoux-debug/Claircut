# Claircut

Prototype francophone de création manuelle de clips verticaux.

## Démo actuelle
- Choix d’une vidéo locale.
- Sélection manuelle d’un passage de 3 à 90 secondes.
- Recadrage centré au format 9:16 et ajout d’une légende.
- Export WebM directement dans le navigateur.

La vidéo n’est pas téléversée. La sélection automatique, la transcription automatique, les comptes, le stockage cloud et les paiements ne sont pas encore implémentés. Le prix de 8,99 €/mois est une proposition, pas un abonnement actif. Utilisez Chrome ou Edge sur ordinateur pour l’export WebM.

## Héberger la démo avec Firebase Hosting
1. Créez ou choisissez un projet Firebase dans le compte Google qui hébergera le site.
2. Dans un terminal depuis ce dossier, exécutez `firebase login`, puis `firebase use --add`.
3. Sélectionnez le projet voulu et exécutez `firebase deploy --only hosting`.

Le fichier `.firebaserc` n’est pas inclus : l’identifiant du projet dépend de votre compte. Firebase Hosting sert le site statique ; il ne traite pas les vidéos dans le cloud.

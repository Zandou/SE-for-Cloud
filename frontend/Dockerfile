# Utilisation de l'image de base officielle de Node.js
FROM node:16.13.2

# Création d'un répertoire de travail pour l'application
WORKDIR /app

# Copie des fichiers de package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installation des dépendances de l'application
RUN npm install

# Copie de tous les fichiers de l'application dans le conteneur
COPY . .

# Build de l'application
RUN npm run build

# Exposition du port 3000 utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD [ "npm", "start" ]

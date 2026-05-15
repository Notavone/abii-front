# Étape 1 : Build de l'application Angular
FROM node:16-alpine AS build
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install --verbose --legacy-peer-deps

# Copie du code et build de l'application
COPY . .
RUN npm run build --configuration=production
RUN ls -la dist/

# Étape 2 : Serveur web Nginx pour servir la PWA
FROM nginx:alpine

# Copie de la configuration Nginx personnalisée (Gestion des routes Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers compilés d'Angular vers Nginx
# Note : Retrait du "/browser" qui n'existe pas sur cette génération d'Angular
COPY --from=build /app/dist/abii-front /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
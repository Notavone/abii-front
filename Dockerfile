# Étape 1 : Build de l'application Angular
FROM node:20-alpine AS build
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install --verbose

# Copie du code et build de l'application
COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur web Nginx pour servir la PWA
FROM nginx:alpine
# Copie des fichiers compilés d'Angular vers Nginx
# /!\ Attention : Vérifie le nom du dossier dans "dist/". 
# Avec les versions récentes d'Angular, c'est souvent dist/[nom-de-ton-app]/browser
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Optionnel : Copier une configuration Nginx personnalisée si tu gères le routing (reloads de page)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

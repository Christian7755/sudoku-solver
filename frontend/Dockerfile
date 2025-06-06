# Verwende das Node.js Alpine-Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und package-lock.json (damit npm install nur die Abhängigkeiten installiert)
COPY ./package.json ./package-lock.json /app/

#Globale CLI installlieren
RUN npm install -g @angular/cli

# Installiere die Abhängigkeiten
RUN npm install 


# Kopiere den Rest des Projekts
COPY . /app


# Exponiere Port 4200 für den Dev-Server
EXPOSE 4200

# Starte Angular im Dev-Modus
#CMD ["sh"]

CMD ["npm", "start"]
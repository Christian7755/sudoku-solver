# Verwende das Node.js Alpine-Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Installiere die Angular CLI global
#RUN npm install -g @angular/cli

# Erstelle ein neues Angular-Projekt (wenn es noch nicht existiert)
#RUN ng new sudoku-solver-frontend --defaults --skip-git

# Kopiere package.json und package-lock.json (damit npm install nur die Abhängigkeiten installiert)
COPY ./package.json ./package-lock.json /app/

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Projekts
COPY . /app


# Exponiere Port 4200 für den Dev-Server
EXPOSE 4200

# Starte Angular im Dev-Modus
#CMD ["sh"]

CMD ["npm", "start"]
# Verwende das Node.js Alpine-Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Installiere die Angular CLI global
#RUN npm install -g @angular/cli

# Erstelle ein neues Angular-Projekt (wenn es noch nicht existiert)
#RUN ng new sudoku-solver-frontend --defaults --skip-git

COPY . /app

# Wechsel in das erstellte Projekt
#WORKDIR /app/sudoku-solver-frontend

# Installiere die Abhängigkeiten
RUN npm install

# Exponiere Port 4200 für den Dev-Server
EXPOSE 4200

# Starte Angular im Dev-Modus
#CMD ["sh"]

CMD ["npm", "start"]
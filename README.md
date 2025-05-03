# sudoku-solver

# Mein Projekt: Frontend (Angular) und Backend (Spring Boot)

## Voraussetzungen
- Docker und Docker Compose müssen installiert sein.
- Node.js und npm müssen auf dem System installiert sein um das Frontend zu bauen
- Java muss für das Backend installiert sein

## Projekt starten

1. Klone das Repository:
   ```bash
   git clone <repository-url>
   cd my-project

2. Frontend Starten:
   cd frontend
   npm install
   npm start

Die Anwendung sollte unter http://localhost4200 sichtbar sein.

3. Backend Starten
   cd backend
   ./mvnw clean install
   ./mfnw spring-boot:run

4. Beide Anwendungen Starten
   cd sudoku-solver (Hauptverzeichnis)
   docker-compose up --build

Das Backend ist unter http://localhost:8080 verfügbar



Eventuell Paktet für Tests:
npm install --save-dev @types/jasmine jasmine-core karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter
npm install --save-dev karma karma-jasmine karma-chrome-launcher karma-jasmine-html-reporter
npm install --save-dev karma-coverage

npm install zone.js --save

npm install @angularclass/hmr --save-dev

# sudoku-solver
Erlaubt das Generieren, Importieren, Exportieren, Lösen von und Spielen mit Sudokus. Die Benutzerverwaltung erlaubt die Stats zu sichern. 


# Mein Projekt: Frontend (Angular) und Backend (Spring Boot)

## Voraussetzungen
- Docker und Docker Compose müssen installiert sein.
- Node.js und npm müssen auf dem System installiert sein um das Frontend zu bauen
- Java muss für das Backend installiert sein

## Projekt starten

1. Klone das Repository:
   ```bash
   git clone <repository-url>

2. Anwendung starten
   cd sudoku-solver  
   docker-compose up --build

3. Aufruf
   Die Anwendung sollte unter http://localhost4200 sichtbar sein.

   Das Backend läuft unter http://localhost:8080 

## Login, User Stats
Konfigurierter Testnutzer für die Abgabe:
Nutzer: demo
Passwort: demo123

Der Login ist für den Play-Mode erforderlich.
Hierbei werden die User-Stats gesichert.


## Verwendung von externen APIs
- Dosuku API: Generieren von Sudokus


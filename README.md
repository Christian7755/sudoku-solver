# sudoku-solver
Erlaubt das Generieren, Importieren, Exportieren, Lösen von und Spielen mit Sudokus. Die Benutzerverwaltung erlaubt die Stats zu sichern. 


# Mein Projekt: Frontend (Angular) und Backend (Spring Boot)

## Voraussetzungen
- Docker und Docker Compose müssen installiert sein.

## Projekt starten

1. Klone das Repository:
   ```bash
   git clone https://github.com/Christian7755/sudoku-solver.git

2. Anwendung starten
   cd sudoku-solver  
   docker-compose up --build

3. Aufruf
   Die Anwendung sollte unter http://localhost4200 sichtbar sein.
   Das Backend läuft unter http://localhost:8080, wobei einige Pfade, inclusive dem Root Pfad, von der Authentifizierung geschützt sind.


## Login, User Stats
Konfigurierter Testnutzer für die Abgabe:
Nutzer: demo
Passwort: demo123

Der Login ist für den Play-Mode erforderlich.
Hierbei werden die User-Stats gesichert.


## Verwendung von externen APIs
- Dosuku API: Generieren von Sudokus

## Anwendung
- Navigation innerhalb eines Sudokus: Pfeiltasten oder Zellen mit der Maus auswählen
- Die Gesamtstatistiken können auf der Startseite angesehen werden, wenn der Nutzer eingeloggt ist
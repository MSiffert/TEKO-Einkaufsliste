# Einkaufslisten-App (React + Express + SQLite)

Dies ist eine Fullstack-Webanwendung zur Verwaltung einer digitalen Einkaufsliste.

## Funktionen

-   Artikel anzeigen
-   Artikel hinzufügen (mit Menge)
-   Artikel bearbeiten
-   Artikel löschen
-   Alphabetisch sortierte Einkaufsliste als CSV exportieren
-   Gesamte Liste zurücksetzen

## Architektur

-   **Frontend**: React + Vite (TypeScript)
-   **Backend**: Node.js + Express.js
-   **Datenbank**: SQLite
-   **REST-API**: CRUD-Endpunkte
-   **Tests**: Unit Tests für Business-Logik im Backend

## Installation

### Backend starten

``` bash
npm run dev
```

### Frontend starten

``` bash
npm run dev
```

## REST-API Übersicht

-   `POST /api/items` -- Artikel anlegen
-   `GET /api/items` -- Alle Artikel abrufen
-   `PUT /api/items/:id` -- Artikel aktualisieren
    (`{ name?, quantity?, checked? }`)
-   `DELETE /api/items/:id` -- Artikel löschen
-   `POST /api/items/reset` -- Liste zurücksetzen
-   `GET /api/items/export/csv` -- CSV-Export alphabetisch sortiert

## Tests ausführen

``` bash
npm run test
```

## Responsive Design

-   Mobile First: optimiert für Smartphone, Tablet, Laptop und TV
-   Moderne Browser: Getestet in Chrome aktuellste Versionen
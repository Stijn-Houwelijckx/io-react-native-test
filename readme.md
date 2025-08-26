# IO Weather app - Test Opdracht

## Algemene Opdracht
Maak een volledig functionele weer-app op basis van de bestaande codebase (Expo). De app maakt gebruik van de Open-Meteo API voor weergegevens en heeft reeds een dashboard met weerlocaties geïmplementeerd.

## Vereisten
De applicatie moet voldoen aan de volgende technische vereisten:
- React Native als frontend framework
- Open-Meteo API voor weergegevens
- Nominatim API voor locatie-conversies
- Geolocatie ophalen

## Implementatie Taken

### 1. State Management & Locatie Beheer
Implementeer een robuust state management systeem dat:
- Meerdere locaties kan beheren
- Huidige locatie kan toevoegen
- Locatie op basis van adres kan toevoegen

Pas de Scrollview aan zodat hij ook performant blijft bij meer data


Voeg functionaliteit toe om nieuwe locaties te zoeken via de Nominatim API:
```bash
GET https://nominatim.openstreetmap.org/search
params: {
  q: "stadnaam",
  format: "json",
  limit: 5,
  polygon_geojson: 1
}
```

### 2. Huidige Locatie Integratie
Implementeer GPS-functionaliteit die:
- De huidige locatie kan detecteren
- Coordinaten kan converteren naar stadsnamen
- Automatisch de lokale weerinformatie laadt

Gebruik de Geolocation API van nomatim om de plaats op te zoeken.
```bash
GET https://nominatim.openstreetmap.org/reverse
params: {
  lat: "latitude",
  lon: "longitude",
  format: "json",
  zoom: 18,
  addressdetails: 1
}
```

### 3. Gedetailleerde Weerinformatie
Maak een detail pagina voor weers informatie per locatie. 

Voorzie een layout op basis van volgend design:
![Detail Page](detail-page.png)

De locatie detail pagina moet de volgende informatie tonen:
- **Actuele Weergegevens**
  * Huidige Temperatuur (°C)
  * Min & max Temperatuur (°C)
  * Weertype (tekst + icoon + achtergrond kleur)

- **Uurlijkse Voorspelling (24u)**
  * Temperatuur per uur
  * Weericonen per uur

### 4. Extra's
Zorg voor optimale performance door:
- Caching van API responses
- Persistente opslag
- Optimaliseer de typescript output voor de weatherService.

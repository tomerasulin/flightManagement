# Flight Management 

A flight management app for an airline company. Monitor real-time data from flights owned by the company, such as: takeoff/landing times, takeoff/landing airports and flight status.

![App Diagram](./flightManagementDiagram.png)

## Features

1. A list view of all flights registered in the system, always up to date with their current data on the server.
2. A search bar to filter flights by flight number and takeoff/landing airport. The app should still update data even when the UI shows filtered results.
3. A flight create/edit form.
4. A database of flights
5. Endpoints serving CRUD for flight entities, including a query that filters by flight number, airport, and time.
6. A push-update system through which the Front-End would be able to detect changes.

### Technologies

* TypeScript, HTML, SCSS
* Angular
* RxJS, Angular services
* Angular Material
* NestJS
* MongoDB
* Sockets (Socket.IO)
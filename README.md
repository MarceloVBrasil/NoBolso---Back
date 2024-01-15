# No Bolso - Backend

This is the backend of NoBolso, a project designed to keep you in track with your finances

## Architeture
- Instead of the old MVC pattern, I used the "CSMR" pattern designed by Vitor Manoel from Santa Catarina - Brazil.
### How CSMR architeture works
- C => Controller - it receives all the requests and sends it validated (validation made by the schemas) to the service.
- S => Service - it is responsible to deal with all the business logic. It consults the repository to deal with the data
- M => Model - it models the objects dealt within the application (Here TypeScript really comes in handy)
- R => Repository - Beyond the communication with a database, the repository also is responsible to deal with in-Memory data storage, this makes testing so much easier!

## How to run the application

- yarn install
- yarn start

## How to run tests
- yarn test - run all the tests at once
- yarn test FileName - test the FileName 
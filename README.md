# BackOffice

This repository contains a backoffice with an ExpressJS API, a NextJS frontend, and a PostgreSQL database. It uses docker and docker-compose with profiles (docker-compose version 1.28 or higher).

## Starting for development

The development version includes hot-reloading for react and the express API is setup to use nodemon.

```bash
docker-compose --profile dev up
```

## Starting for production

The production version includes a safer docker setup with no development tools.

```bash
docker-compose --profile prod up
```

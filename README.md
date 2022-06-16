# BackOffice

This repository contains a backoffice with an ExpressJS API, a NextJS frontend, and a PostgreSQL database. It uses docker and docker-compose with profiles (docker-compose version 1.28 or higher).

## Launching the WebApp

### Starting for development

The development version includes hot-reloading for react and the express API is setup to use nodemon.

```bash
docker-compose --profile dev up
```

### Starting for production

The production version includes a safer docker setup with no development tools.

```bash
docker-compose --profile prod up
```

## How to get started

### Setting up (recommended)

I recommend using notion for creating and managing your user stories for the PLD. This can be done using a database with the following entries:
- "Name": Name of the User Story
- "Status": Status of the US, can be "Completed", "In progress" or "Not started"
- "Status MEMBER\_NAME": Status of a member for a given task, you should replace MEMBER\_NAME by members' names (one for each member). Accepted values are the same as the "Status" field.
- "Sprint": Sprint of the US
- "Livrable": This is used to separate the tasks, should ideally start with a number
- "Sous-Livrable": This is used to sort the tasks in a "Livrable", should ideally start with a number
- "Charge estimée (J/H)": Total estimated number of days for the given US
- "Assign to": Member names, separated by a comma and a space
- "En tant que": The "As a" part of the US
- "Je veux": The "I want" part of the US
- "Description": Description of the US
- "Definition of done": Definition of done, you should ideally put each sub-task on one line and start that line with a dash

Please note that member names are not case sensitive.

The API checks for these columns, but you are free to add more of them. Also note that the API will only check the validity of the current sprint's entries, when updating or creating a new sprint.

### Launching the project for the first time

After launching the project for the first time, the root user should be created in the database with the password that is set in the docker-compose.yml. It is suggested to change it.

By default the user is: root@0.0.0.0\
and the password is: root


### Creating members

One of the first steps you should take is creating the members, you will not be able to add a sprint without having created the members.

Go to the Members tab and create all the members for your sprint.

If a member leaves, you should leave them in the Members, and you should add any new member that joins your team.

### Add your Sprint

In the Sprints tab, enter your sprint name (just like it is in the PLD), then create the sprint. In case of error, the form will tell you what column in the database caused the error, and you should be able to correct it.

Some errors are due to typos in the names of the members (don't forget about accents in names).

You should then be able to update your sprint by chosing it in the Choose sprint menu, and uploading the new CSV.

### Sprint Parts

In order to add Sprint reports, you should first create sprint parts. This part includes the title and description (optional) for your sprint part reports.

### Sprint Reports

Sprint reports can be added or updated in the Sprint Reports tab. Choose the sprint part, then the member, and then you can add or update the report.

### Changelogs

At last, you can also add entries in the changelog in the Changelogs tab, these will appear at the start of your PLD.
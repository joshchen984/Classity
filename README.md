# Classity

## Folders

| Folder                | Description             |
| --------------------- | ----------------------- |
| [Api](/api)           | The backend             |
| [Frontend](/frontend) | The React frontend      |
| [Dto](/dto)           | The DTOs of the project |

## Requirements

- Docker Desktop
- Node.js and npm

## Installation

- Create a /api/.env.development file and put this data in it.

You will have to setup firebase authentication and put those values here.

```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```

- There should only be one node_modules folder in the root directory

```bash
# Run this in the root directory
npm install
npm run dto:build
npm install
```

## Starting Backend + Frontend

```
npm run start:dev
```

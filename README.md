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

You will have to setup firebase authentication and put those values in the .env.development file.

```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

MONGODB_URL=mongodb://localhost/classity
MONGODB_USERNAME=
MONGODB_PASSWORD=
```

- Create a /frontend/env.local file and put this data in it

```
API_URL=localhost:3001
```

- There should only be one node_modules folder in the root directory

```bash
# Run this in the root directory
npm install
```

## Starting Backend + Frontend

```
npm run start:dev
```

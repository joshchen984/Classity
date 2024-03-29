# Classity

Want to keep track of your class grade, get a sense of what your final grade will be and the grades you'll need to improve it?

Whether you’re in high school or graduate school, this easy-to-use grade calculator will help you stay on top of your grades in just a few minutes!

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
FIREBASE_PROJECT_ID=value
FIREBASE_PRIVATE_KEY=value
FIREBASE_CLIENT_EMAIL=value
FIREBASE_DB_URL=value

MONGODB_URL=mongodb://localhost/classity
MONGODB_USERNAME=
MONGODB_PASSWORD=
```

- Create a /frontend/.env.local file and put this data in it

- You will have to use the same database values as the .env.development file

```
NEXT_PUBLIC_API_URL=/api

NEXT_PUBLIC_FIREBASE_API_KEY=value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=value
NEXT_PUBLIC_FIREBASE_APP_ID=value
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=value

NEXT_PUBLIC_GA_ID=Google Analytics Id
```

- There should only be one node_modules folder in the root directory because I'm using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

```bash
# Run this in the root directory
npm install
```

## Starting Backend + Frontend

```
npm run start:dev
```

To start mongodb database:

```
docker run --name mongodb -d -p 27017:27017 mongo
```

## Development

- Classity uses Prettier and eslint for linting
- Frontend hosted on Netlify
- API hosted on Heroku
- Authentication handled by Firebase

# Full-Text Search Proof of Concept with SvelteKit, Prisma, and PostgreSQL

This project demonstrates the implementation of full-text search in a PostgreSQL database, leveraging SvelteKit as the frontend framework and Prisma for database management.

It's designed to showcase how full-text search can be effectively utilized within a web application.

## Requirements

- Node.js
- npm
- PostgreSQL database

## Setup

Before running the project, ensure you have a PostgreSQL database accessible. The connection details should be specified in a `.env` file at the root of the project directory.

### .env Configuration

Create a `.env` file in the root directory and fill in your PostgreSQL database connection details:

```plaintext
DATABASE_URL="postgresql://admin:admin@localhost:55434/fts?schema=public"
```

Above url is the url generated from the `docker-compose.yml` file.

Feel free to change if you need to.

## Project Installation

Run database with docker-compose

```
docker-compose up -d
```

Install dependencies:

```
npm install
```

Update database schema

```
npm run prisma:deploy
```

## Running the project

To run the project in development mode:

```
npm run dev
```

## Credits

- [How to implement Full Text Search in Prisma with PostgreSQL?
  ](https://www.claritician.com/how-to-implement-full-text-search-in-prisma-with-postgresql)

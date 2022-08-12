
# Available Scripts

In the project directory, you can run:

* `npm start` -> runs production build.
* `npm run dev` -> runs nodemon.
* `npm run build` -> builds project.
* `npm run lint` -> runs eslint.
* `npm run lint:fix` -> runs eslint fix and formats code.

# Docs

## Setup postgres locally

1. Create local database.
2. Update `DATABASE_URL` in `.env`.

## Add `env` variable

1. Add your enviroment variable in `.env` using the prefix `REACT_APP_`.
2. Copy the variable name in the `.env.example` but remember to delete the value!
3. To make use of the env variables make sure to import `dotent/config` at the top of the file.


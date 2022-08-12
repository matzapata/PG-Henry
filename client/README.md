
# Available Scripts

In the project directory, you can run:

* `npm start`
* `npm test`
* `npm run build`
* `npm run eject`
* `npm run lint` -> runs eslint
* `npm run lint:fix` -> runs eslint fix

# Features

* Chakra UI. https://chakra-ui.com/docs/components/
* Font Awesome icons. https://fontawesome.com/icons
* Typescript. https://www.typescriptlang.org/docs/handbook/react.html
* Redux toolkit. https://redux-toolkit.js.org/
* React router version 5. https://v5.reactrouter.com/

# Docs

## Create new route

1. Create a new page component in `./src/pages`.
2. Register the component in `./src/App`. 
- Import the component at the top of the file
- Add the `Route` component specifying the `path` like this `<Route exact path="/path" component={ComponentName} />`

## Components structure

1. Create a component folder in `./src/components` with the name of the component.
2. Add the `index.ts` file and the `css` inside.

## Create a slice

1. Create `reducernameSlice.ts` in `./src/redux/slices` folder.
2. Import the slice in `store.ts`. 
3. Add the slice in the `reducers` property of `createSlice`.


## Add Styles

1. Add global styles to the `./src/styles` folder or component styles in the `componentFolder/ComponentName.module.css` file.

## Add `env` variable

1. Add your enviroment variable in `.env` using the prefix `REACT_APP_`.
2. Copy the variable name in the `.env.example` but remember to delete the value!


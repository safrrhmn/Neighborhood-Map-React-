

## Application Functionalties:

## Initial Load:
> This application loads with a default restaurents near Rockville, MD. Clicking on the Restaurent marker on the map will show the restaurent name and the location. All the general Google Map's functionalties exist as expected

## Sidebar and filtering:
> User can type the name of any restaurent which they want to search. It will do a fuzzy match and return a list of restaurent which matches the query. The map is also updated accordingly.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    components/
      Sidebar.js
      VenueList.js
      ListItems.js
    
```

## Available Scripts

### `npm install`

This will download all the necessary package and dependencies require for the package. If you do not have Node installed locally, please go [here](https://nodejs.org/en/)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`


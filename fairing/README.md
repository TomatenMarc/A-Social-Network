# Fairing

`fairing/` is the frontend of `solar/`, which was developed with [React](https://github.com/facebook/create-react-app) and [Semantic UI React](https://react.semantic-ui.com/).

This subproject can be extended arbitrarily and must always fall back on the backend `solar/`.

## Requirements

To install all dependencies in `package.json` one must use the following command:

    $ npm install

## Environment

Before one can start this project a environment file must be defined regarding the mode in which this project should operate in.

### Development

For the development mode of this project one must specify an `.env.development.local` file.
This file should include:

| Variable           | Use                                                          |
|:------------------:|:------------------------------------------------------------:|
| REACT_APP_API_URL  | Base URL of the backend API (http://localhost:8000)          |

### Production

For the production mode of this project one must specify an `.env.production.local` file.

This file must also be used when using `npm run build`.

This file should include:

| Variable           | Use                                                                                                                                    |
|:------------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|
| REACT_APP_API_URL  | Base URL of the backend API (Should be "" because fairing is served by nginx under [solar.marc-feger.de](https://solar.marc-feger.de)) |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

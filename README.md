This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This is a maze finder built using ReactJS.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Folder Structure
```bash
src
└── App
|   └── App.css
|   └── App.test.tsx
|   └── App.tsx
├── MazeControls
|   └── MazeControls.css
|   └── MazeControls.tsx
├── MazeDisplay
|   └── MazeDisplay.css
|   └── MazeDisplay.tsx
├── MazeMap
    └── MazeMap.css
    └── MazeMap.tsx
```
## More information
The app reads the list of mazes from mazes.JSON<br />
The state of the last game is saved in the local storage<br />
State management is done using Hooks

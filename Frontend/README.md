The web application is designed to visualize our firetracking demo. It is made with react and based on Material UI.

## Table of Contents

- [General information](#general-information)
- [Modules](#modules)
- [Start](#start)

## General information
Basically, from the initial page (route: /), one can view the team members via a click on the button “About the Team” or an manual change of the path (route: /team). Information about the project can again be received through a manual path change (route: /project) or by click on the related “About the Project” – button. Furthermore, a direct link to the related GitHup-repository (https://github.com/timedelaar/FireTracker) is opposed through another button and an option to start the demo is given.
The “About” components simply display information.
Within the Demo component, an image of the ground architecture is given with an outline of the lecture room. Besides, a textfield for each sensor is given. This received the sensor data from the server and as soon as they reach a certain threshold, a fire-icon will overlay the outline of the lecture room.

## Modules
The following npm-modules are included:

Material UI
Material UI is a set of react components that implement Google's material design.
Link: https://material-ui-1dab0.firebaseapp.com/

React Router
Through the router-module, the opportunity for declarative routing is given. Thus, rendering the different views operable through a menu component but remaining a single page application and preserving all the respective advantages is possible.
Link: https://github.com/ReactTraining/react-router

React Flexbox Grid
For the purpose of displaying a grid layout and arranging the single react components, the module react-flexbox-grid is used.
Link: https://github.com/roylee0704/react-flexbox-grid


## Start
The frontend of the tool is based on react-create-app while the backend is based upon Mobius 2.0.
The app can be started via using “cd”-command (change directory) in the terminal/cmd to the corresponding folder and then “npm start” at the input console.

**rounders** is a musical competition web app where users sign up and create profiles about themselves and their musical preferences. Users get the opportunity to accept and send out challenges to other users to face off in singing competitions with specific song choices. 

**Note**: this repository holds the frontend code of the application. Here is the [backend](https://github.com/mehtamanan/436-api).


# CPSC 436I
#### Team X - Pritpal Chauhan, Manan Mehta, Ruben Gonzalez, Jie Lu, Jason Smith
#### Hosted on [rounders.io](http://rounders.io/)

## Project Description
Our project is a musical competition web app where users sign up and create profiles about themselves and their musical preferences. Users get the opportunity to accept and send out challenges to other users to face off in singing competitions with specific song choices. In each face off, other users can vote on the winner. 

Users will upload videos of themselves performing songs which we will then store, alongside match up information, rankings, and profile items (challenge history, personal info, song preferences, etc.).

Depending on time constraints we can add additional functionality for different leader boards and we can extend the platform to include playing music too. If we don't have enough time, we can reduce features on the profile page, keeping the core functionality of challenges and voting.

## Project Task Requirements
### Minimal (definitely complete)
* User authentication (log in, sign up, onboarding) (DONE)
  * Create sign up and auth endpoints that return a token
  * Set up Redux to handle global auth management
  * Create UI screens using React with simple forms
* Ability to create challenges with song preferences (DONE)
  * Create a challenges endpoint that takes in 3 song choices and randomly matches a user with the challenge
  * Create a form to submit a challenge request with the ability to search and choose 3 song choices
* Ability to manage the challenges I've created (DONE)
  * Ability to see the challenges I've created
  * Ability to delete the challenges I've created
* Ability to see and accept challenges by other users (DONE)
  * Create a notifications endpoint to send the matched user a notification and another endpoint to receive the chosen song
  * Create user notifications to receive a challenge and the ability to pick one of the 3 given song choices
* Ability to upload challenge videos (DONE)
* Voting abilities for all users to determine winners (DONE)

### Standard (most likely complete)
* Basic profile with features to view how many wins, challenge history, and choose song preferences (DONE)
* Ability to view a list of challenges and accept them (DONE)
* Ability to follow singers and view profiles

### Stretch
* Ability to counter challenges with additional song preferences
* Extension to other challenge formats such as playing musical instruments (DONE)

## Tech Usage from Units 1-5
* Unit 1 - HTML, CSS, JS - JavaScript is used as the primary language in the web app while CSS is used to style all of the components. HTML isn't used directly, but is used as JSX in React. All three technologies form the core backbone of the project.
* Unit 2 - React, Redux - By using React and adhering to their best practices, we've created the web app with React by breaking down all pages into an aggregation of components with a parent-child pattern being followed in some locations. Using JavaScript packages such as moment and react-router we're able to handle times and routing throughout the project. Material UI is used as our component library to speed up development time for primitive components and to pass a theme object as context through the app. Redux is used to store global state and call async APIs using redux-thunk and follows Redux's best practices and is easily scalable to more API endpoints and components.
* Unit 3 - Mongo DB - Mongo is used as our database, with specific schemas set in our backend and validated before entering anything into the database to make sure it conforms to our dataset and nothing unexpected gets put into it.
* Unit 4 - Node, Express - Node and Express are used as our backend to create our API endpoints and follow best practices to create a scalable and secure backend, especially as we handle authentication ourselves. Mongoose is used as part of our backend to connect to our MongoDB and create specific schemas for our database and to aid in validation of POST/PUT requests.
* Unit 5 - Release Engineering - By using Amazon Web Services (AWS) and Docker we're able to deploy to our domain rounders.argv.io using continuous deployment practices.

## Above and Beyond
The project went above and beyond the basic requirements in a few ways:
* Integrating a third party API to get a list of songs and to create a quick search text input of those songs from the API
* The entire project is fully responsive with a mobile first mentality applied to the project and the post-prototype designs of the web app
* The deployment of the application using a continuous deployment pipeline and learning AWS and Docker instead of just Heroku

## Next Steps
To improve the web app further, we would extend the platform to have a musical instrument section that allows users to choose which instrument they would like to challenge users to with the song(s) of choice. In these instances we would need to find an API to give sheet music to users so that they're playing the same version of the song and roll out more instruments as we go along.

Another improvement would be incorporating leader boards and gamifying the experience to users. This would allow other users to see which singers are trending, which ones have won the most challenges, and allows users to develop reputations and followings.

## Contributions
* Manan - Led the backend and DevOps team by setting up Mongo DB, the schemas to be used, and the API endpoints. Deployed the app using AWS and Docker, and mentored the team in regards to NodeJS, Express, AWS, and creating scalable backend infrastructures.
* Pritpal - Set up the original project with the structure of the web app including Material UI and Redux. Alongside a few frontend changes, he primarily focused on the backend pair programming with Manan to create the Mongo DB, the backend infrastructure, create various API endpoints, and assisted with deploying the web app using AWS and Docker.
* Jie - Worked on the frontend of the landing page, profile page, and display challenges page. She primarily focused on the UI including calling the correct backend APIs as well as the CSS and styling for the webpage. Jie also assisted the team in writing backend APIs and communicated with teammates as needed.
* Jason - Worked on researching an appropriate API to use for song search and selection. He integrated the SDK into the application and assisted with the song creation integration and UI changes. He also assisted with integrating some of the teams API endpoints into the application and end-to-end testing. Jason worked with the frontend team to ensure his code was implemented coherently.
* Ruben - Developed several UI components and integrated them with the backend, as well as proactively reminded the team about deadlines and project requirements. Additionally, for several deliverables, Ruben merged everyone’s code together to ensure everyone’s contributions worked well together and achieved the features of the app; this involved solving merge conflicts, writing additional code to accomplish proper interaction among components, testing (as well as sometimes debugging) code.

## Prototypes
![Prototypes](./prototypes.jpg)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

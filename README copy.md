<h1 align="center">Netflix</h1>
<h5 align="center">Not the usual clone that you can find on the web.</h5><br/>

![Image of Fakeflix Project](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_readme.png)

https://user-images.githubusercontent.com/25078541/123811962-01474580-d8f4-11eb-83ba-66cded3f321f.mp4

<br/>

## 🎯 About


## :sparkles: Features


## :rocket: Technologies

- [TMDb API's](https://www.themoviedb.org/)
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Logger](https://github.com/LogRocket/redux-logger)
- [Reselect](https://github.com/reduxjs/reselect)
- [Firebase](https://firebase.google.com/)
- [SCSS](https://sass-lang.com/)
- [SwiperJS](https://swiperjs.com/react)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Netlify](https://www.netlify.com) (have a look below) and [Vercel](https://vercel.com/) for the deploy and CI.

## Netlify deploy & configuration

[![Netlify Status](https://api.netlify.com/api/v1/badges/14a32bbb-d899-445d-8fa6-8bed739c0296/deploy-status)](https://app.netlify.com/sites/fakeflix-app/deploys)

### Deploy configuration steps

1. Connect your GitHub account to Netlify
2. Select the project
3. In Settings → Build & Deploy → Set **Build command** to : **_npm run build_**
4. In Settings → Build & Deploy → Set **Publish directory** to : **_build_**
5. In Settings → Build & Deploy → Set **Environment variables** → Click on **Edit variables** and add yours (ie: TMBd's API key, Firebase configuration).
   <br/>

## 📸 Screenshots

**Sign In**
![Screenshot of Fakeflix Sign In](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/screenshots/Fakeflix_SignIn.jpg)
<br/>

**Sign Up**
![Screenshot of Fakeflix Sign Up](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/screenshots/Fakeflix_SignUp.jpg)
<br/>

**Homepage**
![Screenshot of Fakeflix Homepage](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/screenshots/Fakeflix_Home.jpg)
<br/>

**Modal Detail**
![Screenshot of Fakeflix Modal Detail](https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/screenshots/Fakeflix_DetailModal.jpg)
<br/>

**Mobile Experience**

https://user-images.githubusercontent.com/25078541/123543831-b8a35700-d750-11eb-84dc-b53e5a9a997a.mp4

<br/>

**Desktop Experience**

https://user-images.githubusercontent.com/25078541/123811962-01474580-d8f4-11eb-83ba-66cded3f321f.mp4

<br/>

## 👨🏻‍💻 Run Locally

- Clone the project

```bash
  git clone https://github.com/Th3Wall/Fakeflix
```

- Go to the project directory

```bash
  cd fakeflix
```

- Install dependencies

```bash
  npm install
```

- Create a .env file

- Request an API key from TMDB and them add it to the .env file

```
REACT_APP_API_KEY=REACT_APP_API_KEY
```

- Create a project inside Google Firebase and export the configuration

- Add the configuration inside the .env file created previously

```
REACT_APP_FIREBASE_API_KEY=REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMEMT_ID=REACT_APP_FIREBASE_MEASUREMEMT_ID
```

- Start the server

```bash
  npm start
```

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.
<br/>

## 📝 License

[MIT](https://github.com/Th3Wall/Fakeflix/blob/main/LICENSE)

<a href="https://www.buymeacoffee.com/th3wall" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="41" width="174" alt="Buy Me A Coffee" /></a>

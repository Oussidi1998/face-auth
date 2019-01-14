import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAJO7q9Q8qFh2uyfl1duC85QPidsyPdfJ4",
    authDomain: "react-auth-fbc08.firebaseapp.com",
    databaseURL: "https://react-auth-fbc08.firebaseio.com",
    projectId: "react-auth-fbc08",
    storageBucket: "react-auth-fbc08.appspot.com",
    messagingSenderId: "1064319571556"
};

const app = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {app,facebookProvider};
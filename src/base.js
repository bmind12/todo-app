import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';

const app = firebase.initializeApp({
      apiKey: "AIzaSyCLtIfjbnNOALWzBGX8yzovUQ6PpUU7FzE",
      authDomain: "todo-firebase-app.firebaseapp.com",
      databaseURL: "https://todo-firebase-app.firebaseio.com",
      projectId: "todo-firebase-app",
      storageBucket: "todo-firebase-app.appspot.com",
      messagingSenderId: "802856215336"
});
const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;
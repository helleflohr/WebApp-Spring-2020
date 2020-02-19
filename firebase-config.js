// My web app's Firebase configuration
const _firebaseConfig = {
    apiKey: "AIzaSyCuU7_EOzlF7zkCNnWLiVUiKcEvje5wJRY",
    authDomain: "tests-24d55.firebaseapp.com",
    databaseURL: "https://tests-24d55.firebaseio.com",
    projectId: "tests-24d55",
    storageBucket: "tests-24d55.appspot.com",
    messagingSenderId: "87292713865",
    appId: "1:87292713865:web:69008cb7a1bd31ab379f58"
};
// Initialize Firebase and database references
firebase.initializeApp(_firebaseConfig);
export const _firebaseDB = firebase.firestore();
// My web app's Firebase configuration
const _firebaseConfig = {
    // apiKey: "AIzaSyCuU7_EOzlF7zkCNnWLiVUiKcEvje5wJRY",
    // authDomain: "tests-24d55.firebaseapp.com",
    // databaseURL: "https://tests-24d55.firebaseio.com",
    // projectId: "tests-24d55",
    // storageBucket: "tests-24d55.appspot.com",
    // messagingSenderId: "87292713865",
    // appId: "1:87292713865:web:69008cb7a1bd31ab379f58"

    apiKey: "AIzaSyBUAGKJkWY-zx735_4nd5fEmtsK1Rc7VnM",
    authDomain: "webapp-partygames.firebaseapp.com",
    databaseURL: "https://webapp-partygames.firebaseio.com",
    projectId: "webapp-partygames",
    storageBucket: "webapp-partygames.appspot.com",
    messagingSenderId: "950138706773",
    appId: "1:950138706773:web:4859e493ee283961e0addc"
};
// Initialize Firebase and database references
firebase.initializeApp(_firebaseConfig);
export const _firebaseDB = firebase.firestore();
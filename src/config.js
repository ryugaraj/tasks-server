
const firebase = require('firebase')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_oipNquVXy-L3wpQjM201SD1rXmFIwA8",
  authDomain: "fansincorporated-1e4f5.firebaseapp.com",
  projectId: "fansincorporated-1e4f5",
  storageBucket: "fansincorporated-1e4f5.appspot.com",
  messagingSenderId: "29880366331",
  appId: "1:29880366331:web:e158587c5e3b3c5ea2ac5e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const User = db.collection("Users")
module.exports = User
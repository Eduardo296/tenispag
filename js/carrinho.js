import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const cart = getDatabase.ref('UserId');

cart.on('value', (snapshot) => {
    // Get the data as a JavaScript object
    const tenisData = snapshot.val();
  
    // Do something with the data
    console.log(tenisData); 
  });
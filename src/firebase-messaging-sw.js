importScripts("https://www.gstatic.com/firebasejs//8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyC2gXwWvZKZKYjvhpejS8oqk74s9vQO6R4",
  authDomain: "bubbly-mantis-353812.firebaseapp.com",
  projectId: "bubbly-mantis-353812",
  storageBucket: "bubbly-mantis-353812.appspot.com",
  messagingSenderId: "926104558696",
  appId: "1:926104558696:web:4cf5f0b60bb4c1f5242fdd",
  measurementId: "G-TGW4MTJ2WM",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

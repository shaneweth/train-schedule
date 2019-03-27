// Initialize Firebase
var config = {
    apiKey: "AIzaSyCdk3-ABzxsILhHD-gp3DFIrbupZ7Ghuio",
    authDomain: "train-sched-f0183.firebaseapp.com",
    databaseURL: "https://train-sched-f0183.firebaseio.com",
    projectId: "train-sched-f0183",
    storageBucket: "train-sched-f0183.appspot.com",
    messagingSenderId: "64946998531"
  };
  firebase.initializeApp(config);

  const preObject = document.getElementById("object");

  const dbRefObject = firebase.database().ref().child("object");

  // Sync obj changes
  dbRefObject.on("value", snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
  });
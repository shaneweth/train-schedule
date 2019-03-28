$(document).ready(function () {
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

    var database = firebase.database();

    // 2. Button for adding Employees
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var trainTime = moment($("#first-input").val().trim(), "HH:mm").format("X");
        var trainFreq = $("#freq-input").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            dest: trainDest,
            time: trainTime,
            freq: trainFreq
        };

        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.time);
        console.log(newTrain.freq);

        alert("Added the Train - I'll get rid of this dumb Alert soon");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#freq-input").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().train;
        var trainDest = childSnapshot.val().dest;
        var trainTime = childSnapshot.val().time;
        var trainFreq = childSnapshot.val().freq;

        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);

        var trainTimeMod = moment.unix(trainTime).format("X");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        //   var empMonths = moment().diff(moment(empStart, "X"), "months");
        //   console.log(empMonths);

        //   // Calculate the total billed rate
        //   var empBilled = empMonths * empRate;
        //   console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainTimeMod),
            // $("<td>").text(empMonths),
            $("<td>").text(trainTime),
            $("<td>").text(trainFreq)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });
})



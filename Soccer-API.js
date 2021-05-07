// Soccer Team Goals App

// require (native) Node HTTPS Module
const https = require("https")
// require express module
const express = require("express")
// create an express application
const app = express()
// create a listening port
const port = 3000


// parse the URL-encoded body of a POST request
app.use(express.urlencoded({extended: true})); 


// GET Request for the root (home) route 
app.get("/", function(req, res) { 
    res.sendFile(__dirname + "/index.html") // send the html file to the browser
})


// POST Request for the root (home) route
app.post("/", async function(req, res) { // specifying home route "/" from html <form> 
    // access and store data from index.html 
    const team = req.body.team; // <input name="cityName"> from index.html 
    const year = req.body.year; 
    // call the method to access and store the total amount of goals made by the team
    const totalGoals = await getTotalGoals(team, year);
    // send response from internal server back to client/browser
    res.write(` 
    <html><body style="background-color: #a7d0cd; color: #34656d;">
        <h1 style="text-align: center; line-height: 25rem;">` /* or 500 px*/
          + team + " scored a total of " + totalGoals + " goals in the year " + year +
        `</h1>
    </body></html>`);
    res.send(); // can only have one send() per app
    //res.end //end the response
}); 


// port listening
app.listen(port, function() {
    console.log("Port is running on port 3000.");
});


// a function that makes get request to the API in order to get the total page count
function getPages(endpoint, team) {
    // create an empty variable
    var body = "";
    // a Promise is used in order to return a value to an async function
    return new Promise(function(resolve, reject) { 
        // HTTPS GET request
        https.get((endpoint+team), res => {
            res.setEncoding('utf8');
            // retreive chunks of data and add to body
            res.on("data", data => {
                body += data;
            });
            // retreive compelete data
            res.on("end", () => {
                body = JSON.parse(body); // parse the JSON
                resolve(body.total_pages);  // here the value of goals is resolved then promised
            });
            res.on("error", (e) => {
                reject(e);
            });
        });
    });   
}


// a function that gets a score via a JSON data from an API
function getScore(endpoint, team, page) {
    // create some empty variables
    var body = "";
    let goals = 0;
    // a Promise is used in order to return a value to an async function
    return new Promise(function(resolve, reject) { 
        // HTTPS GET request 
        https.get((endpoint+team), res => {
            res.setEncoding('utf8');
            // retreive chunks of data and add to body
            res.on("data", data => {
                body += data;
            });
            // retreive compelete data
            res.on("end", () => {
                body = JSON.parse(body); // parse the JSON
                // iterate over the data array (data.length is the total amount of matches)
                for (var i = 0; i<body.data.length; i++) { 
                    // if the team is playing at home
                    if (team.includes("&team1=")) {
                        // add every goal made by team1 
                        goals += parseInt(body.data[i].team1goals);
                    }
                    // if the team is playing away
                    else if (team.includes("&team2=")) {
                       // add every goal made by team2 
                       goals += parseInt(body.data[i].team2goals);
                   }
                   // invalid team -> should not be triggered
                   else {
                       console.log("error, not a valid team.");
                   }
                }
                resolve(goals) // here the value of goals is resolved then promised
            });
            res.on("error", (e) => {
                reject(e);
            });
        });
    });   
}


// a function that implements the logic that counts the total scores of each team 
async function getTotalGoals(team, year) { // must use async/await in order to receive a value
    // complete url example:
    // https://jsonmock.hackerrank.com/api/football_matches?year=2011&team1=Barcelona&page=1 
    
    // create the base url
    let url = "https://jsonmock.hackerrank.com";
    // create a starting endpoint and add the year passed in by the user
    let endpoint = url + "/api/football_matches?year=" + year; // (url+endpoint)
    
    // create different variables to differentiate between home and away matches
    let team1 = "&team1=" + team; // home team (to be added to the endpoint)
    let team2 = "&team2=" + team; // visiting team (to be added to the endpoint)
    
    // create pages that will later be part of the endpoint
    let team1Pages = 0 //"&page=1"; 
    let team2Pages = 0 //"&page=1"; 
    // create a score count
    let totalGoals = 0;
    
    // get that total amount of pages available 
    team1Pages = await getPages(endpoint, team1); // use await to receive a "promised" value 
    team2Pages = await getPages(endpoint, team2);  
    // tally the total goals scored and store that number   
    totalGoals += await getScore(endpoint, team1, team1Pages); 
    totalGoals += await getScore(endpoint, team2, team2Pages);  
    // return the total amount of goals scored by the team
    return totalGoals; 
}
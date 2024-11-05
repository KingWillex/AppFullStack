var express = require("express");
var app = express();
// Routes GET requests to /olivia to the request handler
app.get(/^\/users\/(\d+)$/, function(request, response) {
    var userid = parseInt(request.params[0],10);
        // Sends a welcome message to the user's homepage.
        // Replace the userid with the actual user ID from the request.
 response.send("Welcome to user " +userid+" homepage!");
});

// If it is not a GET request, also servers a 404 error.
app.use(function(request, response) {
 response.status(404).send("Page not found!");
});

app.get("/search"
    , function(req, res) {
     if (req.query.q === "javascript-themed burrito") {
     res.send("Burrito search performed");
     } else {
     res.send("Another query and/or parameter");
     }
    });
    



// Starts the server on port 3000
app.listen(3000);

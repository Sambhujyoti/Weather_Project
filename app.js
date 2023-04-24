const express = require("express");
const https = require("node:https");
// const http = require("node:http");
const app = express();
const port = 3000;
const url = "https://api.openweathermap.org/data/2.5/weather?lat=22.31&lon=73.18&appid=9ad8d8737caf6d367e5dbc9bb6287329&units=metric";
// const locurl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=9ad8d8737caf6d367e5dbc9bb6287329";

app.get("/", (req, res) => {
    https.get(url, (response) => {
        // console.log(response);

        response.on("data", d => {
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const image = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + image + "@2x.png";
            res.write("<h1>The temperature in Vadodara is " + temp + " degree Celcius.</h1>");
            res.write("<h2>The weather is currently " + description + " in Vadodara.</h2>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });
    });

    // http.get(locurl, (resurl) => {cd 
    //     console.log(resurl);

    //     resurl.on("data", d => {
    //         const latLong = JSON.parse(d);
    //         console.log(latLong);
    //     });
    // });

});

app.listen(port, () => {
    console.log("The server is running at port " + port + "...");
});

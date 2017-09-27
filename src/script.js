/**
 * Created by gabriel on 2017-09-26.
 */

var http = require('http');
var request = require('request');
var html2json = require('html2json').html2json;

var url = 'https://shop.flixbus.com/search?route=Berlin-Delft&rideDate=01.10.2017&adults=1&children=0&bikes=0&_locale=en&departureCity=88&departureStation=&arrivalCity=3378&arrivalStation=&currency=EUR';
var res;

function wrapper(){
    request(url, function (error, response, body) {

        if(error)
            console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        var toMatch = "class=\"num\"";
        var index = body.indexOf(toMatch);

        this.res = parseInt(body.substr(index + toMatch.length + 1, 5));

        console.log(this.res);
    });
}

http.createServer(function (req, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    setInterval(wrapper, 60000); // checks every 60 sek

    response.write("" + this.res);

}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');


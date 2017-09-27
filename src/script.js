/**
 * Created by gabriel on 2017-09-26.
 */

var http = require('http');
var request = require('request');
var nodemailer = require('nodemailer');

// url is result from search page
var url = 'https://shop.flixbus.com/search?route=Berlin-Delft&rideDate=01.10.2017&adults=1&children=0&bikes=0&_locale=en&departureCity=88&departureStation=&arrivalCity=3378&arrivalStation=&currency=EUR';
var notifyIfLess = 60;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xxx', //  your email
        pass: 'xxx'   // your pass
    }
});

var mailOptions = {
    from: 'FlixbusChecker',
    to: 'xxx',  // retriever of the email
    subject: 'Price drop for Flixbus! Now: ',
    text: 'Best regards from FlixbusChecker :)'
};

function sendMailWrap() {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }
)}

function requestWrap(){
    request(url, function (error, response, body) {
        if(error) {
            console.log('error:', error); // Print the error if one occurred
        }
        console.log('statusCode:', response && response.statusCode);

        var toMatch = "class=\"num\"";
        var index = body.indexOf(toMatch);
        var price = parseInt(body.substr(index + toMatch.length + 1, 5));

        console.log("Price: " + price);

        if(price < notifyIfLess) {
            mailOptions.subject += price + ' €';
            notifyIfLess = price;
            console.log('Less than set to = ' + notifyIfLess);

            sendMailWrap();
        }
    });
}
setInterval(requestWrap, 60000); // checks price every given ms

/*http.createServer(function (req, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('Create server');


    response.write('Running FlixbusChecker');
    response.end('');

    console.log('Server running at http://127.0.0.1:8889/');

 }).listen(8889);
*/


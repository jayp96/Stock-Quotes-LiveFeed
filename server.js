/*'use strict';*/



////
// CONFIGURATION SETTINGS
////
var GET_INTERVAL = 4000;
var PRINT_JSON = true;

////
// START
////
var tickers = "NSE:DABUR,ACC,ABB,MARUTI";//"AAPL,GOOG"; /*,GOOGL,YHOO,TSLA,INTC,AMZN,BIDU,ORCL,MSFT,ORCL,ATVI,NVDA,GME,LNKD,NFLX";*/
var express = require('express');
var http = require('http');
var https = require('https');
var io = require('socket.io');
var cors = require('cors');

function getQuote(socket, tickers) {
    https.get({
        port: 443,
        method: 'GET',
        hostname: 'www.google.com',
        path: '/finance/info?client=ig&q=' + tickers,
        timeout: 1000
    }, function(response) {
        response.setEncoding('utf8');
        var data = '';

        response.on('data', function(chunk) {
            data += chunk;

        });

        response.on('end', function() {
            if(data.length > 0) {
                var dataObj;

                try {
                    dataObj = JSON.parse(data.substring(3));
                } catch(e) {
                    return false;
                }

                var i =0;
                var quote = [];

                for(i in dataObj){
                    var key = i;
                    quote.push( {
                        ticker : dataObj[i].t,
                        exchange : dataObj[i].e,
                        price : dataObj[i].l_cur, // jshint ignore:line
                        change : dataObj[i].c,
                        change_percent : dataObj[i].cp, // jshint ignore:line
                        //last_trade_time : dataObj[i].lt, // jshint ignore:line
                        //dividend : dataObj[i].div,
                        //yield : dataObj[i].yld
                    });}

                    socket.emit(tickers, PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote.ticker));

            }
        });
    });
}

function trackTicker(socket, tickers) {
    // run the first time immediately
    getQuote(socket, tickers);

    // every N seconds
    var timer = setInterval(function() {
        getQuote(socket, tickers);
    }, GET_INTERVAL);

    socket.on('disconnect', function () {
        clearInterval(timer);
    });
}

var app = express();
app.use(cors());
var server = http.createServer(app);

var io = io.listen(server);
io.set('origins', '*:*');

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/Views/index.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('ticker', function(tickers) {
        console.log("A person connected");
        trackTicker(socket, tickers);
    });
});

server.listen(process.env.PORT || 3000);

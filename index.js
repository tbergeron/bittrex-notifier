var settings = {
    delay : 15, // minutes
    verbose: true,
    warning_threshold : 1.10, // 1.%%
    invested_markets : [
        {
            'market_name' : 'BTC-UTC',
            'my_bid' : 0.00001163
        },
        {
            'market_name' : 'BTC-EKN',
            'my_bid' : 0.00004600
        },
        {
            'market_name' : 'BTC-XEM',
            'my_bid' : 0.00000062
        }
    ]
};

var colors = require('colors'),
    request = require('request');

var host = 'http://bittrex.brainpad.org',
    markets_api_uri = '/api/get_markets',
    market_summary_api_uri = '/api/get_market_summary/';

// every /delay/ minutes execute the loop
setInterval(function() {
    checkUpdates();
}, calculateDelay());

// intial run
checkUpdates();

function checkUpdates() {
        v('');
        v(now().cyan);
        v('');
        settings.invested_markets.forEach(function(market) {
        getCurrentMarketDetails(market.market_name, function(details) {
            // calculate change percentage
            var diff = details.Last / market.my_bid;
            v(market.market_name.bold + ' ' + colorizePercentage(diff) + ' ' + details.Last.toFixed(8) + ' / ' + market.my_bid.toFixed(8));
            // if percentage is higher than warning threshold, notify
            if (diff > settings.warning_threshold) {
                console.log('[*] ' + 'PROFITS!!!'.rainbow.bgWhite + ' ' + market.market_name + ' is ' + diff.toFixed(0) + 'x! (' + details.Last.toFixed(8) + '/' + market.my_bid.toFixed(8) + ') @ ' + now());
            }
        });
    });
}

function calculateDelay() {
    var calulated_delay = settings.delay * 60 * 1000;
    v('Delay is set to run every ' + settings.delay + ' min(s) (' + calulated_delay + ' ms).');
    return calulated_delay;
}

function getCurrentMarketDetails(market_name, done) {
    request(host + market_summary_api_uri + market_name, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.success) {
                done(data.result[0]);
            } else {
                done(false);
            }
        }
    });
}

function now() {
    return new Date().toLocaleString();
}

function v(msg) {
    if (settings.verbose) {
        console.log('[v] ' + msg);
    }
}

function colorizePercentage(percentage) {
    var split_percentage = percentage.toFixed(2).toString().split('.'),
        decimals = split_percentage[1],
        difference = 100 - decimals,
        difference = difference.toString(),
        difference = (difference.length == 1) ? difference + ' ' : difference,
        operator = '';

    if (percentage > 1) {
        operator = '+';
        return ' '.bgWhite + operator.bgWhite.green + difference.bgWhite.green + '%'.bgWhite.green + ' '.bgWhite;
    } else {
        operator = '-';
        return ' '.bgWhite + operator.bgWhite.red + difference.bgWhite.red + '%'.bgWhite.red + ' '.bgWhite;
    }
}
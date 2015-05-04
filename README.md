# bittrex-notifier
Know when your coins goes UP!
Built with Node.js 
(don't forget to run `npm install` before trying to run this script)

# Config example

```
var settings = {
    delay : 15, // check every X minutes
    verbose: true, // shows more info
    warning_threshold : 1.20, // % you want to be notified (1.20 = 20% higher)
    invested_markets : [
        {
            'market_name' : 'BTC-UTC', // Market name on BITTREX (i.e. BTC-UTC = Ultracoin)
            'my_bid' : 0.00000600 // Price you paid and want to get higher than
        }
    ]
};
```

# How to run
`node index.js`

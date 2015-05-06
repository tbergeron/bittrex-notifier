# bittrex-notifier
Know when your coins goes UP!

Built with Node.js 

(don't forget to run `npm install` before trying to run this script)

# settings.json example

```
{
    "delay" : 15, // check every X minutes
    "verbose" : true, // shows more info
    "warning_threshold" : 1.10, // % you want to be notified (1.20 = 20% higher)
    "invested_markets" : [
        {
            "market_name" : "BTC-UTC", // Market name on BITTREX (i.e. BTC-UTC = Ultracoin)
            "my_bid" : 0.00001163 // Price you paid and want to get higher than
        },
        {
            "market_name" : "BTC-EKN",
            "my_bid" : 0.00004600
        },
        {
            "market_name" : "BTC-XEM",
            "my_bid" : 0.00000062
        }
    ]
}

```

# How to run
- `touch settings.json`
- fill `settings.json` (see config ^^)
- `npm install`
- `node index.js`

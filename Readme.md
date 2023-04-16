# SevenSeas-js

API wrapper for https://sevenseas.exchange

## Installation

## Usage

    import SevenSeas from 'seven-seas-js'
    const sevenSeas = new SevenSeas(process.env.KEY, process.env.SECRET)
    
    // get markets
    const markets = await sevenSeas.fetchAllMarkets();

    // get one market
    const market = await sevenSeas.fetchOneMarket('xmr-btc');

    // get history
    const history = await sevenSeas.tradeHistory('xmr-btc');

    // get order boos
    const ordersBook = await sevenSeas.ordersBook('xmr-btc');
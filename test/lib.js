import test from 'node:test';
import * as assert from "assert";

import CryptoJS from 'crypto-js';
import crypto from 'node:crypto';

import dotenv from 'dotenv'
dotenv.config()

import SevenSeas from '../src/seven-seas.js'

const sevenSeas = new SevenSeas(process.env.KEY, process.env.SECRET)


test('fetch all markets', {skip: true}, async (t) => {

    const markets = await sevenSeas.fetchAllMarkets();

    assert.strictEqual(markets.length > 10, markets.length > 10);
});

test('fetch one market - BTC-XMR', {skip: true}, async (t) => {

    const market = await sevenSeas.fetchOneMarket('xmr-btc');

    assert.strictEqual(market['symbol'], market['symbol'])
});

test('fetch history of market', {skip: true}, async (t) => {

    const history = await sevenSeas.tradeHistory('xmr-btc');

    assert.strictEqual(history.length > 4, history.length > 4)
});

test('fetch orders book of market', {skip: true}, async (t) => {

    const ordersBook = await sevenSeas.ordersBook('xmr-btc');

    assert.strictEqual(history.length > 4, history.length > 4)
});

test('test private method fetchAccountBalance', {skip: true}, async (t) => {
    const balance = await sevenSeas.fetchAccountBalance('btc');

    console.log(balance)
});

test('test private method fetchAccountBalances', {skip: true}, async (t) => {
    const balance = await sevenSeas.fetchAccountBalances();

    console.log(balance)
});

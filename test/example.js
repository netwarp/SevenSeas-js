import SevenSeas from '../src/seven-seas.js';
import dotenv from 'dotenv';
dotenv.config();

const sevenSeas = new SevenSeas(process.env.KEY, process.env.SECRET);

/*
const balances = await sevenSeas.fetchAccountBalances()
console.log(balances)
*/

/*
const balance = await sevenSeas.fetchAccountBalance('btc')
console.log(balance)
*/

/*
const orders = await sevenSeas.getAllOrders()
console.log(orders)
*/
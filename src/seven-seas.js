import CryptoJS from 'crypto-js'

class SevenSeas {

    /**
     *
     * @param {string} SEVEN_SEAS_API_KEY  - API secret
     * @param {string } SEVEN_SEAS_SECRET_KEY  - API secret
     */
    constructor(SEVEN_SEAS_API_KEY , SEVEN_SEAS_SECRET_KEY ) {
        this.ssx_url = 'https://www.sevenseas.exchange/api/v1';

        this.SEVEN_SEAS_API_KEY = SEVEN_SEAS_API_KEY;
        this.SEVEN_SEAS_SECRET_KEY = SEVEN_SEAS_SECRET_KEY;
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async fetchAllMarkets() {
        try {
            const response = await fetch(`${this.ssx_url}/markets`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<void>}
     */
    async fetchOneMarket(market) {
        try {
            const response = await fetch(`${this.ssx_url}/markets/${market}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    }

    /**
     *
     * @param {string} market -- example BTC-USDT
     * @returns {Promise<void>}
     */
    async tradeHistory(market) {
        try {
            const response = await fetch(`${this.ssx_url}/history/${market}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    }

    /**
     *
     * @param {string} market
     * @returns {Promise<void>}
     */
    async ordersBook(market) {
        try {
            const response = await fetch(`${this.ssx_url}/orders/${market}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching market data:", error);
        }
    }

    async signAndFetchRequest(method, uri, body = '') {
        const contentHash = CryptoJS.SHA512(body).toString(CryptoJS.enc.Hex);
        const timestamp = Date.now();
        const preSign = [timestamp, uri, method].join("");
        const signature = CryptoJS.HmacSHA512(preSign, this.SEVEN_SEAS_SECRET_KEY).toString(CryptoJS.enc.Hex);

        let response;

        if (method === "GET") {
            const preSign = [timestamp, uri, method].join("");
            const signature = CryptoJS.HmacSHA512(preSign, this.SEVEN_SEAS_SECRET_KEY).toString(CryptoJS.enc.Hex);
            response = await fetch(`${uri}`, {
                method,
                headers: {
                    "api-key": this.SEVEN_SEAS_API_KEY,
                    "api-timestamp": timestamp.toString(),
                    "api-signature": signature,
                },
            });
        } else if (method === "POST") {
            console.log("body:", body);
            const contentHash = CryptoJS.SHA512(body).toString(CryptoJS.enc.Hex);
            const preSign = [timestamp, uri, method, contentHash].join("");
            const signature = CryptoJS.HmacSHA512(preSign, this.SEVEN_SEAS_SECRET_KEY).toString(CryptoJS.enc.Hex);
            response = await fetch(`${uri}`, {
                method,
                headers: {
                    "api-key": this.SEVEN_SEAS_API_KEY,
                    "api-timestamp": timestamp.toString(),
                    "api-signature": signature,
                    "api-content-hash": contentHash,
                    "Content-Type": "application/json",
                },
                body,
            });
        } else {
            console.error("Unsupported method:", method);
            return;
        }

        if (response.ok) {
            return response.json();
        } else {
            console.error("Error Code:", response.status);
            console.log(response.error());
        }
    }

    async fetchAccountBalance(currency) {
        const method = "GET";
        const endpoint = `/account/balance/${currency}`;
        const uri = `${this.ssx_url}${endpoint}`;
        const data = await this.signAndFetchRequest(method, uri);
        return data;
    }

    async fetchAccountBalances() {
        const method = "GET";
        const endpoint = `/account/balances`;
        const uri = `${this.ssx_url}${endpoint}`;
        const data = await this.signAndFetchRequest(method, uri);
        return data;
    }

    async createOrder(market, side, price, quantity) {
        const method = "POST";
        const endpoint = `/create_order`;
        const uri = `${this.ssx_url}${endpoint}`;

        const body = JSON.stringify({
            market,
            side,
            price,
            quantity,
        });

        const data = await this.signAndFetchRequest(method, uri, body);
        return data;
    }

    async getAllOrders() {
        const method = "GET";
        const endpoint = `/account/orders`;
        const uri = `${this.ssx_url}${endpoint}`;
        const data = await this.signAndFetchRequest(method, uri);
        return data;
    }

    /**
     *
     * @param {string} market
     */
    async getAllOrdersForMarket(market) {
        const method = "GET";
        const endpoint = `/account/orders/${market}`;
        const uri = `${this.ssx_url}${endpoint}`;

        const data = await this.signAndFetchRequest(method, uri);
        return data;
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<void>}
     */
    async getOrderById(id) {
        const method = "GET";
        const endpoint = `/account/order/${id}`;
        const uri = `${this.ssx_url}${endpoint}`;

        const data = await this.signAndFetchRequest(method, uri);
        return data;
    }

    /**
     *
     * @param {string} orderId
     * @returns {Promise<void>}
     */
    async cancelOrder(orderId) {
        const method = "POST";
        const endpoint = `/cancel_order`;
        const uri = `${this.ssx_url}${endpoint}`;

        const body = JSON.stringify({
            orderId,
        });

        const data = await this.signAndFetchRequest(method, uri, body);
        return data;
    }
}

export default SevenSeas;

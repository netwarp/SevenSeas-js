class SevenSeas {

    /**
     *
     * @param {string} key - API secret
     * @param {string} secret - API secret
     */
    constructor(key, secret) {
        this.ssx_url = 'https://www.sevenseas.exchange/api/v1';

        this.key = key;
        this.secret = secret;
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
}

export default SevenSeas;

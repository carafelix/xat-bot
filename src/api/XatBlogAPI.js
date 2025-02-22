export class XatBlogAPI {
    constructor() {
        this.baseUrl = 'https://api.xatblog.net/';
    }

    /**
     * Sends a GET request to the XatBlog API.
     * @param {string} path - Endpoint
    */
    async sendRequest (path) {
        try {
            const response = await fetch(`${this.baseUrl}${path}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }

            const data = await response.json();
            return data || { error: 'Failed to decode JSON response' };
        } catch (error) {
            return { error: 'Failed to send request' };
        }
    }

    // API methods
    async latest () { return await this.sendRequest('latest'); }
    async prices () { return await this.sendRequest('prices'); }
    async countdown () { return await this.sendRequest('countdown'); }
    async promoted () { return await this.sendRequest('promoted'); }
    async activePawns () { return await this.sendRequest('activepawns'); }
    async regToId (username) { return await this.sendRequest(`reg2id/${username}`); }
    async idToReg (id) { return await this.sendRequest(`id2reg/${id}`); }
    async namePrice (username) { return await this.sendRequest(`nameprice/${username}`); }
    async chatPrice (chatname) { return await this.sendRequest(`chatprice/${chatname}`); }
    async chatInfo (chatname) { return await this.sendRequest(`chatinfo/${chatname}`); }
    async powerSearch (powername) { return await this.sendRequest(`powersearch/${powername}`); }
    async powerInfo (powername) { return await this.sendRequest(`powerinfo/${powername}`); }
    async powerLogs (powername) { return await this.sendRequest(`powerlogs/${powername}`); }
    async promoPrice (hours, language = 'en') { return await this.sendRequest(`promoprice/${hours}/${language}`); }
    async daysToXats (amount) { return await this.sendRequest(`dx/${amount}`); }
    async xatsToDays (amount) { return await this.sendRequest(`x2d/${amount}`); }
    async verifyBanner (url) { return await this.sendRequest(`verifybanner/${url}`); }
    async userGifts (userOrId) { return await this.sendRequest(`usergifts/${userOrId}`); }
    async jinxList (powername = null) { return await this.sendRequest(powername ? `jinxlist/${powername}` : 'jinxlist'); }
}
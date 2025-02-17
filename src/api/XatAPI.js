export class XatAPI {
    constructor() {
        this.baseUrl = 'https://xat.com/';
    }

    /**
     * Sends a GET request to xat.
     * @param {string} path - Endpoint
    */
    async sendRequest(path) {
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

    /** 
     * Gets the chat info.
     * @param {string} chatname - Chat name
     * @returns {Promise<Object>}
    */
    async chatInfo(chatname) { return await this.sendRequest(`web_gear/chat/roomid.php?d=${chatname}`); }
}
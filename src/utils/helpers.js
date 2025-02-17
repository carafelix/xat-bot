/**
 * Converts XML data to an array of packets.
 * @param {string} data
 * @returns {string}
*/
export const xmlToArray = (data) => {
    const packets = [];
    const regex = /<(.*?)\/>/g;
    let match;

    while ((match = regex.exec(data)) !== null) {
        const packet = match[1];
        const [type, ...attrs] = packet.split(' ');

        if (packet.includes('<')) continue;

        const values = {};
        const attrRegex = /([a-z0-9]+)="(.*?)"/gi;
        let attrMatch;

        while ((attrMatch = attrRegex.exec(attrs.join(' '))) !== null) {
            values[attrMatch[1]] = unsanitize(attrMatch[2].trim());
        }

        packets.push([type, values]);
    }

    return packets;
};

/**
 * Sanitizes the data.
 * @param {string} data
 * @returns {string}
*/
export const sanitize = (data) => {
    return data
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

/**
 * Unsanitizes the data.
 * @param {string} data
 * @returns {string}
*/
export const unsanitize = (data) => {
    return data
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
};

/**
 * Fixes the user id.
 * @param {string} id
 * @returns {number}
*/
export const parseUser = (id) => {
    return parseInt(
        id.includes('_')
            ? id.split('_')[0]
            : id
    );
}
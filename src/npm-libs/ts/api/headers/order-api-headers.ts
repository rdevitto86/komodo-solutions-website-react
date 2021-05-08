type StringType = string | null;

/**
 * builds headers for Order API requests
 * @version 1.0.0
 * @extends Headers
 */
export default class OrderAPIHeaders extends Headers {
    /**
     * @param {StringType} token access token
     * @param {StringType} clientID session identifier
     * @returns {Headers} populated request headers
     */
    constructor(token: StringType, clientID: StringType) {
        super({
            'accept': 'application/json',
            'content-type:': 'application/json',
            'authorization': `Bearer ${token}`,
            'client-id': `${clientID}`
        });
    }
}

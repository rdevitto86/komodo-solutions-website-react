/* eslint-disable class-methods-use-this */
import ExceptionFactory from '../../../../core/services/exceptions/ExceptionFactory';

/**
 * @private
 * @readonly
 * @constant {RegExp} URL_REGEX
 * @description regex that checks URL validity
 * @example
 * 'https://www.sample.com'
 * 'https://www.west-sample.com:443/xyz'
 * 'https://www.test.sample.io/xyz?abc=dkd&p=q&c=2'
 */
// const URL_REGEX = Object.freeze(new RegExp());

/**
 * @private
 * @function _validURL
 * @description validates a HTTPS URL string
 * @param {String} url URL to validate
 * @returns {Boolean} true/false
 */
const isValidURL = (url: string) => (typeof url === 'string'); // TODO - add Regex

/**
 * @class
 * @version 1.0
 * @description service wrapper for REST HTTPS operations
 */
export default class HTTPS {
    /**
     * @public
     * @async
     * @function HTTPS.GET
     * @description executes a GET request
     * @param {String} url service URL
     * @returns {Promise<Any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async GET(url: string): Promise<any> {
        if (!isValidURL(url)) {
            throw ExceptionFactory.build(400, 'invalid URL');
        }
        return fetch(url, { method: 'GET' });
    }

    /**
     * @public
     * @async
     * @function HTTPS.POST
     * @description executes a POST request
     * @param {Request} request HTTPS request
     * @returns {Promise<Any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async POST(request: Request): Promise<any> {
        if (!(request instanceof Request) || request.method !== 'POST') {
            throw ExceptionFactory.build(400, 'invalid request');
        }
        if (!isValidURL(request.url)) {
            throw ExceptionFactory.build(400, 'invalid URL');
        }
        return fetch(request);
    }

    /**
     * @public
     * @async
     * @function HTTPS.PUT
     * @description executes a PUT request
     * @param {Request} request HTTPS request
     * @returns {Promise<Any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async PUT(request: Request): Promise<any> {
        if (!(request instanceof Request) || request.method !== 'PUT') {
            throw ExceptionFactory.build(400, 'invalid request');
        }
        if (!isValidURL(request.url)) {
            throw ExceptionFactory.build(400, 'invalid URL');
        }
        return fetch(request);
    }

    /**
     * @public
     * @async
     * @function HTTPS.DELETE
     * @description executes a DELETE request
     * @param {Request} request HTTPS request
     * @returns {Promise<Any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async DELETE(request: Request): Promise<any> {
        if (!(request instanceof Request) || request.method !== 'DELETE') {
            throw ExceptionFactory.build(400, 'invalid request');
        }
        if (!isValidURL(request.url)) {
            throw ExceptionFactory.build(400, 'invalid URL');
        }
        return fetch(request);
    }

    /**
     * @public
     * @async
     * @function HTTPS.HEAD
     * @description executes a HEAD request
     * @param {String} url service URL
     * @returns {Promise<Any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async HEAD(url: string): Promise<any> {
        if (!isValidURL(url)) {
            throw ExceptionFactory.build(400, 'invalid URL');
        }
        return fetch(url, { method: 'HEAD' });
    }
}

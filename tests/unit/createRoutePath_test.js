'use strict'

const path = require('path');
const createReoutePath = require('../../lib/createRoutePath');
const { basePath, apiVersion} = require('../../config.json');


describe('createRoutePath', () => {
    it('creates a new, lower-case route from base path, api version, and any given string', () => {
        const validString = 'someString';
        const endPoint = createReoutePath(validString);

        expect(typeof endPoint).toBe( 'string');
        expect(endPoint).toMatch(basePath);
        expect(endPoint).toMatch(apiVersion);
        expect(endPoint).toMatch(validString.toLowerCase());
    });
    it('includes base path and api version', () => {
        const notaString = {'key': 1, 'key2': [1, 2, '3']};
        try {
            createReoutePath(notaString);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe('input must be a string');
        }
    });
});

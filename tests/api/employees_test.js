'use strict';
const path = require('path');
const {basePath, apiVersion} = require('../../config.json');
let server;

const request = require('supertest');
const baseURL = 'http://localhost:3000' + path.join(basePath, apiVersion);

beforeAll(async () => {
    server = await require('../../src/server');
    console.log('server started');
});
afterAll(async () => {
    await server.close();
    console.log('server closed');
});

describe('GET /employees', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/employees');

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it('should return employees', async () => {
        const response = await request(baseURL).get('/employees');

        expect(response.body.length >= 1).toBe(true);
    });
});
describe('GET /employees?role=1', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/employees?role=1');

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it('should return employees filtered by role (job_id)', async () => {
        const unfilteredResponse = await request(baseURL).get('/employees');
        const filteredResponse = await request(baseURL).get('/employees?role=1');

        expect(filteredResponse.body.length >= 1).toBe(true);
        expect(filteredResponse.body.length).toBeLessThan(unfilteredResponse.body.length);
    });
});

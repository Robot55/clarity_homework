'use strict';
const path = require('path');
const {basePath, apiVersion} = require('../../config.json');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
let server;

const request = require('supertest');
const baseURL = 'http://localhost:3000' + path.join(basePath, apiVersion);

const validEmployeeData = {
    name: 'test user',
    email: 'dummy@test.com',
}

const missingEmployeeData = {
    name: 'dummy bad test employee'
}
const invalidEmployeeData = {
    name: 'dummy bad test employee',
    email: 'badDummy@test.com',
    invalidkey: 'this should return error'
}
beforeAll(async () => {
    server = await require('../../src/server');
    console.log('server started');
});
afterAll(async () => {
    await server.close();
    console.log('server closed');
});

describe('GET /employee/:id', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/employee/2');

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it('should return a single employee', async () => {
        const response = await request(baseURL).get('/employee/2');

        expect(Array.isArray(response.body)).toBe(false);
        expect(response.body.id).toBeTruthy();
        expect(response.body.job_id).toBeTruthy();
        expect(response.body.email).toBeTruthy();
    });
});
describe('POST /employee', () => {
    beforeEach(async () => {
        let testUser = await prisma.user.deleteMany({where: {
                name: 'test user',
            }});
        console.log('test user deleted:', testUser.name);
    })
    it('should return 200 when passed valid payload data', async () => {
        const response = await request(baseURL).post('/employee').send(validEmployeeData);

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it('should create new user in db when passed valid data', async () => {
        const response = await request(baseURL).post('/employee').send(validEmployeeData);
        const user = await prisma.user.findFirst({where: {name: 'test user'}});

        expect(user).toBeTruthy();
        expect(response.body).toBeTruthy();
        expect(user.name).toMatch('test user');
    });
    it('should return 400 when passed data with missing required items', async () => {
        const response = await request(baseURL).post('/employee').send(missingEmployeeData);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
    it('should return 400 when passed data with items not matching the model schema', async () => {
        const response = await request(baseURL).post('/employee').send(invalidEmployeeData);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBeTruthy();
    });
});

describe('DELETE /employee/:id', () => {
    let testUserId;
    beforeEach(async () => {
        const user = await prisma.user.findMany({where: {name: 'test user'}});
        if (user) {
            await prisma.user.deleteMany({where: {name: 'test user'}});
        }

        let testUser = await prisma.user.create({
            data: validEmployeeData
        });
        console.log('test user created:', testUser);
        testUserId = testUser.id;
    })
    afterEach(async () => {
        const user = await prisma.user.findFirst({where: {id: Number(testUserId)}});
        if (user) {
            const testUser = await prisma.user.delete({where: {id: Number(testUserId)}});
            console.log('test user deleted:', testUser.name);
        }
    })
    it('should return 200 when passed valid user id', async () => {
        const response = await request(baseURL).delete(`/employee/${testUserId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it('should delete the user from the db when passed valid data', async () => {
        let user = await prisma.user.findFirst({where: {id: Number(testUserId)}});

        //assert user exists in db before deleting
        expect(user).toBeTruthy();
        expect(user.id).toBe(Number(testUserId));

        const response = await request(baseURL).delete(`/employee/${testUserId}`);
        user = await prisma.user.findFirst({where: {name: 'test user'}});

        expect(user).toBeFalsy();
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBe(testUserId);
    });
    it('should return 404 when passed data with missing :id param', async () => {
        const response = await request(baseURL).delete('/employee')

        expect(response.statusCode).toBe(404);
        expect(response.error).toBeTruthy();
        expect(response.error.message).toMatch('cannot DELETE');

    });
});


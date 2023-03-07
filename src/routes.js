const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ERROR_MSG = 'API call returned with error';

const router = express.Router();
/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     description: Create a new employee with the given name, email, employment start date and job ID
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - employment_start_date
 *               - job_id
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               employment_start_date:
 *                 type: string
 *                 format: date
 *               job_id:
 *                 type: integer
 *             example:
 *               name: John Smith
 *               email: john.smith@example.com
 *               employment_start_date: 2022-01-01
 *               job_id: 1
 *     responses:
 *       '200':
 *         description: The created employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 */
router.post(`/employee`, async (req, res) => {
    const { name, email, employment_start_date, job_id } = req.body;

    try {
        const result = await prisma.user.create({
            data: {
                name,
                email,
                employment_start_date,
                job_id,
            },
        });
        res.json(result);
    } catch (e) {
        res.json({ message: ERROR_MSG, error: e });
    }
});

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an existing employee
 *     description: Update an existing employee with the given ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               employment_start_date:
 *                 type: string
 *                 format: date
 *               job_id:
 *                 type: integer
 *             example:
 *               name: John Smith
 *               email: john.smith@example.com
 *               employment_start_date: 2022-01-01
 *               job_id: 1
 *     responses:
 *       '200':
 *         description: The updated employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 */
router.put('/employee/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employeeData = await prisma.user.findUnique({ where: { id: Number(id) } });
        const updatedEmployee = await prisma.user.update({
            where: { id: Number(id) || undefined },
            data: req.body,
        });
        res.json({
            message: `user [id:${id}] updated`,
            before_update: employeeData,
            after_update: updatedEmployee,
        });
    } catch (e) {
        res.json({ message: ERROR_MSG, error: e });
    }
});

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an existing employee
 *     description: Delete an existing employee with the given ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       '200':
 *         description: The deleted employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 */
router.delete(`/employee/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(employee);
    } catch (e) {
        res.json({ message: ERROR_MSG, error: e });
    }
});

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of employees
 *     description: Get a list of all employees, or filtered by job ID
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: integer
 *         description: Filter employees by job ID
 *     responses:
 *       '200':
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 */
router.get('/employees', async (req, res) => {
    const { role } = req.query;

    if (!role || !Number(role)) {
        const employees = await prisma.user.findMany();
        res.json(employees);
    } else {
        try {
            const employees = await prisma.user.findMany({
                where: {
                    job_id: Number(role),
                },
            });
            res.json(employees);
        } catch (e) {
            res.json({ message: ERROR_MSG, error: e });
        }
    }
});

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get a list of all roles
 *     description: Get a list of all roles
 *     tags:
 *       - Role
 *     responses:
 *       '200':
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: API call returned with error
 *               error: 'Error message'
 */
router.get('/roles', async (req, res) => {
    const roles = await prisma.role.findMany();
    res.json(roles);
});


module.exports = router;

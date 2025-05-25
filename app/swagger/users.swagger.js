/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User related operations
 */

/**
 * @swagger
 * /api/user/admin/toggleUserByAdmin:
 *   patch:
 *     summary: Toggle user status by admin
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to toggle status
 *     responses:
 *       200:
 *         description: User status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request (not admin or user not found or invalid role)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/admin/getAllEmployeeByAdmin:
 *   get:
 *     summary: Get all employees by admin
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination (default 1)
 *       - in: query
 *         name: rowPerPageLimit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of rows per page (default 10)
 *     responses:
 *       200:
 *         description: List of employees fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalUser:
 *                   type: integer
 *       400:
 *         description: Bad request (not admin or user not found)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/admin/getAllFreelancersByAdmin:
 *   get:
 *     summary: Get all freelancers by admin
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination (default 1)
 *       - in: query
 *         name: rowPerPageLimit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of rows per page (default 10)
 *     responses:
 *       200:
 *         description: List of freelancers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalUser:
 *                   type: integer
 *       400:
 *         description: Bad request (not admin)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/admin/adminSystemData:
 *   get:
 *     summary: Get admin system data summary
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Admin system data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 totalEmployer:
 *                   type: integer
 *                 totalFreelancer:
 *                   type: integer
 *                 totalContracts:
 *                   type: integer
 *                 totalMileStone:
 *                   type: integer
 *                 totalPaymentHistory:
 *                   type: integer
 *       400:
 *         description: Bad request (not admin or user not found)
 *       500:
 *         description: Internal server error
 */

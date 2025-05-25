/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: API endpoints
 */


/**
 * @swagger
 * /api/contracts/createContract:
 *   post:
 *     summary: Create a Contract by Employer
 *     tags:
 *       - Contracts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               job_id:
 *                 type: integer
 *                 example: 1
 * 
 *     responses:
 *       201:
 *         description: contract created successfully
 *       400:
 *         description: contract already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/contracts/getAllContracs:
 *   get:
 *     summary: Get Employer Contracts
 *     tags:
 *       - Contracts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: contract fetched successfully
 *       404:
 *         description: contract not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/contracts/updateContarct:
 *   patch:
 *     summary: Update user contract
 *     tags:
 *       - Contracts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *               contract_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: contract updated successfully
 *       404:
 *         description: contract not found, please create a contract.
 *       500:
 *         description: Internal server error
 */

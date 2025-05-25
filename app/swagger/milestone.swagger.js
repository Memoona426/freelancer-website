/**
 * @swagger
 * tags:
 *   name: MileStone
 *   description: API endpoints
 */


milestone_id, title = "", amount = 0, status = ""

/**
 * @swagger
 * /api/milestone/createMileStone:
 *   post:
 *     summary: Create a milestone by Employer
 *     tags:
 *       - MileStone
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "milstone 1"
 *               amount:
 *                 type: integer
 *                 example: 100
 *               dead_line:
 *                 type: date
 *                 example: "2025-05-25"
 * 
 *     responses:
 *       201:
 *         description: milestone created successfully
 *       400:
 *         description: milestone already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/milestone/getAllMileStone:
 *   get:
 *     summary: Get Employer MileStone
 *     tags:
 *       - MileStone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: contract_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contract to get milestones for
 *     responses:
 *       200:
 *         description: milestone fetched successfully
 *       404:
 *         description: milestone not found
 *       500:
 *         description: Internal server error
 */



/**
/**
 * @swagger
 * /api/milestone/updateMileStone:
 *   patch:
 *     summary: Update user milestone
 *     tags:
 *       - MileStone
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
 *                 enum: [pending, funded, in_progress, submitted, approved, released]
 *                 example: pending
 *               milestone_id:
 *                 type: integer
 *                 example: 1
 *               dead_line:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-25"
 *     responses:
 *       200:
 *         description: milestone updated successfully
 *       404:
 *         description: milestone not found, please create a milestone.
 *       500:
 *         description: Internal server error
 */


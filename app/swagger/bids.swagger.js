/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: API endpoints
 */


/**
 * @swagger
 * /api/bids/createBidByFreelancer:
 *   post:
 *     summary: Create a Job by Freelancer
 *     tags:
 *       - Bids
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proposal:
 *                 type: string
 *                 example: "This is my proposal xyz"
 *               bid_amount:
 *                 type: integer
 *                 example: 20
 *               job_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Bid created successfully
 *       400:
 *         description: Bid already exists
 *       500:
 *         description: Internal server error
 */
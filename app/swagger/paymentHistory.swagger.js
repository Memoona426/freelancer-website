/**
 * @swagger
 * tags:
 *   - name: Payment History
 *     description: APIs related to Payment History management
 */

/**
 * @swagger
 * /api/paymentHistoryRoutes/createPaymentHistory:
 *   post:
 *     tags:
 *       - Payment History
 *     summary: Create a payment history entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - milestone_id
 *               - transaction_id
 *             properties:
 *               milestone_id:
 *                 type: integer
 *                 example: 1
 *               transaction_id:
 *                 type: string
 *                 example: "txn_abc123"
 *     responses:
 *       200:
 *         description: Payment history created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error or unauthorized access
 *       404:
 *         description: Milestone or user not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/paymentHistoryRoutes/getAllPaymentHistory:
 *   get:
 *     tags:
 *       - Payment History
 *     summary: Get all payment history by milestone ID
 *     parameters:
 *       - in: query
 *         name: milestone_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the milestone
 *     responses:
 *       200:
 *         description: List of payment history entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Milestone or payment history not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/jobs/postJobsByEmployer:
 *   post:
 *     summary: Create a Job by Employer
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "project web app"
 *               description:
 *                 type: string
 *                 example: "project description"
 *               budget:
 *                 type: integer
 *                 example: 1000
 *               budget_type:
 *                 type: string
 *                 example: "fixed"
 *               skill_required:
 *                 type: object
 *                 example: {"backend":"Node js", "frontend":"react js"}
 *               deadline:
 *                 type: date
 *                 example: "2025-05-25"
 * 
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Profile already exists
 *       500:
 *         description: Internal server error
 */
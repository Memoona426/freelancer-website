/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: Create a user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: string
 *                 example: "25"
 *               gender:
 *                 type: integer
 *                 example: 1
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Street, City"
 *               bio:
 *                 type: string
 *                 example: "Web Developer"
 *               profilePic:
 *                 type: string
 *                 example: "http://example.com/profilepic.jpg"
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile created successfully
 *                 profile:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     age:
 *                       type: string
 *                     gender:
 *                       type: integer
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *       400:
 *         description: Profile already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile fetched
 *                 profile:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     age:
 *                       type: string
 *                     gender:
 *                       type: integer
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/profile:
 *   patch:
 *     summary: Update user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: string
 *               gender:
 *                 type: integer
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               bio:
 *                 type: string
 *               profilePic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile updated
 *                 profile:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     age:
 *                       type: string
 *                     gender:
 *                       type: integer
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *       404:
 *         description: Profile not found, please create a profile.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile deleted
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */


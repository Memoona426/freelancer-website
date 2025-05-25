/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/user/profile/createProfile:
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
 *               bio:
 *                 type: string
 *                 example: "Hello this is my bio"
 *               experiance:
 *                 type: string
 *                 example: "2 years"
 *               profile_picture:
 *                 type: string
 *                 example: ""
 *               company_name:
 *                 type: string
 *                 example: "xyz"
 *               website:
 *                 type: string
 *                 example: "Webdeveloper.com"
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Profile already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/profile/getProfile:
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
 * /api/user/profile/updateProfile:
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
 *               bio:
 *                 type: string
 *                 example: "Hello this is my bio"
 *               experiance:
 *                 type: string
 *                 example: "2 years"
 *               profile_picture:
 *                 type: string
 *                 example: ""
 *               company_name:
 *                 type: string
 *                 example: "xyz"
 *               website:
 *                 type: string
 *                 example: "Webdeveloper.com"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found, please create a profile.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/profile/deleteProfile:
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


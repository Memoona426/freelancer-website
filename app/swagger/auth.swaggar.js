/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints
 */

/**
 * @swagger
 * /api/auth/signUp:
 *   post:
 *     summary: User Sign Up
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               role:
 *                 type: string
 *                 format: uri
 *                 example: admin
 *     responses:
 *       200:
 *         description: Signup successful, verification email sent
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
 *                   example: Please check your mail to verify your account.
 *                 sendMailDto:
 *                   type: object
 *                   properties:
 *                     to:
 *                       type: string
 *                       example: johndoe@example.com
 *                     subject:
 *                       type: string
 *                       example: Account Activation
 *                     text:
 *                       type: string
 *                       example: Click on this link to Activate Account
 *                     html:
 *                       type: string
 *                       example: <a>localhost:4000/api/auth/varifyAccount?token=xxx</a>
 *       400:
 *         description: Invalid input or email already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: invalid body
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/signIn:
 *   post:
 *     summary: User Sign In
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: login successfull
 *                 user:
 *                   type: object
 *                   description: Logged in user data
 *                 token:
 *                   type: string
 *                   example: your.jwt.token
 *       400:
 *         description: Invalid input, invalid credentials, or account not activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: invalid credentials
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/forgotPassword:
 *   post:
 *     summary: Request password reset email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
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
 *                   example: email has been sent to reset your password
 *                 sendMailDto:
 *                   type: object
 *                   properties:
 *                     to:
 *                       type: string
 *                       example: johndoe@example.com
 *                     subject:
 *                       type: string
 *                       example: Account Password Reset
 *                     text:
 *                       type: string
 *                       example: Click on this link to reset password
 *                     html:
 *                       type: string
 *                       example: <a>localhost:4000/api/auth/resetPassword?token=xxx</a>
 *       400:
 *         description: Missing email or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email is required
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     summary: Reset user password using a token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token received from forgot password email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password has been reset successfully
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
 *                   example: User password has been reset
 *                 user:
 *                   type: object
 *                   description: Updated user object
 *       400:
 *         description: Invalid request body, password mismatch, or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: password does not match
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/varifyAccount:
 *   post:
 *     summary: Activate a user's account using a token
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token received via email for account activation
 *     responses:
 *       200:
 *         description: Account activated successfully
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
 *                   example: Account has been activated
 *                 user:
 *                   type: object
 *                   description: Updated user object with isActive true
 *       400:
 *         description: User not found or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       401:
 *         description: Token is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token is needed
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user by clearing their token
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User has been logged out successfully
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
 *                   example: User has been logout
 *       500:
 *         description: Internal Server Error
 */

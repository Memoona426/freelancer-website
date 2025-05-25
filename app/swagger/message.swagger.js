/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat related endpoints
 */

/**
 * @swagger
 * /api/chat/registerUser:
 *   post:
 *     summary: Register a user with their socket ID
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - socket_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               socket_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered
 *       400:
 *         description: user_id and socket_id required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user_id and socket_id required
 */

/**
 * @swagger
 * /api/chat/sendMessage:
 *   post:
 *     summary: Send a message to another user
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - contract_id
 *               - content
 *               - receiver_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               contract_id:
 *                 type: integer
 *                 example: 2
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *               receiver_id:
 *                 type: string
 *                 example: "67890"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message sent
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     contract_id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                     is_read:
 *                       type: boolean
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/chat/markAsRead:
 *   patch:
 *     summary: Mark messages as read in a contract except for a specific user
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contract_id
 *               - user_id
 *               - message_id
 *             properties:
 *               contract_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 2
 *               message_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Messages marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Messages marked as read
 *       400:
 *         description: Missing contract_id or user_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing contract_id or user_id
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/chat/getMessages/{contract_id}:
 *   get:
 *     summary: Get all messages for a specific contract
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: contract_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Contract ID to fetch messages for
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   contract_id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   is_read:
 *                     type: boolean
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

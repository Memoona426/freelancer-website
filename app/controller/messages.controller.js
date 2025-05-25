// chatController.js
const db = require('../model');
const { message, users, contract } = db;
const { Op } = require('sequelize');
const { users: multipleChatUsers } = require("../sockets/chatSocket")
const { InternalServerError } = require('../helpers/response');
const { loggerResponse } = require('../helpers/logger/response');
const { getIO } = require("../helpers/socketIO");

const registerUser = async (req, res) => {
    const io = getIO();
    const { user_id, socket_id } = req.body;

    console.log(`[Socket] Attempting to register user ${user_id} with socket ${socket_id}`);

    try {
        if (!user_id) {
            console.log(`[Socket] Missing user_id or socket_id`);
            return res.status(400).json({ message: 'user_id and socket_id required' });
        }

        const userExist = await users.findByPk(user_id);

        if (!userExist) {
            console.log(`[Socket] User ${user_id} not found in database`);
            loggerResponse({
                type: "error",
                message: `user not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `user does not exist` });
        }

        const receiverSocket = multipleChatUsers.get(socket_id);
        if (receiverSocket) {
            console.log(`[Socket] Socket ID ${socket_id} is already in use`);
            loggerResponse({
                type: "error",
                message: `user already registerd`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `user already registerd` });
        }

        multipleChatUsers.set(user_id, socket_id);
        console.log(`[Socket] User ${user_id} successfully registered with socket ${socket_id}`);
        return res.json({ message: 'User registered' });
    } catch (error) {
        console.error(`[Socket][registerUser] Error:`, error);
        return InternalServerError(res, error);
    }
};

const sendMessage = async (req, res) => {
    const io = getIO();
    try {
        const { user_id, contract_id, content, receiver_id } = req.body;

        console.log(`[Socket] User ${user_id} is sending message to ${receiver_id} in contract ${contract_id}`);

        if (!user_id || !contract_id || !content || !receiver_id) {
            console.log(`[Socket] Missing required message fields`);
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userExist = await users.findByPk(user_id);
        if (!userExist) {
            console.log(`[Socket] Sender user ${user_id} not found`);
            loggerResponse({
                type: "error",
                message: `user does not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `user does not exist` });
        }

        const contractExists = await contract.findByPk(contract_id);
        if (!contractExists) {
            console.log(`[Socket] Contract ${contract_id} not found`);
            loggerResponse({
                type: "error",
                message: `contract does not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `contract does not exist` });
        }

        const senderSocket = multipleChatUsers.get(user_id);
        if (!senderSocket) {
            console.log(`[Socket] Sender socket for user ${user_id} not registered`);
            loggerResponse({
                type: "error",
                message: `sender not registerd`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `sender not registerd` });
        }

        const receiverSocket = multipleChatUsers.get(receiver_id);
        if (!receiverSocket) {
            console.log(`[Socket] Receiver socket for user ${receiver_id} not registered`);
            loggerResponse({
                type: "error",
                message: `receiver not registerd`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `receiver not registerd` });
        }

        const newMessage = await message.create({
            user_id,
            contract_id,
            content,
            timestamp: new Date(),
            is_read: false,
        });

        console.log(`[Socket] Message saved to DB. Emitting to socket ${receiverSocket}`);

        if (receiverSocket) {
            io.to(receiverSocket).emit('receive_message', {
                user_id,
                contract_id,
                content,
                timestamp: newMessage.timestamp,
            });

            console.log(`[Socket] Message emitted to user ${receiver_id} on socket ${receiverSocket}`);
        }

        return res.json({ message: 'Message sent', data: newMessage });
    } catch (error) {
        console.error(`[Socket][sendMessage] Error:`, error);
        return InternalServerError(res, error);
    }
};

const markAsRead = async (req, res) => {
    const io = getIO();
    try {
        const { contract_id, user_id, message_id } = req.body;

        console.log(`[Socket] Marking message ${message_id} as read by user ${user_id} in contract ${contract_id}`);

        if (!contract_id || !user_id) {
            return res.status(400).json({ message: 'Missing contract_id or user_id' });
        }

        const userExist = await users.findByPk(user_id);
        if (!userExist) {
            loggerResponse({
                type: "error",
                message: `user does not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `user does not exist` });
        }

        const contractExists = await contract.findByPk(contract_id);
        if (!contractExists) {
            loggerResponse({
                type: "error",
                message: `contract does not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `contract does not exist` });
        }

        await message.update(
            { is_read: true },
            {
                where: {
                    contract_id,
                    user_id,
                    id: message_id
                },
            }
        );

        console.log(`[Socket] Message ${message_id} marked as read`);

        return res.json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error(`[Socket][markAsRead] Error:`, error);
        return InternalServerError(res, error);
    }
};

const getMessages = async (req, res) => {
    const io = getIO();
    try {
        const { contract_id } = req.params;
        console.log(`[Socket] Fetching messages for contract ${contract_id}`);

        const contractExists = await contract.findByPk(contract_id);
        if (!contractExists) {
            loggerResponse({
                type: "error",
                message: `contract does not exist`,
                res: "",
            });
            return res.status(400).json({ status: false, message: `contract does not exist` });
        }

        const messages = await message.findAll({ where: { contract_id } });

        console.log(`[Socket] ${messages.length} messages fetched`);

        return res.json(messages);
    } catch (error) {
        console.error(`[Socket][getMessages] Error:`, error);
        return InternalServerError(res, error);
    }
};

module.exports = {
    registerUser,
    sendMessage,
    markAsRead,
    getMessages
};

const db = require('../model');
const { message } = db
const { Op } = require('sequelize');

const users = new Map();

const chatSocket = async (io) => {
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("register", (userId) => {
            users.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on("send_message", async ({ user_id, contract_id, content, receiver_id }) => {
            const message = await message.create({
                user_id,
                contract_id,
                content,
                timestamp: new Date(),
                is_read: false,
            });

            const receiverSocket = users.get(receiver_id);
            if (receiverSocket) {
                io.to(receiverSocket).emit("receive_message", {
                    user_id,
                    contract_id,
                    content,
                    timestamp: message.timestamp,
                });
            }
        });

        socket.on("mark_as_read", async ({ contract_id, user_id }) => {
            await message.update(
                { is_read: true },
                {
                    where: {
                        contract_id,
                        user_id: { [Op.ne]: user_id },
                    },
                }
            );
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of users.entries()) {
                if (socketId === socket.id) {
                    users.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
        });
    });
}

module.exports = {
    chatSocket,
    users
};

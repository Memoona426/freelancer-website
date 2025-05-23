const notificationQueue = require("../queues/notificationQueue");
const db = require("../model");
const sendMail = require("../config/nodemailer");
const { notifications, users } = db;

notificationQueue.process("newJobPosted", async (job) => {
  const {
    job_id,
    title,
    description,
    budget_type,
    budget,
    skill_required,
    deadline,
  } = job.data;

  const userRole = await role.findOne({
    where: {
      name: "Freelancer",
    },
  });

  const freelancers = await users.findAll({
    where: {
      role_id: userRole?.id,
    },
  });

  await Promise.all(
    freelancers?.map(async (freelancer) => {
      const { email, user_id, name } = freelancer;

      await notifications.create({
        user_id,
        type: "newJobPosted",
        message: title,
        is_read: false,
        job_id,
      });

      const sendMailDto = {
        to: email,
        subject: "Jobs",
        text: "New Jon Post Alert",
        html: `  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #333;">New Job Posting</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong></p>
        <p style="margin-left: 20px; border-left: 3px solid #ccc; padding-left: 10px;">${description}</p>
        <p><strong>Budget Type:</strong> ${budget_type}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Skills Required:</strong> ${skill_required}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
        <br>
        <p>Regards,<br>Your Freelance Platform Team</p>
        </div>`,
      };
      await sendMail(sendMailDto);
      console.log(`Notify freelancer name : ${name} about new job: ${title}`);
    })
  );
});

notificationQueue.process("newBidReceived", async (job) => {
  const { job_id, employeer_id, user_id, proposal, status, bid_amount } =
    job.data;

  const employer = await users.findByPk(employeer_id);

  const { email, name } = employer;

  await notifications.create({
    user_id: employeer_id,
    type: "newBidReceived",
    message: title,
    is_read: false,
    job_id,
  });

  const sendMailDto = {
    to: email,
    subject: "Bids",
    text: "New Bid Received",
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="color: #333;">New Job Proposal</h2>
      <p><strong>Job ID:</strong> ${job_id}</p>
      <p><strong>User ID:</strong> ${user_id}</p>
      <p><strong>Proposal:</strong></p>
      <p style="margin-left: 20px; border-left: 3px solid #ccc; padding-left: 10px;">${proposal}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Bid Amount:</strong> ${bid_amount}</p>
      <br>
      <p>Best regards,<br>Your Freelance Platform</p>
      </div>`,
  };
  await sendMail(sendMailDto);
  console.log(`Notify employer: ${name} about new bid`);
});

notificationQueue.process("milestoneUpdated", async (job) => {
  const { job_id, title, amount, contract_id, user_id, status } = job.data;

  const freelancer = await users.findByPk(user_id);

  const { email, name } = freelancer;

  await notifications.create({
    user_id: freelancer?.id,
    type: "milestoneUpdated",
    message: title,
    is_read: false,
    job_id,
  });

  const sendMailDto = {
    to: email,
    subject: "Milestone",
    text: "New milestone Update Alert",
    html: ` <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2 style="color: #333;">Milestone Update</h2>
    <p>Hello,</p>
    <p>The following milestone has been updated:</p>
    <p><strong>Job ID:</strong> ${job_id}</p>
    <p><strong>Contract ID:</strong> ${contract_id}</p>
    <p><strong>User ID:</strong> ${user_id}</p>
    <p><strong>Milestone Title:</strong> ${title}</p>
    <p><strong>Amount:</strong> ${amount}</p>
    <p><strong>Status:</strong> ${status}</p>
    <br>
    <p>Thank you for using our platform.</p>
    <p>Best regards,<br>Your Freelance Platform Team</p>
    </div>`,
  };
  await sendMail(sendMailDto);
  console.log(`Notify freelancer name : ${name}  about milestone update`);
});

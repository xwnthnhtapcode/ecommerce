// const { Kafka } = require('kafkajs');
// const nodemailer = require('nodemailer');

// // Tạo kết nối Kafka
// const kafka = new Kafka({
//   clientId: 'first_topic',
//   brokers: ['localhost:9092'],
// });

// // Tạo consumer
// const consumer = kafka.consumer({ groupId: 'order-success-group' });

// // Đọc thông báo Kafka và gửi email thông báo
// async function sendEmailNotification() {
//   try {
//     console.log("đã vô consumer");
//     await consumer.connect();
//     await consumer.subscribe({ topic: 'first_topic', fromBeginning: true });
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//           value: message.value.toString(),
//         });
//         const data = message.value.toString();
//         const obj = JSON.parse(data);
//         // Tạo transporter để kết nối đến SMTP server
//         const transporter = nodemailer.createTransport({
//           host: 'sandbox.smtp.mailtrap.io',
//           port: 2525,
//           auth: {
//             user: '66f8ed95fe7fad',
//             pass: 'e45d9d6c1fcb57'
//           },
//         });

//         // Tạo email options
//         const mailOptions = {
//           from: 'your_email@gmail.com',
//           to: obj.email,
//           subject: 'New Kafka message received',
//           text: obj.message,
//         };

//         // Gửi email
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error(error);
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
//       },
//     });
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await consumer.disconnect();
//   }
// }

// sendEmailNotification();

// module.exports = { sendEmailNotification };

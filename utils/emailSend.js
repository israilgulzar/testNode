const nodemailer = require("nodemailer")

function sendEmail(htmlContent, recipientEmail, subject) {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    })

    const emailDetails = {
        from: process.env.USER_EMAIL,
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
    }

    mailTransporter.sendMail(emailDetails, (err) => {
        if (err) {
            console.error("Error sending email:", err)
        } else {
            console.log("Email sent successfully")
        }
    })
}

module.exports = { sendEmail }


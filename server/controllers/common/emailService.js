require("dotenv").config();
const nodemailer = require("nodemailer");

exports.sendInvoiceEmail = async (req, res) => {
    try {
        const { userEmail, invoiceHtml } = req.body;

        if (!userEmail || !invoiceHtml) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Configure transporter with secure authentication
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER_INVOICE, // Use environment variable
                pass: process.env.EMAIL_PASS_INVOICE, // Use environment variable
            },
        });

        // ✅ Email options
        const mailOptions = {
            from: `"Kashvi Creations" <${process.env.EMAIL_USER}>`,
            to: [userEmail, "kashvicreation4@gmail.com"], // Send to user and admin
            subject: "Your Invoice from Kashvi Creations",
            html: `
                <h2>Invoice from Kashvi Creations</h2>
                <p>Dear Customer,</p>
                ${invoiceHtml}
                <br/>
                <p>Thank you for shopping with us!</p>
                <p><strong>- Kashvi Creations Team</strong></p>
            `,
        };

        // ✅ Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Invoice email sent successfully! Message ID: ${info.messageId}`);

        res.status(200).json({ success: true, message: "Invoice sent successfully!" });
    } catch (error) {
        console.error("❌ Email Sending Error:", error.message);
        res.status(500).json({ success: false, message: "Email failed to send", error: error.message });
    }
};

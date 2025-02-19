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
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center;">
                        <img src="https://your-logo-url.com/logo.png" alt="Kashvi Creations" style="max-width: 50px; margin-bottom: 10px;">
                        <h2 style="color: #333;">Invoice from Kashvi Creations</h2>
                    </div>
                    
                    <p style="font-size: 16px; color: #555;">Dear Customer, your order has been placed successfully</p>
                    
                    <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #f9f9f9;">
                        ${invoiceHtml}
                    </div>
        
                    <p style="font-size: 16px; color: #555; margin-top: 20px;">Thank you for shopping with us!</p>
                    <p style="font-size: 16px; font-weight: bold; color: #333;">- Kashvi Creations Team</p>
        
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <div style="text-align: center; font-size: 14px; color: #777;">
                        <p>Follow us:</p>
                        <a href="https://facebook.com/kashvicreations" style="text-decoration: none; color: #007bff;">Facebook</a> | 
                        <a href="https://instagram.com/kashvicreations" style="text-decoration: none; color: #007bff;">Instagram</a> | 
                        <a href="https://wa.me/your-whatsapp-number" style="text-decoration: none; color: #007bff;">WhatsApp</a>
                        <p>Contact: <a href="mailto:support@kashvicreations.com" style="color: #007bff;">support@kashvicreations.com</a></p>
                    </div>
                </div>
            </div>
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

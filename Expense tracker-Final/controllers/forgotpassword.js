const Sib = require('sib-api-v3-sdk');

exports.forgotpassword = (req, res, next) => {
    const { email } = req.body;

    // Check if email exists in the request body
    if (!email) {
        return res.status(404).json({ message: "email not provided" });
    }

    // Initialize Sendinblue API Client
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;  // Ensure API_KEY is set in your environment

    const transEmailApi = new Sib.TransactionalEmailsApi();

    // Correct the sender email address
    const sender = {
        email: 'yadavgopinath93@gmail.com',  // Fixed duplicate @gmail.com
        name:'Gopinath  '
    };

    // Receiver email (you can use the one from req.body or any other)
    const receivers = [
        {
            email: email,  // Dummy receiver for now
        }
    ];

    // Send transactional email
    transEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Building Expense App',
        textContent: `Almost the app is completed`,
         htmlContent : `
        <html>
            <body>
                <h1>Password Reset Request</h1>
                <p>Hi,</p>
                <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
                <p>Otherwise, click the button below to reset your password:</p>
                <a href="#" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
                <p>If you can't click the button, copy and paste the following URL into your browser:</p>
                <p>https://your-app-link.com/reset-password</p>
            </body>
        </html>
    `,
    }).then((response) => {
        console.log(response); 
        return res.status(200).json({ message: 'Email sent successfully', email: req.body.email });
    }).catch((error) => {
        console.error(error);  
        return res.status(500).json({ message: 'Error sending email', error });
    });
};

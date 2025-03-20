const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.from = 'WebShop Company <perodjorovic@gmail.com>';
        this.username = user.username;
        this.url = url;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        } else {
            return nodemailer.createTransport({
                host: process.env.MAILTRAP_EMAIL_HOST,
                port: process.env.MAILTRAP_EMAIL_PORT,
                auth: {
                    user: process.env.MAILTRAP_EMAIL_USERNAME,
                    pass: process.env.MAILTRAP_EMAIL_PASSWORD,
                },
            });
        }
    }

    async sendWelcome() {
        await this.send('Welcome to MyWebShop', 'welcome');
    }

    // async sendResetPassword() {
    //     await this.send('Reset your password', 'resetPassword');
    // }

    async send(subject, template) {
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
            subject: subject,
            username: this.username,
            url: this.url,
            email: this.to,
        });
        const mailOptions = {
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject, // Subject line
            html, // html body
            text: convert(html), // plain text body
        };

        await this.newTransport().sendMail(mailOptions);
    }
}

module.exports = Email;

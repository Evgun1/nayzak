import nodemailer, { Transporter } from 'nodemailer';

class MailService {
	transporter: Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT as string) ?? undefined,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivateMail(to: any, link: any) {
		await this.transporter
			.sendMail({
				from: process.env.SMTP_USER,
				to,
				subject: `Activision account ${process.env.API_URL}`,
				text: '',
				html: ` 
      <div>
        <h1>Activation</h1>
        <a href="${link}">${link}<a/>
      </div> 
    `,
			})
			.then(() => console.log(`email send`));
	}
}

export default new MailService();

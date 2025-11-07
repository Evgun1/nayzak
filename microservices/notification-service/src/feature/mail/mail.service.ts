import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
	protected transporter: Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_GMAIL_HOST,
			port: process.env.SMTP_GMAIL_PORT
				? parseInt(process.env.SMTP_GMAIL_PORT)
				: 465,
			secure: true,
			auth: {
				user: process.env.SMTP_GMAIL_USER,
				pass: `${process.env.SMTP_GMAIL_PASSWORD}`,
			},
		});
	}

	async sendActionMail(to: string, activeLink: string) {
		const link = `${process.env.LINK_URL_CLIENT}/activation/${activeLink}`;

		await this.transporter
			.sendMail({
				from: process.env.SMTP_GMAIL_USER,
				to,
				subject: `Activision account ${process.env.URL_CLIENT_API}`,
				text: "",
				html: `
        <div>
        <h1>Activation</h1>
        <a href="${link}">${link}<a/>
        </div>
        `,
			})
			.then(() => console.log(`email send: ${to}`))
			.catch((err) => {
				console.log(err);
			});
	}
}

export default new MailService();

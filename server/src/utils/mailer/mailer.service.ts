import path from "path";
import { transporter } from "./config";
import { Injectable } from "@nestjs/common";
import hbs from "handlebars";
import fs from 'fs';
import { IMailSend } from "src/interface/IMailSend";

@Injectable()
export class MailerService {
    private loadTemplate(templateName: string) {
        const filePath = path.join(__dirname, 'templates', `${templateName}.hbs`);

        if (!fs.existsSync(filePath))
            throw new Error(`Template ${templateName}.hbs not found`)

        const templateSource = fs.readFileSync(filePath, 'utf-8');
        return hbs.compile(templateSource);
    }

    async send(data: IMailSend) {
        try {
            const compiledTemplate = this.loadTemplate(data.templateName);
            const htmlContent = compiledTemplate({
                name: data.name,
                token: data.token
            })

            await transporter.sendMail({
                from: "Connectia",
                to: data.email,
                subject: data.subject,
                html: htmlContent
            })
        } catch (err) {
            console.log(err);
            throw new Error("Server couldn't send you the email due to missconfiguration or another issue")
        }
    }
}
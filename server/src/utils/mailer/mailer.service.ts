import * as path from "path";
import { transporter } from "./config";
import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import hbs from "handlebars";
import * as fs from 'fs';
import { IMailerSend } from "src/interface/IMailerSend";
import { format } from "date-fns";

@Injectable()
export class MailerService {
    private loadTemplate(templateName: string) {
        const filePath = path.join(process.cwd(), 'src', 'utils', 'mailer', 'templates', `${templateName}.hbs`);

        if (!fs.existsSync(filePath))
            throw new BadRequestException(`Template ${templateName}.hbs not found`)

        const templateSource = fs.readFileSync(filePath, 'utf-8');
        return hbs.compile(templateSource);
    }

    async send(data: IMailerSend) {
        const compiledTemplate = this.loadTemplate(data.templateName);
        const htmlContent = compiledTemplate({
            name: data.name,
            token: data.token,
            date: format(new Date(), "Pp")
        })

        const mailSent = await transporter.sendMail({
            from: "Connectia",
            to: data.email,
            subject: data.subject,
            html: htmlContent
        })

        if (!mailSent)
            throw new BadGatewayException("Email sending failed unexpectedly");

        return mailSent;
    }
}
import { BadRequestException } from "@nestjs/common";
import { transporter } from "./config";
import { MailerService } from "./mailer.service";

jest.mock("./config", () => ({
    transporter: {
        sendMail: jest.fn(() => "ok")
    }
}));

describe("MailerService", () => {
    it("should throw if template not found", async () => {
        try {
            const mailer = new MailerService();
            await mailer.send({
                name: "Miss Agatha",
                email: "example@gmail.com",
                subject: "example",
                token: "example",
                templateName: "failed"
            })
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toBe("Template failed.hbs not found")
        }

    })

    it("should send email with correct data", async () => {
        const mailer = new MailerService();
        await mailer.send({
            name: "Miss Agatha",
            email: "example@gmail.com",
            subject: "example",
            token: "example",
            templateName: "verification-email"
        })

        expect(transporter.sendMail).toHaveBeenCalledWith(
            expect.objectContaining({
                from: "Connectia",
                to: "example@gmail.com",
                subject: "example",
                html: expect.stringContaining("Miss Agatha")
            })
        )

        expect(transporter.sendMail).toHaveBeenCalledTimes(1)
    })
})
export interface IMailSend {
    name: string;
    email: string;
    token: string;
    templateName: "password-reset" | "verification-email";
    subject: string;
}
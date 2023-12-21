import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Mail } from './dtos';

@Injectable()
export class MailsenderService {
  constructor(private readonly mailerService: MailerService) { }

  async sendWelcomeEmail(data: Mail) {
    this.mailerService.sendMail({
      ...data,
      subject: 'Welcome',
      template: 'welcome',
      context: {
        user: data.user,
      },
    });
  }

  async sendResetPasswordEmail(data: Mail) {
    this.mailerService.sendMail({
      ...data,
      subject: 'Forget Password',
      template: 'forgetpassword',
      context: {
        user: data.user,
        text: data.text,
      },
    });
  }

  async sendAcceptedEmail(data: Mail) {
    this.mailerService.sendMail({
      ...data,
      subject: 'Your request is accepted',
      template: 'accepted',
      context: {
        name: data.name,
        date: data.date,
      },
    });
  }

  async sendRejectedEmail(data: Mail) {
    this.mailerService.sendMail({
      ...data,
      subject: 'Your request have been rejected',
      template: 'rejected',
      context: {
        name: data.name,
        date: data.date,
        reason: data.reason,
      },
    });
  }
}

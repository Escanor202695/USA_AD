import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailsenderModule } from '../mailsender/mailsender.module';
import { JwtAuthStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: AuthUserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
    }),
    MailsenderModule,
  ],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule { }

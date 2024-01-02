import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { AuthUser, AuthUserDocument } from './schema/auth.schema';
import { CreateAuthDto, LoginAuthDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';
import { InvalidCredentials } from 'src/common/exceptions';
import { generate } from 'otp-generator';
import { MailsenderService } from '../mailsender/mailsender.service';
import { AdduserAuthDto } from './dtos/adduser.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name)
    private readonly authuserModel: Model<AuthUserDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailSenderService: MailsenderService,
  ) { }

  public async register(createAuthDto: CreateAuthDto, res: Response) {
    const auth = await this.authuserModel.findOne({
      email: createAuthDto.email,
    });
    if (auth) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT);
    }
    try {
      const user = new this.authuserModel({
        ...createAuthDto,
      });
      await user.save();

      const [accessToken, refreshToken] = await this.generateTokens(user);

      await this.setTokens(res, { accessToken, refreshToken });

      // this.mailsenderService.sendWelcomeEmail({
      //   to: user.phone,
      //   subject: 'Welcome',
      //   text: 'Testing Email',
      // });

      return { user, status: 'success', accessToken: accessToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async addNewUser(createAuthDto: AdduserAuthDto) {
    const auth = await this.authuserModel.findOne({
      email: createAuthDto.email,
    });
    if (auth) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT);
    }
    try {
      const user = new this.authuserModel({
        ...createAuthDto,
      });
      await user.save();

      return { user, status: 'success' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async login(loginAuthDto: LoginAuthDto, response: Response) {
    try {
      const user = await this.getAuthenticatedUser(
        loginAuthDto.email,
        loginAuthDto.password,
      );
      user.password = null;
      const [accessToken, refreshToken] = await this.generateTokens(user);
      await this.setTokens(response, { accessToken, refreshToken });
      return { user, status: 'success', accessToken: accessToken };
    } catch (err) {
      throw new InvalidCredentials();
    }
  }

  public async forgetPassword(email: string) {
    let user = await this.authuserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.otp = generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await user.save();

    this.mailSenderService.sendResetPasswordEmail({
      to: user.email,
      subject: 'Otp',
      text: `OTP is ${user.otp}`,
      user: user,
    });

    return user.email;
  }

  public async otpReceive(email: string, otp: string) {
    let user = await this.authuserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // console.log('otpReceive');
    // console.log(user.otp, otp);

    if (user.otp == otp) {
      user.isverified = true;
      await user.save();
      return true;
    } else {
      throw new NotFoundException('Otp not varified');
    }
  }

  public async setNewPassword(email: string, otp: string, newpassword: string) {
    let user = await this.authuserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.otp == otp) {
      user.password = newpassword;
      user.otp = null;
      await user.save();
      return true;
    } else {
      throw new NotFoundException('Otp not varified');
    }
  }


  public async changePassword(email: string, password: string, newpassword: string) {
    let user = await this.authuserModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password === password) {
      user.password = newpassword;
      user.otp = null;
      await user.save();
      return true;
    } else {
      throw new InvalidCredentials();
    }
  }


  public async getUserById(userId: string) {
    try {
      const user = await this.authuserModel
        .findById(userId)
        .select('-password')
        .exec();
      return user;
    } catch (err) {
      throw new InvalidCredentials();
    }
  }

  private async getAuthenticatedUser(email: string, password: string) {
    try {
      let user = await this.authuserModel.findOne({ email: email });
      if (!user) {
        user = await this.authuserModel.findOne({ phone: email });
      }
      if (!user) {
        throw new InvalidCredentials();
      }
      // const isMatch = await argon2.verify(user.password, password);
      // if (!isMatch) {
      //   throw new InvalidCredentials();
      // }
      if (user.password != password) {
        throw new InvalidCredentials();
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  private async generateTokens(user) {
    const jwtid = uuidv4();
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        issuer: 'oras',
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        jwtid,
        issuer: 'oras',
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      },
    );

    return [accessToken, refreshToken];
  }

  private async setTokens(
    res: Response,
    {
      accessToken,
      refreshToken,
    }: { accessToken: string; refreshToken?: string },
  ) {
    const domain = this.configService.get('DOMAIN');
    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: true,
      domain: domain,
    });

    if (refreshToken) {
      res.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: true,
        domain: domain,
      });
    }
  }

  async findAll() {
    return await this.authuserModel.find({}, { password: 0 }).exec();
    return `This action returns all leaverequest`;
  }

  async remove(id: string) {
    return await this.authuserModel.findByIdAndDelete(id);
    return `This action removes a #${id} leaverequest`;
  }
}

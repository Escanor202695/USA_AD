import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { AuthUserDocument } from '../schema/auth.schema';
export type JwtAccessPayload = {
  id: string;
  email: string;
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: JwtAuthStrategy.extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: JwtAccessPayload): Promise<AuthUserDocument> {
    const user = await this.authService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  static extractJwtFromCookie(req: Request) {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }
}

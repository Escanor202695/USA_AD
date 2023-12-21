import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthUserDocument = AuthUser & Document;

@Schema()
export class AuthUser {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  otp: string;

  @Prop()
  isverified: boolean;

  @Prop({ default: 'resident' })
  role: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);

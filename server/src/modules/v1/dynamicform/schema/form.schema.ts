import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { State } from './state.schema';

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object })
  data: Record<string, any>;
}

export const FormSchema = SchemaFactory.createForClass(Form);

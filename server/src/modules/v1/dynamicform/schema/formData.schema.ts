import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { State } from './state.schema';

export type FormDataDocument = FormData & Document;

@Schema()
export class FormData {
  @Prop({ type: Object })
  data: Record<string, any>;
  @Prop({ type: String })
  email: string
}

export const FormDataSchema = SchemaFactory.createForClass(FormData);

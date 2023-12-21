import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { State } from './state.schema';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  @Prop({ required: true })
  name: string;


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'State' })
  states: State[];
}

export const CountrySchema = SchemaFactory.createForClass(Country);

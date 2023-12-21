import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Country } from './country.schema';
import { City } from './city.schema';

export type StateDocument = State & Document;

@Schema()
export class State {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Country.name, required: true })
  country: Country;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'City' })
  cities: City[];
}

export const StateSchema = SchemaFactory.createForClass(State);

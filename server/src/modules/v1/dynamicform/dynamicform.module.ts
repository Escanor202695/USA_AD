import { Module } from '@nestjs/common';
import { DynamicformService } from './dynamicform.service';
import { DynamicformController } from './dynamicform.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schema/country.schema';
import { State, StateSchema } from './schema/state.schema';
import { City, CitySchema } from './schema/city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
      { name: State.name, schema: StateSchema },
      { name: City.name, schema: CitySchema }
    ])
  ],
  controllers: [DynamicformController],
  providers: [DynamicformService],
})
export class DynamicformModule { }

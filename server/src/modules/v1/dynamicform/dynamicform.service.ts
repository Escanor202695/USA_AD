import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDynamicformDto } from './dto/create-dynamicform.dto';
import { UpdateDynamicformDto } from './dto/update-dynamicform.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { City, CityDocument } from './schema/city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schema/country.schema';
import { State, StateDocument } from './schema/state.schema';
import { Form, FormDocument } from './schema/form.schema';
import { FormData, FormDataDocument } from './schema/formData.schema';

@Injectable()
export class DynamicformService {
  constructor(@InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
    @InjectModel(Country.name) private readonly countryModel: Model<CountryDocument>,
    @InjectModel(State.name) private readonly stateModel: Model<StateDocument>,
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>,
    @InjectModel(FormData.name) private readonly formDataModel: Model<FormDataDocument>,
  ) { }

  async saveForm(name: string, data: Record<string, any>): Promise<Form> {
    const formData = await this.formModel.findOne({ name: name }).exec();
    if (!formData) {
      const newData = new this.formModel({ name, data });
      return newData.save();
    }
    formData.data = data;
    return formData.save();
  }

  async getForm(name: string) {
    return this.formModel.findOne({ name: name }).exec();
  }

  async saveFormData(email: string, data: Record<string, any>) {
    const newFormData = new this.formDataModel({ email: email, data });
    return newFormData.save();
  }

  async getAllFormData() {
    return this.formDataModel.find().exec();
  }

  async getFormDataById(id: string) {
    return this.formDataModel.findById(id).exec();
  }

  async getFormDataByEmail(email: string) {
    return await this.formDataModel.find({ email: email }).exec();
  }

  async getFormDataByCountry(country: string) {
    return await this.formDataModel.find({ 'data.Contact Info.Country': country }).exec();
  }

  async getFormDataByState(state: string) {
    return await this.formDataModel.find({ 'data.Contact Info.State': state }).exec();
  }

  async getFormDataByCity(city: string) {
    return await this.formDataModel.find({ 'data.Contact Info.City': city }).exec();
  }

  async addCountry(createArea: CreateAreaDto) {
    const country = await this.countryModel.findOne({
      name: createArea.name,
    });
    if (country) {
      throw new HttpException('Country already exist', HttpStatus.CONFLICT);
    }
    try {
      const country = new this.countryModel({
        ...createArea,
      });
      // country.states = [];
      await country.save();

      return { status: 'success', data: country };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return 'This action adds a new city';
  }

  async getAllCountry() {
    const countries = await this.countryModel.find();
    return countries;
  }

  async updateCountry(id: string, updateAreaDto: CreateAreaDto) {
    const country = await this.countryModel.findById(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    country.name = updateAreaDto.name;
    await country.save();
    return { status: 'success', data: country };
  }
  async deleteCountry(id: string) {
    const country = await this.countryModel.findById(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    await this.countryModel.findByIdAndDelete(id);
    return { status: 'success' };
  }

  async getCountryStateCity() {
    const countries = await this.countryModel.find().exec();

    const populatedCountries = [];

    for (const country of countries) {
      const populatedCountry = country.toObject();
      const states = await this.getAllStateByCountry(populatedCountry._id);
      const populatedStates = [];
      for (const state of states) {
        const populatedState = state.toObject();
        const cities = await this.getAllCityByState(populatedState._id);
        populatedState.cities = cities;
        populatedStates.push(populatedState);
      }
      populatedCountry.states = populatedStates;
      populatedCountries.push(populatedCountry);
    }
    return { countries: populatedCountries };
  }

  async addState(countryId: string, createArea: CreateAreaDto) {
    const country = await this.countryModel.findById(
      countryId,
    ).populate('states').exec();
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    console.log(country)
    const state = await this.stateModel.findOne({ name: createArea.name, country: country });

    if (state) {
      throw new HttpException('State already exist', HttpStatus.CONFLICT);
    }

    const newState = new this.stateModel({ name: createArea.name, country: country._id });
    // country.states.push(newState._id);
    await country.save();
    await newState.save();
    return { status: 'success', data: newState };
  }

  async getAllStateByCountry(countryId: string) {
    const country = await this.countryModel.findOne({ _id: countryId });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    const states = await this.stateModel.find({ country: country._id });
    return states;
  }

  async getAllStateAndCityByCountry(countryId: string) {
    const country = await this.countryModel.findOne({ _id: countryId });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    const states = await this.stateModel.find({ country: country._id }).populate('cities');
    return states;
  }

  async updateState(id: string, updateAreaDto: CreateAreaDto) {
    const state = await this.stateModel.findById(id);
    if (!state) {
      throw new NotFoundException('Country not found');
    }
    state.name = updateAreaDto.name;
    await state.save();
    return { status: 'success', data: state };
  }
  async deleteState(id: string) {
    const state = await this.stateModel.findById(id);
    if (!state) {
      throw new NotFoundException('Country not found');
    }
    await this.stateModel.findByIdAndDelete(id);
    return { status: 'success' };
  }

  async addCity(stateId: string, createArea: CreateAreaDto) {
    const state = await this.stateModel.findOne({
      _id: stateId,
    })
    if (!state) {
      throw new NotFoundException('State not found');
    }
    const city = await this.cityModel.findOne({ name: createArea.name, state: state });

    if (city) {
      throw new HttpException('City already exist', HttpStatus.CONFLICT);
    }

    const newCity = new this.cityModel({ name: createArea.name, state: state._id });
    await newCity.save();
    return { status: 'success', data: newCity };
  }

  async getAllCityByState(stateId: string) {
    const state = await this.stateModel.findOne({ _id: stateId });
    if (!state) {
      throw new NotFoundException('State not found');
    }
    const cities = await this.cityModel.find({ state: state._id });
    return cities;
  }

  async updateCity(id: string, updateAreaDto: CreateAreaDto) {
    const city = await this.cityModel.findById(id);
    if (!city) {
      throw new NotFoundException('Country not found');
    }
    city.name = updateAreaDto.name;
    await city.save();
    return { status: 'success', data: city };
  }
  async deleteCity(id: string) {
    const city = await this.cityModel.findById(id);
    if (!city) {
      throw new NotFoundException('Country not found');
    }
    await this.cityModel.findByIdAndDelete(id);
    return { status: 'success' };
  }

  create(createDynamicformDto: CreateDynamicformDto) {
    return 'This action adds a new dynamicform';
  }

  findAll() {
    return `This action returns all dynamicform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamicform`;
  }

  update(id: number, updateDynamicformDto: UpdateDynamicformDto) {
    return `This action updates a #${id} dynamicform`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicform`;
  }

  async uploadImage(file) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }
    const filePath = `${file.filename}`;
    return { message: "File uploaded successfully", url: filePath, type: "image" };
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicformService } from './dynamicform.service';
import { CreateDynamicformDto } from './dto/create-dynamicform.dto';
import { UpdateDynamicformDto } from './dto/update-dynamicform.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('v1/dynamicform')
@Controller('dynamicform')
export class DynamicformController {
  constructor(private readonly dynamicformService: DynamicformService) { }

  @Post('formdata')
  saveFormData(@Body('name') name: string, @Body('data') data: Record<string, any>) {
    return this.dynamicformService.saveFormData(name, data);
  }

  @Get('formdata/:name')
  getFormData(@Param('name') name: string) {
    return this.dynamicformService.getFormData(name);
  }
  @Post('add-country')
  addCountry(@Body() createAreaDto: CreateAreaDto) {
    return this.dynamicformService.addCountry(createAreaDto);
  }

  @Get('countries')
  getAllCountries() {
    return this.dynamicformService.getAllCountry();
  }

  @Get('country-state-city')
  getCountryStateCity() {
    return this.dynamicformService.getCountryStateCity();
  }

  @Post('add-state/:countryId')
  addState(@Param('countryId') countryId: string, @Body() createAreaDto: CreateAreaDto) {
    return this.dynamicformService.addState(countryId, createAreaDto);
  }

  @Get('states/:countryId')
  getAllStateByCountryId(@Param('countryId') countryId: string,) {
    return this.dynamicformService.getAllStateByCountry(countryId);
  }

  @Post('add-city/:stateID')
  addCity(@Param('stateID') stateID: string, @Body() createAreaDto: CreateAreaDto) {
    return this.dynamicformService.addCity(stateID, createAreaDto);
  }

  @Get('cities/:stateID')
  getAllCityByStateId(@Param('stateID') stateID: string,) {
    return this.dynamicformService.getAllCityByState(stateID);
  }

  @Post()
  create(@Body() createDynamicformDto: CreateDynamicformDto) {
    return this.dynamicformService.create(createDynamicformDto);
  }

  @Get()
  findAll() {
    return this.dynamicformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDynamicformDto: UpdateDynamicformDto) {
    return this.dynamicformService.update(+id, updateDynamicformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicformService.remove(+id);
  }
}

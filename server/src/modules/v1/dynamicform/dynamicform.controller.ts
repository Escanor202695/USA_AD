import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { DynamicformService } from './dynamicform.service';
import { CreateDynamicformDto } from './dto/create-dynamicform.dto';
import { UpdateDynamicformDto } from './dto/update-dynamicform.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
@ApiTags('v1/dynamicform')
@Controller('dynamicform')
export class DynamicformController {
  constructor(private readonly dynamicformService: DynamicformService) { }

  @Post('form')
  saveForm(@Body('name') name: string, @Body('data') data: Record<string, any>) {
    return this.dynamicformService.saveForm(name, data);
  }

  @Get('form/:name')
  getForm(@Param('name') name: string) {
    return this.dynamicformService.getForm(name);
  }

  @Post('formdata')
  saveFormData(@Body('data') data: Record<string, any>) {
    return this.dynamicformService.saveFormData(data);
  }

  @Get('formdata')
  getFormData() {
    return this.dynamicformService.getAllFormData();
  }

  @Get('formdata/:id')
  getFormDataById(@Param('id') id: string) {
    return this.dynamicformService.getFormDataById(id);
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Single File uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'string', example: 'success' },
      },
    },
  })
  async uploadImageFile(
    @UploadedFile() file,
  ) {
    return this.dynamicformService.uploadImage(file);
  }

  @Get('/download/:imageurl')
  async downloadSchedule(@Res() response: Response, @Param('imageurl') imageurl: string) {
    // const filePath = await this.leavescheduleService.downloadSchedule(scheduleId);
    response.sendFile(imageurl, { root: 'uploads' });
  }
}

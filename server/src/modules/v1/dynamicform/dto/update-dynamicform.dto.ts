import { PartialType } from '@nestjs/swagger';
import { CreateDynamicformDto } from './create-dynamicform.dto';

export class UpdateDynamicformDto extends PartialType(CreateDynamicformDto) {}

import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

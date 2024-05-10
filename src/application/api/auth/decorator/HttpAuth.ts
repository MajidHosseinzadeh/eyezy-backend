import { HttpJwtAuthGuard } from '@application/api/auth/guard/HttpJwtAuthGuard';
import { HttpRoleAuthGuard } from '@application/api/auth/guard/HttpRoleAuthGuard';
import { UserRole } from '@core/common/enums/UserEnums';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const HttpAuth = (...roles: UserRole[]): (...args: any) => void => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(HttpJwtAuthGuard, HttpRoleAuthGuard)
  );
};

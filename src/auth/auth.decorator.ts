import { 
  createParamDecorator, 
  ExecutionContext,
  SetMetadata,
 } from '@nestjs/common';
import { Roles } from '@prisma/client';

export const IS_PUBLIC_KEY = 'isPublicRoute';
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AllowRoles = (...roles: Roles[]) =>
  SetMetadata('allowRoles', roles);
export const DenyRoles = (...roles: Roles[]) => SetMetadata('denyRoles', roles);
export const AllRoles = () => SetMetadata('allRoles', true);


export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx
        .switchToHttp()
        .getRequest(); 
    if(data) return request.user[data];

    return request.user;
});
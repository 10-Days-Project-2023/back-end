import { Roles } from '@prisma/client';
export declare const IS_PUBLIC_KEY = "isPublicRoute";
export declare const PublicRoute: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AllowRoles: (...roles: Roles[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const DenyRoles: (...roles: Roles[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const AllRoles: () => import("@nestjs/common").CustomDecorator<string>;
export declare const GetUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;

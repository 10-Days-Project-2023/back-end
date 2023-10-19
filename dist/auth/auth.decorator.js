"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.AllRoles = exports.DenyRoles = exports.AllowRoles = exports.PublicRoute = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublicRoute';
const PublicRoute = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.PublicRoute = PublicRoute;
const AllowRoles = (...roles) => (0, common_1.SetMetadata)('allowRoles', roles);
exports.AllowRoles = AllowRoles;
const DenyRoles = (...roles) => (0, common_1.SetMetadata)('denyRoles', roles);
exports.DenyRoles = DenyRoles;
const AllRoles = () => (0, common_1.SetMetadata)('allRoles', true);
exports.AllRoles = AllRoles;
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx
        .switchToHttp()
        .getRequest();
    if (data)
        return request.user[data];
    return request.user;
});
//# sourceMappingURL=auth.decorator.js.map
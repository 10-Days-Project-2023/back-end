"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleModule = void 0;
const common_1 = require("@nestjs/common");
const google_controller_1 = require("./google.controller");
const google_service_1 = require("./google.service");
const tools_1 = require("./tools");
const tools_2 = require("../register/tools");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let GoogleModule = class GoogleModule {
};
exports.GoogleModule = GoogleModule;
exports.GoogleModule = GoogleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.register({}),
        ],
        controllers: [google_controller_1.GoogleController],
        providers: [
            google_service_1.GoogleService,
            tools_2.JwtAuthGuard,
            tools_1.GoogleOauthGuard,
            tools_2.JwtStrategy,
            tools_1.GoogleStrategy,
            jwt_1.JwtService
        ],
    })
], GoogleModule);
//# sourceMappingURL=google.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const unique_username_generator_1 = require("unique-username-generator");
let GoogleService = class GoogleService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async signIn(user) {
        if (!user)
            throw new common_1.BadRequestException('Unauthenticated');
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: user.email,
            }
        });
        if (!userExists)
            return await this.registerUser(user);
        return this.signToken({
            sub: userExists.userId,
            email: userExists.email,
        });
    }
    async registerUser(user) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    ...user,
                }
            });
            await this.prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    username: (0, unique_username_generator_1.generateFromEmail)(user.email, 5),
                }
            });
            return this.signToken({
                sub: newUser.userId,
                email: newUser.email,
            });
        }
        catch {
            throw new common_1.InternalServerErrorException();
        }
    }
    async signToken(payload) {
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.JWT_TIME,
            secret: process.env.JWT_SECRET,
        });
        return {
            access_token: token
        };
    }
    async findUserByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user)
            return null;
        return user;
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], GoogleService);
//# sourceMappingURL=google.service.js.map
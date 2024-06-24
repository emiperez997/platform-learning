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
exports.InscriptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InscriptionService = class InscriptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.inscription.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const inscription = await this.prisma.inscription.findUnique({
            where: {
                id,
            },
        });
        if (!inscription) {
            throw new common_1.HttpException('Inscription not found', 404);
        }
        return inscription;
    }
    async create(inscription) {
        if (!inscription.courseId || !inscription.studentId) {
            throw new common_1.HttpException('Invalid data', 400);
        }
        if (inscription.status !== 'PENDING' &&
            inscription.status !== 'ACCEPTED' &&
            inscription.status !== 'REJECTED') {
            throw new common_1.HttpException('Invalid status', 400);
        }
        try {
            const inscriptionDB = await this.prisma.inscription.create({
                data: {
                    status: inscription.status,
                    course: {
                        connect: {
                            id: inscription.courseId,
                        },
                    },
                    student: {
                        connect: {
                            id: inscription.studentId,
                        },
                    },
                },
            });
            return inscriptionDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, inscription) {
        const inscriptionExists = await this.prisma.inscription.findUnique({
            where: {
                id,
            },
        });
        if (!inscriptionExists) {
            throw new common_1.HttpException('Inscription not found', 404);
        }
        if (inscription.status !== 'PENDING' &&
            inscription.status !== 'ACCEPTED' &&
            inscription.status !== 'REJECTED') {
            throw new common_1.HttpException('Invalid status', 400);
        }
        try {
            const inscriptionDB = await this.prisma.inscription.update({
                where: {
                    id,
                },
                data: {
                    status: inscription.status,
                },
            });
            return inscriptionDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const inscriptionExists = await this.prisma.inscription.findUnique({
            where: {
                id,
            },
        });
        if (!inscriptionExists) {
            throw new common_1.HttpException('Inscription not found', 404);
        }
        try {
            const inscriptionDB = await this.prisma.inscription.delete({
                where: {
                    id,
                },
            });
            return inscriptionDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InscriptionService = InscriptionService;
exports.InscriptionService = InscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InscriptionService);
//# sourceMappingURL=inscription.service.js.map
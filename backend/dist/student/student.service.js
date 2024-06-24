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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentService = class StudentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.student.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: {
                id,
            },
        });
        if (!student) {
            throw new common_1.HttpException('Student not found', 404);
        }
        return student;
    }
    async create(student) {
        if (!student.firstName ||
            !student.lastName ||
            !student.email ||
            !student.password) {
            throw new common_1.HttpException('Invalid data', 400);
        }
        const studentExists = await this.prisma.student.findUnique({
            where: {
                email: student.email,
            },
        });
        if (studentExists) {
            throw new common_1.HttpException('Student already exists', 400);
        }
        if (student.status !== 'ACTIVE' && student.status !== 'INACTIVE') {
            throw new common_1.HttpException('Invalid status', 400);
        }
        try {
            const studentDB = await this.prisma.student.create({
                data: {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    password: student.password,
                    status: student.status,
                },
            });
            return studentDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, student) {
        const studentExists = await this.prisma.student.findUnique({
            where: {
                id,
            },
        });
        if (!studentExists) {
            throw new common_1.HttpException('Student not found', 404);
        }
        if (student.status !== 'ACTIVE' &&
            student.status !== 'INACTIVE' &&
            student.status) {
            throw new common_1.HttpException('Invalid status', 400);
        }
        try {
            const studentDB = await this.prisma.student.update({
                where: {
                    id,
                },
                data: {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    status: student.status,
                },
            });
            return studentDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const studentExists = await this.prisma.student.findUnique({
            where: {
                id,
            },
        });
        if (!studentExists) {
            throw new common_1.HttpException('Student not found', 404);
        }
        try {
            const studentDB = await this.prisma.student.delete({
                where: {
                    id,
                },
            });
            return studentDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentService);
//# sourceMappingURL=student.service.js.map
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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ErrorCodes_1 = require("../utils/ErrorCodes");
const HashPassword_1 = require("../utils/HashPassword");
let TeacherService = class TeacherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.teacher.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const teacher = await this.prisma.teacher.findUnique({
            where: {
                id,
            },
        });
        if (!teacher) {
            throw new common_1.HttpException('Teacher not found', 404);
        }
        return teacher;
    }
    async create(teacher) {
        if (!teacher.firstName ||
            !teacher.lastName ||
            !teacher.email ||
            !teacher.password) {
            throw new common_1.HttpException('Invalid data', 400);
        }
        const teacherExists = await this.prisma.teacher.findUnique({
            where: {
                email: teacher.email,
            },
        });
        if (teacherExists) {
            throw new common_1.HttpException('Teacher already exists', 400);
        }
        if (teacher.status !== 'ACTIVE' && teacher.status !== 'INACTIVE') {
            throw new common_1.HttpException('Invalid status', 400);
        }
        const hashedPassword = await (0, HashPassword_1.hashPassword)(teacher.password);
        try {
            const teacherDB = await this.prisma.teacher.create({
                data: {
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    email: teacher.email,
                    password: hashedPassword,
                    status: teacher.status,
                },
            });
            return teacherDB;
        }
        catch (error) {
            throw new common_1.HttpException(ErrorCodes_1.ErrorCodes[error.code], common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, teacher) {
        const teacherExists = await this.prisma.teacher.findUnique({
            where: {
                id,
            },
        });
        if (!teacherExists) {
            throw new common_1.HttpException('Teacher not found', 404);
        }
        if (teacher.status !== 'ACTIVE' &&
            teacher.status !== 'INACTIVE' &&
            teacher.status) {
            throw new common_1.HttpException('Invalid status', 400);
        }
        try {
            const teacherDB = await this.prisma.teacher.update({
                where: {
                    id,
                },
                data: {
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    status: teacher.status,
                },
            });
            return teacherDB;
        }
        catch (error) {
            throw new common_1.HttpException(ErrorCodes_1.ErrorCodes[error.code], common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const teacherExists = await this.prisma.teacher.findUnique({
            where: {
                id,
            },
        });
        if (!teacherExists) {
            throw new common_1.HttpException('Teacher not found', 404);
        }
        try {
            const teacherDB = await this.prisma.teacher.delete({
                where: {
                    id,
                },
            });
            return teacherDB;
        }
        catch (error) {
            throw new common_1.HttpException(ErrorCodes_1.ErrorCodes[error.code], common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map
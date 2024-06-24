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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseService = class CourseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.course.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: {
                id,
            },
        });
        if (!course) {
            throw new common_1.HttpException('Course not found', 404);
        }
        return course;
    }
    async create(course) {
        if (!course.title ||
            !course.description ||
            !course.classNumber ||
            !course.beginDate ||
            !course.endDate ||
            !course.teacherId) {
            throw new common_1.HttpException('Invalid data', 400);
        }
        const teacher = await this.prisma.teacher.findUnique({
            where: {
                id: course.teacherId,
            },
        });
        if (!teacher) {
            throw new common_1.HttpException('Teacher not found', 404);
        }
        try {
            const courseDB = await this.prisma.course.create({
                data: {
                    title: course.title,
                    description: course.description,
                    classNumber: course.classNumber,
                    beginDate: course.beginDate,
                    endDate: course.endDate,
                    status: course.status,
                    teacher: {
                        connect: {
                            id: course.teacherId,
                        },
                    },
                },
            });
            return courseDB;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, course) {
        const courseDB = await this.prisma.course.findUnique({
            where: {
                id,
            },
        });
        if (!courseDB) {
            throw new common_1.HttpException('Course not found', 404);
        }
        try {
            const courseUpdated = await this.prisma.course.update({
                where: {
                    id,
                },
                data: {
                    title: course.title,
                    description: course.description,
                    beginDate: course.beginDate,
                    endDate: course.endDate,
                    categories: course.categories,
                    status: course.status,
                    teacher: {
                        connect: {
                            id: course.teacherId,
                        },
                    },
                },
            });
            return courseUpdated;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const courseDB = await this.prisma.course.findUnique({
            where: {
                id,
            },
        });
        if (!courseDB) {
            throw new common_1.HttpException('Course not found', 404);
        }
        try {
            const courseDeleted = await this.prisma.course.delete({
                where: {
                    id,
                },
            });
            return courseDeleted;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map
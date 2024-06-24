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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
let StudentController = class StudentController {
    getStudents() {
        return 'GET /students';
    }
    getStudentById(id) {
        return `GET /students/${id}`;
    }
    getStudentCourses(id) {
        return `GET /students/${id}/courses`;
    }
    getStudentCourse(id, courseId) {
        return `GET /students/${id}/courses/${courseId}`;
    }
    createStudent() {
        return 'POST /students';
    }
    updateStudent(id) {
        return `PUT /students/${id}`;
    }
    deleteStudent(id) {
        return `DELETE /students/${id}`;
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], StudentController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], StudentController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Get)('/:id/courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], StudentController.prototype, "getStudentCourses", null);
__decorate([
    (0, common_1.Get)('/:id/courses/:courseId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", String)
], StudentController.prototype, "getStudentCourse", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], StudentController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], StudentController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], StudentController.prototype, "deleteStudent", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('/students')
], StudentController);
//# sourceMappingURL=student.controller.js.map
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('/students')
export class StudentController {
  @Get()
  getStudents(): string {
    return 'GET /students';
  }

  @Get('/:id')
  getStudentById(id: string): string {
    return `GET /students/${id}`;
  }

  @Get('/:id/courses')
  getStudentCourses(id: string): string {
    return `GET /students/${id}/courses`;
  }

  @Get('/:id/courses/:courseId')
  getStudentCourse(id: string, courseId: string): string {
    return `GET /students/${id}/courses/${courseId}`;
  }

  @Post()
  createStudent(): string {
    return 'POST /students';
  }

  @Put('/:id')
  updateStudent(id: string): string {
    return `PUT /students/${id}`;
  }

  @Delete('/:id')
  deleteStudent(id: string): string {
    return `DELETE /students/${id}`;
  }
}

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { Course } from './interfaces/Course';
import { UpdateCourseDto } from './dto/UpdateCourseDto';
export declare class CourseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    create(course: CreateCourseDto): Promise<Course>;
    update(id: number, course: UpdateCourseDto): Promise<Course>;
    delete(id: number): Promise<Course>;
}

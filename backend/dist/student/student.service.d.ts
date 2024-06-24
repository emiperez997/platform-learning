import { PrismaService } from 'src/prisma/prisma.service';
import { Student } from './interfaces/Student';
import { CreateStudentDto } from './dto/CreateStudentDto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';
export declare class StudentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    create(student: CreateStudentDto): Promise<Student>;
    update(id: number, student: UpdateStudentDto): Promise<Student>;
    delete(id: number): Promise<Student>;
}

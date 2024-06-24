import { PrismaService } from 'src/prisma/prisma.service';
import { Teacher } from './interfaces/Teacher';
import { CreateTeacherDto } from './dto/CreateTeacherDto';
import { UpdateTeacherDto } from './dto/UpdateTeacherDto';
export declare class TeacherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Teacher[]>;
    findOne(id: number): Promise<Teacher>;
    create(teacher: CreateTeacherDto): Promise<Teacher>;
    update(id: number, teacher: UpdateTeacherDto): Promise<Teacher>;
    delete(id: number): Promise<Teacher>;
}

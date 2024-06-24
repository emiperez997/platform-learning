import { TeacherService } from './teacher.service';
import { Teacher } from './interfaces/Teacher';
import { CreateTeacherDto } from './dto/CreateTeacherDto';
import { UpdateTeacherDto } from './dto/UpdateTeacherDto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    findAll(): Promise<Teacher[]>;
    findOne(id: number): Promise<Teacher>;
    create(teacher: CreateTeacherDto): Promise<Teacher>;
    update(id: number, teacher: UpdateTeacherDto): Promise<Teacher>;
    delete(id: number): Promise<Teacher>;
}

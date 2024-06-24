import { Status } from '@prisma/client';
export declare class CreateTeacherDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: Status;
}

import { Status } from '@prisma/client';
export declare class CreateStudentDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: Status;
}

import { Status } from '@prisma/client';
import { Inscription } from 'src/inscription/interfaces/Inscription';
export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: Status;
    courses?: Inscription[];
    createdAt: Date;
    updatedAt: Date;
}

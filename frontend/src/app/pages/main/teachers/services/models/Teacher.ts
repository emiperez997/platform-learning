import { Status } from '../../../../../common/interfaces/status';

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export const teacherColumns: string[] = [
  'id',
  'firstName',
  'email',
  'status',
  'createdAt',
  'updatedAt',
  'actions',
];

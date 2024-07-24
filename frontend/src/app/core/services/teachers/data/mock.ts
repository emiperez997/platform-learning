import { Status } from '../../../../shared/models/status';
import { Teacher } from '../models/Teacher';

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john+teacher@gmail.com',
    status: Status.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Smith',
    email: 'mary+teacher@gmail.com',
    status: Status.INACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Doe',
    email: 'peter+teacher@gmail.com',
    status: Status.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    firstName: 'Anne',
    lastName: 'Peterson',
    email: 'anne+teacher@gmail.com',
    status: Status.INACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    firstName: 'Steve',
    lastName: 'Jobs',
    email: 'steve+teacher@gmail.com',
    status: Status.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

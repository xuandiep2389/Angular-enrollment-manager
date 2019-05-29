import {Student} from './Student';
import {Course} from './Course';

export class Enrollment {
  id: number;
  student: Student;
  course: Course;
  startDate: Date;
  endDate: Date;
  fee: string
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {AddStudentComponent} from './add-student/add-student.component';
import {CoursesComponent} from './courses/courses.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {EnrollmentsComponent} from './enrollments/enrollments.component';
import {AddEnrollmentComponent} from './add-enrollment/add-enrollment.component';
import {EnrollmentDetailComponent} from './enrollment-detail/enrollment-detail.component';
import {ViewStudentComponent} from './view-student/view-student.component';

const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {path: 'students/detail/:id', component: StudentDetailComponent},
  {path: 'students/add', component: AddStudentComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/add', component: AddCourseComponent},
  {path: 'courses/detail/:id', component: CourseDetailComponent},
  {path: 'enrollments', component: EnrollmentsComponent},
  {path: 'enrollments/add', component: AddEnrollmentComponent},
  {path: 'enrollments/detail/:id', component: EnrollmentDetailComponent},
  {path: 'students/view/:id', component: ViewStudentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

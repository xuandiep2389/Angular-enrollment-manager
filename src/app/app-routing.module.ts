import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {AddStudentComponent} from './add-student/add-student.component';

const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {path: 'detail/:id', component: StudentDetailComponent},
  {path: 'students/add', component: AddStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

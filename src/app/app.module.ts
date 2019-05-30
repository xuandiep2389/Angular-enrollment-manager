import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { AddEnrollmentComponent } from './add-enrollment/add-enrollment.component';
import { EnrollmentDetailComponent } from './enrollment-detail/enrollment-detail.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailComponent,
    AddStudentComponent,
    CoursesComponent,
    CourseDetailComponent,
    AddCourseComponent,
    EnrollmentsComponent,
    AddEnrollmentComponent,
    EnrollmentDetailComponent,
    ViewStudentComponent,
    ViewCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

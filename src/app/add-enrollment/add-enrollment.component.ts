import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Enrollment} from '../Enrollment';
import {Location} from '@angular/common';
import {Student} from '../Student';
import {Course} from '../Course';
import {EnrollmentService} from '../enrollment.service';
import {StudentsService} from '../students.service';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrls: ['./add-enrollment.component.css']
})
export class AddEnrollmentComponent implements OnInit {
  addEnrollmentForm: FormGroup;
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];

  constructor(private fb: FormBuilder,
              private enrollmentService: EnrollmentService,
              private location: Location,
              private studentService: StudentsService,
              private courseService: CourseService) {
    this.createForm();
  }

  ngOnInit() {
    this.getStudents();
    this.getCourses();
    this.getEnrollments()
  }

  //ham lay ve tat ca cac student tu api
  getStudents(): void {
    this.studentService.getStudents().subscribe(data => this.students = data)
  }

  //lay ve tat ca cac courses tu api
  getCourses(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data)
  }


  createForm() {
    this.addEnrollmentForm = this.fb.group({
      student: [new Student, Validators.required],
      course: [new Course,Validators.required],
      startDate: new Date,
      endDate: new Date,
      fee: ['', Validators.required]
    })
  }

  add():void {
    if (this.addEnrollmentForm.valid) {
      this.now = new Date();
      const {value} = this.addEnrollmentForm;
      this.enrollmentService.addEnrollment(value).subscribe(e => {
        this.enrollments.unshift(e);
        this.addEnrollmentForm.reset(
          {
            student: [new Student, Validators.required],
            course: [new Course,Validators.required],
            startDate: new Date,
            endDate: new Date,
            fee: ['', Validators.required]
          }
        )
      });
      alert("Add enrollment success");
      this.goBack();
    }
  }

  goBack():void {
    this.location.back();
  }

  now = new Date();

  getEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe(data=> this.enrollments = data)
  }
}

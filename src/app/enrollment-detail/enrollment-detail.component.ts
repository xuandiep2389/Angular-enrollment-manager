import {Component, Input, OnInit} from '@angular/core';
import {Enrollment} from '../Enrollment';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {EnrollmentService} from '../enrollment.service';
import {StudentsService} from '../students.service';
import {CourseService} from '../course.service';
import {Student} from '../Student';
import {Course} from '../Course';

@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.css']
})
export class EnrollmentDetailComponent implements OnInit {

  @Input() enrollment: Enrollment;

  students: Student[];
  courses: Course[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private enrollmentService: EnrollmentService,
    private studentService: StudentsService,
    private courseService: CourseService  ) { }

  ngOnInit() {
    this.getEnrollment();
    this.getStudents();
    this.getCourses();
  }

  getEnrollment():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.enrollmentService.getEnrollment(id)
      .subscribe(e => this.enrollment = e)
  }

  save():void {
    this.enrollmentService.updateEnrollment(this.enrollment)
      .subscribe(() => this.goBack())
  }

  goBack(): void{
    this.location.back();
  }

  //ham lay ve tat ca cac student tu api
  getStudents(): void {
    this.studentService.getStudents().subscribe(data => this.students = data)
  }

  //lay ve tat ca cac courses tu api
  getCourses(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data)
  }

}

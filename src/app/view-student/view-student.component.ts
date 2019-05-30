import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../Student';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {StudentsService} from '../students.service';
import {Enrollment} from '../Enrollment';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  @Input() student: Student;
  enrollmentResult: Enrollment[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentsService
  ) { }

  ngOnInit() {
    this.getStudent();
    this.getEnrollmentsByStudentId()
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(s => this.student = s)
  }

  getEnrollmentsByStudentId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getEnrollmentByStudentId(id).subscribe(data=> this.enrollmentResult = data)
  }

  goBack(): void{
    this.location.back();
  }
}

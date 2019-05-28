import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../Student';
import {ActivatedRoute} from '@angular/router';
import {StudentsService} from '../students.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentsService
  ) { }

  ngOnInit() {
    this.getStudent()
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(s => this.student = s)
  }

  goBack(): void{
    this.location.back();
  }

  save():void {
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack())
  }
}

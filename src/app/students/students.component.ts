import { Component, OnInit } from '@angular/core';
import {Student} from '../Student';
import {StudentsService} from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  searchText;

  config: any;

  constructor(private studentService: StudentsService) {

    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
    };
  }

  ngOnInit() {
    this.getStudents();
  }

  //ham lay ve tat ca cac student tu api
  getStudents(): void {
    this.studentService.getStudents().subscribe(data => this.students = data)
  }

  delete(student: Student):void {
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe()
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}

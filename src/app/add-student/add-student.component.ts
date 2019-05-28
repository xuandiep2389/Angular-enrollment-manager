import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentsService} from '../students.service';
import {Student} from '../Student';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  students: Student[];
  constructor(private fb: FormBuilder,
              private studentService: StudentsService,
              private location: Location) {
    this.createForm();
  }

  createForm() {
    this.addStudentForm = this.fb.group({
      name: ['',Validators.required],
      age: ['',Validators.required],
      gender: ['',Validators.required]
    })
  }

  add():void {
    if (this.addStudentForm.valid) {
      const {value} = this.addStudentForm;
      this.studentService.addStudent(value).subscribe(s => {
        this.students.unshift(s);
        this.addStudentForm.reset(
          {
            name:'',
            age:'',
            gender:''
          }
        )
      });
      alert("Add student success");
      this.goBack();
    }
  }

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => this.students = students)
  }

  goBack():void {
    this.location.back();
  }
}

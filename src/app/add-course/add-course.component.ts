import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from '../Course';
import {CourseService} from '../course.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  addCourseForm: FormGroup;
  courses: Course[];

  constructor(private fb:FormBuilder,
              private courseService: CourseService,
              private location: Location) {
    this.createForm();
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => this.courses = courses)

  }

  createForm() {
    this.addCourseForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
    })
  }

  add():void {
    if (this.addCourseForm.valid) {
      const {value} = this.addCourseForm;
      this.courseService.addCourse(value).subscribe(c => {
        this.courses.unshift(c);
        this.addCourseForm.reset(
          {
            name:'',
            description:''
          }
        )
      });
      alert("Add course success");
      this.goBack();
    }
  }

  goBack():void {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import {Course} from '../Course';
import {CourseService} from '../course.service';
import {Student} from '../Student';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  searchText;
  courses: Course[];
  config: any;

  courseDelete: Course;

  constructor(private courseService: CourseService) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
    };
  }

  ngOnInit() {
    this.getCourses();
  }

  //lay ve tat ca cac courses tu api
  getCourses(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data)
  }

  delete(course: Course):void {
    this.courses = this.courses.filter(s => s !== course);
    this.courseService.deleteCourse(course).subscribe()
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  //parse data course to course in modal to delete course in modal
  parseData(c: Course) {
    this.courseDelete = c;
  }

  // // check course to delete
  // checkC(course: Course){
  //   alert(course.id)
  //   console.log(course)
  // }

}

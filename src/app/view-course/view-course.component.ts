import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../Course';
import {Enrollment} from '../Enrollment';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  @Input() course: Course;
  enrollmentResult: Enrollment[];


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getCourse();
    this.getEnrollmentsByCourseId()
  }

  getCourse():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(c => this.course = c)
  }

  getEnrollmentsByCourseId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getEnrollmentByCourseId(id).subscribe(data=> this.enrollmentResult = data)
  }

  goBack(): void{
    this.location.back();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../Course';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getCourse()
  }

  getCourse():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(c => this.course = c)
  }

  goBack(): void{
    this.location.back();
  }

  save():void {
    this.courseService.updateCourse(this.course)
      .subscribe(() => this.goBack())
  }
}

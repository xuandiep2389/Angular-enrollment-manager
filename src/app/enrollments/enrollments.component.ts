import { Component, OnInit } from '@angular/core';
import {Enrollment} from '../Enrollment';
import {EnrollmentService} from '../enrollment.service';
import {Course} from '../Course';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[];
  config: any;

  constructor(private enrollmentService: EnrollmentService) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
    };
  }

  ngOnInit() {
    this.getEnrollments();
  }

  getEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe(data=> this.enrollments = data)
  }

  delete(enrollment: Enrollment):void {
    this.enrollments = this.enrollments.filter(e => e !== enrollment);
    this.enrollmentService.deleteEnrollment(enrollment).subscribe()
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}

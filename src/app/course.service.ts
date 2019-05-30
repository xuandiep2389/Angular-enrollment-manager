import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course} from './Course';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Enrollment} from './Enrollment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  constructor(private http: HttpClient) { }

  private courseURL = 'http://localhost:8080/courses';

  //get all courses from api
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseURL)
      .pipe(
        catchError(this.handleError('getCourses', []))
      )
  }

  //get a course from api
  getCourse(id: number): Observable<Course> {
    const url = `${this.courseURL}/${id}`;
    return this.http.get<Course>(url).pipe(
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    )
  }

  // PATCH: update the course on the server
  updateCourse(course: Course | number): Observable<any> {
    const id = typeof course === 'number'? course: course.id;
    const url = `${this.courseURL}/${id}`;

    return this.http.patch(url,course, httpOptions).pipe(
      catchError(this.handleError<any>('updateCourse'))
    )
  }

  // POST: add a new course to the server
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseURL, course, httpOptions).pipe(
      catchError(this.handleError<Course>('addCourse'))
    )
  }

  // DELETE: delete course from server
  deleteCourse(course: Course | number ): Observable<Course> {
    const id = typeof course === 'number'? course: course.id;
    const url = `${this.courseURL}/${id}`;

    return this.http.delete<Course>(url, httpOptions).pipe(
      catchError(this.handleError<Course>('deleteCourse'))
    )
  }

  // GET: get all the enrollment with course id
  getEnrollmentByCourseId(course: Course | number): Observable<Enrollment[]> {
    const id = typeof course === 'number'? course: course.id;
    const url = `http://localhost:8080/findEnrollmentByCourseId/${id}`;
    return this.http.get<Enrollment[]>(url).pipe(
      catchError(this.handleError('Get enrollment by courseId', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation',result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

}

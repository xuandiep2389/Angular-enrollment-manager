import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Enrollment} from './Enrollment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  private enrollmentURL = 'http://localhost:8080/enrollments';

  //get all courses from api
  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.enrollmentURL)
      .pipe(
        catchError(this.handleError('getCourses', []))
      )
  }

  // DELETE: delete course from server
  deleteEnrollment(enrollment: Enrollment | number ): Observable<Enrollment> {
    const id = typeof enrollment === 'number'? enrollment: enrollment.id;
    const url = `${this.enrollmentURL}/${id}`;

    return this.http.delete<Enrollment>(url, httpOptions).pipe(
      catchError(this.handleError<Enrollment>('deleteEnrollment'))
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

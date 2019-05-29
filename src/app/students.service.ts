import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Student} from './Student';
import {catchError} from 'rxjs/operators';
import {Enrollment} from './Enrollment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  private studentURL = 'http://localhost:8080/students';
  private enrollmentURL = 'http://localhost:8080/enrollments';


  //get all students from api
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentURL)
      .pipe(
        catchError(this.handleError('getStudents', []))
      )
  }

  //get a student from api
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentURL}/${id}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    )
  }

  // PATCH: update the student on the server
  updateStudent(student: Student | number): Observable<any> {
    const id = typeof student === 'number'? student: student.id;
    const url = `${this.studentURL}/${id}`;

    return this.http.patch(url,student, httpOptions).pipe(
      catchError(this.handleError<any>('updateStudent'))
    )
  }

  // POST: add a new student to the server
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentURL, student, httpOptions).pipe(
      catchError(this.handleError<Student>('addStudent'))
    )
  }

  // DELETE: delete student from server
  deleteStudent(student: Student | number ): Observable<Student> {
    const id = typeof student === 'number'? student: student.id;
    const url = `${this.studentURL}/${id}`;

    return this.http.delete<Student>(url, httpOptions).pipe(
      catchError(this.handleError<Student>('deleteStudent'))
    )
  }

  // GET: get all the enrollment with student id
  getEnrollmentByStudentId(student: Student | number): Observable<Enrollment[]> {
    const id = typeof student === 'number'? student: student.id;
    const url = `http://localhost:8080/findEnrollmentByStudentId/${id}`;
    return this.http.get<Enrollment[]>(url).pipe(
      catchError(this.handleError('Get enrollment by studentId', []))
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

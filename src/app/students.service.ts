import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from './Student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  private studentURL = 'http://localhost:8080/students';

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentURL)
  }

}

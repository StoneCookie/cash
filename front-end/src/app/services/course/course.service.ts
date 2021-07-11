import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Course} from "./course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourse(): Promise<any> {
    return this.http.get(this.baseurl + '/course/').toPromise()
  }

  createCourse(data: Course): Promise<any> {
    return this.http.post(this.baseurl + '/course/create/', data).toPromise();
  }

  updateCourse(data: Course): Promise<any> {
    return this.http.put(this.baseurl + '/course/detail/' + data.id + '/', data).toPromise();
  }

  deleteCourse(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/course/detail/' + data + '/').toPromise();
  }

  public saveToSessionCourse(): any {
    this.http.get(this.baseurl + '/course/').subscribe(
      data => {
        sessionStorage.setItem('course', JSON.stringify(data));
      }
    );
  }
}

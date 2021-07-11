import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Work} from "./work.model";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWork(): Promise<any> {
    return this.http.get(this.baseurl + '/work/').toPromise();
  }

  createWork(data: Work): Promise<any> {
    return this.http.post(this.baseurl + '/work/create/', data).toPromise();
  }

  updateWork(data: Work): Promise<any> {
    return this.http.put(this.baseurl + '/work/detail/' + data.id + '/', data).toPromise();
  }

  deleteWork(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/work/detail/' + data + '/').toPromise();
  }

  public saveToSessionWork(): any {
    this.http.get(this.baseurl + '/work/').subscribe(
      data => {
        sessionStorage.setItem('work', JSON.stringify(data));
      }
    );
  }
}

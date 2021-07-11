import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "./event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvent(): Promise<any> {
    return this.http.get(this.baseurl + '/event/').toPromise()
  }

  createEvent(data: Event): Promise<any> {
    return this.http.post(this.baseurl + '/event/create/', data).toPromise();
  }

  updateEvent(data: Event): Promise<any> {
    return this.http.put(this.baseurl + '/event/detail/' + data.id + '/', data).toPromise();
  }

  deleteEvent(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/event/detail/' + data + '/').toPromise();
  }

  public saveToSessionEvent(): any {
    this.http.get(this.baseurl + '/event/').subscribe(
      data => {
        sessionStorage.setItem('event', JSON.stringify(data));
      }
    );
  }
}

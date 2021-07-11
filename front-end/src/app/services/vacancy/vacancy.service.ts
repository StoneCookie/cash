import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Vacancy} from "./vacancy.model";

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVacancy(): Promise<any> {
    return this.http.get(this.baseurl + '/vacancy/').toPromise();
  }

  createVacancy(data: Vacancy): Promise<any> {
    return this.http.post(this.baseurl + '/vacancy/create/', data).toPromise();
  }

  updateVacancy(data: Vacancy): Promise<any> {
    return this.http.put(this.baseurl + '/vacancy/detail/' + data.id + '/', data).toPromise();
  }

  deleteVacancy(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/vacancy/detail/' + data + '/').toPromise();
  }

  public saveToSessionVacancy(): any {
    this.http.get(this.baseurl + '/vacancy/').subscribe(
      data => {
        sessionStorage.setItem('vacancy', JSON.stringify(data));
      }
    );
  }
}

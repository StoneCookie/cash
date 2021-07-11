import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Company} from "./company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCompany(): Promise<any> {
    return this.http.get(this.baseurl + '/company/').toPromise()
  }

  createCompany(data: Company): Promise<any> {
    return this.http.post(this.baseurl + '/company/create/', data).toPromise();
  }

  updateCompany(data: Company): Promise<any> {
    return this.http.put(this.baseurl + '/company/detail/' + data.id + '/', data).toPromise();
  }

  deleteCompany(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/company/detail/' + data + '/').toPromise();
  }

  public saveToSessionCompany(): any {
    this.http.get(this.baseurl + '/company/').subscribe(
      data => {
        sessionStorage.setItem('company', JSON.stringify(data));
      }
    );
  }
}

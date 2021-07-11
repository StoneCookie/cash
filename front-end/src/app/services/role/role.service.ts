import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Role} from "./role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getRole(): Promise<any> {
    return this.http.get(this.baseurl + '/role/').toPromise();
  }

  createRole(data: Role): Promise<any> {
    return this.http.post(this.baseurl + '/role/create/', data).toPromise();
  }

  updateRole(data: Role): Promise<any> {
    return this.http.put(this.baseurl + '/role/detail/' + data.id + '/', data).toPromise();
  }

  deleteRole(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/role/detail/' + data + '/').toPromise();
  }

  public saveToSessionRole(): any {
    this.http.get(this.baseurl + '/role/').subscribe(
      data => {
        sessionStorage.setItem('role', JSON.stringify(data));
      }
    );
  }
}

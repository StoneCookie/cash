import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategory(): Promise<any> {
    return this.http.get(this.baseurl + '/category/').toPromise()
  }

  createCategory(data: Category): Promise<any> {
    return this.http.post(this.baseurl + '/category/create/', data).toPromise();
  }

  updateCategory(data: Category): Promise<any> {
    return this.http.put(this.baseurl + '/category/detail/' + data.id + '/', data).toPromise();
  }

  deleteCategory(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/category/detail/' + data + '/').toPromise();
  }

  public saveToSessionCategory(): any {
    this.http.get(this.baseurl + '/category/').subscribe(
      data => {
        sessionStorage.setItem('category', JSON.stringify(data));
      }
    );
  }
}

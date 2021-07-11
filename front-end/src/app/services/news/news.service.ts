import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {News} from "./news.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNews(): Promise<any> {
    return this.http.get(this.baseurl + '/news/').toPromise()
  }

  createNews(data: News): Promise<any> {
    return this.http.post(this.baseurl + '/news/create/', data).toPromise();
  }

  updateNews(data: News): Promise<any> {
    return this.http.put(this.baseurl + '/news/detail/' + data.id + '/', data).toPromise();
  }

  deleteNews(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/news/detail/' + data + '/').toPromise();
  }

  public saveToSessionNews(): any {
    this.http.get(this.baseurl + '/news/').subscribe(
      data => {
        sessionStorage.setItem('news', JSON.stringify(data));
      }
    );
  }
}

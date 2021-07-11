import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Note} from "./note.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getNote(): Promise<any> {
    return this.http.get(this.baseurl + '/note/').toPromise()
  }

  createNote(data: Note): Promise<any> {
    return this.http.post(this.baseurl + '/note/create/', data).toPromise();
  }

  updateNote(data: Note): Promise<any> {
    return this.http.put(this.baseurl + '/note/detail/' + data.id + '/', data).toPromise();
  }

  deleteNote(data: number): Promise<any> {
    return this.http.delete(this.baseurl + '/note/detail/' + data + '/').toPromise();
  }

  public saveToSessionNote(): any {
    this.http.get(this.baseurl + '/news/').subscribe(
      data => {
        sessionStorage.setItem('news', JSON.stringify(data));
      }
    );
  }
}

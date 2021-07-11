import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {RoleService} from "../role/role.service";
import {CompanyService} from "../company/company.service";
import {CategoryService} from "../category/category.service";
import {EventService} from "../event/event.service";
import {VacancyService} from "../vacancy/vacancy.service";
import {WorkService} from "../work/work.service";
import {CourseService} from "../course/course.service";
import {NewsService} from "../news/news.service";
import {NoteService} from "../note/note.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;

  private httpOptions: any;

  // @ts-ignore
  private id: string;
  // @ts-ignore
  private token: string;
  // @ts-ignore
  private fio: string;
  // @ts-ignore
  private mail: string;
  // @ts-ignore
  private login: string;
  // @ts-ignore
  private role: string;

  private errors: any = [];

  constructor(private http: HttpClient,
              private router: Router,
              private roleService: RoleService,
              private companyService: CompanyService,
              private categoryService: CategoryService,
              private eventService: EventService,
              private vacancyService: VacancyService,
              private workService: WorkService,
              private courseService: CourseService,
              private newsService: NewsService,
              private noteService: NoteService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public auth(user: any): any {
    this.http.post(this.baseurl + '/user/login', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        // @ts-ignore
        this.updateData(data['token']);
        console.log(this.token);
      },
      err => {
        this.errors = err['error'];
        console.log(this.errors);
      }
    );
  }

  public logout(): void {
    // @ts-ignore
    this.id = null;
    // @ts-ignore
    this.fio = null;
    // @ts-ignore
    this.mail = null;
    // @ts-ignore
    this.login = null;
    // @ts-ignore
    this.role = null;
    sessionStorage.clear();
  }

  public getCompany(): Promise<any>{
    return this.http.get(this.baseurl + '/company/').toPromise();
  }

  private updateData(token: any): void {
    this.token = token;
    this.errors = [];
    console.log(this.token);
    try{
      const token_parts = this.token.split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      this.id = token_decoded.id;
      this.fio = token_decoded.fio;
      this.mail = token_decoded.mail;
      this.login = token_decoded.login;
      this.role = token_decoded.role;

      sessionStorage.setItem("id", this.id);
      sessionStorage.setItem("fio", this.fio);
      sessionStorage.setItem("mail", this.mail);
      sessionStorage.setItem("login", this.login);
      sessionStorage.setItem("role", this.role);
      sessionStorage.setItem("token", this.token);
      this.roleService.saveToSessionRole();
      this.companyService.saveToSessionCompany();
      this.categoryService.saveToSessionCategory();
      this.eventService.saveToSessionEvent();
      this.vacancyService.saveToSessionVacancy();
      this.workService.saveToSessionWork();
      this.courseService.saveToSessionCourse();
      this.newsService.saveToSessionNews();
      this.noteService.saveToSessionNote();

    }
    catch (e) {
      console.log(e);
    }
  }

  public getId(): string | null {
    return sessionStorage.getItem("id");
  }
  public getFio(): string | null {
    return sessionStorage.getItem("fio");
  }
  public getMail(): string | null {
    return sessionStorage.getItem("mail");
  }
  public getLogin(): string | null {
    return sessionStorage.getItem("login");
  }
  public getRole(): string | null {
    return sessionStorage.getItem("role");
  }
  public getToken(): string | null {
    return sessionStorage.getItem("token");
  }
}

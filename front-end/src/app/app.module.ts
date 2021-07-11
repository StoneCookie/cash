import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './ui/footer/footer.component';
import {NavigationComponent} from './ui/navigation/navigation.component';
import {LoginComponent} from './ui/login/login.component';
import {CategoryComponent} from './ui/tables/category/category.component';
import {CompanyComponent} from './ui/tables/company/company.component';
import {CourseComponent} from './ui/tables/course/course.component';
import {EventComponent} from './ui/tables/event/event.component';
import {NewsComponent} from './ui/tables/news/news.component';
import {NoteComponent} from './ui/tables/note/note.component';
import {RoleComponent} from './ui/tables/role/role.component';
import {VacancyComponent} from './ui/tables/vacancy/vacancy.component';
import {WorkComponent} from './ui/tables/work/work.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user/user.service";
import {SearchPipe} from "./Search.pipe";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    CategoryComponent,
    CompanyComponent,
    CourseComponent,
    EventComponent,
    NewsComponent,
    NoteComponent,
    RoleComponent,
    VacancyComponent,
    WorkComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

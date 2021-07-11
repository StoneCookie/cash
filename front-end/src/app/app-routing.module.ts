import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from "./ui/home/home.component";
import { LoginComponent } from "./ui/login/login.component";
import { RoleComponent } from "./ui/tables/role/role.component";
import { CompanyComponent } from "./ui/tables/company/company.component";
import { CategoryComponent } from "./ui/tables/category/category.component";
import { WorkComponent } from "./ui/tables/work/work.component";
import { VacancyComponent } from "./ui/tables/vacancy/vacancy.component";
import { EventComponent } from "./ui/tables/event/event.component";
import { CourseComponent } from "./ui/tables/course/course.component";
import { NewsComponent } from "./ui/tables/news/news.component";
import { NoteComponent } from "./ui/tables/note/note.component";

const routes: Routes = [
  // {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'role', component: RoleComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'work', component: WorkComponent},
  {path: 'vacancy', component: VacancyComponent},
  {path: 'event', component: EventComponent},
  {path: 'course', component: CourseComponent},
  {path: 'news', component: NewsComponent},
  {path: 'note', component: NoteComponent},
  // {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

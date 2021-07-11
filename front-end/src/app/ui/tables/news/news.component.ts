import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {News} from "../../../services/news/news.model";
import {NewsService} from "../../../services/news/news.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiNews: NewsService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.news.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.news.find(x => x.id === id).name, Validators.required),
      // @ts-ignore
      description: new FormControl(this.news.find(x => x.id === id).description, Validators.required),
      // @ts-ignore
      date: new FormControl(this.news.find(x => x.id === id).date, Validators.required),
      // @ts-ignore
      status: new FormControl(this.news.find(x => x.id === id).status, Validators.required),
      // @ts-ignore
      id_category: new FormControl(this.news.find(x => x.id === id).id_category, Validators.required),
      // @ts-ignore
      id_company: new FormControl(this.news.find(x => x.id === id).id_company, Validators.required),

    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addNewsModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
      // @ts-ignore
      description: new FormControl('', Validators.required),
      // @ts-ignore
      date: new FormControl('', Validators.required),
      // @ts-ignore
      status: new FormControl('', Validators.required),
      // @ts-ignore
      id_category: new FormControl('', Validators.required),
      // @ts-ignore
      id_company: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addNews(){
    this.apiNews.createNews(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editNews() {
    this.apiNews.updateNews(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delNews(id: any){
    this.apiNews.deleteNews(id);
    this.initData();
  }

  async initData() {
    try {
      this.news = await this.apiNews.getNews();
    } catch (error) {
      console.log(error);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Category} from "../../../services/category/category.model";
import {CategoryService} from "../../../services/category/category.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  category: Category[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiCategory: CategoryService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.category.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.category.find(x => x.id === id).name, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCategoryModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCategory(){
    this.apiCategory.createCategory(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editCategory() {
    this.apiCategory.updateCategory(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delCategory(id: any){
    this.apiCategory.deleteCategory(id);
    this.initData();
  }

  async initData() {
    try {
      this.category = await this.apiCategory.getCategory();
    } catch (error) {
      console.log(error);
    }
  }
}

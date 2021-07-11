import {Component, OnInit} from '@angular/core';
import {Work} from "../../../services/work/work.model";
import {WorkService} from "../../../services/work/work.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass']
})
export class WorkComponent implements OnInit {

  work: Work[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiWork: WorkService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.work.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.work.find(x => x.id === id).name, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addWorkModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addWork() {
    this.apiWork.createWork(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editWork() {
    this.apiWork.updateWork(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delWork(id: any) {
    this.apiWork.deleteWork(id);
    this.initData();
  }

  async initData() {
    try {
      this.work = await this.apiWork.getWork();
    } catch (error) {
      console.log(error);
    }
  }

}

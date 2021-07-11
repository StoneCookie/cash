import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyService} from "../../../services/company/company.service";
import {Company} from "../../../services/company/company.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  company: Company[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiCompany: CompanyService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.company.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.company.find(x => x.id === id).name, Validators.required),
      // @ts-ignore
      description: new FormControl(this.company.find(x => x.id === id).description, Validators.required),
      // @ts-ignore
      mail: new FormControl(this.company.find(x => x.id === id).mail, Validators.required),
      // @ts-ignore
      phone: new FormControl(this.company.find(x => x.id === id).phone, Validators.required),
      // @ts-ignore
      fio: new FormControl(this.company.find(x => x.id === id).fio, Validators.required),
      // @ts-ignore
      id_role: new FormControl(this.company.find(x => x.id === id).id_role, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCompanyModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
      // @ts-ignore
      description: new FormControl('', Validators.required),
      // @ts-ignore
      mail: new FormControl('', Validators.required),
      // @ts-ignore
      phone: new FormControl('', Validators.required),
      // @ts-ignore
      fio: new FormControl('', Validators.required),
      // @ts-ignore
      id_role: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCompany(){
    this.apiCompany.createCompany(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editCompany() {
    this.apiCompany.updateCompany(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delCompany(id: any){
    this.apiCompany.deleteCompany(id);
    this.initData();
  }

  async initData() {
    try {
      this.company = await this.apiCompany.getCompany();
    } catch (error) {
      console.log(error);
    }
  }

}

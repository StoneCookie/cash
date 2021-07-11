import {Component, OnInit} from '@angular/core';
import {Vacancy} from "../../../services/vacancy/vacancy.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VacancyService} from "../../../services/vacancy/vacancy.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.sass']
})
export class VacancyComponent implements OnInit {

  vacancy: Vacancy[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiVacancy: VacancyService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }


  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.vacancy.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.vacancy.find(x => x.id === id).name, Validators.required),
      // @ts-ignore
      description: new FormControl(this.vacancy.find(x => x.id === id).description, Validators.required),
      // @ts-ignore
      requirements: new FormControl(this.vacancy.find(x => x.id === id).requirements, Validators.required),
      // @ts-ignore
      conditions: new FormControl(this.vacancy.find(x => x.id === id).conditions, Validators.required),
      // @ts-ignore
      responsibilities: new FormControl(this.vacancy.find(x => x.id === id).responsibilities, Validators.required),
      // @ts-ignore
      id_category: new FormControl(this.vacancy.find(x => x.id === id).id_category, Validators.required),
      // @ts-ignore
      id_work: new FormControl(this.vacancy.find(x => x.id === id).id_work, Validators.required),
      // @ts-ignore
      id_company: new FormControl(this.vacancy.find(x => x.id === id).id_company, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addVacancyModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
      // @ts-ignore
      description: new FormControl('', Validators.required),
      // @ts-ignore
      requirements: new FormControl('', Validators.required),
      // @ts-ignore
      conditions: new FormControl('', Validators.required),
      // @ts-ignore
      responsibilities: new FormControl('', Validators.required),
      // @ts-ignore
      id_category: new FormControl('', Validators.required),
      // @ts-ignore
      id_work: new FormControl('', Validators.required),
      // @ts-ignore
      id_company: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addVacancy() {
    this.apiVacancy.createVacancy(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editVacancy() {
    this.apiVacancy.updateVacancy(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delVacancy(id: any) {
    this.apiVacancy.deleteVacancy(id);
    this.initData();
  }

  async initData() {
    try {
      this.vacancy = await this.apiVacancy.getVacancy();
    } catch (error) {
      console.log(error);
    }
  }
}

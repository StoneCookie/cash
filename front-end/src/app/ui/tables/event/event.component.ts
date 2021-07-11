import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event/event.service";
import {Event} from "../../../services/event/event.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {

  event: Event[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiEvent: EventService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.event.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.event.find(x => x.id === id).name, Validators.required),
      // @ts-ignore
      date: new FormControl(this.event.find(x => x.id === id).date, Validators.required),
      // @ts-ignore
      id_company: new FormControl(this.event.find(x => x.id === id).id_company, Validators.required),

    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addEventModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
      // @ts-ignore
      date: new FormControl('', Validators.required),
      // @ts-ignore
      id_company: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addEvent(){
    this.apiEvent.createEvent(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editEvent() {
    this.apiEvent.updateEvent(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delEvent(id: any){
    this.apiEvent.deleteEvent(id);
    this.initData();
  }

  async initData() {
    try {
      this.event = await this.apiEvent.getEvent();
    } catch (error) {
      console.log(error);
    }
  }

}

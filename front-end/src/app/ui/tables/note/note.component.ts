import {Component, OnInit} from '@angular/core';
import {Note} from "../../../services/note/note.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NoteService} from "../../../services/note/note.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  note: Note[] = [];
  Object = Object;

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiNote: NoteService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.note.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      id_user: new FormControl(this.note.find(x => x.id === id).id_user, Validators.required),
      // @ts-ignore
      id_course: new FormControl(this.note.find(x => x.id === id).id_course, Validators.required),

    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addNoteModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      id_user: new FormControl('', Validators.required),
      // @ts-ignore
      id_course: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addNote(){
    this.apiNote.createNote(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editNote() {
    this.apiNote.updateNote(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delNote(id: any){
    this.apiNote.deleteNote(id);
    this.initData();
  }

  async initData() {
    try {
      this.note = await this.apiNote.getNote();
    } catch (error) {
      console.log(error);
    }
  }

}

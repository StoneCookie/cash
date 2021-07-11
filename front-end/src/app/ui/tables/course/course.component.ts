import {Component, OnInit} from '@angular/core';
import {Course} from "../../../services/course/course.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../services/course/course.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass']
})
export class CourseComponent implements OnInit {

  course: Course[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiCourse: CourseService,
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
      duration: new FormControl(this.company.find(x => x.id === id).duration, Validators.required),
      // @ts-ignore
      id_category: new FormControl(this.company.find(x => x.id === id).id_category, Validators.required),
      // @ts-ignore
      id_company: new FormControl(this.company.find(x => x.id === id).id_company, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCourseModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
      // @ts-ignore
      description: new FormControl('', Validators.required),
      // @ts-ignore
      duration: new FormControl('', Validators.required),
      // @ts-ignore
      id_category: new FormControl('', Validators.required),
      // @ts-ignore
      id_company: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addCourse() {
    this.apiCourse.createCourse(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editCourse() {
    this.apiCourse.updateCourse(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delCourse(id: any) {
    this.apiCourse.deleteCourse(id);
    this.initData();
  }

  async initData() {
    try {
      this.course = await this.apiCourse.getCourse();
    } catch (error) {
      console.log(error);
    }
  }

}

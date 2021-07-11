import {Component, OnInit} from '@angular/core';
import {Role} from "../../../services/role/role.model";
import {RoleService} from "../../../services/role/role.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  role: Role[] = [];
  Object = Object;
  search = '';

  modalReference: any;

  // @ts-ignore
  editModal: FormGroup;

  constructor(private apiRole: RoleService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initData();
  }

  open(content: any, id: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl(this.role.find(x => x.id === id).id, Validators.required),
      // @ts-ignore
      name: new FormControl(this.role.find(x => x.id === id).name, Validators.required),
    });
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addRoleModal(content: any) {
    this.editModal = new FormGroup({
      // @ts-ignore
      id: new FormControl('', Validators.required),
      // @ts-ignore
      name: new FormControl('', Validators.required),
    });

    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addRole() {
    this.apiRole.createRole(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  editRole() {
    this.apiRole.updateRole(this.editModal.value);
    this.modalReference.close();
    this.initData();
  }

  delRole(id: any) {
    this.apiRole.deleteRole(id);
    this.initData();
  }

  async initData() {
    try {
      this.role = await this.apiRole.getRole();
    } catch (error) {
      console.log(error);
    }
  }
}

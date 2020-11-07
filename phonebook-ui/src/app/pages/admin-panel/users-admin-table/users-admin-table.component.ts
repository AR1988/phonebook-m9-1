import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {UserAdmin} from "../../../model/admin-models/user-admin";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users-admin-table',
  templateUrl: './users-admin-table.component.html',
  styleUrls: ['./users-admin-table.component.css']
})
export class UsersAdminTableComponent implements OnInit, OnDestroy {

  users: UserAdmin[];
  sortBy: string;
  reverseSort: boolean;

  private subscriptions = new Subscription();

  searchFormUser: FormGroup;
  searchTerm: string;
  onlyActivated = false;
  showColumnProfile: boolean = false;
  showColumnRoles: boolean = false;

  constructor(public adminService: AdminService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.reload();

    this.subscriptions.add(
      this.searchFormUser.get("searchInput")
        .valueChanges
        .subscribe(searchText => this.searchTerm = searchText)
    );
  }

  createForm(): void {
    this.searchFormUser = this.fb.group({
      searchInput: []
    });
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllUsers().subscribe(value => this.users = value)
    );
  }

  removeUser(user: UserAdmin) {
    this.subscriptions.add(
      this.adminService.removeUser(user).subscribe(() => {
        this.ngOnInit();
      })
    );
  }

  activate(user: UserAdmin): void {
    this.subscriptions.add(
      this.adminService.activateUser(user).subscribe(() => {
        this.ngOnInit();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  sort(sortBy: string): void {
    if (this.sortBy !== sortBy)
      this.reverseSort = false;

    this.sortBy = sortBy;
    this.reverseSort = !this.reverseSort;
  }
}

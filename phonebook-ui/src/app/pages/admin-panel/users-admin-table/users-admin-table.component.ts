import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {AdminService} from "../../../service/admin.service";
import {UserAdmin} from "../../../model/admin-models/user-admin";
import {Subscription} from "rxjs";

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

  constructor(public adminService: AdminService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllUsers().subscribe(value => this.users = value)
    );
  }

  removeUser(user: User) {
    this.subscriptions.add(
      this.adminService.removeUser(user).subscribe(() => {
        this.ngOnInit();
      })
    );
  }

  activate(user: User): void {
    this.subscriptions.add(
      this.adminService.activateUser(user).subscribe(() => {
        this.ngOnInit();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

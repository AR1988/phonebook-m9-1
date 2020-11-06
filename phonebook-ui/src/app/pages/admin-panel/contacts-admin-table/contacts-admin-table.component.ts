import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {ContactAdmin} from "../../../model/admin-models/contact-admin";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contacts-admin-table',
  templateUrl: './contacts-admin-table.component.html',
  styleUrls: ['./contacts-admin-table.component.css']
})
export class ContactsAdminTableComponent implements OnInit, OnDestroy {

  contacts: ContactAdmin[];
  reverseSort: boolean;
  sortBy: string;

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllContacts().subscribe(value => this.contacts = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

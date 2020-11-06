import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {EmailAdmin} from "../../../model/admin-models/email-admin";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-emails-admin-table',
  templateUrl: './emails-admin-table.component.html',
  styleUrls: ['./emails-admin-table.component.css']
})
export class EmailsAdminTableComponent implements OnInit {

  emails: EmailAdmin[];
  sortBy: string;
  reverseSort: boolean;

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllEmails().subscribe(value => this.emails = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

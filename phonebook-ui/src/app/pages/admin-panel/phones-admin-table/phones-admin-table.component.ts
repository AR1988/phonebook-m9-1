import {Component, OnInit} from '@angular/core';
import {PhoneAdmin} from "../../../model/admin-models/phone-admin";
import {AdminService} from "../../../service/admin.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-phones-admin-table',
  templateUrl: './phones-admin-table.component.html',
  styleUrls: ['./phones-admin-table.component.css']
})
export class PhonesAdminTableComponent implements OnInit {

  phones: PhoneAdmin[];
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
      this.adminService.getAllPhones().subscribe(value => this.phones = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

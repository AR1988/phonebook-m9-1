import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {AddressAdmin} from "../../../model/admin-models/address-admin";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-addresses-admin-table',
  templateUrl: './addresses-admin-table.component.html',
  styleUrls: ['./addresses-admin-table.component.css']
})
export class AddressesAdminTableComponent implements OnInit, OnDestroy {

  addresses: AddressAdmin[]
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
      this.adminService.getAllAddresses().subscribe(value => this.addresses = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

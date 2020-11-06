import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stats-admin',
  templateUrl: './stats-admin.component.html',
  styleUrls: ['./stats-admin.component.css']
})
export class StatsAdminComponent implements OnInit, OnDestroy {

  infoArray = [];

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getInfo().subscribe(value => {
        this.infoArray = [
          {field: 'users', value: value.users},
          {field: 'activated users', value: value.activatedUsers},
          {field: 'contacts', value: value.contacts},
          {field: 'phones', value: value.phones},
          {field: 'addresses', value: value.addresses},
          {field: 'emails', value: value.emails},
          {field: 'recovery tokens', value: value.recoveryTokens},
          {field: 'activate tokens', value: value.activateTokens}
        ];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

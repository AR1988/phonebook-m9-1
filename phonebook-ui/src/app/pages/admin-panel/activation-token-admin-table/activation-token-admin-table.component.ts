import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {ActivationTokenAdmin} from "../../../model/admin-models/activation-token";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-activation-token-admin-table',
  templateUrl: './activation-token-admin-table.component.html',
  styleUrls: ['./activation-token-admin-table.component.css']
})
export class ActivationTokenAdminTableComponent implements OnInit, OnDestroy {

  activationToken: ActivationTokenAdmin[];
  sortBy: string;
  reverseSort: boolean;

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllActivationTokens().subscribe(value => this.activationToken = value)
    );
  }

  ngOnInit(): void {
    this.reload();
  }

  removeToken(token: string): void {
    this.subscriptions.add(
      this.adminService.removeActivationToken(token).subscribe(() => {
        this.ngOnInit();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

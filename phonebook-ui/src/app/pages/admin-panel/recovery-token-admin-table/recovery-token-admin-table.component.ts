import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {RecoveryTokenAdmin} from "../../../model/admin-models/recovery-token";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recovery-token-admin-table',
  templateUrl: './recovery-token-admin-table.component.html',
  styleUrls: ['./recovery-token-admin-table.component.css']
})
export class RecoveryTokenAdminTableComponent implements OnInit, OnDestroy {

  recoveryToken: RecoveryTokenAdmin[];
  sortBy: string;
  reverseSort: boolean;

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  removeToken(token: string): void {
    this.subscriptions.add(this.adminService.removeRecoveryToken(token).subscribe(() => {
        this.adminService.triggerOnReloadContactsList();
        this.ngOnInit();
        this.adminService.triggerOnReloadContactsList();
      })
    );
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getAllRecoveryTokens().subscribe(value => this.recoveryToken = value)
    );
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

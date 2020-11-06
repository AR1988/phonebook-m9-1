import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {InfoAdmin} from "../../model/admin-models/info-admin";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  info: InfoAdmin;
  links = [
    {title: 'Users', path: 'users'},
    {title: 'Contacts', path: 'contacts'},
    {title: 'Phones', path: 'phones'},
    {title: 'Addresses', path: 'addresses'},
    {title: 'Emails', path: 'emails'},
    {title: 'Recovery tokens', path: 'recovery-tokens'},
    {title: 'Activations tokens', path: 'activate-tokens'},
  ];

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.reload();
    this.subscriptions.add(
      this.adminService.trigger$.subscribe(() => this.reload())
    );
  }

  reload(): void {
    this.subscriptions.add(
      this.adminService.getInfo().subscribe(value => this.info = value)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  links = [
    {title: 'Statistic', path: 'statistic'},
    {title: 'Users', path: 'users'},
    {title: 'Contacts', path: 'contacts'},
    {title: 'Phones', path: 'phones'},
    {title: 'Addresses', path: 'addresses'},
    {title: 'Emails', path: 'emails'},
    {title: 'Recovery tokens', path: 'recovery-tokens'},
    {title: 'Activations tokens', path: 'activate-tokens'}
  ];
}

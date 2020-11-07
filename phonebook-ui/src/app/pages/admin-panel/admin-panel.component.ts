import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  linksMain = [
    {title: 'Statistic', path: 'statistic'},
    {title: 'Users', path: 'users'},
    {title: 'Recovery tokens', path: 'recovery-tokens'},
    {title: 'Activations tokens', path: 'activate-tokens'},

  ];

  linksOther = [
    {title: 'Contacts', path: 'contacts'},
    {title: 'Phones', path: 'phones'},
    {title: 'Addresses', path: 'addresses'},
    {title: 'Emails', path: 'emails'}
  ]
}

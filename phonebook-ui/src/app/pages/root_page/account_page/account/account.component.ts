import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../../service/tokenHandle/token-storage.service";

@Component({
  selector: 'app-user-details-pgae',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

}

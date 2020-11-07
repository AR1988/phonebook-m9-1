import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAdmin} from "../model/admin-models/user-admin";
import {ContactAdmin} from "../model/admin-models/contact-admin";
import {PhoneAdmin} from "../model/admin-models/phone-admin";
import {AddressAdmin} from "../model/admin-models/address-admin";
import {EmailAdmin} from "../model/admin-models/email-admin";
import {InfoAdmin} from "../model/admin-models/info-admin";
import {ActivationTokenAdmin} from "../model/admin-models/activation-token";
import {RecoveryTokenAdmin} from "../model/admin-models/recovery-token";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly adminPath = '/api/admin';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(`${this.adminPath}/users`)
  };

  getAllContacts(): Observable<ContactAdmin[]> {
    return this.http.get<ContactAdmin[]>(`${this.adminPath}/contacts`)
  };

  getAllPhones(): Observable<PhoneAdmin[]> {
    return this.http.get<PhoneAdmin[]>(`${this.adminPath}/phones`)
  };

  getAllAddresses(): Observable<AddressAdmin[]> {
    return this.http.get<AddressAdmin[]>(`${this.adminPath}/addresses`)
  };

  getAllEmails(): Observable<EmailAdmin[]> {
    return this.http.get<EmailAdmin[]>(`${this.adminPath}/emails`)
  }

  getInfo(): Observable<InfoAdmin> {
    return this.http.get<InfoAdmin>(`${this.adminPath}/info`)
  }

  getAllActivationTokens(): Observable<any[]> {
    return this.http.get<ActivationTokenAdmin[]>(`${this.adminPath}/activation-token`);
  }

  getAllRecoveryTokens(): Observable<RecoveryTokenAdmin[]> {
    return this.http.get<RecoveryTokenAdmin[]>(`${this.adminPath}/recovery-token`)
  }

  removeUser(user: UserAdmin): Observable<void> {
    return this.http.delete<void>(`${this.adminPath}/${user.email}`)
  };

  removeActivationToken(tokenId: string): Observable<void> {
    return this.http.delete<void>(`${this.adminPath}/activation-token/${tokenId}`)
  };

  removeRecoveryToken(tokenId: string): Observable<void> {
    return this.http.delete<void>(`${this.adminPath}/recovery-token/${tokenId}`)
  };

  activateUser(user: UserAdmin): Observable<void> {
    return this.http.patch<void>(`${this.adminPath}/activate`, user);
  }

}

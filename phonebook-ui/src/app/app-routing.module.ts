import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {ActivateEmailComponent} from "./activate-email/activate-email.component";
import {ActivationComponent} from "./activation/activation.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./service/auth.guard";
import {HomePageComponent} from "./pages/root_page/home-page/home-page.component";
import {ContactsComponent} from "./pages/root_page/contacts_page/contacts/contacts.component";
import {AccountComponent} from "./pages/root_page/account_page/account/account.component";
import {AccountPasswordComponent} from "./pages/root_page/account_page/account-password/account-password.component";
import {ContactDetailsComponent} from "./pages/root_page/contact-datails-page/contact-details/contact-details.component";
import {AdminPanelComponent} from "./pages/admin-panel/admin-panel.component";
import {AdminGuard} from "./service/admin.guard";
import {UsersAdminTableComponent} from "./pages/admin-panel/users-admin-table/users-admin-table.component";
import {PhonesAdminTableComponent} from "./pages/admin-panel/phones-admin-table/phones-admin-table.component";
import {ContactsAdminTableComponent} from "./pages/admin-panel/contacts-admin-table/contacts-admin-table.component";
import {AddressesAdminTableComponent} from "./pages/admin-panel/addresses-admin-table/addresses-admin-table.component";
import {EmailsAdminTableComponent} from "./pages/admin-panel/emails-admin-table/emails-admin-table.component";
import {RecoveryTokenAdminTableComponent} from "./pages/admin-panel/recovery-token-admin-table/recovery-token-admin-table.component";
import {ActivationTokenAdminTableComponent} from "./pages/admin-panel/activation-token-admin-table/activation-token-admin-table.component";

const routes: Routes = [
  {path: '', redirectTo: 'contacts', pathMatch: 'full'},

  {path: 'user/login', component: LoginComponent},
  {path: 'user/registration', component: RegistrationComponent},
  {path: 'user/activate-email', component: ActivateEmailComponent},
  {path: 'user/activation/:token', component: ActivationComponent},
  {path: 'user/forgot-password', component: ForgotPasswordComponent},
  {path: 'user/password-recovery/:token', component: PasswordRecoveryComponent},

  // {path: 'admin-panel', redirectTo:'admin-panel/users'},
  // {
  //   path: 'admin-panel', component: AdminPanelComponent,
  //   children: [
  //     {path: "users", component: UsersAdminTableComponent},
  //     {path: "contacts", component: ContactsAdminTableComponent},
  //     {path: "phones", component: PhonesAdminTableComponent},
  //     {path: "addresses", component: AddressesAdminTableComponent},
  //     {path: "emails", component: EmailsAdminTableComponent},
  //     {path: "recovery-tokens", component: RecoveryTokenAdminTableComponent},
  //     {path: "activate-tokens", component: ActivationTokenAdminTableComponent}
  //   ]
  //   , canActivate: [AdminGuard, AuthGuard]
  // },

  {
    path: '', component: HomePageComponent,
    children: [
      {path: 'admin-panel', redirectTo:'admin-panel/users'},
      {
        path: 'admin-panel', component: AdminPanelComponent,
        children: [
          {path: "users", component: UsersAdminTableComponent},
          {path: "contacts", component: ContactsAdminTableComponent},
          {path: "phones", component: PhonesAdminTableComponent},
          {path: "addresses", component: AddressesAdminTableComponent},
          {path: "emails", component: EmailsAdminTableComponent},
          {path: "recovery-tokens", component: RecoveryTokenAdminTableComponent},
          {path: "activate-tokens", component: ActivationTokenAdminTableComponent}
        ]
        , canActivate: [AdminGuard, AuthGuard]
      },
      {
        path: 'contacts', component: ContactsComponent
      },
      {
        path: 'contacts/:contactId', component: ContactDetailsComponent
      },
      {path: 'account', redirectTo: 'account/password'},
      {
        path: "account", component: AccountComponent, children: [
          {path: "password", component: AccountPasswordComponent},
        ]
      },
    ], canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Address} from "src/app/model/address";
import {AddressService} from "../../../../service/address.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddressEditModalComponent} from "../address-edit-modal/address-edit-modal.component";
import {Subscription} from "rxjs";
import {ToastService} from "../../../../service/toast.service";

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit, OnDestroy {

  @Input()
  sortedAddressesToDisplay: Address[];

  reverseSort: boolean;
  sortBy: string;

  removeSubscription: Subscription;

  constructor(private modalService: NgbModal,
              private addressService: AddressService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  sort(sortBy: string): void {
    if (this.sortBy !== sortBy)
      this.reverseSort = false;

    this.sortBy = sortBy;
    this.reverseSort = !this.reverseSort;

    this.sortedAddressesToDisplay.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)

    if (this.reverseSort)
      this.sortedAddressesToDisplay.reverse();

  }

  onClickRemove(addressId: number): void {
    this.removeSubscription = this.addressService.removeAddress(addressId)
      .subscribe(() => this.callBackOkAddressRemove(), () => this.callBackErrorAddressRemove());
  }

  callBackOkAddressRemove(): void {
    this.toastService.show('address.addressRemoveOk', {
      classname: 'bg-success text-light',
      id: 'pop-up-success-remove-address'
    });

    this.addressService.triggerOnReloadAddressesList();
  }

  callBackErrorAddressRemove() {
    this.toastService.show('address.addressRemoveFail', {
      classname: `bg-danger text-light`,
      id: `pop-up-error-remove-address`
    });
  }

  onClickEdit(addressToEdit: Address): void {
    const modalRef = this.modalService.open(AddressEditModalComponent);
    modalRef.componentInstance.addressToEdit = addressToEdit;
  }

  ngOnDestroy(): void {
    if (this.removeSubscription)
      this.removeSubscription.unsubscribe();
  }
}

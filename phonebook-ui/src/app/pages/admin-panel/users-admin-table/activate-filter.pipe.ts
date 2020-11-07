import {Pipe, PipeTransform} from '@angular/core';
import {UserAdmin} from "../../../model/admin-models/user-admin";

@Pipe({
  name: 'activateFilter'
})
export class ActivateFilterPipe implements PipeTransform {

  transform(inputArray: UserAdmin[], onlyActivate: boolean): UserAdmin[] {
    if (onlyActivate)
      return inputArray.filter(value1 => !value1.isActivated);
    else return inputArray;
  }
}

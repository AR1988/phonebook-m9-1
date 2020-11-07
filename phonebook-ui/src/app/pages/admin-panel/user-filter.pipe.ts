import {Pipe, PipeTransform} from '@angular/core';
import {UserAdmin} from "../../model/admin-models/user-admin";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(inputArray: UserAdmin[], searchTerm: string, searchField: string): UserAdmin[] {
    if (!inputArray) {
      return [];
    }
    if (!searchTerm)
      return inputArray;

    return inputArray.filter(value => {
      const term = searchTerm.toLowerCase();
      return value[searchField].toLowerCase().includes(term);
    });
  }
}

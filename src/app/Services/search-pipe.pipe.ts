import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return items;
    return items ? items.filter(list => list.first_name.search(new RegExp(searchText, 'i')) > -1) : [];
  }

}

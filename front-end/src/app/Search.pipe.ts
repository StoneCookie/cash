import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(item:any, value:any) {
    // @ts-ignore
    return item.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase())
    });
  }
}

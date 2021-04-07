import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTags',
})
export class SearchTagsPipe implements PipeTransform {
  
  // Using Pipe for Search by Tags
  transform(value: any, keywordString: String): any {
    if (
      value.length === 0 ||
      keywordString === '' ||
      keywordString === undefined ||
      keywordString === null
    ) {
      return value;
    }
    if (keywordString) {
      console.log(value);
      console.log(keywordString);

      const resultArray = [];
      const lowerCaseSearchString = keywordString.toLowerCase();
      for (const item of value) {
        const lowerCaseNotetag = item['noteTag'].toLowerCase();
        if (lowerCaseNotetag.includes(lowerCaseSearchString)) {
          resultArray.push(item);
        }
      }
      return resultArray;
    } else {
      return value;
    }
  }
}

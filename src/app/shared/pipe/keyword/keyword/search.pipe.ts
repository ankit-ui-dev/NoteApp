import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  
  // Using Pipe for Search by keyword
  transform(value: any, keywordString: String): any {
    if (
      value.length === 0 ||
      keywordString === '' ||
      keywordString === undefined ||
      keywordString === null
    ) {
      return value;
    }
    const resultArray = [];
    if (keywordString) {
      const lowerCaseSearchString = keywordString.toLowerCase();

      console.log(value);
      console.log(keywordString);

      for (const item of value) {
        const lowerCaseNoteTitleName = item['noteTitleName'].toLowerCase();
        const lowerCaseNoteText = item['noteText'].toLowerCase();
        if (
          lowerCaseNoteTitleName.includes(lowerCaseSearchString) ||
          lowerCaseNoteText.includes(lowerCaseSearchString)
        ) {
          resultArray.push(item);
        }
      }
      return resultArray;
    } else {
      return value;
    }
  }
}

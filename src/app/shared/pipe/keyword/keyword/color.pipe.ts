import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {
  // Using Pipe for Search by color
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
      const resultArray = [];
      const lowerCaseSearchString = keywordString.toLowerCase();
      console.log(value);
      console.log(keywordString);
      for (const item of value) {
        const lowerCaseNoteColor = item['noteColor'];
        if (lowerCaseNoteColor.includes(lowerCaseSearchString)) {
          resultArray.push(item);
        }
      }
      return resultArray;
    } else {
      return value;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatpipe'
})
export class FormatpipePipe implements PipeTransform {


  transform(value: string): string{

   
    const part1 = value.slice(0, 4);
    const part2 = value.slice(4, 8);
    const part3 = value.slice(8, 12);
    const part4 = value.slice(12,16);
    const part5 = value.slice(16,20);
    
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  }
}

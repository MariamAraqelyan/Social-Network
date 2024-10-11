import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {
  baseApiUrl: string = environment.apiUrl;
  
  transform(value: string | null): string | null {
    if(!value) {
      return null
    };
    return `${this.baseApiUrl}${value}`;
  }

}

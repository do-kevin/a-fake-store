import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceAFakeStoreApiUrl',
})
export class ReplaceAFakeStoreApiUrlPipe implements PipeTransform {
    mainUrl: string = 'https://fakestoreapi.com';
    alternateUrl: string = 'https://fakestoreapi.herokuapp.com';

    transform(url: string): string {
        if (!url.includes(this.mainUrl)) {
            return url;
        }
        return url.replace(`${this.mainUrl}/`, `${this.alternateUrl}/`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandService {
  private brandsUrl = ''
  constructor(private http: HttpClient) { }
  getBrands(): Observable<any> {
    return this.http.get('../assets/brands.json').map((res: any) => res)
  };
}

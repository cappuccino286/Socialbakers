import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
const API_KEY = 'c601b2695e314fc48d1338d5d861a1eb';
const PROJECT_ID = 305441;
const SPIDER_NAME = 'topbrand';
@Injectable()
export class BrandService {
  private brandsUrl = '';
  constructor(private http: HttpClient) { }
  runJob(brand: string, country: string) {
    const url = 'https://app.scrapinghub.com/api/run.json?apikey=' + API_KEY;
    const data = 'project=' + PROJECT_ID + '&spider=' + SPIDER_NAME + '&brand=' + brand + '&country=' + country;
    return this.http.post(url, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).map((res: any) => res);
  }
  getJob(job_id: string): Observable<any> {
    const url = 'https://app.scrapinghub.com/api/jobs/list.json?apikey=' + API_KEY + '&project=' + PROJECT_ID +
     '&spider=' + SPIDER_NAME + '&job=' + job_id;
    return this.http.get(url).map((res: any) => res);
  }
  getInitJob(): Observable<any> {
    const url = 'https://app.scrapinghub.com/api/jobs/list.json?apikey=' + API_KEY + '&project=' + PROJECT_ID +
     '&spider=' + SPIDER_NAME;
    return this.http.get(url).map((res: any) => res);
  }
  getBrands(job_id): Observable<any> {
    const url = 'https://storage.scrapinghub.com/items/' + job_id + '?apikey=' + API_KEY + '&format=json';
    return this.http.get(url).map((res: any) => res);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
  }

  apiUrl = 'https://mindicador.cl/api';

  constructor(private http:HttpClient) { }

  getPost():Observable<any>{
    return this.http.get(this.apiUrl+'/dolar/').pipe(retry(3));
  }
}

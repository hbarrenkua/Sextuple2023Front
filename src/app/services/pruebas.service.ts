import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  private baseUrl:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  
  getPruebas():Observable<any>
  {

    return this.http.get<any>(`${this.baseUrl}/api/pruebas`)
    
  }

  getMangas(id:number):Observable<any>
  {

    return this.http.get<any>(`${this.baseUrl}/api/pruebas/${id}`)
    
  }

}

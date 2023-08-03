import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOOrdenSalida, Ordenes } from '../interfaces/ordenes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private baseUrl:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  
  getOrdenSalida(id:number):Observable<Ordenes[]>
  {

    return this.http.get<any>(`${this.baseUrl}/api/jornadas/${id}`)
    
  }

  
  guardarOrdenSalida(id:number,horarios:IOOrdenSalida[]):Observable<IOOrdenSalida[]> {

    return this.http.put<IOOrdenSalida[]>(`${this.baseUrl}/api/jornadas/${id}`,horarios)

  }
  
  guardarOrdenSalidaUnica(id:number,horarios:IOOrdenSalida[]):Observable<IOOrdenSalida[]> {

    return this.http.put<IOOrdenSalida[]>(`${this.baseUrl}/api/jornadas/unica/${id}`,horarios)

  }

}

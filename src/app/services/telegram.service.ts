import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private baseUrl:string=environment.baseUrl;

  constructor(private http:HttpClient) { }

  

  actualizarTelegram(id:number, horario:number):Observable<any>
  {

    return this.http.get<any>(`${this.baseUrl}/api/telegram/${id}/${horario}`)
    
  }

}

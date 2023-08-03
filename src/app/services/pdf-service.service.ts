import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  private apiUrl = 'https://localhost/agility/agility/ajax/pdf/';

  constructor(private http: HttpClient) { }
  public downloadOrdenSalidaPdf(prueba:number, jornada:number, manga:number, dia:string, grado:string, alturas:string ): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('Operation', 'OrdenSalida')
      .set('Prueba', prueba)
      .set('Jornada', jornada)
      .set('Manga', manga)
      .set('Categorias', '-')
      .set('Excel', 'false')
      .set('EqConjunta', '0')
      .set('JornadaKO', '0')
      .set('JornadaGames', '0')
      .set('Rango', '1-99999')
      .set('Comentarios', '')
      .set('Alturas',alturas);

    this.http.get(this.apiUrl + 'print_ordenDeSalida.php', {
      headers: headers,
      params: params,
      responseType: 'arraybuffer' // También se indica aquí para asegurar el tipo de respuesta
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, `orden_de_salida_${dia}_${grado}_${alturas}.pdf`);
    });
  }

  public downloadEntradaDatosPdf(prueba:number, jornada:number, manga:number, dia:string, grado:string, alturas:string=''): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('Prueba', prueba)
      .set('Jornada', jornada)
      .set('Manga', manga)
      .set('Mode', '15')
      .set('Categorias', '-')
      .set('Excel', 'false')
      .set('EqConjunta', '0')
      .set('JornadaKO', '0')
      .set('JornadaGames', '0')
      .set('FillData', '0')
      .set('EmptyPage', '0')
      
      .set('Rango', '1-99999')
      .set('Comentarios', '')
      .set('Alturas',alturas);

    this.http.get(this.apiUrl + 'print_entradaDeDatos.php', {
      headers: headers,
      params: params,
      responseType: 'arraybuffer' // También se indica aquí para asegurar el tipo de respuesta
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, `entrada_datos_${dia}_${grado}_${alturas}.pdf`);
    });
  }


  public downloadPodiumPdf(podium:number, prueba:number, jornada:number,rondas:number, manga1:number, manga2:number, dia:string, grado:string, alturas:string=''): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('Prueba', prueba)
      .set('Jornada', jornada)
      .set('Rondas', rondas)
      .set('Manga1', manga1)
      .set('Manga2', manga2)
      .set('Podium', podium)
      .set('Merge', 3)

    this.http.get(this.apiUrl + 'print_podium.php', {
      headers: headers,
      params: params,
      responseType: 'arraybuffer' // También se indica aquí para asegurar el tipo de respuesta
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, (podium===0?'Podium':'Clasificacion_General')+`_${dia}_${grado}.pdf`);
    });
  }

}

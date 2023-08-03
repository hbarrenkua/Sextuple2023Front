import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MangaEntry, Pruebas } from 'src/app/interfaces/ordenes.interfaces';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { PruebasService } from 'src/app/services/pruebas.service';
import { Grado } from '../../interfaces/ordenes.interfaces';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})



export class PdfComponent implements OnInit {
  pruebas!:Pruebas[];
  @ViewChild('jornada') jornada!: MatSelect;

  constructor(private pdfService:PdfServiceService,
    private pruebasService:PruebasService) { }

  ngOnInit(): void {

    this.pruebasService.getPruebas().subscribe(pruebas=>this.pruebas=pruebas);
 
  }

  descarga(){

    this.pruebasService.getMangas(this.jornada.value).subscribe(d=>{
      console.log(d)
      d.forEach((element:any) => {
        this.pdfService.downloadOrdenSalidaPdf(element.Prueba,element.jornadaId,element.mangaId,element.Nombre, element.Descripcion, element.alturas);
        this.pdfService.downloadEntradaDatosPdf(element.Prueba,element.jornadaId,element.mangaId,element.Nombre, element.Descripcion, element.alturas);
      });
      // this.pdfService.downloadOrdenSalidaPdf();
      // this.pdfService.downloadEntradaDatosPdf();
  
    })
  }

  getTransformedArray(entries: MangaEntry[]): Array<{ jornadaId: number, Prueba: number, mangaid1: number, mangaid2: number, grado: string,Nombre: string,    Descripcion: string}> {
    const groupedEntries: { [key: string]: MangaEntry[] } = {};
    // Agrupamos las entradas por jornadaId, Prueba y Grado
    entries.forEach(entry => {
      const key = `${entry.jornadaId}-${entry.Prueba}-${entry.Grado}`;
      if (!groupedEntries[key]) {
        groupedEntries[key] = [];
      }
      groupedEntries[key].push(entry);
    });
  
    console.log(groupedEntries)
    // Creamos el array de objetos transformado
    const transformedArray: Array<{ jornadaId: number, Prueba: number, mangaid1: number, mangaid2: number, grado:string ,Nombre: string,    Descripcion: string}> = [];
  
    for (const key in groupedEntries) {
      const entries = groupedEntries[key];
      const { jornadaId, Prueba, Grado, Nombre,Descripcion } = entries[0];
      const obj: { jornadaId: number, Prueba: number, mangaid1: number, mangaid2: number, grado: string, Nombre: string,    Descripcion: string} = { jornadaId, Prueba, mangaid1: 0, mangaid2: 0, grado:Grado,Nombre,Descripcion};
  
      if (entries.length >= 1) {
        obj.mangaid1 = entries[0].mangaId;
      }
  
      if (entries.length >= 3) {
        obj.mangaid2 = entries[2].mangaId;
      }
  
      transformedArray.push(obj);
    }
  
    return transformedArray;
  }

  descargaPodiums(){
    this.pruebasService.getMangas(this.jornada.value).subscribe(d=>{
      const resultado = this.getTransformedArray(d.filter((m:any)=>m.Grado!='P.A.'));

      resultado.forEach((element:any) => {

        // Opn 16:G3 8:G2 4:G1 2
        const rondas = element.Grado=='GI'?4:element.Grado=='GII'?8:element.Grado=='GIII'?16:32
        this.pdfService.downloadPodiumPdf(0, element.Prueba,element.jornadaId,rondas,element.mangaid1,element.mangaid2,element.Nombre, element.grado, '');
      });
  
    })

  }
  descargaClasificacionGeneral(){
    this.pruebasService.getMangas(this.jornada.value).subscribe(d=>{
      const resultado = this.getTransformedArray(d.filter((m:any)=>m.Grado!='P.A.'));

      resultado.forEach((element:any) => {

        // Opn 16:G3 8:G2 4:G1 2
        const rondas = element.Grado=='GI'?4:element.Grado=='GII'?8:element.Grado=='GIII'?16:32
        this.pdfService.downloadPodiumPdf(1, element.Prueba,element.jornadaId,rondas,element.mangaid1,element.mangaid2,element.Nombre, element.grado, '');
      });
  
    })

  }

  
}
